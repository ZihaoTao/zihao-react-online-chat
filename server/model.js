/*
* @Author: Zihao Tao
* @Date:   2019-06-19 20:59:56
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2019-06-22 17:34:46
*/
const mongoose = require('mongoose');
const DB_URL = 'mongodb://127.0.0.1:27017/chat';
mongoose.connect(DB_URL);

const models = {
  user: {
    'user':    {'type': String, 'require': true},
    'pwd':     {'type': String, 'require': true},
    'type':    {'type': String, 'require': true},
    // avatar
    'avatar':  {'type': String},
    //resume
    'desc':    {'type': String},
    // career position
    'title':   {'type': String},
    // for employer
    'company': {'type': String},
    'money':   {'type': String}
  },
  chat: {
    'chatid': {type:String, require: true},
    'from': {type:String, require: true},
    'to': {type:String, require: true},
    'read':{type:Boolean, default: false},
    'content': {type:String, default:''},
    'creat_time':{type:Date, default: Date.now}
  }
}

for(let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]));
}

module.exports = {
  getModel: (name) => {
    return mongoose.model(name);
  }
};