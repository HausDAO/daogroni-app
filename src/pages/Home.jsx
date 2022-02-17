import React from 'react';
import { Box, Text } from '@chakra-ui/react';

import Layout from '../components/layout';
import CocktailList from '../components/cocktailIst';

const Home = () => {
  return (
    <Layout isDao>
      <Box p={{ base: 6, md: 10 }}>
        <Text color='tertiary.500' fontSize='xl'>
          Menu
        </Text>
        <CocktailList />
      </Box>
    </Layout>
  );
};

export default Home;

// load nft info - hardcoded for now
// list menu
// maybe get some data from the contract - available nfts or somthing
// mint function
