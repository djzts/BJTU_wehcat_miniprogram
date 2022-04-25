// pages/hw2/hw2.js
Page({
  mixins: [require('../../mixin/themeChanged')],
  data: {
    focus: false,
    studentName: ' ',
    studentNumber: ' ',
  },

  bindNameInput: function (e) {
    this.setData({
      studentName: e.detail.value
    })
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
      fileID: 'cloud://bjtutrans-rig0f.626a-bjtutrans-rig0f-1302113084/交通项目/'+ this.data.studentNumber +'.xlsx', // 文件 ID
      success: res => {
        // 返回临时文件路径
        console.log(res.tempFilePath)
        const Path = res.tempFilePath
        var fileManager = wx.getFileSystemManager();
        var newFilePath = wx.env.USER_DATA_PATH + "/" + this.data.studentName + "_" + this.data.studentNumber + "_交通项目财务评价综合计算与分析" + ".xlsx";
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
              showMenu: true,
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
          content: '学号不存在，请重新输入',
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
})
