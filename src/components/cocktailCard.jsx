import React from 'react';
import { Box, Button, Flex, Image, Text, Link } from '@chakra-ui/react';

import { useInjectedProvider } from '../contexts/InjectedProviderContext';
import MintButton from './mintButton';
import DrinkButton from './DrinkButton';
import { daogroniData } from '../utils/chain';

const CocktailCard = ({ nft }) => {
  const { address } = useInjectedProvider();
  const { daoid, daochain } = daogroniData;

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
          {/* <Image
            w={['100%', null, null, '100%', '100%']}
            src={nft.redeemed ? nft.redeemedImage : nft.image}
          /> */}

          <Image w={['100%', null, null, '100%', '100%']} src={nft.image} />
          {/* <embed src={nft.image} w='800px' /> */}

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
            Price: {`${daogroniData.display} ${daogroniData.symbol}`}
          </Box>
        </Box>
      </Flex>
      {!nft.inWallet && <MintButton nft={nft} />}

      {nft.inWallet && !nft.redeemed && <DrinkButton nft={nft} />}

      {nft.inWallet && nft.redeemed && (
        <>
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
          <Link
            mr={5}
            mt={2}
            fontSize='xs'
            href={`https://app.daohaus.club/dao/${daochain}/${daoid}/profile/${address}`}
            display={{ base: 'none', md: 'flex' }}
            isExternal
          >
            Manage your loot in the DAO
          </Link>
        </>
      )}
    </Box>
  );
};

export default CocktailCard;
