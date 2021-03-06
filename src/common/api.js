import axios from 'axios'
import  qs from 'qs'
const baseUrl='http://'+process.env.BASE_URL+'/api';
const remoteUrl='http://cqrjccnu.cn/';
var user=JSON.parse(localStorage.getItem('user'));
// export default {
//   apiCall(method,url,data){
//     console.log(JSON.stringify(data));
//     console.log(this.qs);
//     axios({
//       method:method,
//       url:baseUrl+url,
//       data:qs.stringify(data)
//     }).then((response) =>{          //这里使用了ES6的语法
//       let data = response.data;
//       console.log(data);
//       if(data.code===200){
//         return {
//           msg:'请求成功',
//           code:200,
//           data:data
//         };
//       }else{
//         return {
//           msg:'请求失误',
//           code:data.code,
//           data:data
//         }
//       }
//     }).catch((error) =>{
//       return {
//         msg:'网络错误',
//         code:0,
//         data:error
//       }
//     });
//   }
// }

export default {
  getParamsStr(params){
    let result="?";
    for(let key in params){
      result+=(key+'='+params[key]+'&');
    }
    return result.substr(0,result.length-1);
  },
  LRapiCall(method,url, params){
    // console.log('店家');
    if(user==null){
      user=JSON.parse(localStorage.getItem('user'));
    }
    let innerUser=user;
    // console.log('店家1',innerUser,user);
    return new Promise((resolve, reject) =>{
      axios({
        method:method,
        url:baseUrl+url,
        data:qs.stringify(params)//,headers:{'token':innerUser.id+'||'+innerUser.salt}
      }).then((response) =>{          //这里使用了ES6的语法
        let data = response.data;
        console.log(data);
        if(data.code===200){
          resolve({
            msg:'请求成功',
            code:200,
            data:data
          }) ;
        }else{
          reject({
            msg:'请求失误',
            code:data.code,
            data:data
          }) ;
        }
      }).catch((error) =>{
        reject({
          msg:'网络错误',
          code:0,
          data:error
        })
      });
    });
  },
  apiCall(method,url, params){
    console.log('店家');
    if(user==null){
      user=JSON.parse(localStorage.getItem('user'));
    }
    let innerUser=user;
    return new Promise((resolve, reject) =>{
      axios({
        method:method,
        url:baseUrl+url,
        data:qs.stringify(params),//,headers:{'token':innerUser.id+'||'+innerUser.salt}
        headers:{'token':innerUser.id+'<->'+innerUser.salt,
          'type':'back-end'
        }
      }).then((response) =>{          //这里使用了ES6的语法
        let data = response.data;
        if(data.code===200){
          resolve({
            msg:'请求成功',
            code:200,
            data:data
          }) ;
        }else{
          reject({
            msg:'请求失误',
            code:data.code,
            data:data
          }) ;
        }
      }).catch((error) =>{
        reject({
          msg:'网络错误',
          code:0,
          data:error
        })
      });
    });
  },
  apiJsonCall(method,url, params){
    // console.log('店家');
    if(user==null){
      user=JSON.parse(localStorage.getItem('user'));
    }
    let innerUser=user;
    // console.log('店家1',innerUser,user);
    return new Promise((resolve, reject) =>{
      axios({
        method:method,
        url:baseUrl+url,
        data:JSON.stringify(params),//,headers:{'token':innerUser.id+'||'+innerUser.salt}
        headers:{'token':innerUser.id+'<->'+innerUser.salt,
          'type':'back-end',
                 'Content-Type':'application/json'}
      }).then((response) =>{          //这里使用了ES6的语法
        let data = response.data;
        console.log(data);
        if(data.code===200){
          resolve({
            msg:'请求成功',
            code:200,
            data:data
          }) ;
        }else{
          reject({
            msg:'请求失误',
            code:data.code,
            data:data
          }) ;
        }
      }).catch((error) =>{
        reject({
          msg:'网络错误',
          code:0,
          data:error
        })
      });
    });
  },

  setStorageItem(name,data,expired){
    if(name===''||name==null){
      user=null;
      return;
    }
    data.localexpired=new Date().getTime()+expired*10000;
    localStorage.setItem(name,JSON.stringify(data));
  },
  getStorageItem(name){
    let data=JSON.parse(localStorage.getItem(name));
    if(!data){
      return '';
    }
    console.log(data.localexpired,'任建你好');
    if(new Date().getTime()>parseInt(data.localexpired)){
      return '过期';
    }else {
      return data;
    }
  }
}
