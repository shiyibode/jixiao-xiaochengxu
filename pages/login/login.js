// pages/login/login.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let scene = options.scene;
    if(scene === undefined) scene = 0;

    //判断是否已经登录
    wx.qy.checkSession({
      success:function(){
        let localSessionKeyDigest = wx.getStorageSync('sessionKeyDigest');
        // if(localSessionKeyDigest === null || localSessionKeyDigest === undefined || localSessionKeyDigest === ''){
          // console.log('session有效，但是仍需要发起登录请求')
          wx.qy.login({
            success: function(res) {
              if (res.code) {
                //发起网络请求
                wx.request({
                  url: app.globalData.globalPath + 'qycode',
                  data: {
                    code: res.code
                  },
                  success(res){
                    wx.setStorageSync('sessionKeyDigest', res.data.sessionKeyDigest)
                    if(scene === 0){
                      wx.switchTab({
                        url: '../index/index',
                      })
                    }
                  },
                  fail(e){
                    console.log('获取用户sessionKeyDigest失败：' + e);
                  }
                })
              } else {
                console.log('登录失败！' + res.errMsg)
              }
            }
          });
        // }
        // else{
          // wx.switchTab({
          //   url: '../index/index',
          // })
        // }
      },
      fail: function(){
        wx.qy.login({
          success: function(res) {
            if (res.code) {
              //发起网络请求
              wx.request({
                url: app.globalData.globalPath + 'qycode',
                data: {
                  code: res.code
                },
                success(res){
                  // app.globalData.sessionKeyDigest=res.data.sessionKeyDigest ;
                  wx.setStorageSync('sessionKeyDigest', res.data.sessionKeyDigest)
                  if(scene === 0){
                    wx.switchTab({
                      url: '../index/index',
                    })
                  }
                },
                fail(e){
                  console.log('获取用户sessionKeyDigest失败：' + e);
                }
              })
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        });
      }
    })



    
    



  }



})