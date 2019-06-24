/*
* @Author: Zihao Tao
* @Date:   2019-06-19 20:08:05
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2019-06-24 11:23:26
*/
import React from 'react';
import logoImg from './logo.png';

import './logo.css';

class Logo extends React.Component {
 
  render() {
    return(
      <div className="logo-container">
        <img className="logo-img" src={logoImg} alt="logo"/>
      </div>
    );
  }
}

export default Logo;