import { ApolloError, gql } from '@apollo/client';
import { AxiosClient, ApolloClient } from '../clients';
import { CertificationNumber, JoinUserInfo } from '../types';
import { CODE } from '../values';
import { JoinError, ValidationError } from '../errors';

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
  const generateCertificationNumber = gql`
    mutation GenerateAuthNumWithSignUp($phone: String!) {
      generateAuthNumWithSignUp(phone: $phone) {
        authNumId
        phone
        createDt
        createUserId
        updateDt
        updateUserId
      }
    }
  `;

  return ApolloClient.mutate({
    mutation: generateCertificationNumber,
    variables: {
      phone: phoneNumber
    }
  }).then((response) => {
    return response.data.generateAuthNumWithSignUp;
  }).catch((error) => {
    handleException(error);
  });
};

const validateCertificationNumber = (certificate: CertificationNumber) => {
  const validateCertificationNumber = gql`
    mutation GenerateAuthNumWithSignUpConfirm($authNumId: Int!, $authNum: String!) {
      generateAuthNumWithSignUpConfirm(authNumId: $authNumId, authNum: $authNum)
    }
  `;

  return ApolloClient.mutate({
    mutation: validateCertificationNumber,
    variables: {
      authNumId: certificate.authNumId,
      authNum: certificate.authNum
    }
  }).then((response) => {
    if (response.data.generateAuthNumWithSignUpConfirm) {
      return true;
    }
  }).catch((error) => {
    handleException(error);
  });
};

const joinWith = async (params: JoinUserInfo) => {
  let isJoined = false;
  const response = await AxiosClient.post('/auth/v1/user/signup', params);
  if (response.data.code === CODE.SUCCESS) {
    isJoined = true;
  } else {
    throw new JoinError(response.data.code);
  }

  return isJoined;
};

export {
  generateCertificationNumber,
  validateCertificationNumber,
  joinWith,
};
