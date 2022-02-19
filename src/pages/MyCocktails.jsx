import React, { useEffect, useState } from 'react';
import { Box, Flex, IconButton, Spinner, Text } from '@chakra-ui/react';

import { RiRefreshLine } from 'react-icons/ri';
import { useInjectedProvider } from '../contexts/InjectedProviderContext';
import { useMyCocktails } from '../contexts/MyCocktailsContext';
import CocktailList from '../components/cocktailList';
import Layout from '../components/layout';
import { getLootTotal } from '../utils/daogroni';

const MyCocktails = () => {
  const { address } = useInjectedProvider();
  const { myCocktails, refetch } = useMyCocktails();
  const [nfts, setNfts] = useState(null);
  const [lootTotal, setLootTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (myCocktails) {
      console.log('myCocktails', myCocktails);
      setNfts(myCocktails);
      setLootTotal(getLootTotal(myCocktails));
    }
  }, [myCocktails]);

  const handleRefresh = () => {
    setLoading(true);
    refetch();

    setTimeout(() => {
      setLoading(false);
    }, 6000);
  };

  return (
    <Layout isDao>
      <Box p={{ base: 6, md: 10 }}>
        <Flex justify='space-between'>
          <Text color='tertiary.500' fontSize='2xl'>
            My Cocktails
          </Text>
          <Flex>
            <Text color='black' fontSize='lg' mr={5}>
              Loot Total: {lootTotal}
            </Text>
            {loading && <Spinner />}
            {!loading && (
              <IconButton
                icon={<RiRefreshLine size='1.5rem' />}
                p={0}
                size='sm'
                variant='outline'
                onClick={handleRefresh}
              />
            )}
          </Flex>
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
