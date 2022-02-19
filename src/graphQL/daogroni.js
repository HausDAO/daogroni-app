import { gql } from 'apollo-boost';

export const USER_NFTS = gql`
  query tokens($memberAddress: String!, $tokenAddress: String!) {
    tokenRegistry(id: $tokenAddress) {
      id
      tokens(where: { owner: $memberAddress }) {
        identifier
        owner {
          id
        }
      }
    }
  }
`;

export const TOTAL_NFTS = gql`
  query tokens($tokenAddress: String!) {
    tokenRegistry(id: $tokenAddress) {
      id
      tokens {
        identifier
      }
    }
  }
`;
