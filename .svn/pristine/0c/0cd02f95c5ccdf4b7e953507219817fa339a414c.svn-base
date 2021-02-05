$(function(){
  function paigong(){
    $.ajax({
      type:'get',
      url:url+'/WebProject/getOrder.action',
      error:function(error){console.log(error)},
      success:function(res){
        console.log(res)
        var html="";
        $.each(res,function(i,v){
          html+="<tr class=''><td class='td_center' style='width:60px;'>"+(i+1)+"</td><td class='td_center' style='width:100px;' value=''>"+v.orderNo+"</td><td class='td_center' style='width:100px;' value=''>"+v.policyNo+"</td><td class=' td_center' style='width:150px;' value=''>"+v.username+"</td><td class='td_center' style='width:100px;' value=''>"+v.dateTime+"</td><td class='td_center' style='width:100px;' value=''>"+v.paytime+"</td><td class='td_center' style='width:100px;' value=''>"+(v.status=='0'?'未发送':'已发送')+"</td><td class='td_center' style='width:150px;' ><div class='btn-group btn-group-sm' role='group'><button type='button' aria-expanded='false'  class='btn btn-primary facadmin' data-id="+v.orderNo+"><span class='glyphicon glyphicon-edit' aria-hidden='true'></span>设备明细</button> </div><div class='btn-group btn-group-sm' role='group'><button type='button' aria-expanded='false'  class='btn btn-info tuisong' data-status="+v.status+" data-id="+v.orderNo+"><span class='glyphicon glyphicon-comment' aria-hidden='true'></span>发送</button> </div></td></tr>";
        })
        $('#GridTable').html(html);
        
        $('.facadmin').click(function(){
          var id=$(this).attr('data-id');
          console.log(id);
          var width=$(window).width();
          var height=$(window).height();
          layer.open({
            type: 2,
            title: '设备明细',
            maxmin: true,
            offset: ['25px'],
            shadeClose: true, //点击遮罩关闭层
            shade: 0.5, //不显示遮罩
            // area: [width + 'px', height + 'px'],
            area: [width*0.9 + 'px', height-50 + 'px'],
            content: "./paigongdan.html?id="+ id 
        });
        })

        $('.tuisong').click(function(){
          var id=$(this).attr('data-id')
          var status=$(this).attr('data-status')
          if(status=='1'){
            layer.open({
              content:'订单已发送,无需点击发送'
            })
          }else{
            //http://p240647i77.qicp.vip/newEarlyWarn/MinAnMQ/sendWGD.action?orderNo=22
            $.ajax({
              type:'get',
              url:url+'/MinAnMQ/sendWGD.action',
              data:'orderNo='+id,
              error:function(error){console.log(error)},
              success:function(res){
                console.log(res);
                if(res.status=='true'){
                  layer.open({
                    content:res.mess
                  })
                  setTimeout(function(){
                    location.reload();
                  },1000)
                }else{
                  layer.open({
                    content:res.mess
                  })
                }
              }
            })
          }
        })
      }
    })
  }
  
  var powerId=localStorage.getItem('new_role');
    if(powerId == 1000 ) {
      paigong();
    }else{
      alert('用户无此权限,如需此权限请向上级申请')
    }
})

//刷新
function RefreshClick() {
  window.location.reload();
}