// 将需要监听回调的事件，用过句柄传递方式，放到正常流程中
/**
 * 
 * play 控件
 * 
 * .play ({ before () {}, after () {} }) after 自动停止回调触发
 * .stop ({ after() }) 手动主动停止触发
 * 
**/

function audio (options) {

    let playing = false;
    let _events = {
  
      end : function (res) {
        console.log(res)
      }
  
    }
  
    // 播放控件
    let innerAudioContext = wx.createInnerAudioContext();
  
    innerAudioContext.onPlay(() => {
      //console.log('开始播放');
    });
  
    innerAudioContext.onError((res) => {
  
      playing = false;
      _events.after(res);
      
    });
  
    // 播放结束监听
    innerAudioContext.onEnded ((res) => {
  
      playing = false;
      _events.after(res);
  
    });
  
    function stop (opts) {
  
      playing = false;
  
      innerAudioContext.stop();
      if(typeof opts != 'undefined'){
  
        opts.after();
  
      };
  
    }
  
    function play (opts) {
  
      if (playing) return;
  
      // 直接处理播放前事件
      if (typeof opts.before != "undefined") {
  
        opts.before();
  
      };
  
      // 使用句柄处理播放后事件
      if (typeof opts.after != "undefined") {
        _events.after = opts.after;
      };
  
      playing = true;
      innerAudioContext.src = opts.src;
      innerAudioContext.play();
  
    }
  
    return {
  
      play: play,
      stop: stop
  
    }
  
  }
  
  module.exports = audio;