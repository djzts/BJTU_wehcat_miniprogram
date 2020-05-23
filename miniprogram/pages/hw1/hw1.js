Page({
  mixins: [require('../../mixin/themeChanged')],
  data: {
    focus: false,
    studentName: ' ',
    studentNumber: ' ',
    courseType: ['校选', '限选'],
    courseIndex: 0,
    iosDialog: false,

  },
  close: function () {
    this.setData({
        iosDialog: false,
    })
  },
  bindNameInput: function (e) {
    this.setData({
      studentName: e.detail.value
    })
  },
  openIOS: function() {
    this.setData({
        iosDialog: true
    });
  },
  bindNumInput: function (e) {
    this.setData({
      studentNumber: e.detail.value
    })
  },
  tapItem: function (e) {
    // console.log(this.data.studentName,this.data.studentNumber,this.data.courseIndex)
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 2000
    })
    
    wx.cloud.downloadFile({
      fileID: 'cloud://bjtutrans-rig0f.626a-bjtutrans-rig0f-1302113084/投资项目/'+ this.data.courseType[this.data.courseIndex] +'/'+ this.data.studentNumber +'.xlsx', // 文件 ID
      success: res => {
        // 返回临时文件路径
        console.log(this.data.courseType[this.data.courseIndex])
        console.log(res.tempFilePath)
        const Path = res.tempFilePath
        var fileManager = wx.getFileSystemManager();
        var newFilePath = wx.env.USER_DATA_PATH + "/" + this.data.studentName + "_" + this.data.studentNumber + "_财务评价综合计算与分析" + ".xlsx";
        console.log(newFilePath)
        wx.saveFile({
          tempFilePath: Path,
          filePath: newFilePath,
          success:function(res){
            console.log(res);
            var savedFilePath =  res.savedFilePath;
            console.log('target destination =' + newFilePath);
            wx.openDocument({
              filePath: newFilePath,
              fileType: 'xlsx',
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
              },
              fail:function(res){
                console.log('fail')
                console.log(res)
              }
            })          
        }

        })
      },
      fail: err => {
        // handle error
        console.log('download error')
        console.log(this.data.courseType[this.data.courseIndex])

        wx.showModal({
          title: '提示',
          content: '学号不存在或者课程类型错误，请重新输入',
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
  bindCourseChange: function(e) {
    //console.log('picker course 发生选择改变，携带值为', e.detail.value);

    this.setData({
        courseIndex: e.detail.value
    })
},
})
