imoport SYS from 'record.js';

// 录音设备
ENG_RECORD = new SYS.engRecord({
  
  // 按下录音按钮
  start : function(){

  },
  
  // 释放录音按钮
  stop : function(res){

	// 录音存放的临时文件
    res.tempFilePath

	// 录音时长
    res.duration
	
  }
  
})