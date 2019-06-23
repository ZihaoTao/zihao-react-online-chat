/*
* @Author: Zihao Tao
* @Date:   2019-06-20 14:41:51
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2019-06-22 10:38:43
*/
export function getRedirectPath({type, avatar}) {
  // user.type => /employer /employee
  // user.avatar => /employerInfo /employeeInfo
  let url = (type === 'Employer') ? '/employer' : '/employee';
  if(!avatar) {
    url += 'info';
  }
  return url;
}

export function getChatId(userId, targetId) {
  return [userId, targetId].sort().join('_')
}