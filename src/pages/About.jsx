import React from 'react';
import { Box, Link, Text } from '@chakra-ui/react';

import Layout from '../components/layout';

const About = () => {
  return (
    <Layout isDao>
      <Box p={{ base: 6, md: 10 }}>
        <Text color='tertiary.500' fontSize='2xl'>
          About
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
              Daogroni uses a new mechanism in the Moloch DAO framework called a
              &quot;shaman&quot;. A shaman is an extension that adds custom
              logic to how DAO membership and stake is managed.
            </Text>
            <Text color='secondary.500' mb={2}>
              Typically, minting shares and loot requires passing a proposal.
              When a DAO approves a new shaman contract, however, that contract
              can circumvent the proposal process to instantly mint/burn shares
              or loot based on its own logic.
            </Text>
            <Text color='secondary.500' mb={2}>
              Shamans are incredibly flexible. DAOs can implement arbitrary
              logic in a shaman contract. For example, the Daogroni shaman
              contract is an{' '}
              <Link
                isExternal
                href='https://github.com/HausDAO/Moloch2.5/blob/feature/erc721/contracts/erc721Shaman.sol'
                color='tertiary.500'
              >
                ERC721 contract
              </Link>{' '}
              Another example in production today is the{' '}
              <Link
                isExternal
                href='https://yeet.daohaus.club'
                color='tertiary.500'
              >
                DAOhaus Yeeter
              </Link>
              , which enables new members to instantly join a DAO by sending it
              ETH.
            </Text>
            <Text color='secondary.500' mb={2}>
              Interested in building with shamans? We have a{' '}
              <Link
                isExternal
                href='https://github.com/HausDAO/Moloch2.5/tree/feature/erc721#other-shaman-ideas'
                color='tertiary.500'
              >
                list of starter ideas
              </Link>{' '}
              in the repo.
            </Text>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default About;
