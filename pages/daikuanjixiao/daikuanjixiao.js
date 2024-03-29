// pages/jixiao/jixiao.js
var appInstance = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resData: null,
    cunKuanCustomerCnt: 0,
    cunKuanAmount: 0,
    currentPageNo: 1,
    totalPage: 1,
    customerList:[],
    loadingFlag: true,
    reachBottomFlag: false,
    loadAllFlag: false,
    cunDaiKuanFlag: '',  //存贷款标志: cunkuan-存款  daikuan-贷款
    localTellerCode: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      cunDaiKuanFlag: options.id
    });
    let me = this,
        localSessionKeyDigest = wx.getStorageSync('sessionKeyDigest'),
        localTellerCode = wx.getStorageSync('tellerCode'),
        localBusiDate = wx.getStorageSync('busiDate');
        
    this.setData({
      localTellerCode: localTellerCode
    });


    if(options.id === 'daikuan'){

      wx.request({
        url: appInstance.globalData.globalPath + 'daikuandescribeinfo',
        data:{
          sessionKeyDigest : localSessionKeyDigest,
          tellerCode: localTellerCode,
          busiDate: localBusiDate
        },
        success(res){
          me.setData({
            cunKuanCustomerCnt: res.data.info.daiKuanCustomerCnt,
            cunKuanAmount: res.data.info.daiKuanTaskCompletion
          });
        }
      })
      //获取贷款客户列表
      wx.request({
        url: appInstance.globalData.globalPath + 'daikuancustomerlist',
        data:{
          sessionKeyDigest : localSessionKeyDigest,
          tellerCode: localTellerCode,
          busiDate: localBusiDate,
          pageNo: me.data.currentPageNo
        },
        success(res){
          me.setData({
            customerList: res.data.customerList,
            totalPage: res.data.customerTotalPage
          });
        }
      })

    }

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

  },

  onCustomerTap(e){
    let customerNo = e.currentTarget.dataset.customerno;
    
    if(customerNo !== null){
      let url = '../customer/customer?customerno='+customerNo;
      wx.navigateTo({
        url: url,
      })
    }
  },


  onTelephoneTap(e){
    let phoneNumber = e.currentTarget.dataset.phonenumber;
    
    if(phoneNumber.length === 11){
      wx.makePhoneCall({
        phoneNumber: phoneNumber,
      })
    }
  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    let me = this,
        localSessionKeyDigest = wx.getStorageSync('sessionKeyDigest'),
        localTellerCode = wx.getStorageSync('tellerCode'),
        localBusiDate = wx.getStorageSync('busiDate');

    if(me.data.cunDaiKuanFlag === 'daikuan'){
      let currentPage = this.data.currentPageNo + 1;  //第一个页面已在onReady中加载，触底只需要从第二个页面开始加载
      if(currentPage > me.data.totalPage){
        me.setData({
          loadAllFlag: true
        });
      }else{
        this.setData({
          currentPageNo: currentPage,
          reachBottomFlag: true,
          loadingFlag: true
        });
        //获取客户列表
        wx.request({
          url: appInstance.globalData.globalPath + 'daikuancustomerlist',
          data:{
            sessionKeyDigest : localSessionKeyDigest,
            tellerCode: localTellerCode,
            busiDate: localBusiDate,
            pageNo: currentPage
          },
          success(res){
            let newCustomerList = me.data.customerList.concat(res.data.customerList);
            me.setData({
              customerList: newCustomerList,
              loadingFlag: false
            });
          }
        })
      }
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})