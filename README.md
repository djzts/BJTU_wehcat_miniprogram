# BJTU 交通项目评估作业下载平台 微信小程序

这是基于微信小程序云开发的一个简单微信小程序，其中使用了云开发的其中两大基础能力：

- 数据库：一个既可在小程序前端操作，也能在云函数中读写的 JSON 文档型数据库
- 文件存储：在小程序前端直接上传/下载云端文件，在云开发控制台可视化管理

## 具体思路
因为想主要实现学生作业的下载和分数的查询，所以流量方面应该不是很多，所以微信提供的云服务的免费版本来说，不管是数据库，还是文件储存，都非常适合我的需求。
使用**WEUI**的一个关键因素就是，省去了不必要的设计CSS的时间，WEUI及WEUI-WXSS帮助了我很多，标准的文字栏，按钮，选择框都是可以拿来直接用，且与微信本身的颜色十分相配。

另外，为了让学生能够更加快速，轻松上手作业，在首页我还增添了一些注意事项的短文，供学生参考，以避免不必要的错误与扣分。

所以在参考了很多大佬的微信小程序开发的经验之后，我目前是基于以下组件打造的课堂作业下载平台， 

## 参考文档

- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)
- [weui](https://github.com/Tencent/weui) 
- [weui-wxss](https://github.com/Tencent/weui-wxss/)
- [微信开放文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)

## 一些对我第一次“开发” 颇具帮助的网站
-[https://www.vxzsk.com/1881.html]
-[https://blog.csdn.net/qq_38650223/article/details/79771678]
-[https://www.cnblogs.com/crazycode2/p/8274645.html]
-[https://blog.csdn.net/weixin_30622181/article/details/95356697]
-[https://blog.csdn.net/qq_19741181/article/details/104510762]
