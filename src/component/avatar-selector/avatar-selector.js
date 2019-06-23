/*
* @Author: Zihao Tao
* @Date:   2019-06-20 22:20:35
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2019-06-21 00:44:44
*/
import React from 'react';
import { Grid, List } from 'antd-mobile';
import PropTypes from 'prop-types';

class AvatarSelector extends React.Component {
  // set the type of selectAvatar
  static propTypes = {
    selectAvatar: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const avatarList = 'User,Male,Andorian,Person,Female,Ninja'.split(',')
                                      .map(v=>({
                                        icon: require(`../img/${v}.png`),
                                        text: v
                                      }));
    const gridHeader = this.state.text ? (<div>
                                            <span>Picture selected:</span>
                                            <img style={{width:20}} 
                                                 src={this.state.icon} 
                                                 alt="pic"/>
                                          </div>) : 
                                          (<div>
                                            <p>Please select a picture:</p>
                                          </div>);
    return (
      <div >
        <List renderHeader={()=>gridHeader}></List>
        <Grid 
          data={avatarList} 
          columnNum={3}
          // sub-component send data to component
          onClick={ele => {
            this.setState(ele);
            this.props.selectAvatar(ele.text);
          }}
        />
      </div>
    );
  }
}

export default AvatarSelector;