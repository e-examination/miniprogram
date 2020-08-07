const { mock } = require("mockjs");

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
    hospital_tags: ['三甲医院','周六上班'],
    hospital_mAmount:"250",
    hospital_rate:"9.5"
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getTabBar().init();
    
    //权宜之计，用mockjs模拟数据
    var Mock = require('mockjs')
    var hospital = Mock.mock({
      "array|1": [
        {
          name: '复旦大学附属中山医院',
          image: 'https://img.yzcdn.cn/vant/cat.jpeg',
          address: '上海市徐汇枫林路180号',
          tags: ["三甲医院","距离最近"],
          mAmount: '1201',
          rate: '5.0'
        },
        {
          name: '上海交通大学医学院附属新华医院',
          image: 'https://img.yzcdn.cn/vant/cat.jpeg',
          address: '上海市杨浦区控江路1665号',
          tags: ['三甲医院','人气最高','周末上班'],
          mAmount: '788',
          rate: '5.0'
        }
      ]
    })
    // 输出结果
    this.setData({
      hospital_name: hospital.array.name,
      hospital_image: hospital.array.image,
      hospital_address: hospital.array.address,
      hospital_tags: hospital.array.tags,
      hospital_mAmount: hospital.array.mAmount,
      hospital_rate: hospital.array.rate

    })
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