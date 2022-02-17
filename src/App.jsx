import React from 'react';
import { DaoProvider } from './contexts/DaoContext';
import { TxPollContextProvider } from './contexts/TxPollContext';

import TxInfoModal from './modals/TxInfoModal';
import BaseRouter from './routers/baseRouter';

function App() {
  return (
    <TxPollContextProvider>
      <TxInfoModal />
      <DaoProvider>
        <BaseRouter />
      </DaoProvider>
    </TxPollContextProvider>
  );
}

export default App;
