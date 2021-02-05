// 加载js
function addJs(filepath, callback) {
  var oJs = document.createElement("script");
  oJs.setAttribute("src", filepath);
  oJs.onload = callback;
  document.getElementsByTagName("head")[0].appendChild(oJs);
}

var ezuikitTalkData = {
  accessToken: "at.60vjpt5tbescqyak0swfnhx5ctep20af-1hqfgxxu4v-0zmeenu-nqtnr1ktn", // 应用accessToken
  ezopen: "ezopen://MTHHWY@open.ys7.com/D76375435/1.hd.live", // 包含设备信息的ezopen协议
  decoderPath: './' // 当前页面与插件主文件ezuiit-talk相对路径
};
console.log("ezuikitTalkData------", ezuikitTalkData)
var ezuikitPath = ezuikitTalkData.decoderPath + '/ezuikit.js';
var startSave = false;
var playing = false;
var decoder;
var url = ezuikitTalkData.ezopen;
console.log(url)
var accessToken = ezuikitTalkData.accessToken;
addJs(ezuikitPath, function () {
  var autoplay = 1;
  var audioId = 0;
  var templete = 2;
  var deviceSerial = url.split('/')[3];
  var channelNo = url.split('/')[4].split('.')[0];
  if (autoplay == '1') {
    init();
  }
  var width = document.documentElement.clientWidth;
  var height = document.documentElement.clientHeight;
  $("#playWind").height(height - (48 * 2));
  //	$("#video-hd").text(url.indexOf('hd') === -1 ? '标清' : '高清');
  function init() {
    try {
      decoder && decoder.stop();
    } catch (e) {
      console.log("E", e);
    }
    $("#video-hd").text(url.indexOf('hd') === -1 ? '标清' : '高清')
    setTimeout(() => {
      decoder = new EZUIKit.EZUIPlayer({
        id: "playWind",
        autoplay: true,
        audioId: audioId,
        url: url,
        accessToken: ezuikitTalkData.accessToken,
        decoderPath: ezuikitTalkData.decoderPath,
        width: width,
        height: height - (48 * 2),
      });
      console.log(decoder)
    }, 100);
    // 延时函数 -- iframe未加载完成，宽高获取不到
  }

  function initStar() {
    var startSavePromise = decoder.startSave(0, (new Date().getTime() + 'video'));
    startSavePromise.then(function (data) {
        console.log(data);
        console.log("start save success", startSavePromise);
        $("#startSave").hide();
        $("#stopSave").show();
      })
      .catch(function (error) {
        console.log("start Save error", error)
      })

    setTimeout(() => {
      console.log('结束录像')
      var stopSavePromise = decoder.stopSave(0);
      stopSavePromise.then(function (data) {
          console.log("stop save success", stopSavePromise)
          $("#stopSave").hide();
          $("#startSave").show();
        })
        .catch(function (error) {
          console.log("stop Save error", error)
        })
    }, 6000);
  }
  $('#btn').click(function () {
    console.log(decoder.startSave)
    var startSavePromise = decoder.startSave(0, (new Date().getTime() + 'video'));
    startSavePromise.then(function (data) {
        console.log(data);
        console.log("start save success", startSavePromise);
        $("#startSave").hide();
        $("#stopSave").show();
      })
      .catch(function (error) {
        console.log("start Save error", error)
      })

    /*	setTimeout(() => {
					console.log('结束录像')
					var stopSavePromise = decoder.stopSave(0);
					stopSavePromise.then(function (data) {
						console.log("stop save success", stopSavePromise)
						$("#stopSave").hide();
						$("#startSave").show();
					})
						.catch(function (error) {
							console.log("stop Save error", error)
						})    
				}, 6000);*/
  })
})