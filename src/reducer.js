/*
* @Author: Zihao Tao
* @Date:   2019-06-19 15:44:35
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2019-06-22 00:14:22
*/
import { combineReducers } from 'redux';
import { user } from './redux/user.redux'
import { chatuser } from './redux/chatuser.redux';
import { chat } from './redux/chat.redux';

export default combineReducers({ user, chatuser, chat }); 