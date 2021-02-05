
var userName=parseInt(localStorage.getItem('userName'));
function edit(cp,ls){
  //  console.log(cp);
    var col="";    //cp(pno)  当前页数  ls(pageSize) 每页显示几行  col  
    var state=0;
    var kw="";
    $.ajax({
        type:'get',
        url:url+'/admin/project/getAllProjecForState.action',
        data:'username='+userName+'&cp='+cp+'&col='+col+'&state='+state+'&kw='+kw+'&ls='+ls,
        dataType:'json',
        error:function(error){
            console.log('DDept/js/details'+error);
        },
        success:function(result){
            console.log(result);
          //  console.log(result.list);
            var count=result.list[0].count;
          //  console.log(count);
            var num=Math.ceil(count/ls);
            sessionStorage.setItem('num',num);
          //  console.log(num);
            var html="";
            var udata=result.list[0].allObj;
          //  console.log(udata);
            if(udata!=""||udata!=null){
                $.each(udata,function(i,v){
                    html+="<tr class=''><td class='td_center' style='width:60px;' data-val="+v.pid+">"+(i+1)+"</td><td class='td_center' style='width:100px;' value="+v.name+">"+v.name+"</td><td class='td_center' style='width:100px;' value="+v.location+">"+v.location+"</td><td class='td_center' style='width:100px;' value="+v.fireman+">"+v.fireman+"</td><td class='td_center' style='width:100px;' value="+v.firemanPhone+">"+v.firemanPhone+"</td><td class='td_center' style='width:100px;' value="+v.legalman+">"+v.legalman+"</td><td class='td_center' style='width:100px;' value="+v.legalmanPhone+">"+v.legalmanPhone+"</td><td class='td_center' style='width:100px;' value="+v.introduce+">"+v.introduce+"</td><td class='td_center' style='width:100px;' value="+v.remark+">"+v.remark+"</td><td class='td_center' style='width:150px;' ><div class='btn-group btn-group-sm' role='group'><button type='button' aria-expanded='false'  class='btn btn-primary editor' id='editor' ><span class='glyphicon glyphicon-edit' aria-hidden='true' ></span>编辑 </button></div><div class='btn-group btn-group-sm' role='group'><button type='button' aria-expanded='false'  class='btn btn-danger delectClick' id='delectClick'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span>删除 </button></div><div class='btn-group btn-group-sm' role='group'><button type='button' aria-expanded='false'  class='btn btn-success new_dev' id='new_dev'><span class='glyphicon glyphicon-plus' aria-hidden='true'></span>新增设备</button></div></td></tr>";
                })  
                $('#GridTables').html(html);

                
            }
            
            var html="";
            html="<div class='input-group' style='float:left;padding-left:10px;'><span>第</span><input type='text' value='"+cp+"' readonly='readonly'><span>/</span><input type='text' value='"+num+"' readonly='readonly'><span>页,每页</span><input type='text' value='6' readonly='readonly'><span>行，共</span><input type='text' value='"+udata.length+"' readonly='readonly'><span>行</span></div>";
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
            
                //编辑
            $('.editor').click(function(){
                
                var tr_data=$(this).parent().parent().parent().children();
                var pid=$('.td_center').attr('data-val');
                console.log(pid);
                var uName=tr_data[1].innerHTML;
                var uAddress=tr_data[2].innerHTML;
                var uUser=tr_data[3].innerHTML;
                var uUserTel=tr_data[4].innerHTML;
                var uRes=tr_data[5].innerHTML;
                var uResTel=tr_data[6].innerHTML;
                var uIntro=tr_data[7].innerHTML;
                var uState=tr_data[8].innerHTML;
                window.top.OpenFrame('./Sys/SUser/compile.html?uName='+uName+'&uAddress='+uAddress+'&uUser='+uUser+'&uUserTel='+uUserTel+'&uRes='+uRes+'&uResTel='+uResTel+'&uIntro='+uIntro+'&uState='+uState+'&pid='+pid,550,350,"","项目管理设置",function(r){
                    
                })
            })
                //新增
            $('.new_dev').click(function(){
                var data=$(this).parent().parent().parent().children();
                var pid=data.attr('data-val');
                console.log(pid);
                window.top.OpenFrame('./Sys/SUser/SFacAdd.html?pid='+pid,'550','630',"","新增设备",function(r){
                
                })
            })
                //删除
            $('.delectClick').click(function(){
                console.log($(this));
                var data=$(this).parent().parent().parent();
                alert('请在微信公众号或者app中删除');
            })
            
        }
    })
}
edit(1,6);

$("#pagination").on("click","a",function(e){
    e.preventDefault();
    // 2.获取当前页码
    var num=sessionStorage.getItem('num');
  //  console.log($(this).html());
    if($(this).html()=='首页'){
        edit(1,6);
    }else if($(this).html()=='末页'){
        edit(num,6);
    }else{
        var cp=parseInt($(this).html());
        console.log(cp);
        // 3.调用分页函数
        edit(cp,6);
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
    //     if(that.hasClass('selectTr')){
    //         that.removeClass("selectTr");  
    //     }else{
    //         that.addClass("selectTr").siblings().removeClass("selectTr");
    //     }
    // });
    //新增
    function UserAdd(){
        window.top.OpenFrame('./Sys/SUser/EditAdd.html','550','600',"","项目新增",function(r){
                
        })
    }
     //编辑
     
    function EditClick(){
         var $table=$('#GridTables>tbody>tr');
         if($table.hasClass('selectTr')){  
             var tr_val=$('.selectTr').children();
             var pid=$('.td_center').attr('data-val');
            var uName=tr_val[1].innerHTML;
            var uAddress=tr_val[2].innerHTML;
            var uUser=tr_val[3].innerHTML;
            var uUserTel=tr_val[4].innerHTML;
            var uRes=tr_val[5].innerHTML;
            var uResTel=tr_val[6].innerHTML;
            var uIntro=tr_val[7].innerHTML;
            var uState=tr_val[8].innerHTML;
            window.top.OpenFrame('./Sys/SUser/compile.html?uName='+uName+'&uAddress='+uAddress+'&uUser='+uUser+'&uUserTel='+uUserTel+'&uRes='+uRes+'&uResTel='+uResTel+'&uIntro='+uIntro+'&uState='+uState+'&pid='+pid,550,350,"","项目管理设置",function(r){
                
            })
         }else{
            alert("请先选择要编辑的记录！");
            return;
         }
        
    }
     //删除
    function DeleteClick(){
        alert('请在微信公众号或者app中删除');
        // var username=localStorage.getItem('userName');
        // var $table=$('#GridTables>tbody>tr');    
        // console.log($(this));
        // // if($table.hasClass('selectTr')){
        // //     if(confirm('确定要删除所选记录!')==true){
        // //         $table.each(function(){
        // //             if($(this).hasClass('selectTr')){
        // //                // $(this).css('display','none');
        // //             }else{
        // //             }
        // //         })
        // //     }else{
                
        // //     }
        // // }else{
        // //     alert("请先选择要编辑的记录！");
        // //     return;
        // // }
    }
     //刷新
    function RefreshClick(){
        window.location.reload();
    }
  
    

 