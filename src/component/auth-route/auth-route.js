/*
* @Author: Zihao Tao
* @Date:   2019-06-19 20:51:21
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2019-06-23 02:29:48
*/
import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom'

import { loadData } from '../../redux/user.redux';

@withRouter
@connect(
  state => state.user,
  {loadData}
)
class AuthRoute extends React.Component {
  componentDidMount() {
    const publicList = ['/login', '/register'];
    const pathname = this.props.location.pathname;
    if(publicList.indexOf(pathname) > -1) {
      return null;
    }
      // user info
  
    axios.get('/user/info')
        .then(res => {
          if(res.status === 200) {
            if(res.data.code === 0) {
              this.props.loadData(res.data.data);
            } else {
              this.props.history.push('/');
            }
          }
        });
  
    // user status

    // user type

    // user profile complete
  }
  render() {
    return null;
  }
  
}

export default AuthRoute;