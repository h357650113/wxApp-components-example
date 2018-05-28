let equ = {
	
	// 全局录音设备 - 构造函数
	engRecord(opts){

        let __status = true;

		// 获取录音控制器句柄

        const recorderManager = wx.getRecorderManager();

		// 监听录音开始事件

        recorderManager.onStart(() => {
			
			if(opts.start){
				
				opts.start();
				
			}
			
        });

		// 监听录音重新开始事件
		
        recorderManager.onResume(() => {

            // console.log('recorder resume')

        });

		// 监听录音暂停事件
		
        recorderManager.onPause(() => {

            // console.log('recorder pause')

        });

		// 监听录音停止事件
		
        recorderManager.onStop((_res) => {

			if(opts.stop){
				
				opts.stop(_res);
				
			}

        });
		
        recorderManager.onFrameRecorded((res) => {

            const { frameBuffer } = res;
            // console.log('frameBuffer.byteLength', frameBuffer.byteLength)

        });

        const options = {
            duration: 10000,
            sampleRate: 44100,
            numberOfChannels: 1,
            encodeBitRate: 192000,
            format: 'mp3',
            frameSize: 50
        }

        return {

            start : function(cb){
                recorderManager.start(options);
            },

            stop : function(cb){
                recorderManager.stop();
            },

            trigger : function(){

                if(__status){

                    recorderManager.start(options);
                    __status = false;

                } else {

                    recorderManager.stop();
                    __status = true;

                }

            }
            
        }

    }
	
}

module.exports = equ;