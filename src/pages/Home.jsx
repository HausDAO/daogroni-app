import React from 'react';
import { Box, Text } from '@chakra-ui/react';

import Layout from '../components/layout';
import CocktailList from '../components/cocktailList';
import { nftContent } from '../utils/nftContent';

const Home = () => {
  return (
    <Layout isDao>
      <Box p={{ base: 6, md: 10 }}>
        <Text color='tertiary.500' fontSize='xl'>
          Menu
        </Text>
        <CocktailList nfts={nftContent} />
      </Box>
    </Layout>
  );
};

export default Home;
