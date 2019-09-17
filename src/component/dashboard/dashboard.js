/*
* @Author: Zihao Tao
* @Date:   2019-06-21 01:01:07
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2019-06-24 02:14:49
*/
import React from 'react';
import { NavBar } from 'antd-mobile';
import QueueAnim from 'rc-queue-anim';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import NavLinkBar from '../navlink/navlink';
import Employer from '../employer/employer';
import Employee from '../employee/employee';
import User from '../user/user';
import Msg from '../msg/msg';
import { getMessageList, recvMsg } from '../../redux/chat.redux';

@connect(
  state => state,
  { getMessageList, recvMsg }
)

class DashBoard extends React.Component {
  componentDidMount() {
    if(!this.props.chat.chatmsg.length) {
      this.props.getMessageList();
      this.props.recvMsg();
    }
  }

  render() {
    const user = this.props.user;
    const {pathname} = this.props.location;
    const navList = [
      {
        path: '/employer',
        text: 'Employee',
        icon: 'Employee',
        title: 'Employee List',
        component: Employer,
        hide: user.type === 'Employee'
      }, 
      {
        path: '/employee',
        text: 'Employer',
        icon: 'Boss',
        title: 'Employer List',
        component: Employee,
        hide: user.type === 'Employer'
      }, 
      {
        path: '/msg',
        text: 'Message',
        icon: 'Message',
        title: 'Message List',
        component: Msg
      },
      {
        path: '/me',
        text: 'Me',
        icon: 'Me',
        title: 'Profile',
        component: User
      }
    ];
  
    const page = navList.find(v=>v.path===pathname);
    return page ? (
      <div>
        <NavBar className='fixed-header' mode='dard'>
          {page.title}
        </NavBar>
        <NavLinkBar data={navList}></NavLinkBar>
        <div id="dashboard">
          <QueueAnim  delay={300}>
            <Route key={page.path} path={page.path} component={page.component}></Route>
          </QueueAnim>
        </div>
      </div>
    ) : <Redirect to='/me'></Redirect>;
  }
}

export default DashBoard;