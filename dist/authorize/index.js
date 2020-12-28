"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinWith = exports.validateCertificationNumber = exports.generateCertificationNumber = void 0;
const client_1 = require("@apollo/client");
const clients_1 = require("../clients");
const values_1 = require("../values");
const errors_1 = require("../errors");
let isVerified = false;
const handleException = (error) => {
    if (error.graphQLErrors.length > 0) {
        const graphqlError = error.graphQLErrors[0];
        if (graphqlError.extensions) {
            const pickedError = graphqlError.extensions.errorCode;
            if (pickedError.message.includes('receiver 번호가 유효하지 않습니다')) {
                throw new errors_1.ValidationError(values_1.CODE.INPUT_ERROR);
            }
            else {
                throw new errors_1.ValidationError(pickedError.code);
            }
        }
    }
};
const generateCertificationNumber = (phoneNumber) => {
    const generateCertificationNumber = client_1.gql `
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
    return clients_1.ApolloClient.mutate({
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
exports.generateCertificationNumber = generateCertificationNumber;
const validateCertificationNumber = (certificate) => {
    const validateCertificationNumber = client_1.gql `
    mutation GenerateAuthNumWithSignUpConfirm($authNumId: Int!, $authNum: String!) {
      generateAuthNumWithSignUpConfirm(authNumId: $authNumId, authNum: $authNum)
    }
  `;
    return clients_1.ApolloClient.mutate({
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
exports.validateCertificationNumber = validateCertificationNumber;
const joinWith = async (params) => {
    let isJoined = false;
    const response = await clients_1.AxiosClient.post('/auth/v1/user/signup', params);
    if (response.data.code === values_1.CODE.SUCCESS) {
        isJoined = true;
    }
    else {
        throw new errors_1.JoinError(response.data.code);
    }
    return isJoined;
};
exports.joinWith = joinWith;
