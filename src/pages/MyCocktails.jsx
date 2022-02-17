import React, { useEffect, useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

import Layout from '../components/layout';
import CocktailList from '../components/cocktailList';
import { nftContent } from '../utils/nftContent';
import { useInjectedProvider } from '../contexts/InjectedProviderContext';
import { createContract } from '../utils/contract';
import { daogroniData, supportedChains } from '../utils/chain';
import { LOCAL_ABI } from '../utils/abi';

const MyCocktails = () => {
  const { address } = useInjectedProvider();
  const [nfts, setNfts] = useState(null);
  const [lootTotal, setLootTotal] = useState(0);
  const { daochain } = daogroniData;

  useEffect(() => {
    const fetchUserNfts = async () => {
      const shamanContract = createContract({
        address: supportedChains[daochain].daogroniShaman,
        abi: LOCAL_ABI.ERC_20,
        chainID: daochain,
      });

      console.log('shamanContract', shamanContract);

      /// shamanContract call to get data for address
      // uris and stuff
      // hydrate nft objects

      const myStuff = [
        { ...nftContent[0], redeemed: true, inWallet: true },
        { ...nftContent[3], inWallet: true },
      ];

      setNfts(myStuff);
      setLootTotal(100);
    };

    if (address) {
      fetchUserNfts();
    }
  }, [address]);

  // useeffect to grab users nfts
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
