import React, { useState } from 'react';
import { Button, Spinner } from '@chakra-ui/react';

import { useTX } from '../contexts/TXContext';
import { TX } from '../data/contractTX';
import { useMyCocktails } from '../contexts/MyCocktailsContext';

const DrinkButton = ({ nft }) => {
  const { submitTransaction } = useTX();
  const { refetch } = useMyCocktails();

  const [loading, setLoading] = useState(false);

  const handleDrink = async () => {
    console.log('drinking', nft);

    setLoading(true);
    await submitTransaction({
      tx: TX.REDEEM_NFT,
      args: [nft.identifier],
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
      onClick={handleDrink}
    >
      {loading ? <Spinner /> : 'Drink'}
    </Button>
  );
};

export default DrinkButton;
