const { mock } = require("../../node_modules/mockjs");

// pages/tab-firstpage/firstpage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    hospital_name: "北京协和医院",
    hospital_image: "https://img.yzcdn.cn/vant/cat.jpeg",
    hospital_address:"北京市东城区帅府园1号",
    hospital_mAmount:"250",
    hospital_rate:"9.5"
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getTabBar().init();
    
    var Mock = require('../../node_modules/mockjs')
    var data = Mock.mock({
        // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
        'list|1-10': [{
            // 属性 id 是一个自增数，起始值为 1，每次增 1
            'id|+1': 1
        }]
    })
    // 输出结果
    console.log(JSON.stringify(data, null, 4))
  },


  //以下暂未用到。--------------------------------------------------------------------------------------------------
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})