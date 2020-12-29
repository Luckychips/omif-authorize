import { ApolloClient, ApolloError, NormalizedCacheObject } from '@apollo/client';
import { AxiosClient, WrappedApolloClient } from '../clients';
import { CertificationNumber, JoinUserInfo } from '../types';
import { CODE } from '../values';
import { JoinError, ValidationError } from '../errors';
import {
  QUERY_GENERATE_CERTIFICATION_NUMBER,
  QUERY_VALIDATE_CERTIFICATION_NUMBER,
} from '../queries';


const AXIOS_ENDPOINT = '';
const APOLLO_ENDPOINT = '';

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;
let axiosClient: AxiosClient | null = null;
let isVerified = false;
const initialize = () => {
  axiosClient = new AxiosClient(AXIOS_ENDPOINT);
  apolloClient = new WrappedApolloClient(APOLLO_ENDPOINT).getInstance();
};

const handleException = (error: ApolloError) => {
  if (error.graphQLErrors.length > 0) {
    const graphqlError = error.graphQLErrors[0];
    if (graphqlError.extensions) {
      const pickedError = graphqlError.extensions.errorCode;
      if (pickedError.message.includes('receiver 번호가 유효하지 않습니다')) {
        throw new ValidationError(CODE.INPUT_ERROR);
      } else {
        throw new ValidationError(pickedError.code);
      }
    }
  }
};

const generateCertificationNumber = (phoneNumber: string) => {
  if (apolloClient) {
    return apolloClient.mutate({
      mutation: QUERY_GENERATE_CERTIFICATION_NUMBER,
      variables: {
        phone: phoneNumber
      }
    }).then((response) => {
      return response.data.generateAuthNumWithSignUp;
    }).catch((error) => {
      handleException(error);
    });
  } else {
    throw new ValidationError(CODE.NETWORK_ERROR);
  }
};

const validateCertificationNumber = (certificate: CertificationNumber) => {
  if (apolloClient) {
    return apolloClient.mutate({
      mutation: QUERY_VALIDATE_CERTIFICATION_NUMBER,
      variables: {
        authNumId: certificate.authNumId,
        authNum: certificate.authNum
      }
    }).then((response) => {
      if (response.data.generateAuthNumWithSignUpConfirm) {
        isVerified = true;
        return true;
      }
    }).catch((error) => {
      handleException(error);
    });
  } else {
    throw new ValidationError(CODE.NETWORK_ERROR);
  }
};

const joinWith = async (params: JoinUserInfo) => {
  let isJoined = false;
  if (axiosClient) {
    if (!isVerified) {
      throw new JoinError(CODE.OTHER_JOIN_ERROR);
    }

    const response = await axiosClient.post('/auth/v1/user/signup', params);
    if (response.data.code === CODE.SUCCESS) {
      isJoined = true;
    } else {
      throw new JoinError(response.data.code);
    }
  }

  return isJoined;
};

export {
  initialize,
  generateCertificationNumber,
  validateCertificationNumber,
  joinWith,
};
