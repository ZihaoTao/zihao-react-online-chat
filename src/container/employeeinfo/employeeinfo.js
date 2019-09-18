/*
* @Author: Zihao Tao
* @Date:   2019-06-21 00:14:22
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2019-06-27 14:11:43
*/

import React from 'react';
import { List, WhiteSpace, NavBar, InputItem, TextareaItem, Button } from 'antd-mobile';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import AvatarSelector from '../../component/avatar-selector/avatar-selector';
import { update } from '../../redux/user.redux';

@connect(
  state=>state.user,
  {update}
)

class EmployeeInfo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      desc: ''
    }
  } 

  onChange(key, val) {
    this.setState({
      [key]: val
    });
  }
  render() {
    const path = this.props.location.pathname;
    const redirectTo = this.props.redirectTo;
    return (
      <div>
        {redirectTo && redirectTo !== path ? <Redirect to={redirectTo} /> : null}
        <NavBar mode='dark'>Please complete your profile</NavBar>
        <AvatarSelector selectAvatar={(img) => {
          this.setState({avatar: img});
        }}></AvatarSelector>
        <WhiteSpace/>
        <List>
        {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
        <InputItem onChange={v=>this.onChange('title', v)}>
          Position:
        </InputItem>
        <WhiteSpace/>
        <TextareaItem 
          rows={3} 
          title='Statememt:'
          onChange={v=>this.onChange('desc', v)}>
        </TextareaItem>
        </List>
        <WhiteSpace/>
        <Button 
          onClick={()=>{
            this.props.update(this.state);
          }}
          type='primary'>Save Profile</Button>
      </div>
    );
  }
}

export default EmployeeInfo;