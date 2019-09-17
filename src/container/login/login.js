/*
* @Author: Zihao Tao
* @Date:   2019-06-19 19:57:20
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2019-06-29 11:33:25
*/
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile';

import Logo from '../../component/logo/logo';
import { login, erasePath } from '../../redux/user.redux';
import formWrapper from '../../component/formwrapper/formwrapper';

@connect(
  state=>state.user,
  { login, erasePath }
)
@formWrapper
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.register = this.register.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
    this.props.erasePath();
  }

  register() { 
    this.props.history.push('/register');
  }

  handleLogin() {
    this.props.login(this.props.state);
  }

  render() {
    return(
      <div style={{background:'white', padding:'20px', height:'100%'}}>
        {this.props.redirectTo && this.props.redirectTo !== '/login' ? <Redirect to={this.props.redirectTo} /> : null}
        <Logo></Logo>
        <div id="title">Job Chat</div>
        <pre className='welcome'>
          Here is the account for test:<br/>
          &nbsp;&nbsp;&nbsp;username: test<br/>
          &nbsp;&nbsp;&nbsp;password: test
        </pre>
        {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
        <WingBlank>
          <List style={{width:"60%", margin:"20px auto"}}>
            <InputItem 
              onChange={v => this.props.handleChange('user', v)}
            >Username</InputItem>
            <WhiteSpace />
            <InputItem
              type='password'
              onChange={v => this.props.handleChange('pwd', v)}
            >Password</InputItem>
          </List>
          <WhiteSpace />
          <Button type='primary' onClick={this.handleLogin} style={{width:"60%", margin:"auto"}}>Login</Button>
          <WhiteSpace />
          <Button  onClick={this.register} style={{width:"60%", margin:"auto"}}>Register</Button>
        </WingBlank>
      </div>
    );
  }
}

export default Login;