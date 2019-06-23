/*
* @Author: Zihao Tao
* @Date:   2019-06-19 19:36:56
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2019-06-19 19:56:56
*/
import axios from 'axios';
import { Toast } from 'antd-mobile';


// intercept requests
axios.interceptors.request.use((config) => {
  Toast.loading('Loading', 0);
  return config;
});

// intercept response
axios.interceptors.response.use((config) => {
  Toast.hide();
  return config;
});


