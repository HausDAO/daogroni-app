import React from 'react';

import { DaoProvider } from '../contexts/DaoContext';
import DaoRouter from '../routers/daoRouter';
import Modal from '../modals/modal';
import { daogroniData } from '../utils/chain';

const Dao = () => {
  const { daoid } = daogroniData;

  return (
    <DaoProvider key={daoid}>
      <DaoRouter />
      <Modal />
    </DaoProvider>
  );
};

export default Dao;
