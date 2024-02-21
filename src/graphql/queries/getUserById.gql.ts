import { gql } from "@apollo/client";

export const GET_USER_BY_ID = gql`
  query GetUserById($getUserByIdId: Int!) {
    getUserById(id: $getUserByIdId) {
      email
      firstName
      id
      lastName
    }
  }
`;
