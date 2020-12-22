import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';


import { configureClient } from './api/client';
import storage from './utils/storage';
import App, { Root } from './components/App';
import { configureStore } from './store';
// Read token from storage
import './index.css';

const { token: auth } = storage.get('auth') || { token: null };

// Configure api client
configureClient(auth);

const history = createBrowserHistory();
const store = configureStore({ auth }, { history });

ReactDOM.render(
  <Root store={store} history={history}>
    <App />
  </Root>,
  document.getElementById('root'),
);
