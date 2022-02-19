import React, { useEffect, useContext, createContext, useState } from 'react';

import { useInjectedProvider } from './InjectedProviderContext';
import { fetchUserNfts } from '../utils/daogroni';
import { daogroniData } from '../utils/chain';

export const MyCocktailsContext = createContext();

export const MyCocktailsProvider = ({ children }) => {
  const { address } = useInjectedProvider();

  const { daochain } = daogroniData;

  const [myCocktails, setMycocktail] = useState(null);

  useEffect(() => {
    const setup = async () => {
      const nftData = await fetchUserNfts({ address, daochain });
      setMycocktail(nftData);
    };

    if (address) {
      setup();
    }
  }, [address]);

  const refetch = async () => {
    const nftData = await fetchUserNfts({ address, daochain });
    setMycocktail(nftData);
  };

  return (
    <MyCocktailsContext.Provider
      value={{
        myCocktails,
        refetch,
      }}
    >
      {children}
    </MyCocktailsContext.Provider>
  );
};
export const useMyCocktails = () => {
  const { myCocktails, refetch } = useContext(MyCocktailsContext);
  return {
    myCocktails,
    refetch,
  };
};
