import { gql } from "@apollo/client";

export const UPDATE_USER_BY_ID = gql`
  mutation UpdateUserById($updateUserByIdId: Int!, $input: UpdateUserInput!) {
    updateUserById(id: $updateUserByIdId, input: $input) {
      email
      firstName
      id
      lastName
    }
  }
`;
