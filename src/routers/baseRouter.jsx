import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
// import Dao from '../pages/Dao';
import FourOhFour from '../pages/404';
import MyCocktails from '../pages/MyCocktails';

const BaseRouter = () => {
  return (
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route exact path='/cocktails'>
        <MyCocktails />
      </Route>
      <Route path='*' component={FourOhFour} />
    </Switch>
  );
};

export default BaseRouter;
