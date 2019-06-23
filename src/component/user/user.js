/*
* @Author: Zihao Tao
* @Date:   2019-06-21 16:07:57
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2019-06-21 18:43:10
*/
import React from 'react';
import { connect } from 'react-redux';
import { WhiteSpace, Result, List, Modal } from 'antd-mobile';
import browserCookies from 'browser-cookies';
import { Redirect } from 'react-router-dom';
import { logoutSubmit } from '../../redux/user.redux';
@connect(
  state=>state.user,
  {logoutSubmit}
)

class User extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    const alert = Modal.alert;
    alert('Log Out', '', [
        {text: 'Cancel', onPress: () => {console.log('canel')}},
        {text: 'Ok', onPress: () => {
          browserCookies.erase('userid');
          this.props.logoutSubmit();
        }}
      ]);
  }

  render() {
    const props = this.props;
    return props.user ? (
      <div>
        <Result 
          img={<img src={require(`../img/${props.avatar}.png`)} style={{width:50}} alt="img"/>}
          title={props.user}
          message= {props.type === 'Employer' ? props.company : null}
        /> 
        <List renderHeader={()=>'Resume'}>
          <List.Item multipleLine>
            {props.title}
            {props.desc.split('\n').map(v=>(<List.Item.Brief key={v}>{v}</List.Item.Brief>))}
            {props.money ? <List.Item.Brief>props.money</List.Item.Brief> : null}
          </List.Item>
        </List>
        <WhiteSpace></WhiteSpace>
        <List>
          <List.Item onClick={this.logout}>
            Log Out
          </List.Item>
        </List>
      
      </div>) : <Redirect to={this.props.redirectTo} />;
  }
}

export default User;