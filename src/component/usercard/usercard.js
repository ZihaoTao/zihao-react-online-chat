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
              >
                <Card.Header
                  title={v.user}
                  thumb={require(`../img/${v.avatar}.png`)}
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