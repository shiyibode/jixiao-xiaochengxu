// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    var app = this;

    // 登录
    // app.login();


    //企业微信登录
    app.qyLogin();
  },

  login(){
    let app = this;
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: app.globalData.globalPath + 'code',
          data:{code:res.code},
          success(res){
            app.globalData.openId=res.data.openId ;
          },
          fail(e){
            console.log('获取用户openId失败：' + e);
          }
        })


      }
    })
  },

  qyLogin(){
    let app = this;
    // wx.navigateTo({
    //   url: './pages/login/login?scene=0',
    // })
  },



  globalData: {
    // openId: null,
    // userInfo: null,
    // globalPath: 'http://192.168.31.249:8080/'
    globalPath: 'https://tzrr.ordosrcb.com/jixiao/'
  }
})
