import url from './url.js'

export function getUserInfo(){
  axios.get(url.getUserInfo,).then((response) => {
    console.log("获取用户手机号 、渴望币 res -->",response)
    if(response.data.state == 'ok'){//
      localStorage.setItem('userPhone',response.data.phone);
      localStorage.setItem('hlz',response.data.rest_point);
    }else{//
      console.log("获取用户手机号 、渴望币 失败")
    }
  }).catch((response)=>{
    console.log("获取用户手机号 、渴望币 err -->",response)
  })
}
