import React, {
  useEffect,
  useContext,
  createContext,
  useRef,
  useState,
} from 'react';

import { TXProvider } from './TXContext';
import { bigGraphQuery } from '../utils/theGraph';
import { daogroniData, supportedChains } from '../utils/chain';
import { putRefreshApiVault } from '../utils/metadata';

export const DaoContext = createContext();

export const DaoProvider = ({ children }) => {
  const { daoid, daochain } = daogroniData;

  const daoNetworkData = supportedChains[daochain];

  const [daoOverview, setDaoOverview] = useState();

  const hasPerformedBatchQuery = useRef(false);
  const currentDao = useRef(null);

  useEffect(() => {
    // This condition is brittle. If one request passes, but the rest fail
    // this stops the app from fetching. We'll need something better later on.
    if (daoOverview) {
      return;
    }
    if (
      !daoid ||
      !daochain ||
      !daoNetworkData ||
      hasPerformedBatchQuery.current
    ) {
      return;
    }

    // DaoOverview data/query required for most of frombuilder to work
    // Example dao queries - can add other entities and set to any context scope - see dao proposals
    const bigQueryOptions = {
      args: {
        daoID: daoid.toLowerCase(),
        chainID: daochain,
      },
      getSetters: [{ getter: 'getOverview', setter: setDaoOverview }],
    };

    bigGraphQuery(bigQueryOptions);
    hasPerformedBatchQuery.current = true;
  }, [daoid, daochain, daoNetworkData, daoOverview, setDaoOverview]);

  const refetch = () => {
    const bigQueryOptions = {
      args: {
        daoID: daoid.toLowerCase(),
        chainID: daochain,
      },
      getSetters: [{ getter: 'getOverview', setter: setDaoOverview }],
    };
    currentDao.current = null;
    bigGraphQuery(bigQueryOptions);
  };

  const refreshAllDaoVaults = async () => {
    const { network } = supportedChains[daochain];
    await putRefreshApiVault({ network, molochAddress: daoid });
  };

  return (
    <DaoContext.Provider
      value={{
        daoOverview,
        refetch,
        refreshAllDaoVaults,
        hasPerformedBatchQuery, // Ref, not state
      }}
    >
      <TXProvider>{children}</TXProvider>
    </DaoContext.Provider>
  );
};
export const useDao = () => {
  const {
    daoOverview,
    refetch,
    hasPerformedBatchQuery, // Ref, not state
  } = useContext(DaoContext);
  return {
    daoOverview,
    refetch,
    hasPerformedBatchQuery,
  };
};
