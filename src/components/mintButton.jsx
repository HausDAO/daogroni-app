import React, { useState } from 'react';
import { Button, Spinner } from '@chakra-ui/react';

import { useTX } from '../contexts/TXContext';
import { useInjectedProvider } from '../contexts/InjectedProviderContext';
import { TX } from '../data/contractTX';
import { useMyCocktails } from '../contexts/MyCocktailsContext';

const MintButton = ({ nft }) => {
  const { submitTransaction } = useTX();
  const { address } = useInjectedProvider();
  const { refetch } = useMyCocktails();

  const [loading, setLoading] = useState(false);
  const handleMint = async () => {
    setLoading(true);
    await submitTransaction({
      tx: TX.MINT_NFT,
      args: [address, nft.orderId],
    });
    refetch();
    setLoading(false);
  };

  return (
    <Button
      border='1px solid'
      borderRadius='0'
      borderColor='secondary.500'
      backgroundColor='secondary.100'
      color='secondary.500'
      mt={5}
      textTransform='uppercase'
      w={['50%', null, null, '100%', '100%']}
      onClick={handleMint}
      disabled={loading}
    >
      {loading ? <Spinner /> : 'Mint'}
    </Button>
  );
};

export default MintButton;
