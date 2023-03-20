// pages/kehu/kehu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showActionsheet: false,
    groups: [
        { text: '7801311', value: '7801311' },
        { text: '103369', value: '103369' }
    ],
    busiDate: '2023-02-23',
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    havePhoneNumberFlag: false,
    currentCustomerName: null,
    callConfirmDialogShow: false,
    confirmDialogButtons:[
      {text: '取消'},
      {text: '确认'}
    ]
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