var userName=parseInt(localStorage.getItem('userName'));
function edit(){
    $.ajax({
        type:'get',
        url:url+'/admin/device/gridSource.action',
        data:'username='+userName,
        dataType:'json',
        error:function(error){
            console.log('Sys/js/details'+error);
        },
        success:function(result){
            console.log(result);
           // console.log(result.data);
            var udata=result.data;
            var rdata=result.role;
            var html="";
            var  comName=result.data.comName;
            localStorage.setItem('comName',comName);
            console.log(rdata);
            $.each(rdata,function(i,v){
                html+="<tr class=''><td class='td_center' style='width:60px;' value="+v.user_name+" data-use="+v.user_name+">"+(i+1)+"</td><td class='td_center' style='width:100px;' value='"+v.userName+"'>"+v.userName+"</td><td class='td_center' style='width:100px;' value='"+v.company_phone+"'>"+v.company_phone+"</td><td class='td_center' style='width:150px;' value='"+v.address+"'>"+v.address+"</td><td class=' td_center' style='width:150px;' value='"+v.company+"'>"+v.company+"</td><td class='td_center' style='width:100px;' value='"+v.mobile+"'>"+v.mobile+"</td><td class='td_center' style='width:100px;' value='"+v.phone+"'>"+v.phone+"</td><td class='td_center' style='width:100px;' value='"+v.roleMC+"'>"+v.roleMC+"</td><td class='td_center' style='width:150px;' ><div class='btn-group btn-group-sm' role='group'><button type='button' aria-expanded='false'  class='btn btn-primary useedit '><span class='glyphicon glyphicon-edit ' aria-hidden='true' ></span>编辑 </button> </div><div class='btn-group btn-group-sm' role='group'><button type='button' aria-expanded='false'  class='btn btn-danger delectBtn'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span>删除 </button> </div></td></tr>";
            })
            $('.GridTables').html(html);
            //编辑
            $('.useedit').click(function(){
                var user_name=$(this).parent().parent().parent().children().attr('data-use');
                var realName=$(this).parent().parent().parent().children()[1].innerHTML;
                var address=$(this).parent().parent().parent().children()[3].innerHTML;
                var phone=$(this).parent().parent().parent().children()[6].innerHTML;
                var company_phone=$(this).parent().parent().parent().children()[2].innerHTML;
                var company=$(this).parent().parent().parent().children()[4].innerHTML;
                var mobile=$(this).parent().parent().parent().children()[5].innerHTML;
                console.log(realName+'--'+address+'--'+phone+'--'+company_phone+'--'+company+'--'+mobile);
                window.top.OpenFrame('./Sys/SUser/useEdit.html?realName='+realName+'&address='+address+'&phone='+phone+'&company_phone='+company_phone+'&company='+company+'&mobile='+mobile+'&user_name='+user_name,550,350,"","用户编辑",function(r){

                })
            })
            $('.delectBtn').click(function(){
                alert('请在app或者微信公众号内删除');
            })
        }

    })
}
edit();
// $('.Grid_bd').on('click','tr',function(event){
    
// })
    //点击新增
    $('#btn_add').click(function(){
        window.top.OpenFrame('./Sys/SUser/UserAdd.html',550,350,"","用户管理",function(r){

        })
    })

    $('.Grid_bd').on('mouseenter','tr',function(){ 
        $(this).addClass('hoverTr');
    });
    $('.Grid_bd').on('mouseleave','tr',function(){ 
        $(this).removeClass('hoverTr');
    })
    
    
    // $('.Grid_bd').on('click','tr',function(event){ 
    //     var $table=$('#GridTables>tbody>tr');
    //     if($table.hasClass('selectTr')){
    //         $(this).removeClass("selectTr");
    //     }else{
    //         $(this).addClass("selectTr");
    //     }
    // });
    
    //删除
    function DeleteClick(){
        var $table=$('#GridTables>tbody>tr');
        if($table.hasClass('selectTr')){
           // console.log(this);
            if(confirm('确定要删除所选记录!')==true){
                alert('删除成功');
                var html="";
                $table.html(html);
            }else{
                
              
            }
        }else{
            alert("请先选择要编辑的记录！");
            return;
        }
    }

    function RefreshClick(){
        window.location.reload();
    }


    