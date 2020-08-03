// pages/tab-firstpage/firstpage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    test_status: "更多医院",
    test_name: "北京协和医院",
    test_image: "https://img.yzcdn.cn/vant/cat.jpeg",
    test_price: "230",
    test_person: "张三",
    test_starttime: "2020-2-20",
    test_hospital: "北京协和医院",
    test_place:"杨浦区",
    test_num:"250",
    test_num1:"9.5"
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getTabBar().init();
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