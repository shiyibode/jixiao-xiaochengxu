// pages/customer/customer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentBusiDate: '2023-03-05',
    customerNo: null,
    show: false,
    buttons: [
        {
            type: 'default',
            className: '',
            text: '取消',
            value: 0
        },
        {
            type: 'primary',
            className: '',
            text: '提交',
            value: 1
        }
    ],
    remarksList:[
      {
        content: '2023年给客户送礼价值100元'
      },
      {
        content: '该客户在政府上班，是个副科级干部，家住在康巴什皇庭俊景'
      }
    ],
    newRemarks: null,
    genderFlag: 0

  },

  open: function () {
    this.setData({
        show: true
    })
  },
  buttontap(e) {
      console.log(e.detail)
  },

  onAddNewRemarksTap(e){
    this.setData({
      show: true
  })
  },


  tapDialogButton(e) {
    console.log(e)
    const _btn = e.detail.item.text;
    if (_btn == '取消') {
    //   // 添加移除关注
    //   this.concern_user();
    // }
      this.setData({
        show: false,
      })
    }

    if(_btn == '提交'){
      let newRemarksList = this.data.remarksList;
      newRemarksList.push({
        content: this.data.newRemarks
      });
      console.log(newRemarksList);
      this.setData({
        remarksList: newRemarksList,
        show: false
      });

    }
  },

  onRemarksConfirm(e){
    console.log(e);
    this.setData({
      newRemarks: e.detail.value
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let customerNo = options.customerno;
    this.setData({
      customerNo: customerNo
    });
  },

  onContactCustomerBtnTap(e){
    wx.makePhoneCall({
      phoneNumber: '15391257468',
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