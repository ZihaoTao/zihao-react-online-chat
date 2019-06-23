/*
* @Author: Zihao Tao
* @Date:   2019-06-21 22:01:29
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2019-06-22 21:45:22
*/
import React from 'react';
import {NavBar, List, InputItem, Icon, Grid } from 'antd-mobile';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { getChatId } from '../../util'

import { getMessageList, sendMsg, recvMsg, readMsg } from '../../redux/chat.redux';

const socket = io('ws://localhost:9093');

@connect(
  state => state,
  { getMessageList, sendMsg, recvMsg, readMsg }
)

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      text:'',
      showEmoji: false
    }
  }

  componentDidMount() {
    if(!this.props.chat.chatmsg.length) {
      this.props.getMessageList();
      this.props.recvMsg();
    }
  }

  componentWillUnmount() {
    const to = this.props.match.params.user;
    this.props.readMsg(to);
  }

  fixCarousel() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 0);
  }

  hangleSubmit() {
    this.setState({text: ''});
    // to, from, content
    const from = this.props.user._id;
    const to = this.props.match.params.user;
    const content = this.state.text;
    this.props.sendMsg(from, to, content);
  }

  render() {
    const emoji = '😀 😄 😆 😂 😊 ☺️ 😜 🤨 😐 😶 😏 😒 🙄 😬 😌 😔 😷 😕 😳 😥 😱 😭 😡 😠 😲 🙏 👋 👏 🙈 🙉 🙉 🐵 🐶 🦊 🐱 🐯 🐷 🐹 🐰 🐻 🐨 🐼'
                  .split(' ')
                  .filter(v=>v)
                  .map(v=>({text: v}));
    const userid = this.props.match.params.user;
    const users = this.props.chat.users;
    if(!users[userid]) {
      return null;
    }
    const chatid = getChatId(userid, this.props.user._id);
    const chatmsgs = this.props.chat.chatmsg.filter(v => v.chatid === chatid);
    return (
      <div id='chat-page'>
        <NavBar 
          mode='dark' 
          icon={<Icon type='left'/>} 
          leftContent='Back' 
          onLeftClick={()=>{this.props.history.goBack()}}
        >
          {users[userid].name}
        </NavBar>
        {chatmsgs.map(v=>{
          const avatar = require(`../img/${users[v.from].avatar}.png`);
          return v.from === userid ?
            <List key={v._id}>
              <List.Item thumb={avatar}>
                {v.content}
              </List.Item>
            </List>
            :
            <List key={v._id}>
              <List.Item className='chat-me' extra={<img src={avatar} alt="pic"/>}>
                {v.content}
              </List.Item>
            </List>
        })}
        <div className="stick-footer">
          <List>
            <InputItem
              placeholder='Please Input your Message'
              value={this.state.text}
              onChange={v=>this.setState({text: v})}
              extra={
                <div>
                <span
                  style={{marginRight:10}}
                  onClick={()=>{
                    this.setState({showEmoji:!this.state.showEmoji});
                    this.fixCarousel();
                  }}
                  role='img'
                  aria-label='Smile'
                >😀</span>
                <span onClick={() => this.hangleSubmit()}>Send</span>
                </div>
              }
            >
            </InputItem>
          </List>
          {this.state.showEmoji ? <Grid 
            data={emoji}
            columnNum={7}
            carouselMaxRow={3}
            isCarousel={true}
            onClick={el=>{
              this.setState({text: this.state.text + el.text})
            }}
          ></Grid> : null
          }
        </div>
      </div>
    );
  }
}

export default Chat;