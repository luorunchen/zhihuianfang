

var userName=parseInt(localStorage.getItem('userName'));
function edit(cp,ls){
  //  console.log(cp);
    var col="";    //cp(pno)  当前页数  ls(pageSize) 每页显示几行  col  
    var state=0;
    var kw="";
    $.ajax({
        type:'get',
        url:url+'/admin/device/getAllDeviceWeb.action',
        data:'username='+userName+'&cp='+cp+'&col='+col+'&state='+state+'&kw='+kw+'&ls='+ls,
        dataType:'json',
        error:function(error){
            console.log('DDept/js/details'+error);
        },
        success:function(result){
           console.log(result);
            var count=result.list[0].count;
          //  console.log(count);
            var num=Math.ceil(count/ls);
            sessionStorage.setItem('num',num);
            console.log(num);
            var html="";
            var udata=result.list[0].allObj;
            
          //  console.log(udata);
            if(udata!=""||udata!=null){
                $.each(udata,function(i,v){
                    html+="<tr><td  class='td_center' style='width:60px;' data-val="+v.devId+">"+(i+1)+"</td><td  class='td_center' style='width:100px;' value="+v.name+">"+v.name+"</td><td  class='td_center' style='width:100px;' value="+v.installLocation+">"+v.installLocation+"</td><td  class='td_center' style='width:100px;' value="+v.dSName+">"+v.dSName+"</td><td  class='td_center' style='width:100px;' value="+v.loopNumber+">"+v.loopNumber+"</td><td  class='td_center' style='width:210px;' value="+v.productNumber+">"+v.productNumber+"</td><td  class='td_center' style='width:100px;' value="+v.regdate+">"+v.regdate+"</td><td  class='td_center' style='width:100px;' value="+v.heartbeatTime+">"+v.heartbeatTime+"</td><td  class='td_center' style='width:100px;' value="+v.dVName+">"+v.dVName+"</td><td class='td_center' style='width:100px;' value="+v.remark+">"+v.remark+"</td><td  class='td_center' style='width:150px;'><div class='btn-group btn-group-sm' role='group'><button type='button' aria-expanded='false'  class='btn btn-primary EditClick'><span class='glyphicon glyphicon-edit' aria-hidden='true'></span>编辑 </button> </div><div class='btn-group btn-group-sm' role='group'><button type='button' aria-expanded='false' id='faca_delete' onclick='DeleteClick();' class='btn btn-danger'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span>删除 </button> </div></td> </tr>";
                })  
                $('#GridTables').html(html);
            }
                
            var html="";
            html="<div class='input-group' style='float:left;padding-left:10px;'><span>第</span><input type='text' value='"+cp+"' readonly='readonly'><span>/</span><input type='text' value='"+num+"' readonly='readonly'><span>页,每页</span><input type='text' value='12' readonly='readonly'><span>行，共</span><input type='text' value='"+udata.length+"' readonly='readonly'><span>行</span></div>";
            $('.input_left').html(html);
            
            var aPrev=$('.aPrev');
            var aNext=$('.aNext');
            if(cp===1) aPrev.addClass('disabled');   
            if(cp===num)aNext.addClass('disabled');  
            
                   
            var num=parseInt(num);   //总页数
           // console.log(cp);
          //  console.log(num);
            var html="";
           
            if(cp-2>0){
                html="<li><a href='#' class='aPrev'>"+(cp-2)+"</a></li>";
            }
            if(cp-1>0){
                html=html+"<li><a href='#' class='aPrev'>"+(cp-1)+"</a></li>";
            }
            html=html+"<li class='active'><a href='#'>"+cp+"</a></li>";
            if(cp+1<=num){
                html=html+"<li><a href='#' class='aPrev'>"+(cp+1)+"</a></li>";
            }
            if(cp+2<=num){
                html=html+"<li><a href='#' class='aPrev'>"+(cp+2)+"</a></li>";
            }
            
            $("#pagination").html(html);
            $("#pagination").prepend("<a href='#' class='firstPage btn btn-default' style='float:left'>首页</button>");
            $("#pagination").append("<a href='#' class='endPage btn btn-default' >末页</button>")
            
            $('.EditClick').click(function(){
                console.log($(this));
                var data=$(this).parent().parent().parent().children();console.log(data);
                var devId=$('.td_center').attr('data-val');
                var uName=data[1].innerHTML;
                var uAddress=data[2].innerHTML;
                var uType=data[3].innerHTML;
                var uLoop=data[4].innerHTML;
                var uPnum=data[5].innerHTML;
                var uResTime=data[6].innerHTML;
                var uHeTime=data[7].innerHTML;
                var uFirm=data[8].innerHTML;
                var uState=data[9].innerHTML;
                console.log(uName+'----'+uAddress+'-----'+uType+'----'+uLoop+'-----'+uPnum+'----'+uResTime+'-----'+uHeTime+'-----'+uFirm+'-----'+uState);
                window.top.OpenFrame('./Sys/SUser/facility.html?uName='+uName+'&uAddress='+uAddress+'&uType='+uType+'&uLoop='+uLoop+'&uPnum='+uPnum+'&uResTime='+uResTime+'&uHeTime='+uHeTime+'&uFirm='+uFirm+'&devId='+devId+'&uState='+uState,550,350,"","项目管理设置",function(r){
                    
                })
            })
            
        }
    })
}
edit(1,12);

$("#pagination").on("click","a",function(e){
    e.preventDefault();
    // 2.获取当前页码
    var num=sessionStorage.getItem('num');
  //  console.log($(this).html());
    if($(this).html()=='首页'){
        edit(1,12);
    }else if($(this).html()=='末页'){
        edit(num,12);
    }else{
        var cp=parseInt($(this).html());
        console.log(cp);
        // 3.调用分页函数
        edit(cp,12);
    }

})

    $('.Grid_bd').on('mouseenter','tr',function(){ 
        $(this).addClass('hoverTr');
    });
    $('.Grid_bd').on('mouseleave','tr',function(){ 
        $(this).removeClass('hoverTr');
    })
    
    
    // $('.Grid_bd').on('click','tr',function(event){ 
    //     var that=$(this);
    //     console.log($(this));
    //     if(that.hasClass('selectTr')){
    //         that.removeClass("selectTr");  
    //     }else{
    //         that.addClass("selectTr").siblings().removeClass("selectTr");
    //     }
    // });

    //新增
    function UserAdd(){
        window.top.OpenFrame('./Sys/SUser/SFacAdd.html','550','350',"","设备新增",function(r){
                
        })
    }
     //编辑
    function EditClick(){
        var $table=$('#GridTables>tbody>tr');
        if($table.hasClass('selectTr')){  
             var tr_val=$('.selectTr').children();
             var devId=$('.td_center').attr('data-val');
            var uName=tr_val[1].innerHTML;
            var uAddress=tr_val[2].innerHTML;
            var uType=tr_val[3].innerHTML;
            var uLoop=tr_val[4].innerHTML;
            var uPnum=tr_val[5].innerHTML;
            var uResTime=tr_val[6].innerHTML;
            var uHeTime=tr_val[7].innerHTML;
            var uFirm=tr_val[8].innerHTML;
            var uState=tr_val[9].innerHTML;
            console.log(uName+'----'+uAddress+'-----'+uType+'----'+uLoop+'-----'+uPnum+'----'+uResTime+'-----'+uHeTime+'-----'+uFirm+'-----'+uState);
            window.top.OpenFrame('./Sys/SUser/facility.html?uName='+uName+'&uAddress='+uAddress+'&uType='+uType+'&uLoop='+uLoop+'&uPnum='+uPnum+'&uResTime='+uResTime+'&uHeTime='+uHeTime+'&uFirm='+uFirm+'&devId='+devId+'&uState='+uState,550,350,"","项目管理设置",function(r){
                
            })
         }else{
            alert("请先选择要编辑的记录！");
            return;
         }
       
    }
     //删除
    function DeleteClick(){
        alert('请在微信公众号或者app中删除');
    }

     //刷新
    function RefreshClick(){
        window.location.reload();
    }

  
  
    

 