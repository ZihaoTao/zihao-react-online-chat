/*
* @Author: Zihao Tao
* @Date:   2019-06-21 16:07:57
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2019-06-21 18:43:10
*/
import React from 'react';
import { connect } from 'react-redux';
import { WhiteSpace, Result, List, Modal, TextareaItem } from 'antd-mobile';
import browserCookies from 'browser-cookies';
import { Redirect } from 'react-router-dom';
import { logoutSubmit } from '../../redux/user.redux';
import { updateInfo } from '../../redux/user.redux';

@connect(
  state=>state.user,
  {logoutSubmit, updateInfo}
)

class User extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state={};
    this.onChange = this.onChange.bind(this);
    this.logout = this.logout.bind(this);
    this.update = this.update.bind(this);
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

  update() {
    const alert = Modal.alert;
    alert('Update Info', '', [
        {text: 'Cancel', onPress: () => {console.log('canel')}},
        {text: 'Ok', onPress: () => {
          this.props.updateInfo(this.state);
        }}
      ]);
  }

  onChange(key, val) {
    this.setState({
      [key]: val
    });
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
            <div>Position: <TextareaItem autoHeight defaultValue={props.title} onChange={(v)=>this.onChange('title', v)}></TextareaItem></div>
            <div>Desc: <TextareaItem autoHeight defaultValue={props.desc} onChange={(v)=>this.onChange('desc', v)}></TextareaItem></div>
            {this.props.type === 'Employer' ? (<div>Company: <TextareaItem autoHeight defaultValue={props.company} onChange={(v)=>this.onChange('company', v)}></TextareaItem></div>) : null}
            {this.props.type === 'Employer' ? (<div>Salary: <TextareaItem autoHeight defaultValue={props.money} onChange={(v)=>this.onChange('money', v)}></TextareaItem></div>) : null}
          </List.Item>
        </List>
        <WhiteSpace></WhiteSpace>
        <List>
          <List.Item onClick={this.update}>
            Update Info
          </List.Item>
        </List>
        <List>
          <List.Item onClick={this.logout}>
            Log Out
          </List.Item>
        </List>
      
      </div>) : <Redirect to={this.props.redirectTo} />;
  }
}

export default User;