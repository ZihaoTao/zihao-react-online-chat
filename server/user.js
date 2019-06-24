/*
* @Author: Zihao Tao
* @Date:   2019-06-19 20:55:55
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2019-06-24 11:39:04
*/
const express = require('express');
const utils = require('utility');
const Router = express.Router();
const models = require('./model');
const User = models.getModel('user');
const Chat = models.getModel('chat');

const _filter = {pwd: 0, __v: 0};

// find all users based on type of user
Router.get('/list', (req, res) => {
  const type = req.query.type;
  User.find({type}, (err,doc) => {
    return res.json({code:0, data:doc});  
  }) 
});

// get cookie and user id from login checking
Router.get('/info', (req, res) => {
  // cookie
  const {userid} = req.cookies;
  if(!userid) return res.json({code:1});
  User.findOne({_id: userid}, _filter, (err, doc) => {
    if(err) {
      return res.json({code: 1, msg: 'Error!'});
    } 
    if(doc) {
      return res.json({code: 0, data: doc});
    }
  })
});

Router.get('/getmsgList', (req, res) => {
  const user = req.cookies.userid;

  User.find({}, (err, doc) => {
    let users = {};
    doc.forEach(v => {
      users[v._id] = {name: v.user, avatar: v.avatar}
    });
    Chat.find({$or:[{from: user}, {to: user}]}, (err, doc) => {
      if(!err) {
        return res.json({code: 0, msgs: doc, users: users});
      } else {
        return res.json({code: 1, msg: 'Error!'}); 
      }
    });
  })
})

// create new user data based on username, pwd and type of user
Router.post('/register', (req, res) => {
  const {user, pwd, type} = req.body;
  User.findOne({user}, (err, doc) => {
    if(doc) {
      return res.json({code: 1, msg:'User exists'});
    } else {
      const userModel = new User({user, pwd:md5Pwd(pwd), type});
      userModel.save((err, doc) => {
        if(err) {
          return res.json({code: 1, msg: 'Error!'});
        } else {
          const {user, type, _id} = doc;
          res.cookie('userid', _id);
          return res.json({code: 0, data: {user, type, _id}});
        }
      })
    }
  });
});

// find user data based on pwd and username
Router.post('/login', (req, res) => {
  const {user, pwd} = req.body;
  User.findOne({user, pwd:md5Pwd(pwd)}, _filter, (err, doc) => {
    if(!doc) {
      return res.json({code: 1, msg:'Wrong username or password'});
    } else {
      res.cookie('userid', doc._id);
      return res.json({code: 0, data: doc});
    }
  });
});

// update info
Router.post('/update', (req, res) => {
  const userid = req.cookies.userid;
  if(!userid) return json.dumps({code: 1});
  const body = req.body;
  User.findByIdAndUpdate(userid, body, (err, doc) => {
    const data = Object.assign({}, {
      user: doc.user,
      type: doc.type
    }, body);
    return res.json({code: 0, data});
  })
});

Router.post('/readmsg', (req, res) => {
  const userid = req.cookies.userid;
  const {from} = req.body;
  Chat.update({from:from, to:userid}, {$set: {read:true}}, {multi:true}, (err, doc) => {
    if(!err) {
      return res.json({code:0, num:doc.nModified})
    } else {
      return res.json({code: 1, msg: 'Error!'}); 
    }
  })
});

function md5Pwd(pwd) {
  const salt = 'zihao_salt_value_!!@#$@!';
  return utils.md5(utils.md5(pwd + salt));
}

module.exports = Router;