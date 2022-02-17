import React from 'react';
import {
  Box,
  Button,
  Flex,
  Image,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react';

import { nftContent } from '../utils/nftContent';

const CocktailList = () => {
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
      {nftContent.map(nft => {
        return (
          <Box
            w={['100%', null, null, null, '30%']}
            paddingX={{ base: 5, lg: 7 }}
            paddingTop={{ base: '17px', lg: 6 }}
            paddingBottom={{ base: '17px', lg: 8 }}
            mb={6}
            mx={1}
            key={nft.title}
          >
            <Flex>
              <Box>
                <Text fontSize='xl' mb={2}>
                  {nft.title}
                </Text>
                <UnorderedList>
                  {nft.ingredients.map(ingredient => (
                    <ListItem key={ingredient} fontSize='md'>
                      {ingredient}
                    </ListItem>
                  ))}
                  <ListItem fontSize='md'>Garnish: {nft.garnish}</ListItem>
                </UnorderedList>
              </Box>
              <Image w='100px' src={nft.image} />
            </Flex>
            <Button mt={5}>Order Cocktail (mint nft)</Button>
          </Box>
        );
      })}
    </Flex>
  );
};

export default CocktailList;
