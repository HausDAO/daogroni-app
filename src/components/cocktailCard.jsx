import React from 'react';
import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import MintButton from './mintButton';
import DrinkButton from './DrinkButton';

const CocktailCard = ({ nft }) => {
  return (
    <Box
      w={['100%', null, null, '30%', '30%']}
      paddingX={{ base: 5, lg: 7 }}
      paddingTop={{ base: '17px', lg: 6 }}
      paddingBottom={{ base: '17px', lg: 8 }}
      mb={6}
      mx={1}
      key={nft.title}
    >
      <Flex>
        <Box color='black' w='100%'>
          <Image w={['100%', null, null, '100%', '100%']} src={nft.image} />
          <Text fontSize='xl' mt={2} fontWeight='700'>
            {nft.title}
          </Text>
          {nft.ingredients.map(ingredient => (
            <Box key={ingredient} fontSize='md'>
              {ingredient}
            </Box>
          ))}
          <Box fontSize='md'>{nft.garnish}</Box>
          <Box fontSize='md' mt={3}>
            Price: .1 ETH
          </Box>
        </Box>
      </Flex>
      {!nft.inWallet && <MintButton nft={nft} />}

      {nft.inWallet && !nft.redeemed && <DrinkButton nft={nft} />}

      {nft.inWallet && nft.redeemed && (
        <Button
          border='1px solid'
          borderRadius='0'
          borderColor='secondary.500'
          backgroundColor='primary.500'
          color='secondary.500'
          mt={5}
          textTransform='uppercase'
          w={['50%', null, null, '100%', '100%']}
          _hover={{ cursor: 'pointer', backgroundColor: 'primary.500' }}
          disabled
        >
          Empty - 100 Loot
        </Button>
      )}
    </Box>
  );
};

export default CocktailCard;
