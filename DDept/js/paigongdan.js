$(function(){
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
    //http://p240647i77.qicp.vip/newEarlyWarn/WebProject/getOderDevice.action?orderid=22
    $.ajax({
      type:'get',
      url:url+'/WebProject/getOderDevice.action',
      data:'orderid='+global.id,
      error:function(error){console.log(error)},
      success:function(res){
        console.log(res)
        var html="";
        if(res.length != 0){
          $.each(res,function(i,v){
            html+="<tr class=''><td class='td_center' style='width:60px;'>"+(i+1)+"</td><td class='td_center' style='width:100px;' value=''>"+v.deviceNo+"</td><td class='td_center' style='width:100px;' value=''>"+v.orderid+"</td><td class='td_center'><div class='btn-group btn-group-sm' role='group'><button type='button' aria-expanded='false'  class='btn btn-primary facadmin' data-id="+v.orderid+" data-cid="+v.dataid+"><span class='glyphicon glyphicon-edit' aria-hidden='true'></span>安装信息</button> </div></td></tr>";
          })
        }else{
          console.log(1);
          html="<tr class=''><td class='td_center' style='width:60px;' colspan='4'>暂无设备明细信息</td></tr>"
        }
        
        $('#GridTable').html(html);

        $('.facadmin').click(function(){
          var id=$(this).attr('data-id');
          var cid=$(this).attr('data-cid');
          console.log(cid);
          console.log(cid.split(','))
          var width=$(window).width();
          var height=$(window).height();
          layer.open({
            type: 2,
            title: '安装信息',
            maxmin: true,
            offset: ['25px'],
            shadeClose: true, //点击遮罩关闭层
            shade: 0.5, //不显示遮罩
            // area: [width + 'px', height + 'px'],
            area: [width*0.8 + 'px', height-50 + 'px'],
            content: "../Sys/SUser/anzhuangFac.html?id="+ id +'&cid='+cid
            
          });
        })
      }
    })
})