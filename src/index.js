/*
* @Author: Zihao Tao
* @Date:   2019-06-18 22:25:59
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2019-06-23 02:49:53
*/
import React from 'react';
import ReactDom from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import reducer from './reducer';
import Login from './container/login/login';
import Register from './container/register/register';
import EmployerInfo from './container/employerinfo/employerinfo';
import EmployeeInfo from './container/employeeinfo/employeeinfo';
import DashBoard from './component/dashboard/dashboard';
import Chat from './component/chat/chat'
import AuthRoute from './component/auth-route/auth-route';

import './index.css';
import './config';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunk)
  ));

ReactDom.render(
  (<Provider store={store}>
    <BrowserRouter>
      <div>
        <AuthRoute></AuthRoute>
        <Switch>
          <Route path='/login' component={Login}></Route>
          <Route path='/employerinfo' component={EmployerInfo}></Route>
          <Route path='/employeeinfo' component={EmployeeInfo}></Route>
          <Route path='/register' component={Register}></Route>
          <Route path='/chat/:user' component={Chat}></Route>
          <Route component={DashBoard}></Route>
        </Switch>
        
      </div>
    </BrowserRouter>
  </Provider>), 
  document.getElementById('root')
);



