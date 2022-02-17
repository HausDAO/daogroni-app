import { Button } from '@chakra-ui/react';
import React from 'react';

const DrinkButton = ({ nft }) => {
  const handleDrink = async () => {
    console.log('drinking', nft);
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
      Mint
    </Button>
  );
};

export default DrinkButton;
