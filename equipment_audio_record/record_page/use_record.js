let Record = require("/utils/record");
let record = new Record();

Page({
	
  record_start() {

    record.start({

      // 录音之前		
      before() {}
	  
    })

  },

  // 手动停止录音
  record_end() {

    record.stop({
		
		// 完成录音
		after (r) {}
		
	})

  },

  
  
})
