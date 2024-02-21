import { gql } from "@apollo/client";

export const SIGN_IN = gql`
  mutation SignIn($signInInput: SignInInput!) {
    signIn(signInInput: $signInInput) {
      accessToken
      user {
        email
        firstName
        id
        lastName
      }
    }
  }
`;
