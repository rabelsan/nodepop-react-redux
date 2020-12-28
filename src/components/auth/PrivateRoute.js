import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

import { getLoggedUserToken } from '../../store/selectors';

const PrivateRoute = ({loggedUserToken, ...props }) => {
  return loggedUserToken ? <Route {...props} /> : <Redirect to="/login" />;
};

export default connect(state => ({ loggedUserToken: getLoggedUserToken(state) }))(
  PrivateRoute
);

