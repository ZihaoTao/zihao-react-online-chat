/*
* @Author: Zihao Tao
* @Date:   2019-06-19 20:03:08
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2019-06-21 19:27:46
*/
import React from 'react';
import { connect } from 'react-redux';
import { List, InputItem, WingBlank, Radio, WhiteSpace, Button } from 'antd-mobile';
import { Redirect } from 'react-router-dom';

import { register } from '../../redux/user.redux';
import Logo from '../../component/logo/logo';
import formWrapper from '../../component/formwrapper/formwrapper';

@connect(
  state=>state.user,
  { register }
)

@formWrapper
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  componentDidMount() {
    this.props.handleChange('type', 'Employee');
  }

  handleRegister() {
    this.props.register(this.props.state);
  }

  cancel() {
    this.props.history.push('/login');
  }

  render() {
    const RadioItem = Radio.RadioItem;
    return(
      <div>
      {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
        <Logo></Logo>
        {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
        <WingBlank>
          <List>
            <InputItem
              onChange={v=>this.props.handleChange('user', v)}
            >User Name</InputItem>
            <WhiteSpace />
            <InputItem
              type='password'
              onChange={v=>this.props.handleChange('pwd', v)}
            >Password</InputItem>
            <WhiteSpace />
            <InputItem
              type='password'
              onChange={v=>this.props.handleChange('repeatpwd', v)}
            >Confirm</InputItem>
            <WhiteSpace />
            <RadioItem 
              checked={this.props.state.type === 'Employer'}
              onChange={()=>this.props.handleChange('type', 'Employer')}
            >Employer</RadioItem>
            <WhiteSpace />
            <RadioItem 
              checked={this.props.state.type === 'Employee'}
              onChange={()=>this.props.handleChange('type', 'Employee')}
            >Employee</RadioItem>
          </List>
          <WhiteSpace />
          <Button type='primary' onClick={this.handleRegister}>Register</Button>
          <Button  onClick={this.cancel}>Cancel</Button>
        </WingBlank>
      </div>
    );
  }
}

export default Register;