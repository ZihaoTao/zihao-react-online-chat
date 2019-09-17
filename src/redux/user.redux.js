/*
* @Author: Zihao Tao
* @Date:   2019-06-20 11:40:04
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2019-06-29 10:50:21
*/
import axios from 'axios';

import { getRedirectPath } from '../util'; 

const AUTH_SUCCESS = 'AUTH_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOAD_DATA = 'LOAD_DATA';
const LOGOUT = 'LOGOUT';
const ERASE = 'ERASE';

const initState = {
  redirectTo: '',
  msg:'',
  user: '',
  type: ''
}

//reducer
export function user(state = initState, action) {
  switch(action.type) {
    case AUTH_SUCCESS:
      return {...state, msg: '', redirectTo: getRedirectPath(action.payload), isAuth: true, ...action.payload};
    case LOAD_DATA:
      return {...state, isAuth: true, ...action.payload};
    case ERROR_MSG:
      return {...state, isAuth: false, msg: action.msg};
    case LOGOUT: 
      return {...initState, redirectTo: '/login'};
    case ERASE:
      return {...initState};
    default:
      return state;
  } 
}


// action creator
export function register({user, pwd, repeatpwd, type}) {
  if(!user || !pwd || !type) {
    return errorMsg('Please input username and password');
  }
  if(pwd !== repeatpwd) {
    return errorMsg('Password and confirmation are different');
  }
  return dispatch => {
    // send post request
    axios.post('/user/register', {user, pwd, type})
        .then(res => {
          if(res.status === 200 && res.data.code === 0) {
            dispatch(authSuccess(res.data.data));
          } else {
            dispatch(errorMsg(res.data.msg));
          }
        });
  }
}

export function login({user, pwd}) {
  if(!user || !pwd) {
    return errorMsg('Please input username and password');
  }
  return dispatch => {
    // send post request
    axios.post('/user/login', {user, pwd})
        .then(res => {
          if(res.status === 200 && res.data.code === 0) {
            dispatch(authSuccess(res.data.data));
          } else {
            dispatch(errorMsg(res.data.msg));
          }
        });
  }
}

export function loadData(data) {
  return {type: LOAD_DATA, payload: data};
}


export function update(data) {
  const path = this.location.pathname;
  const {title, company, money, desc, avatar} = data;
  if(!avatar) {
    return errorMsg('Please select a picture');
  }

  if(path === '/employerinfo' && (!title || !company || !money || !desc)) {
    return errorMsg('Please complete your profile');
  }

  if(path === '/employeeinfo' && (!title || !desc)) {
    return errorMsg('Please complete your profile');
  }

  return dispatch => {
    axios.post('/user/update', data)
         .then(res => {
           if(res.status === 200 && res.data.code === 0) {
             dispatch(authSuccess(res.data.data));
           } else {
             dispatch(errorMsg(res.data.msg));
           }
         })
  }
}

export function updateInfo(data) {
  return dispatch => {
    axios.post('/user/update', data)
         .then(res => {
           if(res.status === 200 && res.data.code === 0) {
             dispatch(authSuccess(res.data.data));
           } else {
             dispatch(errorMsg(res.data.msg));
           }
         })
  }
}

export function logoutSubmit() {
  return {type: LOGOUT};
}

export function erasePath() {
  return {type: ERASE};
}

function errorMsg(msg) {
  return {type: ERROR_MSG, msg: msg};
}

function authSuccess(data) {
  return {type: AUTH_SUCCESS, payload: data};
}



