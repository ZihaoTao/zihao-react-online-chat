/*
* @Author: Zihao Tao
* @Date:   2019-06-20 22:20:35
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2019-06-27 14:14:03
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
    const avatarList = 'User,Male,Andorian,Person,Female,Ninja,1,2,3'.split(',')
                                      .map(v=>({
                                        icon: require(`../img/${v}.png`),
                                        t:v
                                      }));
    const gridHeader = this.state.t ? (<div>
                                            <p style={{lineHeight: 3}}>Picture selected:
                                              <img style={{width:'25px', marginLeft:'10px'}} 
                                                   src={this.state.icon} 
                                                   alt="pic"/>
                                            </p>
                                          </div>) : 
                                          (<div>
                                            <p style={{lineHeight: 3}}>Please select a picture:</p>
                                          </div>);
    return (
      <div style={{margin: '30px'}}>
        <List renderHeader={()=>gridHeader}></List>
        <Grid 
          className='grid'
          data={avatarList} 
          columnNum={3}
          // sub-component send data to component
          onClick={ele => {
            this.setState(ele);
            this.props.selectAvatar(ele.t);
          }}
        />
      </div>
    );
  }
}

export default AvatarSelector;