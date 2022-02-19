import React from 'react';
import { DaoProvider } from './contexts/DaoContext';
import { MyCocktailsProvider } from './contexts/MyCocktailsContext';
import { TxPollContextProvider } from './contexts/TxPollContext';

import TxInfoModal from './modals/TxInfoModal';
import BaseRouter from './routers/baseRouter';

function App() {
  return (
    <TxPollContextProvider>
      <TxInfoModal />
      <DaoProvider>
        <MyCocktailsProvider>
          <BaseRouter />
        </MyCocktailsProvider>
      </DaoProvider>
    </TxPollContextProvider>
  );
}

export default App;
