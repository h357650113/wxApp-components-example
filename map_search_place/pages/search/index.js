// pages/search/index.js
const map = require('../../utils/qqmap-wx-jssdk.min.js');
let qqmapsdk;

Page({

  search (e) {

    let _this = this;

    // 实例化API核心类
    qqmapsdk = new map({
      key: '6FHBZ-5UEL5-NUSIZ-QOVY4-Z4HZH-FYFOY'
    });

    qqmapsdk.search({

      // 输入内容
      keyword: e.detail.value,
      // location: '39.980014,116.313972',  //设置周边搜索中心点
      success: function (res) {
        _this.setData({
          searchList: res.data
        })
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }

    })

  },

  /**
   * 页面的初始数据
   */
  data: {
    searchList: []
  },

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
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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