/*
* @Author: Zihao Tao
* @Date:   2019-06-22 15:12:43
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2019-06-22 20:55:40
*/
import React from 'react';
import { List, Badge } from 'antd-mobile';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

@withRouter
@connect(
  state=>state
)
class Msg extends React.Component {
  getLast(arr) {
    return arr[arr.length - 1];
  }
  render() {
    const msgGroup = {};
    const userid = this.props.user._id;
    this.props.chat.chatmsg.forEach(v=>{
      msgGroup[v.chatid] = msgGroup[v.chatid] || [];
      msgGroup[v.chatid].push(v);
    })
    const chatList = Object.values(msgGroup).sort((a, b) => {
      const dateA = new Date(this.getLast(a).creat_time).getTime();
      const dateB = new Date(this.getLast(b).creat_time).getTime();
      return dateB - dateA;
    });
    
    return (
      chatList.map(v=>{
        const last = this.getLast(v);
        const unreadNum = v.filter(v=>!v.read && v.to===userid).length;
        const targetId = userid === last.from ? last.to : last.from;
        return (
          <List key={last._id} style={{marginBottom:'20px'}}>
            <List.Item 
              extra={<Badge text={unreadNum}></Badge>}
              thumb={require(`../img/${this.props.chat.users[targetId].avatar}.png`)}
              arrow='horizontal'
              onClick={()=>{
                this.props.history.push(`/chat/${targetId}`);
              }}
            > 
              {last.content}
              <List.Item.Brief>
                {this.props.chat.users[targetId].name}
              </List.Item.Brief>
            </List.Item>
          </List>
        )
      })
    );
  }
}

export default Msg;