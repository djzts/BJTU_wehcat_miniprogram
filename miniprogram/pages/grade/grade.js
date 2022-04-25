// pages/grade/grade.js
const app = getApp()
//初始化数据库
const db = wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {    userInfo: {},    hasUserInfo: false,    canIUse: wx.canIUse('button.open-type.getUserInfo'),     register_status: false,       student_Name: '',    class: '',    student_Number: '',
    midterm_grade: '',    midterm_correctness: '', midterm_grade2: '',    midterm_correctness2: '',     final_grade: '',     final_correctness: '', inquiry: true,
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
    }  
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
          midterm_grade2 : res.data["0"]["midterm2"],
          midterm_correctness2 : res.data["0"]["midterm_correctness2"],
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
              midterm_grade2 : '',
              midterm_correctness2 : '',
              final_grade :  '',
              final_correctness : '',
              register_status: false,
            })
          }
          console.log(this.data)
        }
      }
    })
  },

  bindNumInput: function (e) {
    this.setData({
      student_Number: e.detail.value
    })
  },


  download_answer: function (e) {
    let location = "投资项目答案";
    let stu_id = String(this.data.student_Number);
    let stu_name = String(this.data.student_Name);
    let fileanme = "财务评价综合计算与分析答案";
    let filetype = "xlsx";
    this.downloadfile(location,stu_id,stu_name,fileanme,filetype);
  },

  download_report: function (e) {
    let location = "投资项目报告";
    let stu_id = String(this.data.student_Number);
    let stu_name = String(this.data.student_Name);
    let fileanme = "财务评价综合计算与分析成绩报告";
    let filetype = "pdf";
    this.downloadfile(location,stu_id,stu_name,fileanme,filetype);
  },

  download_answer_2: function (e) {
    let location = "投资项目答案2";
    let stu_id = String(this.data.student_Number);
    let stu_name = String(this.data.student_Name);
    let fileanme = "第二次财务评价综合计算与分析答案";
    let filetype = "xlsx";
    this.downloadfile(location,stu_id,stu_name,fileanme,filetype);
  },

  download_report_2: function (e) {
    let location = "投资项目报告2";
    let stu_id = String(this.data.student_Number);
    let stu_name = String(this.data.student_Name);
    let fileanme = "第二次财务评价综合计算与分析成绩报告";
    let filetype = "pdf";
    this.downloadfile(location,stu_id,stu_name,fileanme,filetype);
  },

  download_answer_trans: function (e) {
    let location = "交通项目答案";
    let stu_id = String(this.data.student_Number);
    let stu_name = String(this.data.student_Name);
    let fileanme = "交通项目财务评价综合计算与分析答案";
    let filetype = "xlsx";
    this.downloadfile(location,stu_id,stu_name,fileanme,filetype);
  },

  download_report_trans: function (e) {
    let location = "交通项目报告";
    let stu_id = String(this.data.student_Number);
    let stu_name = String(this.data.student_Name);
    let fileanme = "交通项目财务评价综合计算与分析报告";
    let filetype = "pdf";
    this.downloadfile(location,stu_id,stu_name,fileanme,filetype);
  },

  downloadfile: function (location,stu_id,stu_name,fileanme,filetype) {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 3000
    })    
    console.log('cloud://bjtutrans-rig0f.626a-bjtutrans-rig0f-1302113084/'+ location + '/' + stu_id + '.' + filetype)
    wx.cloud.downloadFile({
      fileID: 'cloud://bjtutrans-rig0f.626a-bjtutrans-rig0f-1302113084/'+ location + '/' + stu_id + '.' + filetype, // 文件 ID
      
      success: res => {
        // 返回临时文件路径
        const Path = res.tempFilePath
        var fileManager = wx.getFileSystemManager();
        var newFilePath = wx.env.USER_DATA_PATH + "/" + stu_name + "_" + stu_id + "_"+ fileanme + "." + filetype;
        wx.saveFile({
          tempFilePath: Path,
          filePath: newFilePath,
          success:function(res){
            console.log(res);
            var savedFilePath =  res.savedFilePath;
            console.log('target destination =' + newFilePath);
            wx.openDocument({
              filePath: newFilePath,
              showMenu: true,
              fileType: filetype,          
              success:function(res){
                wx.hideToast({
                  complete: (res) => {},
                })
                console.log('open success')
                console.log(res)
              },
              fail:function(res){
                console.log('open fail')
                console.log(res)
                wx.showModal({
                  title: '提示',
                  content: '文件由于某些原因无法打开，请稍后再试（Error: 101 ）',
                  showCancel: false,
                  success (res) {
                    if (res.confirm) {
                      console.log('用户点击确定')
                    } 
                  }
                })
              },
          fail:function(res){
            console.log('fail')
            console.log(res)
            wx.showModal({
              title: '提示',
              content: '文件由于某些原因无法打开，请稍后再试（Error: 102 ）',
              showCancel: false,
              success (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                  } 
                }
            })
          }
          })          
        }

        })
      },
      fail: err => {
        // handle error
        console.log('download error')

        wx.showModal({
          title: '提示',
          content: '文件未发布，请耐心等待或者联系助教',
          showCancel: false,
          success (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } 
          }
        })

      }
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
      midterm_grade2 : '',
      midterm_correctness2 : '',
      final_grade :  '',
      final_correctness : '',
      register_status: false,
    })
  }
})
