//  var url="http://p240647i77.qicp.vip/earlyWarn";
var url = "http://112.74.126.51/earlyWarn";
var anfang_url = "http://112.74.126.51/earlyWarn";
var test_url = "http://118.89.29.100/earlyPlatform"; //测试100
var hua_url = "http://p240647i77.qicp.vip/earlyWarn"; //花生壳 
var liu_url = "http://192.168.0.156:8080/earlyWarn" //小刘
var hua_two_url = "http://p240647i77.qicp.vip/earlyWarn"; //花生壳 


var goKey = "BC-693f25464a694a14a5e0adbccb96051d"

var img_url = "edog-online.com"
var width = document.documentElement.clientWidth;
var height = document.documentElement.clientHeight;
sessionStorage.setItem('width', width)
sessionStorage.setItem('height', height)
var username = localStorage.getItem('userName')
var lat = localStorage.getItem('firstInfo')
console.log(lat)
if (username == null || username == "") {
  alert('请登录后进入主页')
  top.location.href = "../login.html"
}
if (lat == null || lat == "") {
  alert('未获取定位,请重新登录')
  top.location.href = "../login.html"
}
function heartTiao() {
  $.ajax({
    type: 'get',
    url: url + '/WebProject/WebRegisterHeartbeatTime.action',
    data: 'my_username=' + username,
    error: function (error) {
      console.log(error)
    },
    success: function (res) {
      console.log(res)
    }
  })
}
heartTiao()
setInterval(function () {
  heartTiao()
}, 600000)