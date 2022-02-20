// import { USER_NFTS } from '../graphQL/daogroni';
import { USER_NFTS_NEW } from '../graphQL/daogroni';
import { LOCAL_ABI } from './abi';
import { graphQuery } from './apollo';
import { getGraphEndpoint, supportedChains } from './chain';
import { createContract } from './contract';
import { nftContent } from './nftContent';

export const fetchUserNfts = async ({ daochain, address }) => {
  try {
    const tokens = await graphQuery({
      // endpoint: getGraphEndpoint(daochain, 'erc721_graph_url'),
      // query: USER_NFTS,
      endpoint: getGraphEndpoint(daochain, 'daogroni_subgraph'),
      query: USER_NFTS_NEW,
      variables: {
        // tokenAddress: supportedChains[daochain].daogroniShaman.toLowerCase(),
        memberAddress: address,
      },
    });
    const shamanContract = createContract({
      address: supportedChains[daochain].daogroniShaman,
      abi: LOCAL_ABI.NFT_SHAMAN,
      chainID: daochain,
    });

    console.log('tokens', tokens);
    // const tokensAry = tokens.tokenRegistry ? tokens.tokenRegistry.tokens : [];
    const tokensAry = tokens?.tokens ? tokens.tokens : [];

    const hydratedTokens = await Promise.all(
      tokensAry.map(async token => {
        console.log('token', token);
        const tokenUri = await shamanContract.methods
          .tokenURI(token.tokenId)
          .call();
        const res = await fetch(tokenUri);
        const res2 = await res.json();

        return {
          ...nftContent.find(nft => nft.orderId === res2.orderId),
          inWallet: true,
          ...token,
          ...res2,
          redeemed: res2.redeemed === '1',
        };
      }),
    );

    return hydratedTokens;
  } catch (err) {
    console.log('fetch error', err);
    return [];
  }
};

// TODO: maybe query the dao here

export const getLootTotal = tokens => {
  if (!tokens) {
    return 0;
  }
  return tokens.reduce((sum, token) => {
    if (token.redeemed) {
      sum += 100;
    }

    return sum;
  }, 0);
};
