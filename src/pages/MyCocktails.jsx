import React, { useEffect, useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

import Layout from '../components/layout';
import CocktailList from '../components/cocktailList';
import { nftContent } from '../utils/nftContent';
import { useInjectedProvider } from '../contexts/InjectedProviderContext';
import {
  daogroniData,
  getGraphEndpoint,
  supportedChains,
} from '../utils/chain';
import { graphQuery } from '../utils/apollo';
import { USER_NFTS } from '../graphQL/daogroni';
import { createContract } from '../utils/contract';
import { LOCAL_ABI } from '../utils/abi';

const MyCocktails = () => {
  const { address } = useInjectedProvider();
  const [nfts, setNfts] = useState(null);
  const [lootTotal, setLootTotal] = useState(0);
  const { daochain } = daogroniData;

  useEffect(() => {
    const fetchUserNfts = async () => {
      try {
        const tokens = await graphQuery({
          endpoint: getGraphEndpoint(daochain, 'erc721_graph_url'),
          query: USER_NFTS,
          variables: {
            tokenAddress: supportedChains[
              daochain
            ].daogroniShaman.toLowerCase(),
            memberAddress: address,
          },
        });
        const shamanContract = createContract({
          address: supportedChains[daochain].daogroniShaman,
          abi: LOCAL_ABI.NFT_SHAMAN,
          chainID: daochain,
        });

        console.log('tokens', tokens);

        const hydratedTokens = await Promise.all(
          tokens.tokenRegistry.tokens.map(async token => {
            console.log('token', token);
            const tokenUri = await shamanContract.methods
              .tokenURI(token.identifier)
              .call();
            const res = await fetch(tokenUri);
            const res2 = await res.json();

            console.log('res2', res2);
            console.log('tokenUri', tokenUri);

            return {
              ...nftContent.find(nft => nft.orderId === res2.orderId),
              inWallet: true,
              ...token,
              ...res2,
              redeemed: res2.redeemed === '1',
            };
          }),
        );

        console.log('hydratedTokens', hydratedTokens);

        const lootTotal = hydratedTokens.reduce((sum, token) => {
          if (token.redeemed) {
            sum += 100;
          }

          return sum;
        }, 0);

        setNfts(hydratedTokens);
        setLootTotal(lootTotal);
      } catch (err) {
        console.log('fetch error', err);
      }
    };

    if (address) {
      fetchUserNfts();
    }
  }, [address]);

  return (
    <Layout isDao>
      <Box p={{ base: 6, md: 10 }}>
        <Flex justify='space-between'>
          <Text color='tertiary.500' fontSize='xl'>
            My Cocktails
          </Text>
          <Text color='black' fontSize='lg'>
            Loot Total: {lootTotal}
          </Text>
        </Flex>
        {!address && (
          <Box mt={5} fontSize='lg' color='black'>
            Connect your wallet
          </Box>
        )}
        {nfts && <CocktailList nfts={nfts} />}
      </Box>
    </Layout>
  );
};

export default MyCocktails;
