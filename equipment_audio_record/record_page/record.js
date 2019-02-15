/** 录音控件

理论上说，wxApp 同时只能有一个录音控件工作

record 为构造函数，生成录音控件实体
1. 控件抽象成两个行为
2. start ( { before(), after() })
3. stop 触发 after；可以尝试 stop ({ after() })

**/
function record () {

  // 录音控件
  const recorderManager = wx.getRecorderManager()

  let event = {};

  // 初始化录音设备
  recorderManager.onStart(() => { });

  recorderManager.onPause(() => { });

  const options = {

    duration: 15000,
    sampleRate: 44100,
    numberOfChannels: 1,
    encodeBitRate: 192000,
    format: 'mp3',
    frameSize: 50

  };

  // before / after
  function record_start(opts) {

    // 录音开始
    if (typeof opts.before != 'undefined') {

      opts.before();

    }

    // 录音结束回调
    if (typeof opts.after != 'undefined') {

      event.after = opts.after;

    }

    recorderManager.start(options);

  };

  function record_stop(opts) {
	  
	  // 录音结束回调
    if (typeof opts != 'undefined' && typeof opts.after != 'undefined') {

	  // after (r);
      event.after = opts.after;

    }

    recorderManager.stop();

  };

  recorderManager.onStop((res) => {

    // const { tempFilePath } = res;

    // console.log('record stop')

    // 录音结束事件
    if (typeof event.after != 'undefined') {

      event.after(res);

    };

  });

  recorderManager.onError((e)=>{

    // 录音结束事件
    if (typeof event.after != 'undefined') {

      event.after(res);

    };

  });

  recorderManager.onFrameRecorded((res) => {

    // const { frameBuffer } = res;
    // console.log('frameBuffer.byteLength', frameBuffer.byteLength);

  });

  return {
    start: record_start,
    stop: record_stop
  }

}

module.exports = record;