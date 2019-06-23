/*
* @Author: Zihao Tao
* @Date:   2019-06-21 13:28:22
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2019-06-22 00:10:37
*/
import axios from 'axios';

const USER_LIST = 'USER_LIST';

const initState = {
  userlist: []
}

export function chatuser(state = initState, action) {
  switch(action.type) {
    case USER_LIST:
      return {...state, userlist: action.payload};
    default:
      return state;
  }
}

export function getUserList(type) {
  return dispatch => {
    axios.get(`/user/list?type=${type}`)
         .then(res => {
          if(res.status === 200 && res.data.code === 0) {
            dispatch(userList(res.data.data));
          }
         });  
  }
}

function userList(data) {
  return {type: USER_LIST, payload: data};
}

