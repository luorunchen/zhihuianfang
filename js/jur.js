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
                    // console.log(v);
                    if(v.staut=='0'){
                        staut='启动'
                    }else{
                        staut='禁用'
                    }
                    html+="<tr class=''><td class='td_center' style='width:60px;'>"+(i+1)+"</td><td class='td_center' style='width:100px;' data-value='"+v.name+"'>"+v.name+"</td><td class='td_center' style='width:100px;' value='0755-85458458'>0755-85458458</td><td class='td_center' style='width:150px;' value='"+v.crDate+"'>"+v.crDate+"</td><td class=' td_center' style='width:150px;' value='"+v.upDate+"'>"+v.upDate+"</td><td class='td_center' style='width:150px;'><div class='btn-group btn-group-sm' role='group'><button type='button' aria-expanded='false' class='btn btn-primary btnUpdate' data-id="+v.id+" data-value='"+v.name+"' data-res='"+v.region+"'><span class='glyphicon glyphicon-edit' aria-hidden='true'></span>编辑</button></div><div class='btn-group btn-group-sm' role='group'><button type='button' aria-expanded='false' class='btn btn-danger btnDelete' data-id="+v.id+"><span class='glyphicon glyphicon-remove' aria-hidden='true'></span>删除</button></div></td></tr>";
                })
                $('#GridTable').html(html)

                var html = "";
            html = "<div class='input-group' style='float:left;padding-left:10px;'><span>第</span><input type='text' value='" + pno + "' readonly='readonly'><span>/</span><input type='text' value='" + num + "' readonly='readonly'><span>页,每页</span><input type='text' value='10' readonly='readonly'><span>行，共</span><input type='text' value='" + udatelength + "' readonly='readonly'><span>行</span></div>";
            $('.input_left').html(html);

            var aPrev = $('.aPrev');
            var aNext = $('.aNext');
            if (pno === 1) aPrev.addClass('disabled');
            if (pno === num) aNext.addClass('disabled');


            var num = parseInt(num); //总页数
            // console.log(pno);
            //  console.log(num);
            var html = "";

            if (pno - 2 > 0) {
                html = "<li><a href='#' class='aPrev'>" + (pno - 2) + "</a></li>";
            }
            if (pno - 1 > 0) {
                html = html + "<li><a href='#' class='aPrev'>" + (pno - 1) + "</a></li>";
            }
            html = html + "<li class='active'><a href='#'>" + pno + "</a></li>";
            if (pno + 1 <= num) {
                html = html + "<li><a href='#' class='aPrev'>" + (pno + 1) + "</a></li>";
            }
            if (pno + 2 <= num) {
                html = html + "<li><a href='#' class='aPrev'>" + (pno + 2) + "</a></li>";
            }

            $("#pagination").html(html);
            $("#pagination").prepend("<a href='#' class='firstPage btn btn-default' style='float:left'>首页</button>");
            $("#pagination").append("<a href='#' class='endPage btn btn-default' >末页</button>")


                //编辑
                $('.btnUpdate').click(function(){
                    console.log($(this));
                    var id=$(this).attr('data-id')
                    var name=$(this).attr('data-value')
                    var region=$(this).attr('data-res')
                    console.log(region)
                    var rid=localStorage.getItem('power');
                    var powerId=localStorage.getItem('new_role');
                    if(powerId == 1000) {
                        window.top.OpenFrame('./Sys/SUser/jurEdit.html?id='+id+'&name='+name+'&region='+region,750,600,"","权限编辑",function(r){

                        })
                    }else if(rid.indexOf('10004001') !=-1){
                        window.top.OpenFrame('./Sys/SUser/jurEdit.html?id='+id+'&name='+name+'&region='+region,750,600,"","权限编辑",function(r){

                        })
                    }else{
                        alert('用户无此权限,如需此权限请向上级申请')
                    }
                    
                })

                $('.btnDelete').click(function(){
                    console.log(this.parentNode.parentNode.parentNode.children[1].innerHTML)
                    var name=this.parentNode.parentNode.parentNode.children[1].innerHTML
                    var id=$(this).attr('data-id')
                    var rid=localStorage.getItem('power');
                    var powerId=localStorage.getItem('new_role');
                    if(powerId == 1000) {
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
                    }else if(rid.indexOf('10004002') !=-1){
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
                    }else{
                        alert('用户无此权限,如需此权限请向上级申请')
                    }
                })
            }
        })
    }
    var rid=localStorage.getItem('power');
    var powerId=localStorage.getItem('new_role');
    if(powerId == 1000) {
        selectPage(1,10)
    }else if(rid.indexOf('10004004') !=-1){
        selectPage(1,10)
    }else{
        alert('用户无此权限,如需此权限请向上级申请')
    }
    

    $('#btn_add').click(function(){
        var rid=localStorage.getItem('power');
        var powerId=localStorage.getItem('new_role');
        if(powerId == 1000) {
            window.top.OpenFrame('./Sys/SUser/jurAdd.html?',750,600,"","权限新增",function(r){

            })
        }else if(rid.indexOf('10004003') !=-1){
            window.top.OpenFrame('./Sys/SUser/jurAdd.html?',750,600,"","权限新增",function(r){

            })
        }else{
            alert('用户无此权限,如需此权限请向上级申请')
        }
        
    })
    
})