/*
* @Author: Zihao Tao
* @Date:   2019-06-21 15:36:59
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2019-06-21 15:50:58
*/
import React from 'react';
import { connect } from 'react-redux';

import UserCard from '../usercard/usercard';
import { getUserList } from '../../redux/chatuser.redux';

@connect(
  state => state.chatuser,
  { getUserList }
)

class Employee extends React.Component {
  componentDidMount() {
    this.props.getUserList('Employer');
  }
  render() {
    return <UserCard userlist={this.props.userlist}></UserCard>;
  }
}

export default Employee;