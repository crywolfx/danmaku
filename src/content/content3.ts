import request from 'src/lib/request';

request.get('https://www.baidu.com').then((res) => {
  console.log(res);
})