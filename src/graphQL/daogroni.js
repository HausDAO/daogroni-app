import { gql } from 'apollo-boost';

export const USER_NFTS = gql`
  query tokens($memberAddress: String!, $tokenAddress: String!) {
    tokenRegistry(id: $tokenAddress) {
      id
      tokens(where: { owner: $memberAddress }) {
        uri
        identifier
        owner {
          id
        }
      }
    }
  }
`;
