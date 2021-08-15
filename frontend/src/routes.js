import React from 'react';

import { Route, Switch } from 'react-router-dom';

import HomePage from './Pages/HomePage';
import NotFoundPage from './Pages/NotFoundPage';
import ProfilePage from './Pages/ProfilePage';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/profile" component={ProfilePage} />
      <Route path="/*" component={NotFoundPage} />
    </Switch>
  );
};

export default Routes;
