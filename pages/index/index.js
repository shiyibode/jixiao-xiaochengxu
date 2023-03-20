// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    getUserInfoDialogShowFlag: false,
    avatarUrl: 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132',
    showActionsheet: false,
    groups: [
        { text: '7801311', value: '7801311' },
        { text: '103369', value: '103369' }
    ],
    busiDate: '2023-02-23',
    date: null,
    tellerName: '兰慧',
    tellerCode: '7801311',
    cunKuanIncome: 1220.56,
    cunKuanCompletion: 2800,
    daiKuanIncome: 4250.10,
    daiKuanCompletion: 120.56,
    buttons: [{text: '取消'}, {text: '确认'}],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.chooseAvatar')
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onSwitchTap(){
    this.setData({
      showActionsheet: true
    });
  },

  /**
   * 调用授权获取用户微信头像时的回调函数
   */
  getUserInfo(e){
    this.updateAvatar(e.detail.avatarUrl);  //更新应用服务端数据库中用户的头像地址，下次登录时直接从数据库中取，不需要再让用户授权来获取头像地址
    this.setData({
      getUserInfoDialogShowFlag: false,
      avatarUrl: e.detail.avatarUrl
    });

  },

  actionSheetBtnClick(e){
    let selectedTeller = e.detail.value;
    this.setData({
      showActionsheet: false
    });
  },
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  onSegTap:function(e){
    let id = e.currentTarget.id;
    console.log(e);
    if(id === 'cunkuan'){
      wx.navigateTo({
        url: '../jixiao/jixiao?id=cunkuan',
      })
    }
    if(id === 'daikuan'){
      wx.navigateTo({
        url: '../jixiao/jixiao?id=daikuan',
      })
    }
  },

  onLoad() {
    
  },

   /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    let me = this;

    //判断app.js中的wx.login是否已经拿到openId，共等待3秒钟，如果等待3秒钟还没有拿到则重新登录
    //如果拿到了openId，就使用openId去应用服务端获取用户的avatarUrl地址
    if(app.globalData.openId === null || app.globalData.openId === undefined){
      let flag = true;
      setTimeout(res=>{
        if(app.globalData.openId !== null && app.globalData.openId !== undefined) flag = false;
        if(flag){
          setTimeout(res2=>{
            if(app.globalData.openId === null || app.globalData.openId === undefined){
              app.login();
            }
            else{
              me.getAvatar();
            }
          },2000);
        }
        else{
          me.getAvatar();
        }
      },1000);
    }
    else{
      me.getAvatar();
    }
    
  },

  /**
   * 根据openId去应用服务器取avatarUrl
   * 如果服务器端未保存该openId对应的avatarUrl，就显示授权获取头像的窗口
   */
  getAvatar(){
    let me = this;
    wx.request({
      url: app.globalData.globalPath + 'haveavatar',
      data:{openId : app.globalData.openId},
      success(res){
        if(res.data.haveAvatar === true){
          me.setData({
            avatarUrl: res.data.url
          });
        }
        else{
          me.setData({
            getUserInfoDialogShowFlag: true
          });
        }
      },
      fail(e){
        console.log('获取用户openId失败：' + e);
      }
    })
  },

  /**
   * 更新服务端保存的头像地址
   */
  updateAvatar(avatarUrl){
    wx.request({
      url: app.globalData.globalPath + 'updateavatar',
      data:{
        openId: app.globalData.openId,
        avatarUrl: avatarUrl
      },
      success(res){
        console.log(res.data.info);
      }
    })
  }




})
