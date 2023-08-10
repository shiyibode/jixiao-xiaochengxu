// pages/kehu/kehu.js
var appInstance = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showActionsheet: false,
    errorDialogShow: false,
    errorMessage: '',
    dialogButtons: [{text: '确认'}],
    groups: [],
    busiDate: '2023-02-23',
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    havePhoneNumberFlag: false,
    currentCustomerName: null,
    callConfirmDialogShow: false,
    confirmDialogButtons:[{text: '取消'},{text: '确认'}],
    expireCunKuanList: [],
    expireDaiKuanList: [],
    overdueLoanCustomer: [],
    newOpenAccount: [],
    avatarUrl: 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132',
    localTellerCode: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    

    
  },

  onSwitchTap(){
    this.setData({
      showActionsheet: true
    });
  },

  actionSheetBtnClick(e){
    let selectedTeller = e.detail.value;
    console.log('选择的账号是: '+selectedTeller);
    this.setData({
      showActionsheet: false
    });
  },

  onPhoneTap(e){
    this.setData({
      currentCustomerName: '张三三',
      callConfirmDialogShow: true
    });
  },

  onConfirmDialogClose(e){
    this.setData({
      currentCustomerName: null,
      callConfirmDialogShow: false
    });
  },

  confirmDialogButtonTap(e){
    let btnIndex = e.detail.index;
    if(btnIndex === 0){
      
    }
    else{
      wx.makePhoneCall({
        phoneNumber: '15391257468',
      });

    }

    this.setData({
      callConfirmDialogShow: false
    });
  },

  onCallTap(e){
    let phone = e.target.dataset.cellphone;
    wx.makePhoneCall({
      phoneNumber: phone,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    let me = this,
        localSessionKeyDigest = wx.getStorageSync('sessionKeyDigest'),
        localTellerCode = wx.getStorageSync('tellerCode'),
        localBusiDate = wx.getStorageSync('busiDate');

    me.setData({
      busiDate: localBusiDate,
      tellerCode: localTellerCode,
      localTellerCode: localTellerCode
    });

    //即将到期的存款列表
    wx.request({
      url: appInstance.globalData.globalPath + 'expirecunkuan',
      data:{
        sessionKeyDigest : localSessionKeyDigest,
        tellerCode: localTellerCode,
        busiDate: localBusiDate
      },
      success(res){
        if(res.data != undefined && res.data != null && res.data.flag == true){
          me.setData({
            expireCunKuanList: res.data.info
          });
        }
        if(res.data != null && res.data.flag == false){
          me.setData({
            errorDialogShow: true,
            errorMessage: res.data.message
          });
        }
      }
    })

    //即将到期的贷款列表
    wx.request({
      url: appInstance.globalData.globalPath + 'expiredaikuan',
      data:{
        sessionKeyDigest : localSessionKeyDigest,
        tellerCode: localTellerCode,
        busiDate: localBusiDate
      },
      success(res){
        if(res.data != undefined && res.data != null && res.data.flag == true){
          me.setData({
            expireDaiKuanList: res.data.info
          });
        }
      }
    })

    //新增存贷款账户
    wx.request({
      url: appInstance.globalData.globalPath + 'newopenacct',
      data:{
        sessionKeyDigest : localSessionKeyDigest,
        tellerCode: localTellerCode,
        busiDate: localBusiDate
      },
      success(res){
        if(res.data != undefined && res.data != null && res.data.flag == true){
          me.setData({
            newOpenAccount: res.data.info
          });
        }
      }
    })

    //不良贷款客户列表
    wx.request({
      url: appInstance.globalData.globalPath + 'overdueloancustomer',
      data:{
        sessionKeyDigest : localSessionKeyDigest,
        tellerCode: localTellerCode,
        busiDate: localBusiDate
      },
      success(res){
        if(res.data != undefined && res.data != null && res.data.flag == true){
          me.setData({
            overdueLoanCustomer: res.data.info
          });
        }
      }
    })

    //关联存款统计系统号列表
    wx.request({
      url: appInstance.globalData.globalPath + 'usertellercodelist',
      data:{
        sessionKeyDigest : localSessionKeyDigest
      },
      success(res){
        if(res.data != undefined && res.data != null && res.data.flag == true){
          let tellerActionSheetGroups = [];
          for(var teller of res.data.info){
            let tmp = {
              text: teller,
              value: teller
            }
            tellerActionSheetGroups.push(tmp)
          }
          me.setData({
            groups: tellerActionSheetGroups
          });
        }
      }
    })

    //获取用户头像
    wx.qy.getAvatar ({
      success: function(res) {
        var avatar = res.avatar;
        me.setData({
          avatarUrl: avatar
        });
      },
      fail: function(res) {
        console.log('获取avatarUrl失败');
        console.log(res.fail_reason)
      }
    });
  },

  tapDialogButton(){
    this.setData({
      errorDialogShow: false
    });
  },

  /**
   * 切换柜员号
   */
  actionSheetBtnClick(e){
    let localTellerCode = e.detail.value;
    let me = this,
        localSessionKeyDigest = wx.getStorageSync('sessionKeyDigest'),
        localBusiDate = wx.getStorageSync('busiDate');
    
    me.setData({
      tellerCode: localTellerCode
    });

    //即将到期的存款列表
    wx.request({
      url: appInstance.globalData.globalPath + 'expirecunkuan',
      data:{
        sessionKeyDigest : localSessionKeyDigest,
        tellerCode: localTellerCode,
        busiDate: localBusiDate
      },
      success(res){
        if(res.data != undefined && res.data != null && res.data.flag == true){
          me.setData({
            expireCunKuanList: res.data.info
          });
        }
        if(res.data != null && res.data.flag == false){
          me.setData({
            errorDialogShow: true,
            errorMessage: res.data.message
          });
        }
      }
    })

    //即将到期的贷款列表
    wx.request({
      url: appInstance.globalData.globalPath + 'expiredaikuan',
      data:{
        sessionKeyDigest : localSessionKeyDigest,
        tellerCode: localTellerCode,
        busiDate: localBusiDate
      },
      success(res){
        if(res.data != undefined && res.data != null && res.data.flag == true){
          me.setData({
            expireDaiKuanList: res.data.info
          });
        }
      }
    })

    //新增存贷款账户
    wx.request({
      url: appInstance.globalData.globalPath + 'newopenacct',
      data:{
        sessionKeyDigest : localSessionKeyDigest,
        tellerCode: localTellerCode,
        busiDate: localBusiDate
      },
      success(res){
        if(res.data != undefined && res.data != null && res.data.flag == true){
          me.setData({
            newOpenAccount: res.data.info
          });
        }
      }
    })

    //不良贷款客户列表
    wx.request({
      url: appInstance.globalData.globalPath + 'overdueloancustomer',
      data:{
        sessionKeyDigest : localSessionKeyDigest,
        tellerCode: localTellerCode,
        busiDate: localBusiDate
      },
      success(res){
        if(res.data != undefined && res.data != null && res.data.flag == true){
          me.setData({
            overdueLoanCustomer: res.data.info
          });
        }
      }
    })


    me.setData({
      showActionsheet: false
    });

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})