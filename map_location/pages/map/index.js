//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
  },
  onLoad: function () {

    let _this = this;

    // 获取用户地理位置
    wx.getLocation({
      type: 'gcj02', // gcj02 反应在小程序地图上；wgs84 返回的 gps 坐标
      success(res) {

        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy

        _this.setData({
          latitude: latitude,
          longitude: longitude,
          markers: [{
            id: "0",
            latitude: latitude,
            longitude: longitude,
            title: "marker",
          }]
        });

      }
    })
  },
})
