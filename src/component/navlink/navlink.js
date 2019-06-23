/*
* @Author: Zihao Tao
* @Date:   2019-06-21 01:35:29
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2019-06-22 16:41:33
*/
import React from 'react';
import PropTypes from 'prop-types';
import { TabBar } from 'antd-mobile';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

@withRouter
@connect(
  state => state.chat
)
class NavLinkBar extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired
  }

  create(navList) {
    let table = [];
    const { pathname } = this.props.location;

    for(let v of navList) {
      table.push(<TabBar.Item
            badge={v.icon === 'Message' ? this.props.unread : 0}
            key={v.path}
            title={v.text}
            icon={{uri: require(`./img/${v.icon}.png`)}}
            selectedIcon={{uri: require(`./img/${v.icon}-active.png`)}}
            selected={pathname===v.path}
            onPress={() => {
              this.props.history.push(v.path)
            }}
          >
          </TabBar.Item>)
    }
    return table;
  }

  render() {
    const navList = this.props.data.filter(v=>!v.hide);
    return (
      <TabBar>
        {this.create(navList)}
      </TabBar>
    );
  }
}

export default NavLinkBar;
