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
      var tel='1'
    }else{
      var tel='0'
    }
    console.log(app)
    console.log(sms)
    console.log(tel)
    ////http://p240647i77.qicp.vip/newEarlyWarn/WebProject/UpdatePush.action?my_username=18975958581&pid=8890&pname=%E7%94%B5%E6%B0%94%E7%81%AB%E7%81%BE%E7%9B%91%E6%8E%A71%EF%BC%88%E8%8E%86%E7%94%B0%E5%B8%82)&app=1&sms=1
    $.ajax({
      type: 'get',
      url: url + '/WebProject/UpdatePush.action',
      data: 'pname=' + global.pname  + '&app=' + app +'&my_username='+username+'&sms='+ sms +'&pid='+ global.pid +'&phone='+tel,
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
              parent.parent.layer.close(index);
              parent.parent.location.reload(); //父级刷新
          }, 1000);
        }
      }
    })s
  })
})