//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    title: [{
      message: '大作业常见问题',
      author: '谢海红',
      date: '2020/05/22',
      id: 'Question',
    },{
      message:'如何让大作业更轻松 —— 做题指南',
      author: '谢海红',
      date:'2020/05/22',
      id: 'Guide',
    },
  ],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),    
  },
  //

  //事件处理函数
  tapItem: function(e) {
    //console.log(e)
    //console.log(e.currentTarget.id)
    var Name = e.currentTarget.id
    wx.navigateTo({
      url: '../'+Name+'/'+Name
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
