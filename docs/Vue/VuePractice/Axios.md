# Vue use axios 项目 api 封装

- src\api\home.js
```js
// src\api\home.js
import Axios from 'axios';
import qs from 'qs';
import moment from 'moment';

// get
export function getContactInfo({ clue_id }) {
  return Axios({
    url: '/api/contact_info/',
    method: 'get',
    params: {
      clue_id, // 同 与 参
    },
  });
}

// 获取用户列表
export function getUsersList({
  pageNo,
  pageCount,
  searchType,
  searchValue,
  sortField,
  sortOrder,
  userStatus,
  status,
  ...
}) {
  return Axios({
    url: '/api/user/search/',
    method: 'get',
    params: {
      page_no: pageNo, // 名同 则只写 pageNo 即可
      page_count: pageCount,
      need_total_count: true,
      user_status:
        (Array.isArray(userStatus) && userStatus.join(',')) ||
        userStatus,
      sort_field: sortField,
      sort_asc: sortOrder === 'asc' ? true : false,
      status: (Array.isArray(status) && status.join(',')) || status,
    },
  });
}

// 获得用户信息
export function getUserDetailInfoApi({ userId }) {
  return Axios({
    url: '/api/oa/user/detail_info/',
    method: 'get',
    params: {
      user_id: userId,
    },
  });
}


// post
export function assignUsersApi({ 
  users,
  teacher
}) {
  return Axios({
    url: '',
    method: 'post',
    data: qs.stringify({
      clue_id: Array.isArray(users) ? JSON.stringify(users) : users,
      ct_key: teacher,
    }),
  });
}


//获取现在时间；
export function getNowTime() {
  var date = new Date();
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = date.getDate();
  d = d < 10 ? '0' + d : d;
  var h = date.getHours();
  h = h < 10 ? '0' + h : h;
  var minute = date.getMinutes();
  minute = minute < 10 ? '0' + minute : minute;
  var second = date.getSeconds();
  second = second < 10 ? '0' + second : second;
  return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
}
//获取昨天时间
export function getYesterdayTime() {
  return [
    moment()
      .subtract(1, 'days')
      .startOf('day')
      .valueOf(),
    moment()
      .subtract(1, 'days')
      .endOf('day')
      .valueOf(),
  ];
}
//获取近30天时间
export function get30DayTime() {
  return [
    moment()
      .subtract(30, 'day')
      .valueOf(),
    moment().valueOf(),
  ];
}
//获取今天时间
export function getTodayTime() {
  return [
    moment()
      .startOf('day')
      .valueOf(),
    moment()
      .endOf('day')
      .valueOf(),
  ];
}

```
