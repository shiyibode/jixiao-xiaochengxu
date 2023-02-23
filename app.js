// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var app = this

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        
        console.log(res.code)

        wx.request({
          url: 'http://192.168.2.225:8080/code',
          data:{code:res.code},
          success(res){
            // resData = res;
            app.globalData.openId=res.data ;
            console.log(res.data);
          }
        })


      }
    })



    //企业微信登录
    
  },

  globalData: {
    openId: null,
    userInfo: null
  }
})
