//app.js

/**
 * pk 朋友分享登录机制
 * 
 * 
 * onWaitingFriend.success == true
 * 
 *     emit.question(true) <> 两个用户全部 already 之后，onQuestion 接收题目
 * 
 * onQuesiont.start == true
 *  
 *     draw question
 * 
 * onAnswer.start == true
 *
 *     draw answer
 * 
 * 
 */

import config from './pages/lib/config.js';
import log from '/utils/log.js';

// let config = require('./pages/lib/config.js');
let SCENE = require('./src/scene.js');
let scene = new SCENE(config,wx);
let Req = require('./src/wxReq.js');
let req = new Req(wx);

let wsOptions = {

    // 监听用户退出
    onQuit : function(d){

        log.console('user quite', d);

        if (typeof d.quit != 'undefined' && d.quit) {

            wx.showToast({

                icon: "none",
                title: "对方退出对战...",
                duration: 2000

            });

        }

    },

    // 监听错误 error, 返回首页

    onError : function(d){

        if(typeof d.error != 'undefined' && d.error){

            wx.reLaunch({
                url: '/pages/main'
            });

            wx.showToast({

                icon: "none",
                title : "链接中断...",
                duration : 2000

            });

        }

    },

    // 监听答案 - 重绘页面

    onResult : function (d) {

        log.console('on result', d);

        // 对战结束

        if (typeof d.is_end != 'undefined' && d.is_end){

            config.pkResult = d;

            wx.reLaunch({
                url: '/pages/pk/result',
            });

        }


        // 同步页面重绘

        wx.hideToast();
        

        // 初始化题目

        for(let k in d){

            config.pkFriend[k] = d[k];

        };

        config.pkFriend.question.list = resultFormate(d.list);
        
        config.pkFriend.target.setData({

            // 绘制用户信息
            // player_host, player_challenger, times
            player_host: config.pkFriend.player_host,
            player_challenger: config.pkFriend.player_challenger,

            // 绘制时间
            // 绘制答题选项
            question: config.pkFriend.question

        });

        // 此处进入下一题
        setTimeout(function(){

            config.socket.question(true);

        },800);

        // 格式化答案
        function resultFormate(list) {

            let _cache = [];

            /**
             * text
             * class
             * item_id
             */

            for (let i = 0; i < list.length; i++) {

                _cache[i] = {

                    text: list[i].text,
                    right_class: "list",
                    player_host_select: "none",
                    player_challenger_select: "none",
                    item_id: list[i].item_id

                }

                if (list[i].is_right == true) {

                    _cache[i].right_class = "list is_right";

                };

                if (list[i].player_host == true) {

                    _cache[i].player_host_select = "right";

                } else if (list[i].player_host == false) {

                    _cache[i].player_host_select = "error";

                }

                if (list[i].player_challenger == true) {

                    _cache[i].player_challenger_select = "right";

                } else if (list[i].player_challenger == false) {

                    _cache[i].player_challenger_select = "error";

                }

            }

            return _cache;

        }

    },

    // 监听发题 - 重绘页面

    onQuestion : function (d) {

        log.console('on question',d);

        // 判断是否准备好

        if(!d.start){

            return;

        }

        // 同步页面重绘

        wx.hideToast();

        // 重置 clicked 按钮

        config.pkFriend.clicked = false;
        
        // 更新题目

        for(let k in d){
            
            config.pkFriend.question[k] = d[k];

        }

        config.pkFriend.question.list = questionFormate(config.pkFriend.question.list);

        config.pkFriend.clock.begin();


        // 绘制 pk 页面

        config.pkFriend.target.setData({

            question: config.pkFriend.question

        })

        // 格式化发题
        
        function questionFormate(list) {

            let _cache = [];

            /**
             * text
             * item_id
             * class
             */

            for (let i = 0; i < list.length; i++) {

                _cache[i] = {

                    text: list[i].text,
                    right_class: "list",
                    item_id: list[i].item_id

                }

            }

            return _cache;

        }


    },

    // 监听创建房间返回 room_id

    onCreatePkRoom: function (d) {

        log.console('on create pk room', d);

        wx.hideLoading();

        if (d.room_id != undefined) {

            config.pkHome.room_id = d.room_id;

            // 使用页面压栈跳转

            wx.navigateTo({
                url: '/pages/pk/choice?room_id=' + d.room_id,
            })

        }

    },


    // 等待朋友加入对战

    onStart: function (d) {

        log.console('socket : on waiting friend ',d);

        config.pkFriend.player_challenger['nickName'] = d.player_challenger.nickName;
        config.pkFriend.player_challenger['avatarUrl'] = d.player_challenger.avatarUrl;
        config.pkFriend.player_challenger['score'] = 0;

        config.pkFriend.player_host['nickName'] = d.player_host.nickName;
        config.pkFriend.player_host['avatarUrl'] = d.player_host.avatarUrl;
        config.pkFriend.player_host['score'] = 0;


        // 同步跳转页面

        if (d.success == true) {

            config.socket.question(true);

            wx.redirectTo({
                url: '/pages/pk/pking',
            })

        }

    }
    
};



App({

  onLaunch: function (options) {

      log.console('app onLaunch',options);

      // 启动 socket 链接

      config.socket = req.socket(wsOptions);


  },
  onHide : function(){

      // 小程序隐藏后 - 持续触发
      config.socket.quite();

  },

  globalData: {

    // 用户信息
    userInfo: null,
    // 页面配置
    config: config,
    // 页面控制方法
    scene : scene,
    req: req,
    log: log

  }

})