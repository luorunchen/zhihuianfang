$(function(){
    var username=localStorage.getItem('userName');
    function selectPage(pno,pageSize){
        var role='admin';
        var r_name="";   //根据角色名称查询
        $.ajax({
            type:'get',
            url:url+'/power/pushRole_infos.action',
            data:'username='+username+'&r_name='+r_name+'&pno='+pno+'&pageSize='+pageSize,
            error:function(error){console.log(error+'jur.js')},
            success:function(res){
                console.log(res)
                var ldata=res.data;
                console.log(ldata)
                
                var html="";
                $.each(ldata,function(i,v){
                    console.log(v);
                    if(v.staut=='0'){
                        staut='启动'
                    }else{
                        staut='禁用'
                    }
                    html+="<tr class=''><td class='td_center' style='width:60px;'>"+(i+1)+"</td><td class='td_center' style='width:100px;' data-value='"+v.name+"'>"+v.name+"</td><td class='td_center' style='width:100px;' value='0755-85458458'>0755-85458458</td><td class='td_center' style='width:150px;' value='"+v.crDate+"'>"+v.crDate+"</td><td class=' td_center' style='width:150px;' value='"+v.upDate+"'>"+v.upDate+"</td><td class='td_center' style='width:150px;'><div class='btn-group btn-group-sm' role='group'><button type='button' aria-expanded='false' class='btn btn-primary btnUpdate' data-id="+v.id+" data-value='"+v.name+"'><span class='glyphicon glyphicon-edit' aria-hidden='true'></span>编辑</button></div><div class='btn-group btn-group-sm' role='group'><button type='button' aria-expanded='false' class='btn btn-danger btnDelete' data-id="+v.id+"><span class='glyphicon glyphicon-remove' aria-hidden='true'></span>删除</button></div></td></tr>";
                })
                $('#GridTable').html(html)

                var html="";
                html="<span>第</span><input type='text' value='"+res.pno+"' readonly='readonly'><span>/</span><input type='text' value='"+res.pageCount+"' readonly='readonly'><span>页,每页</span><input type='text' value='"+res.pageSize+"' readonly='readonly'><span>行，共</span><input type='text' value='"+res.recordCount+"' readonly='readonly'><span>行</span>";
                $('.input-group').html(html)


                //编辑
                $('.btnUpdate').click(function(){
                    console.log($(this));
                    //realName='+realName+'&address='+address+'&phone='+phone+'&company_phone='+company_phone+'&company='+company+'&mobile='+mobile+'&user_name='+user_name
                    var id=$(this).attr('data-id')
                    var name=$(this).attr('data-value')
                    console.log(name);
                    window.top.OpenFrame('./Sys/SUser/jurEdit.html?id='+id+'&name='+name,550,550,"","权限编辑",function(r){

                    })
                })

                $('.btnDelete').click(function(){
                    console.log(this.parentNode.parentNode.parentNode.children[1].innerHTML)
                    var name=this.parentNode.parentNode.parentNode.children[1].innerHTML
                    var id=$(this).attr('data-id')
                    $.confirm({
                        title: '删除后无法修复,确定删除吗',
                        text: "删除角色名为<span style='color:red;'>"+name+"</span>的记录",
                        onOK: function () {
                            $.ajax({
                                type:'get',
                                url:url+'/power/delPower.action',
                                data:'username='+username+'&r_id='+id+'&type=only',
                                error:function(error){console.log(error+'jur.js')},
                                success:function(res){
                                    console.log(res)
                                    if(res.code=='200'){
                                        $.alert(res.mess);
                                        location.reload()
                                    }else{
                                        $.alert('删除失败')
                                    }
                                   // 
                                }
                            })
                        },
                        onCancel: function () {
                        }
                      });
                })
            }
        })
    }
    selectPage(1,10)

    $('#btn_add').click(function(){
        window.top.OpenFrame('./Sys/SUser/jurAdd.html?',550,550,"","权限新增",function(r){

        })
    })
    
})