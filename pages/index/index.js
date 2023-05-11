// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    avatarUrl: 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132',
    showActionsheet: false,
    groups: [],
    getJixiaoErrorDialogShow: false,
    getJixiaoErrorMessage: '',
    dialogButtons: [{text: '确认'}],
    busiDate: '',
    tellerCode: '',
    cunKuanIncome: 0,
    cunKuanCompletion: 0,
    daiKuanIncome: 0,
    daiKuanCompletion: 0,


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
   * 切换柜员号
   */
  actionSheetBtnClick(e){
    let selectedTeller = e.detail.value,
        me = this,
        localSessionKeyDigest = wx.getStorageSync('sessionKeyDigest');

    wx.request({
      url: app.globalData.globalPath + 'jixiaoinfo',
      data:{
        sessionKeyDigest : localSessionKeyDigest,
        tellerCode: selectedTeller
      },
      success(res){
        if(res.data.flag === true){
          let info = res.data.info;
          me.setData({
            tellerCode: info.tellerCode,
            avatarUrl: info.haveAvatarFlag?info.avatarUrl:me.data.avatarUrl,
            busiDate: info.busiDateStr,
            cunKuanIncome: info.cunKuanIncome,
            cunKuanCompletion: info.cunKuanTaskCompletion,
            daiKuanIncome: info.daiKuanIncome,
            daiKuanCompletion: info.daiKuanInterestCompletion
          });
          wx.setStorageSync('tellerCode', info.tellerCode);
          wx.setStorageSync('busiDate', info.busiDateStr);
        }
        else{
          me.setData({
            getJixiaoErrorDialogShow: true,
            getJixiaoErrorMessage: res.data.message
          });
        }
      },
      fail(e){
        console.log('获取用户绩效信息失败：' + e);
      }
    })


    this.setData({
      showActionsheet: false
    });

  },

  /**
   * 切换业务周期，不更改柜员号 
   */
  bindDateChange: function(e) {
    let pickedDate = e.detail.value,
        me = this,
        localSessionKeyDigest = wx.getStorageSync('sessionKeyDigest');

    wx.request({
      url: app.globalData.globalPath + 'jixiaoinfo',
      data:{
        sessionKeyDigest : localSessionKeyDigest,
        tellerCode: me.data.tellerCode,
        busiDate: pickedDate
      },
      success(res){
        if(res.data.flag === true){
          let info = res.data.info;
          me.setData({
            tellerCode: info.tellerCode,
            avatarUrl: info.haveAvatarFlag?info.avatarUrl:me.data.avatarUrl,
            busiDate: info.busiDateStr,
            cunKuanIncome: info.cunKuanIncome,
            cunKuanCompletion: info.cunKuanTaskCompletion,
            daiKuanIncome: info.daiKuanIncome,
            daiKuanCompletion: info.daiKuanInterestCompletion
          });
          wx.setStorageSync('busiDate', info.busiDateStr);
        }
        else{
          me.setData({
            getJixiaoErrorDialogShow: true,
            getJixiaoErrorMessage: res.data.message
          });
        }
      },
      fail(e){
        console.log('获取用户绩效信息失败：' + e);
      }
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
        url: '../daikuanjixiao/daikuanjixiao?id=daikuan',
      })
    }
  },

  tapDialogButton(){
    this.setData({
      getJixiaoErrorDialogShow: false
    });
  },

   /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    let me = this,
        localSessionKeyDigest = wx.getStorageSync('sessionKeyDigest');

    wx.request({
      url: app.globalData.globalPath + 'jixiaoinfo',
      data:{sessionKeyDigest : localSessionKeyDigest},
      success(res){
        if(res.data.flag === true){
          let info = res.data.info;
          me.setData({
            tellerCode: info.tellerCode,
            avatarUrl: info.haveAvatarFlag?info.avatarUrl:me.data.avatarUrl,
            busiDate: info.busiDateStr,
            cunKuanIncome: info.cunKuanIncome,
            cunKuanCompletion: info.cunKuanTaskCompletion,
            daiKuanIncome: info.daiKuanIncome,
            daiKuanCompletion: info.daiKuanInterestCompletion
          });
          wx.setStorageSync('tellerCode', info.tellerCode);
          wx.setStorageSync('busiDate', info.busiDateStr);

          let tellerActionSheetGroups = [];
          for(var teller of info.tellerList){
            let tmp = {
              text: teller,
              value: teller
            }
            tellerActionSheetGroups.push(tmp)
          }
          me.setData({
            groups: tellerActionSheetGroups,
          });

          if(!info.haveAvatarFlag){
            me.getAvatar();
          }
        }
        else{
          me.setData({
            getJixiaoErrorDialogShow: true,
            getJixiaoErrorMessage: res.data.message
          });
        }
      },
      fail(e){
        console.log('获取用户绩效信息失败：' + e);
      }
    })
    
  },

  /**
   * 服务器端未保存该sessionKeyDigest对应的avatarUrl，去微信后台获取，同时更新后台
   */
  getAvatar(){
    let me = this;

    wx.qy.getAvatar ({
      success: function(res) {
        var avatar = res.avatar;
        me.setData({
          avatarUrl: avatar
        });
        me.updateAvatar(avatar);
      },
      fail: function(res) {
        console.log('获取avatarUrl失败');
        console.log(res.fail_reason)
      }
    })
    
  },

  /**
   * 更新服务端保存的头像地址
   */
  updateAvatar(avatarUrl){
    let localSessionKeyDigest = wx.getStorageSync('sessionKeyDigest');

    wx.request({
      url: app.globalData.globalPath + 'updateavatar',
      data:{
        sessionKeyDigest: localSessionKeyDigest,
        avatarUrl: avatarUrl
      },
      success(res){
        console.log(res.data.info);
      }
    })
  }



})
