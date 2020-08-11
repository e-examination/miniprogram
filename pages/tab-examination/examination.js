// pages/tab-examination/examination.js
const app = getApp();
import {wxApiPromisify, wxsetDataPromisify} from '../../utils/wxApiPromisify';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showMode: 0,
    test_status: "未开始",
    test_name: "核酸检测快速预约",
    test_image: "https://img.yzcdn.cn/vant/cat.jpeg",
    test_price: "230",
    test_person: "张三",
    test_starttime: "2020-2-20",
    test_hospital: "北京协和医院",
    activeName: '1',
  },

  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var _this = this;
    this.getTabBar().init();

    this.setData({
      showMode: app.gData.mode
    });
    
  },

  onChange(event) {
    this.setData({
      activeName: event.detail,
    });
  },  
  //以下暂时没有使用-----------------------------------------------------------------------------------------------
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

  },
})