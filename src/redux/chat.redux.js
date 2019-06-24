/*
* @Author: Zihao Tao
* @Date:   2019-06-22 00:03:36
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2019-06-24 02:43:54
*/
import axios from 'axios';
import io from 'socket.io-client';

const MSG_LIST = 'MSG_LIST';
const MSG_RECV = 'MSG_RECV';
const MSG_READ = 'MSG_READ';

const socket = io('ws://47.254.23.123:9093');

const initState = {
  chatmsg:[],
  users:{},
  unread:0
}

export function chat(state=initState, action) {
  switch(action.type) {
    case MSG_LIST:
      return {...state, chatmsg: action.payload.msgs, 
        unread: action.payload.msgs.filter(v=>!v.read && v.to === action.payload.userid).length, 
        users: action.payload.users};
    case MSG_RECV:
    const n = action.payload.msg.to === action.payload.userid ? 1 : 0;
      return {...state, 
        chatmsg: [...state.chatmsg, action.payload.msg], 
        unread: state.unread + n};
    case MSG_READ:
      const {from, num} = action.payload;
      return {...state, 
        chatmsg:state.chatmsg.map(v => ({
          ...v, read: from === v.from ? true : v.read
        })), unread: state.unread - num}
      
    default:
      return state; 
  }
}

export function getMessageList() {
  return (dispatch, getState) => {
    axios.get('/user/getmsglist')
         .then(res => {
           if (res.status === 200 && res.data.code === 0) {
             const userid = getState().user._id;
             dispatch(msgList(res.data.msgs, res.data.users, userid));
           }
         })
  }
}

export function sendMsg(from, to, msg) {
  return dispatch => {
    socket.emit('sendmsg', {from, to, msg});
  }
}

export function recvMsg() {
  return (dispatch, getState) => {
    socket.on('recvmsg', (data) => {
      const userid = getState().user._id;
      dispatch(msgRecv(data, userid));
    })
  }
}

export function readMsg(from) {
  return (dispatch, getState) => {
    axios.post('/user/readmsg', {from})
         .then(res => {
           if (res.status === 200 && res.data.code === 0) {
              const userid = getState().user._id;
              dispatch(msgRead({from, userid, num: res.data.num}));
           }
         });
  }
}

function msgList(msgs, users, userid) {
  return {type: MSG_LIST, payload: {msgs, users, userid}};
}

function msgRecv(msg, userid) {
  return {type: MSG_RECV, payload: {msg, userid}}
}

function msgRead({from, to, num}) {
  return {type: MSG_READ, payload: {from, to, num}}
}

