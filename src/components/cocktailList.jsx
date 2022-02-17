import React from 'react';
import { Flex } from '@chakra-ui/react';

import CocktailCard from './cocktailCard';

const CocktailList = ({ nfts }) => {
  return (
    <Flex
      wrap='wrap'
      justify='space-around'
      width='100%'
      border='1px solid'
      borderColor='secondary.500'
      backgroundColor='primary.500'
      p={10}
    >
      {nfts.map(nft => {
        return <CocktailCard key={nft.title} nft={nft} />;
      })}
    </Flex>
  );
};

export default CocktailList;
