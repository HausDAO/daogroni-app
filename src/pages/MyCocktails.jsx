import React, { useEffect, useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

import Layout from '../components/layout';
import CocktailList from '../components/cocktailList';
import { tempMyCocktails } from '../utils/nftContent';
import { useInjectedProvider } from '../contexts/InjectedProviderContext';

const MyCocktails = () => {
  const { address } = useInjectedProvider();
  const [nfts, setNfts] = useState(null);
  const [lootTotal, setLootTotal] = useState(0);

  useEffect(() => {
    const fetchUserNfts = async () => {
      setNfts(tempMyCocktails);
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
