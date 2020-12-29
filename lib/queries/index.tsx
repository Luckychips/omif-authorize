import { gql } from '@apollo/client';

export const QUERY_GENERATE_CERTIFICATION_NUMBER = gql`
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

export const QUERY_VALIDATE_CERTIFICATION_NUMBER = gql`
  mutation GenerateAuthNumWithSignUpConfirm($authNumId: Int!, $authNum: String!) {
    generateAuthNumWithSignUpConfirm(authNumId: $authNumId, authNum: $authNum)
  }
`;
