/*
* @Author: Zihao Tao
* @Date:   2019-06-18 17:37:19
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2019-06-24 11:33:30
*/

const express = require('express');
const userRouter = require('./user');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const models = require('./model');
const Chat = models.getModel('chat');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const path = require('path');

io.on('connection', (socket) => {
  socket.on('sendmsg', (data) => {
    const {from, to, msg} = data;
    const chatid = [from, to].sort().join('_');
    Chat.create({chatid, from, to, content:msg}, (err, doc) => {
      io.emit('recvmsg', Object.assign({}, doc._doc));
    });
  })
})

app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user', userRouter);

//connect to mongodb
// use collction 'zihao'
app.use((req, res, next) => {
  if(req.url.startsWith('/user/') || req.url.startsWith('/static/')) {
    return next();
  }
  return res.sendFile(path.resolve('build/index.html'));
})
app.use('/', express.static(path.resolve('build')));


server.listen(9093, () => {
  console.log('Node app start at port 9093');
});