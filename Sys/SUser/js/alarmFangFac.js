$(function(){
  var username=localStorage.getItem('userName');
  var global=(function(){
      	var search=$('#ediModelIfm').context.URL;
        var search=decodeURI(search);
  		var global={};		
 		if(search!=""){	
      		search.slice(1).split('?')[1].split('&').forEach(	
      			function(val){
        			var arr=val.split("=");		
          			global[arr[0]]=arr[1];		
      			}
      		);
       	}
    	return global;		
 	})();
    console.log(global);
    if(global.app=='1'){
      $('.menuAlias_app').prop("checked",true);
    }
    if(global.sms=='1'){
      $('.menuAlias_sms').prop("checked",true);
    }
    if(global.phone=='1'){
      $('.menuAlias_tel').prop("checked",true);
    }
  $('#save-btn').click(function(){
    var obj = document.getElementsByName("thirdMenuIdList");
    var check_val = [];
    for (var k in obj) {
      if (obj[k].checked) {
        check_val.push(obj[k].value);
      }
    }
    var p_id = check_val.join(',');
    console.log(p_id)
    if(p_id.indexOf('app')!=-1){
      var app='1'
    }else{
      var app='0'
    }
    if(p_id.indexOf('sms')!=-1){
      var sms='1'
    }else{
      var sms='0'
    }
    if(p_id.indexOf('tel')!=-1){
      var phone='1'
    }else{
      var phone='0'
    }
    console.log(phone)
      //http://p240647i77.qicp.vip/newEarlyWarn/WebProject/UpdateDevicePush.action?devicename=%E9%85%8D%E7%94%B5%E6%9F%9C&app=1&my_username=17720831119&sms=1&deviceId=0460043006202210
    $.ajax({
      type: 'get',
      url: url + '/WebProject/UpdateDevicePush.action',
      data: 'devicename=' + global.name  + '&app=' + app +'&my_username='+username+'&sms='+ sms +'&deviceId='+ global.devSignature+'&phone='+ phone,
      error: function (error) {
        console.log(error)
      },
      success: function (res) {
        console.log(res)
        if(res.status=='1'){
          layer.open({
            content:res.mess
          })
          var index = parent.layer.getFrameIndex(window.name);
          setTimeout(() => {
              // parent.parent.layer.close(index);
              // parent.parent.location.reload(); //父级刷新
          }, 1000);
        }
      }
    })
  })
})