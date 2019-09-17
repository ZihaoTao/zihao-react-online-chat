/*
* @Author: Zihao Tao
* @Date:   2019-06-21 15:41:29
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2019-06-22 01:46:32
*/
import React from 'react';
import PropType from 'prop-types';
import { WhiteSpace, WingBlank, Card } from 'antd-mobile';
import { withRouter } from 'react-router-dom'

const generate = require('string-to-color');
@withRouter
class UserCard extends React.Component {
  static PropType = {
    userlist: PropType.array.isRequired
  }

  handleClick(v) {
    this.props.history.push(`/chat/${v._id}`);
  }

  render() {
    return (
      <div>
        <WingBlank>
            <WhiteSpace></WhiteSpace>
              {this.props.userlist.map(v=>(
                v.avatar ?
                <Card 
                  key={v._id} 
                  onClick={()=>this.handleClick(v)}
                  style={{margin:'10px'}}
                >
                  <Card.Header
                    title={v.user}
                    thumb={<div className="card-thumb" style={{background: generate(v.user)}}>{v.user.charAt(0)}</div>}
                    extra={<span>{v.title}</span>}
                  ></Card.Header>
                  <Card.Body>
                    {v.type === 'Employer' ? <div> Company: {v.company} </div> : null}
                    {v.desc.split('\n').map(d=>(<div key={d}> {d} </div>))}
                    {v.type === 'Employer' ? <div> Salary: {v.money} </div> : null}
                  </Card.Body>
                </Card> : null
              ))}
        </WingBlank>
      </div>);
  }
}

export default UserCard;