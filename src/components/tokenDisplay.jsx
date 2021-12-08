import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Box, Flex } from '@chakra-ui/layout';

import { useToken } from '../contexts/TokenContext';
import TextIndicator from './textIndicator';
import TokenIndicator from './tokenIndicator';
import { TokenService } from '../services/tokenService';

const TokenDisplay = ({ tokenAddress }) => {
  const { daochain } = useParams();
  const { getTokenPrice } = useToken();

  const [tokenData, setTokenData] = useState(null);
  const usdPrice = getTokenPrice(tokenAddress);

  useEffect(() => {
    const fetchTokenData = async () => {
      const tokenService = TokenService({ chainID: daochain, tokenAddress });
      try {
        const symbol = await tokenService('symbol')();
        const decimals = await tokenService('decimals')();
        const data = { symbol, decimals };
        setTokenData(data);
      } catch (error) {
        console.error(error);
      }
    };
    if (tokenAddress) {
      fetchTokenData();
    }
  }, [tokenAddress, daochain]);
  return (
    <Box>
      <Flex w='100%' justify='space-between' mt={6} wrap='wrap'>
        {tokenAddress && <TokenIndicator tokenAddress={tokenAddress} />}
      </Flex>
      <Flex w='100%' justify='space-between' mt={6} wrap='wrap'>
        {tokenData?.symbol && (
          <TextIndicator label='Symbol' value={tokenData.symbol} />
        )}
        {/* Will occasionally botch decimals. Should be fixed with ProposalLegos merge */}
        {usdPrice && <TextIndicator label='USD Price' value={usdPrice} />}
        {tokenData?.decimals && (
          <TextIndicator label='decimals' value={tokenData?.decimals} />
        )}
      </Flex>
    </Box>
  );
};

export default TokenDisplay;
