Page({

  /**
   * 页面的初始数据
   */
  data: {
  
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

      let _this = this;
  
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

  // 跳转到首页面

  goto_main(){

      wx.reLaunch({
          url: '/pages/main',
      })

  },

  // 生成保存海报
  save_poster(){

      drawPoster('poster', function (tempFile) {

		  // 将临时文件存到相册
          wx.saveImageToPhotosAlbum({

              filePath: tempFile,
              success: function () {

                  wx.showToast({
                      title: '成功保存到相册',
                      icon: 'success',
                      duration: 2000
                  })


              }
          })

      })

  }

})


// 生成海报页面

function drawPoster(target,cb){

    // 绘制海报 handle

    let ctx = wx.createCanvasContext(target);

    let conf = {
        area_width: 630,
        area_height: 868
    }

    // 绘制底色

    ctx.rect(0, 0, conf.area_width, conf.area_height);

    // 蓝色渐变
    let blue_gradient = ctx.createLinearGradient(0, 0, 170, 0);
        blue_gradient.addColorStop(0, "#03b7ff");
        blue_gradient.addColorStop(1, "#14adfe");

    ctx.setFillStyle(blue_gradient)
    ctx.fill();

    // 绘制 头图

    ctx.drawImage('/imgs/poster_t.png', 0, 0, 562, 230, 34,49, 562, 230);

    // 卡片背景
    ctx.setFillStyle('white');
    ctx.fillRect(20, 274, 590, 562);

    // 文字
    ctx.setFontSize(38);
    ctx.setFillStyle('#000000');
    ctx.setTextAlign('center');
    ctx.fillText('我在词汇PK中取得了胜利！', 315, 395);

    ctx.setFontSize(32);
    ctx.setFillStyle('#888888');
    ctx.setTextAlign('center');
    ctx.fillText('传说中的英语学霸就是我。', 315, 475);

    // 中间按钮图片    

    ctx.drawImage('/imgs/pk/poster_btn.png', 0, 0, 566, 142, 174, 535, 283, 71);

    // 分割线
    ctx.beginPath();
    ctx.setStrokeStyle('#e2e2e2');
    ctx.setLineWidth(1);
    ctx.moveTo(38,673);
    ctx.lineTo(587, 673);
    ctx.stroke();

    // 二维码
    ctx.drawImage('/imgs/pk/poster_qe.png', 0, 0, 95, 95, 59, 701, 95, 95);

    ctx.setFontSize(18);
    ctx.setFillStyle('#2e2e2e');
    ctx.setTextAlign('left');
    ctx.fillText('长按识别二维码', 190, 720);

    ctx.setFontSize(18);
    ctx.setFillStyle('#2e2e2e');
    ctx.setTextAlign('left');
    ctx.fillText('测词汇量，加入词汇PK', 190, 755);

    ctx.setFontSize(18);
    ctx.setFillStyle('#2e2e2e');
    ctx.setTextAlign('left');
    ctx.fillText('你就是词汇玩家', 190, 788);


    // canvas 绘制函数

    ctx.draw(false,()=>{
		
		// 绘制结束后的回掉部分

		// 保存临时文件

        wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: conf.area_width,
            height: conf.area_height,
            destWidth: conf.area_width,
            destHeight: conf.area_height,
            canvasId: target,
            fail: function (res) {
                console.log(res)
            },
            success: function (res) {

                if (cb) {
                    cb(res.tempFilePath);
                };

            }
        });

    });

}