import React, { useEffect, useState, useContext } from 'react';
import { Box, Text, Flex } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

import Layout from '../components/layout';
import CocktailList from '../components/cocktailList';
import { nftContent } from '../utils/nftContent';
import { daogroniData, getGraphEndpoint } from '../utils/chain';
// import { TOTAL_NFTS } from '../graphQL/daogroni';
import { TOTAL_NFTS_NEW } from '../graphQL/daogroni';

import { graphQuery } from '../utils/apollo';
import { OverlayContext } from '../contexts/OverlayContext';
import Modal from '../modals/modal';
import Story from '../components/story';

const Home = () => {
  const { daochain } = daogroniData;
  const [totalSold, setTotalSold] = useState(0);
  // const { genericModal } = useAppModal();
  const { setModal } = useContext(OverlayContext);
  const location = useLocation();

  useEffect(() => {
    console.log('location', location);
    const setup = async () => {
      const tokens = await graphQuery({
        // endpoint: getGraphEndpoint(daochain, 'erc721_graph_url'),
        // query: TOTAL_NFTS,
        endpoint: getGraphEndpoint(daochain, 'daogroni_subgraph'),
        query: TOTAL_NFTS_NEW,
        // variables: {
        //   tokenAddress: supportedChains[daochain].daogroniShaman.toLowerCase(),
        // },
      });
      console.log('tokens', tokens);

      if (tokens?.tokens) {
        setTotalSold(tokens.tokens.length);
      }
    };

    if (daochain) {
      setup();
    }
    if (location.search === '?q=buyyouadrink') {
      setModal({
        title: 'A DAOgroni Story',
        subtitle: 'Buy You a Drink',
        body: <Story />,
        width: '90%',
      });
    }
  }, [daochain, location]);

  const handleModalClick = () => {
    setModal({
      title: 'A DAOgroni Story',
      subtitle: 'Buy You a Drink',
      body: <Story />,
      width: '90%',
    });
  };

  return (
    <Layout isDao>
      <Modal />
      <Box p={{ base: 6, md: 10 }}>
        <Text color='tertiary.500' fontSize='5xl'>
          🥃 Daogroni
        </Text>
        <Box
          border='1px solid'
          borderColor='secondary.500'
          backgroundColor='primary.500'
          p={5}
          mb={5}
        >
          <Box mb={5}>
            <Text color='secondary.500' mb={2}>
              Negronis are the simplest of cocktails, ratio of 1 to 1 to 1. That
              simple pattern creates a fertile substrate within a constrained
              design space that facilitates experimentation and modification. No
              wonder there are a multitude of negroni variations served in bars
              across the world.
            </Text>
            <Text color='secondary.500' mb={2}>
              Similarly, the simple, lightweight constraints created by Moloch
              DAOs enable which community members can interact safely, take
              risks together, and draw emergent creatitivity out of the
              serendipity of their humanistic interactions.
            </Text>
            <Text color='secondary.500' mb={2}>
              Daogroni -- a negroni appreciation club -- is an homage to this
              powerful concept of simple constraints.
            </Text>
            <Text color='secondary.500' mb={2}>
              In the spirit of remixing and experimentation, Daogroni takes
              creative license with some of those constraints, smashing together
              NFTs with Moloch DAOs to allow the NFT contract to mint DAO shares
              without a proposal.
            </Text>
          </Box>
          <Box mb={5}>
            <Text color='tertiary.500' fontSize='xl'>
              Drink a cocktail and join the Daogroni club
            </Text>
            <Text color='secondary.500' mb={2}>
              1. Order a drink! Choose a cocktail for yourself, or buy a round
              for your friends. Cocktails cost {daogroniData.display}{' '}
              {daogroniData.symbol}, and all proceeds from NFT cocktail sales go
              straight into the DAO treasury.
            </Text>
            <Text color='secondary.500' mb={2}>
              2. Demonstrate your love of cocktails by drinking your drink.
              You&apos;ll get shares in the DAO, and your NFT will change into
              an empty glass. Your DAO shares represent membership in the
              Daogroni club and economic stake (including exit rights!) in the
              treasury.
            </Text>
            <Text color='secondary.500' mb={2}>
              3. Have a say in how the Daogroni clubs spends its funds.
            </Text>
            <Text color='secondary.500' mb={6}>
              4. Like the glassware? Collect them all!
            </Text>

            <Text
              color='secondary.500'
              _hover={{ cursor: 'pointer', color: 'secondary.100' }}
              mb={2}
              onClick={handleModalClick}
            >
              Buy you a drink?
            </Text>
          </Box>
        </Box>
        <Flex justify='space-between' alignItems='flex-end'>
          <Text color='tertiary.500' fontSize='2xl'>
            Menu
          </Text>
          <Text color='tertiary.500'>Total sold: {totalSold} of 200</Text>
        </Flex>
        <CocktailList nfts={nftContent} />
      </Box>
    </Layout>
  );
};

export default Home;
