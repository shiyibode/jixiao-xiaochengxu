// pages/customer/customer.js
var appInstance = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentBusiDate: '',
    customerNo: null,
    show: false,
    deleteRemarksShow: false,
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
    deleteButtons: [
      {
          type: 'default',
          text: '取消',
          value: 0
      },{
          type: 'primary',
          text: '确定',
          value: 1
      }
    ],
    remarksList:[],
    newRemarks: null,
    customerName: '',
    sex: '',
    cellphoneNumber:'',
    incomeList: [],
    cunKuanInfo: [],
    daiKuanInfo: [],
    otherInfo: [],
    localTellerCode: '',
    selectedRemarksId: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let customerNo = options.customerno;
    this.setData({
      customerNo: customerNo,
    });

    //获取客户的信息
    let me = this,
        localSessionKeyDigest = wx.getStorageSync('sessionKeyDigest'),
        localTellerCode = wx.getStorageSync('tellerCode'),
        localBusiDate = wx.getStorageSync('busiDate');
    this.setData({
      localTellerCode: localTellerCode
    });

    wx.request({
      url: appInstance.globalData.globalPath + 'customerinfo',
      data:{
        sessionKeyDigest : localSessionKeyDigest,
        tellerCode: localTellerCode,
        busiDate: localBusiDate,
        customerNo: customerNo
      },
      success(res){
        me.setData({
          customerName: res.data.info.customerName,
          cellphoneNumber: res.data.info.cellphoneNumber,
          sex: res.data.info.sex,
          currentBusiDate: res.data.info.busiDateStr,
          incomeList: res.data.info.incomeList,
          cunKuanInfo: res.data.info.cunKuanInfoList,
          daiKuanInfo: res.data.info.daiKuanInfoList,
          otherInfo: res.data.info.otherInfoList
        });
      }
    })

    wx.request({
      url: appInstance.globalData.globalPath + 'getremarks',
      data:{
        sessionKeyDigest : localSessionKeyDigest,
        tellerCode: localTellerCode,
        customerNo: customerNo
      },
      success(res){
        me.setData({
          remarksList: res.data.info
        });
      }
    })
  },

  //点击联系客户
  onContactCustomerBtnTap(e){
    let me = this;
    wx.makePhoneCall({
      phoneNumber: me.data.cellphoneNumber,
    })
  },

  //显示新增备注对话框
  onAddNewRemarksTap(e){
    this.setData({
      show: true
  })
  },

  //点击了新增备注下的按钮
  tapDialogButton(e) {
    const _btn = e.detail.item.text;
    let me = this,
        localSessionKeyDigest = wx.getStorageSync('sessionKeyDigest'),
        localTellerCode = wx.getStorageSync('tellerCode');
    if (_btn == '取消') {
      this.setData({
        show: false,
      })
    }

    console.log(me.data.newRemarks)

    if(_btn == '提交'){
      let remarks = me.data.newRemarks
      if(remarks === null || remarks === undefined || remarks === '' || remarks === 'null'){
        wx.showToast({
          title: '备注内容不能为空',
          icon: 'error',
          duration: 1500
        })
        return
      }
      wx.request({
        url: appInstance.globalData.globalPath + 'addremarks',
        data:{
          sessionKeyDigest : localSessionKeyDigest,
          tellerCode: localTellerCode,
          customerNo: me.data.customerNo,
          remarks: me.data.newRemarks
        },
        success(res){
          me.setData({
            show: false
          });
          wx.request({
            url: appInstance.globalData.globalPath + 'getremarks',
            data:{
              sessionKeyDigest : localSessionKeyDigest,
              tellerCode: localTellerCode,
              customerNo: me.data.customerNo
            },
            success(res){
              me.setData({
                remarksList: res.data.info
              });
            }
          })
        }
      })
    }
  },

  onRemarksConfirm(e){
    this.setData({
      newRemarks: e.detail.value
    });
  },

  /**
   * 切换业务周期，不更改柜员号 
   */
  bindDateChange: function(e) {
    let pickedDate = e.detail.value,
        me = this,
        localSessionKeyDigest = wx.getStorageSync('sessionKeyDigest'),
        localTellerCode = wx.getStorageSync('tellerCode');

        wx.request({
          url: appInstance.globalData.globalPath + 'customerinfo',
          data:{
            sessionKeyDigest : localSessionKeyDigest,
            tellerCode: localTellerCode,
            busiDate: pickedDate,
            customerNo: me.data.customerNo
          },
          success(res){
            if(res.data.flag === false){
              me.setData({
                currentBusiDate: '',
                incomeList: [],
                cunKuanInfo: [],
                daiKuanInfo: [],
                otherInfo: []
              });
            } else{
              if(res.data.info != null && res.data.info != undefined){
                me.setData({
                  customerName: res.data.info.customerName,
                  cellphoneNumber: res.data.info.cellphoneNumber,
                  sex: res.data.info.sex,
                  currentBusiDate: res.data.info.busiDateStr,
                  incomeList: res.data.info.incomeList,
                  cunKuanInfo: res.data.info.cunKuanInfoList,
                  daiKuanInfo: res.data.info.daiKuanInfoList,
                  otherInfo: res.data.info.otherInfoList
                });
              }
              else{
                me.setData({
                  customerName: '',
                  cellphoneNumber: '',
                  sex: '',
                  currentBusiDate:pickedDate,
                  incomeList: [],
                  cunKuanInfo: [],
                  daiKuanInfo: [],
                  otherInfo: []
                });
              }
            }
          }
        })
    
  },

  /**
   * 长按备注
   */
  bindRemarksLongPress(e){
    let me = this;

    let rid = e.currentTarget.dataset.rid;
    if (rid !== null && rid !== undefined && rid !== "") {  
      me.setData({
        deleteRemarksShow: true,
        selectedRemarksId: rid
      })
    }
  },

  /**
   * 点击了删除备注提醒框的按钮 
   */
  tapDeleteRemarksButton(e) {
    const _btn = e.detail.item.text;
    let me = this,
        localSessionKeyDigest = wx.getStorageSync('sessionKeyDigest'),
        localTellerCode = wx.getStorageSync('tellerCode');
    if (_btn == '取消') {
      this.setData({
        deleteRemarksShow: false,
        selectedRemarksId: null
      })
    }

    if(_btn == '确定'){
      wx.request({
        url: appInstance.globalData.globalPath + 'deleteremarks',
        data:{
          sessionKeyDigest : localSessionKeyDigest,
          tellerCode: localTellerCode,
          id: me.data.selectedRemarksId
        },
        success(res){
          me.setData({
            deleteRemarksShow: false,
            selectedRemarksId: null
          });
          wx.request({
            url: appInstance.globalData.globalPath + 'getremarks',
            data:{
              sessionKeyDigest : localSessionKeyDigest,
              tellerCode: localTellerCode,
              customerNo: me.data.customerNo
            },
            success(res){
              me.setData({
                remarksList: res.data.info
              });
            }
          })
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
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})