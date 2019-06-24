/*
* @Author: Zihao Tao
* @Date:   2019-06-18 22:25:59
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2019-06-24 01:24:25
*/
import React from 'react';
import ReactDom from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter } from 'react-router-dom';

import reducer from './reducer';
import App from './app';
import './index.css';
import './config';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunk)
  ));

ReactDom.render(
  (<Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>), 
  document.getElementById('root')
);



