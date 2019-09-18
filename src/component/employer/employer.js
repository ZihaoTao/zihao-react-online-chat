/*
* @Author: Zihao Tao
* @Date:   2019-06-21 12:54:20
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2019-06-21 15:51:42
*/
import React from 'react';
import { connect } from 'react-redux';

import UserCard from '../usercard/usercard';
import { getUserList } from '../../redux/chatuser.redux';

@connect(
  state => state.chatuser,
  { getUserList }
)

class Employer extends React.PureComponent {
  componentDidMount() {
    this.props.getUserList('Employee');
  }
  render() {
    return <UserCard userlist={this.props.userlist}></UserCard>;
  }
}

export default Employer;