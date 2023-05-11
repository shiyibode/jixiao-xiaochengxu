// pages/kaohe/kaohe.js
var appInstance = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex: 0,
    tabList: [{
      text: '机构',
      iconPath: '/utils/icon/company.png',
      selectedIconPath: '/utils/icon/company_green.png'
    },{
      text: '员工',
      iconPath: '/utils/icon/employee.png',
      selectedIconPath: '/utils/icon/employee_green.png'
    }],

    orgPlanList:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  onTabSwitch(e) {
    console.log(e.detail.index);
    this.setData({
      tabIndex: e.detail.index
    });
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

    wx.request({
      url: appInstance.globalData.globalPath + 'orgkaohelist',
      data:{
        sessionKeyDigest : localSessionKeyDigest,
        tellerCode: localTellerCode,
        busiDate: localBusiDate
      },
      success(res){
        me.setData({
          orgPlanList: res.data.info
        })
      }
    })

    console.log('onshow: '+localTellerCode);


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