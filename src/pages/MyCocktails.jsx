import React, { useEffect, useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

import { useInjectedProvider } from '../contexts/InjectedProviderContext';
import { useMyCocktails } from '../contexts/MyCocktailsContext';
import CocktailList from '../components/cocktailList';
import Layout from '../components/layout';
import { getLootTotal } from '../utils/daogroni';

const MyCocktails = () => {
  const { address } = useInjectedProvider();
  const { myCocktails } = useMyCocktails();
  const [nfts, setNfts] = useState(null);
  const [lootTotal, setLootTotal] = useState(0);

  useEffect(() => {
    if (myCocktails) {
      console.log('myCocktails', myCocktails);
      setNfts(myCocktails);
      setLootTotal(getLootTotal(myCocktails));
    }
  }, [myCocktails]);

  return (
    <Layout isDao>
      <Box p={{ base: 6, md: 10 }}>
        <Flex justify='space-between'>
          <Text color='tertiary.500' fontSize='2xl'>
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
        <Text color='tertiary.500' fontSize='sm'>
          *Freshly poured drinks might take some time to show up here.
        </Text>
      </Box>
    </Layout>
  );
};

export default MyCocktails;
