// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    showActionsheet: false,
    groups: [
        { text: '7801311', value: '7801311' },
        { text: '103369', value: '103369' }
    ],
    motto: '亲爱的员工兰慧，您在2023-02-04业务日的绩效考核明细如下：',
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
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
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
//   close: function () {
//     this.setData({
//         showActionsheet: false
//     })
// },
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
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  }
})
