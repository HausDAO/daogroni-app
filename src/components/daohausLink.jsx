import React from 'react';
import { Flex, Icon, Link } from '@chakra-ui/react';
import { RiExternalLinkLine } from 'react-icons/ri';

import { daogroniData } from '../utils/chain';

const DaohausLink = ({ linkText }) => {
  const { daoid, daochain } = daogroniData;
  return (
    <Link
      href={`https://app.daohaus.club/dao/${daochain}/${daoid}`}
      isExternal
      ml={2}
    >
      <Flex align='center'>
        {linkText}
        <Icon ml={2} as={RiExternalLinkLine} name='transaction link' />
      </Flex>
    </Link>
  );
};

export default DaohausLink;
