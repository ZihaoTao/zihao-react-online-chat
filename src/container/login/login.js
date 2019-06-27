/*
* @Author: Zihao Tao
* @Date:   2019-06-19 19:57:20
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2019-06-27 14:06:50
*/
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile';

import Logo from '../../component/logo/logo';
import { login } from '../../redux/user.redux';
import formWrapper from '../../component/formwrapper/formwrapper';

@connect(
  state=>state.user,
  { login }
)
@formWrapper
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.register = this.register.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  register() { 
    this.props.history.push('/register');
  }

  handleLogin() {
    this.props.login(this.props.state);
  }

  render() {
    return(
      <div>
        {this.props.redirectTo && this.props.redirectTo !== '/login' ? <Redirect to={this.props.redirectTo} /> : null}
        <Logo></Logo>
        {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
        <WingBlank>
          <List>
            <InputItem 
              onChange={v => this.props.handleChange('user', v)}
            >User Name</InputItem>
            <WhiteSpace />
            <InputItem
              type='password'
              onChange={v => this.props.handleChange('pwd', v)}
            >Password</InputItem>
          </List>
          <WhiteSpace />
          <Button type='primary' onClick={this.handleLogin}>Login</Button>
          <WhiteSpace />
          <Button  onClick={this.register}>Register</Button>
        </WingBlank>
      </div>
    );
  }
}

export default Login;