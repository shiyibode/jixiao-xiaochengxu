// pages/jixiao/jixiao.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resData: null,
    cunKuanCustomerCnt: 223,
    cunKuanAmount: 2334
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options);
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

    var appInstance = getApp()
    console.log(appInstance.globalData) // I am global data

    wx.request({
      url: 'http://192.168.2.225:8080/info', 
      success(res){
        // resData = res;
        console.log(res);
      }
    })

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
      console.log(phoneNumber);
      wx.makePhoneCall({
        phoneNumber: phoneNumber,
      })
    }
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