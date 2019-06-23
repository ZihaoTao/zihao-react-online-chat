/*
* @Author: Zihao Tao
* @Date:   2019-06-21 19:07:19
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2019-06-21 19:21:58
*/
import React from 'react';
//DOC
export default function formWrapper(Comp) {
  return class WrapperComp extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
      this.handleChange = this.handleChange.bind(this);
    }

    handleChange(key, val) {
      this.setState({
        [key]: val
      });
    }

    render() {
      return <Comp handleChange={this.handleChange} state={this.state} {...this.props}></Comp>
    }
  };
}