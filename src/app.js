/*
* @Author: Zihao Tao
* @Date:   2019-06-24 01:21:29
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2019-06-24 01:28:04
*/
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './container/login/login';
import Register from './container/register/register';
import EmployerInfo from './container/employerinfo/employerinfo';
import EmployeeInfo from './container/employeeinfo/employeeinfo';
import DashBoard from './component/dashboard/dashboard';
import Chat from './component/chat/chat'
import AuthRoute from './component/auth-route/auth-route';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    }
  }
  
  componentDidCatch(err, info) {
    console.log(err, info);
    this.setState({
      hasError: true
    })
  }

  render() {
    return this.state.hasError ? <h2>Error !!!</h2> : (
      <div id="app">
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
    );
  }
}

export default App;