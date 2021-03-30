// pages/grade/grade.js
const app = getApp()
//初始化数据库
const db = wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {    userInfo: {},    hasUserInfo: false,    canIUse: wx.canIUse('button.open-type.getUserInfo'),     register_status: false,       student_Name: '',    class: '',    student_Number: '',
    midterm_grade: '',    midterm_correctness: '',     final_grade: '',     final_correctness: '', inquiry: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
        },
      })
    }
    console.log(this.data.hasUserInfo && (typeof this.data.userInfo["nickName"] != "undefined") && (this.data.student_Number.length>0) && this.data.inquiry)
    if(this.data.hasUserInfo && (typeof this.data.userInfo["nickName"] != "undefined")&& this.data.inquiry){
      this.data_inquire_nickname(this.data.userInfo["nickName"])
      this.setData({inquiry: false})
    }
    if((this.data.student_Number.length>0) && this.data.inquiry){
      this.data_inquire_id()
      this.setData({inquiry: false})
    }
  },

  data_inquire_nickname: function(nickName){
    db.collection('name_list').where({
      wx_name: nickName,
    })
    .get({
      success: res => {
        // res.data 是包含以上定义的两条记录的数组
        console.log(res.data)
        if(res.data.length != 0){
          this.setData({
            student_Name : res.data["0"]["name"],
            student_Number : res.data["0"]["_id"],
            class :  res.data["0"]["class"],
            midterm_grade : res.data["0"]["midterm"],
            midterm_correctness : res.data["0"]["midterm_correctness"],
            final_grade :  res.data["0"]["final"],
            final_correctness : res.data["0"]["final_correctness"],
            register_status: true,
          })
        }else{
          this.setData({
            student_Name : ' ',
            student_Number : ' ',
            midterm_grade : ' ',
            midterm_correctness : ' ',
            final_grade :  ' ',
            final_correctness : ' ',
            register_status: false,
          })
        }
      },
      fail: console.error
    })
  },

  data_inquire_id: function(){
    db.collection('name_list').where({
      _id: this.data.student_Number,
    })
    .get({
      success: res => {
        // res.data 是包含以上定义的两条记录的数组
        console.log(res.data)
        console.log(res.data.length)
        if(res.data.length == 0){
          wx.showModal({
            title: '错误',
            content: '学号输入有误，请检查后再输入',
            showCancel: false,
            confirmText: '知道了',
            success (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } 
            }
          })
        }else{
          console.log(res.data)
          if(res.data.length != 0){
          this.setData({
          student_Name : res.data["0"]["name"],
          student_Number : res.data["0"]["_id"],
          class :  res.data["0"]["class"],
          midterm_grade : res.data["0"]["midterm"],
          midterm_correctness : res.data["0"]["midterm_correctness"],
          final_grade :  res.data["0"]["final"],
          final_correctness : res.data["0"]["final_correctness"],
          register_status: true,
          })
          }else{
            this.setData({
            student_Name : '',
              student_Number : '',
              midterm_grade : '',
              midterm_correctness : '',
              final_grade :  '',
              final_correctness : '',
              register_status: false,
            })
          }
          this.setData({inquiry: true})
          this.onLoad()
          const _ = db.command
          db.collection('name_list').doc(this.data.student_Number).update({
            // data 传入需要局部更新的数据
            data: {
              // 表示将 done 字段置为 true
              wx_name: this.data.userInfo["nickName"],
            },
            success: function(res) {
              console.log("lock success")
              this.onLoad()
            }
          })
        }
      }
    })
  },

bindNumInput: function (e) {
    this.setData({
      student_Number: e.detail.value
    })
  },

  lock: function (e) {
    wx.showToast({
      title: '关联中',
      icon: 'loading',
      duration: 400
    })
    this.data_inquire_id()
  },
  bindNumInput: function (e) {
    this.setData({
      student_Number: e.detail.value
    })
  },
  unlock: function (e) {
    wx.showToast({
      title: '解除关联中',
      icon: 'loading',
      duration: 2000
    })

    console.log(this.data.student_Number)
    const _ = db.command
    db.collection('name_list').doc(this.data.student_Number).update({
      // data 传入需要局部更新的数据
      data: {
        // 表示将 wx_name 字段置为 空
        wx_name: 'noname'
      },
      success: function(res) {
        console.log("unlock success")
      }
    })
    this.setData({
      student_Name : '',
      student_Number : '',
      midterm_grade : '',
      midterm_correctness : '',
      final_grade :  '',
      final_correctness : '',
      register_status: false,
    })
  }
})
