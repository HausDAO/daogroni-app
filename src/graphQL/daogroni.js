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

export const USER_NFTS_NEW = gql`
  query tokens($memberAddress: String!) {
    tokens(where: { account: $memberAddress }) {
      id
      tokenId
      account
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

export const TOTAL_NFTS_NEW = gql`
  query tokens {
    tokens(first: 201) {
      id
      tokenId
      account
    }
  }
`;
