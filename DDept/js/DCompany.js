var userName = parseInt(localStorage.getItem('userName'));
var rid=localStorage.getItem('power');
var powerId=localStorage.getItem('new_role');
function edit(cp, ls) {
    //  console.log(cp);
    var col = ""; //cp(pno)  当前页数  ls(pageSize) 每页显示几行  col  
    var state = 0;
    var kw = "";
    var value=$('#QueryMC').val() || "";
    $.ajax({
        type: 'get',
        url: url + '/admin/project/getAllProjecForState.action',
        data: 'username=' + userName + '&cp=' + cp + '&col=' + col + '&state=' + state + '&kw=' + kw + '&ls=' + ls +'&pname='+value,
        dataType: 'json',
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log( XMLHttpRequest);
            console.log( textStatus);
            console.log( errorThrown);
            console.log('DDept/js/details' + errorThrown);
        },
        success: function (result) {
            console.log(result);
            //  console.log(result.list);
            var count = result.list[0].count;
            //  console.log(count);
            var num = Math.ceil(count / ls);
            sessionStorage.setItem('num', num);
            //  console.log(num);
            var html = "";
            //  console.log(udata);
            var udata = result.list[0].allObj;
            if (udata != "" || udata != null) {
                $.each(udata, function (i, v) {
                    if(v.gridman==" " || v.gridman==""){
                        var gridman="0"
                    }else{
                        var gridman=v.gridman
                    }
                    console.log(v.gridman)
                    if(v.gridmanname=="" || v.gridmanname==" "){
                        var gridmanname= "0"
                    }else{
                        var gridmanname=v.gridmanname
                    }
                    if(v.street_charge=="" || v.street_charge==" "){
                        var streetCharge="0"
                    }else{
                        var streetCharge=v.street_charge
                    }
                    if(v.street_chargenanem=="" || v.street_chargenanem==" "){
                        var streetChargenanem="0"
                    }else{
                        var streetChargenanem=v.street_chargenanem
                    }
                    html += "<tr class='' data-val=" + v.pid + " data-name="+v.name+"><td class='td_center' style='width:60px;' data-val=" + v.pid + ">" + (i + 1) + "</td><td class='td_center' style='width:100px;' value=" + v.name + ">" + v.name + "</td><td class='td_center' style='width:100px;' value=" + v.location + ">" + v.location + "</td><td class='td_center' style='width:100px;' value=" + v.fireman + ">" + v.fireman + "</td><td class='td_center' style='width:100px;' value=" + v.firemanPhone + ">" + v.firemanPhone + "</td><td class='td_center' style='width:100px;' value=" + v.legalman + ">" + v.legalman + "</td><td class='td_center' style='width:100px;' value=" + v.legalmanPhone + ">" + v.legalmanPhone + "</td><td class='td_center' style='width:100px;' value=" + v.introduce + ">" + v.introduce + "</td><td class='td_center' style='width:100px;' value=" + v.remark + ">" + v.remark + "</td><td class='td_center' style='width:150px;' ><div class='btn-group btn-group-sm' role='group'><button type='button' aria-expanded='false'  class='btn btn-primary editor' id='editor' data-val="+v.pid+" data-long="+v.lat+" data-latBai="+v.long_lat+" data-gridman="+gridman+" data-gridmanname="+gridmanname+" data-streetCharge="+streetCharge+" data-streetChargenanem="+streetChargenanem+"><span class='glyphicon glyphicon-edit' aria-hidden='true' ></span>编辑 </button></div><div class='btn-group btn-group-sm' role='group'><button type='button' aria-expanded='false'  class='btn btn-danger delectClick' data-val="+v.pid+" data-name="+v.name+"><span class='glyphicon glyphicon-remove' aria-hidden='true'></span>删除 </button></div><div class='btn-group btn-group-sm' role='group'><button type='button' aria-expanded='false'  class='btn btn-success new_dev' id='new_dev'><span class='glyphicon glyphicon-plus' aria-hidden='true'></span>新增设备</button></div><div class='btn-group btn-group-sm' role='group'><button type='button' aria-expanded='false'  class='btn btn-info shareProject' data-val="+v.pid+"><span class='glyphicon glyphicon-download-alt' aria-hidden='true'></span>分享项目</button></div></td></tr>";
                })
                $('#GridTables').html(html);


            }

            var html="";
            html="共&nbsp;<i id='page-total-count' class='blue'></i>&nbsp;"+count+"条记录,当前显示第&nbsp;<i id='page-total-num' class='blue'>"+cp+"</i>&nbsp;页";
            $("#page-total").html(html);

            var pInfo = "";
            var pno = parseInt(cp);
            pInfo+= "<span class='FirstPno btn btn-default' >首页</span>";
            if (pno - 2 > 0) {
                pInfo += "<span class='' >"+(pno-2)+"</span>";
            }
            if (pno - 1 > 0) {
                pInfo += "<span class='' >"+(pno-1)+"</span>";
            }
            pInfo += "<span class='current' >"+pno+"</span>";
            if (pno + 1 <= num) {
                pInfo += "<span class='' >"+(pno+1)+"</span>";
            }
            if (pno + 2 <= num) {
                pInfo += "<span class='' >"+(pno+2)+"</span>";
            }
            pInfo+= "<span class='LastPno btn btn-default' >末页</span>"
            $('#page-info').html(pInfo)

            //编辑
            $('.editor').click(function () {

                var tr_data = $(this).parent().parent().parent().children();
                var pid = $(this).attr('data-val');
                var long_lat = $(this).attr('data-long');
                var latBai = $(this).attr('data-latBai');
                console.log(latBai);
                var uName = tr_data[1].innerHTML;
                var uAddress = tr_data[2].innerHTML;
                var uUser = tr_data[3].innerHTML;
                var uUserTel = tr_data[4].innerHTML;
                var uRes = tr_data[5].innerHTML;
                var uResTel = tr_data[6].innerHTML;
                var uIntro = tr_data[7].innerHTML;
                var uState = tr_data[8].innerHTML;
                var rid=localStorage.getItem('power');
                var powerId=localStorage.getItem('new_role');
                //data-gridman="+v.gridman+" data-gridmanname="+v.gridmanname+" data-streetCharge="+v.street_charge+" data-streetChargenanem="+v.street_chargenanem+"
                var gridman=$(this).attr('data-gridman')
                var gridmanname=$(this).attr('data-gridmanname')
                var streetCharge=$(this).attr('data-streetCharge')
                var streetChargenanem=$(this).attr('data-streetChargenanem')
                var width = $(window).width();
                var height = $(window).height(); 
                if(powerId == 1000 || rid.indexOf('10002002') !=-1) {
                    layer.open({
                        type: 2,
                        title: '设备编辑',
                        maxmin: true,
                        offset: ['50px'],
                        shadeClose: true, //点击遮罩关闭层
                        shade: 0.5, //不显示遮罩
                        // area: [width + 'px', height + 'px'],
                        area: [width*0.8 + 'px', height-100 + 'px'],
                        content: "../Sys/SUser/compile.html?uName="+ uName + '&uAddress=' + uAddress + '&uUser=' + uUser + '&uUserTel=' + uUserTel + '&uRes=' + uRes + '&uResTel=' + uResTel + '&uIntro=' + uIntro + '&uState=' + uState + '&pid=' + pid + '&gridman=' + gridman+ '&gridmanname=' + gridmanname+ '&streetCharge=' + streetCharge+ '&streetChargenanem=' + streetChargenanem +'&long_lat=' + long_lat +'&latBai=' + latBai 
                    });

                }else{
                    alert('用户无此权限,如需此权限请向上级申请')
                }
                
            })
            //新增
            $('.new_dev').click(function () {
                var data = $(this).parent().parent().parent().children();
                var pid = data.attr('data-val');

                var rid=localStorage.getItem('power');
                var powerId=localStorage.getItem('new_role');
                var width = $(window).width();
                var height = $(window).height(); 
                if(powerId == 1000 || rid.indexOf('10002001') !=-1) {
                    layer.open({
                        type: 2,
                        title: '设备新增',
                        maxmin: true,
                        offset: ['50px'],
                        shadeClose: true, //点击遮罩关闭层
                        shade: 0.5, //不显示遮罩
                        // area: [width + 'px', height + 'px'],
                        area: [width*0.8 + 'px', height-100 + 'px'],
                        content: "../Sys/SUser/SFacAdd.html?pid="+ pid
                    });
                }else{
                    alert('用户无此权限,如需此权限请向上级申请')
                }
                
            })
            //删除
            $('.delectClick').click(function () {
                console.log($(this));
                var data = $(this).parent().parent().parent();
                
                var pid=$(this).attr('data-val');
                var name=$(this).attr('data-name');
                console.log(pid)
                if(powerId == 1000 || rid.indexOf('10002003') !=-1) {
                    $.confirm({
                        title: '删除后无法修复,确定删除吗',
                        text: "删除项目名为<span style='color:red;'>"+name+"</span>的记录",
                        onOK: function () {
                            $.ajax({
                                type:'get',
                                url:url+'/admin/project/check/deleProject.action',
                                data:'pid='+pid+'&username='+userName,
                                error:function(error){console.log(error+'网络错误')},
                                success:function(result){
                                    var res=JSON.parse(result);
                                    console.log(res);
                                    if(res.list[0].status=="true"){
                                        alert(res.list[0].mess);
                                        setTimeout(function(){
                                            window.location.reload();
                                        },1000)
                                    }else{
                                        alert(res.list[0].mess)
                                    }
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

            //分享
            $('.shareProject').click(function(){
                console.log($(this));
                var pid=$(this).attr('data-val')
                console.log(pid)
                layer.prompt({
                    title: '请输入要分享的账号',
                },function(value, index, elem){
                    $.ajax({
                        type:'get',
                        url:url+'/admin/project/addRegisterProject.action',
                        data:'pid='+pid+'&username='+value,
                        error:function(error){console.log(error)},
                        success:function(res){
                            console.log(res)
                            var res=JSON.parse(res);
                            if(res.list[0].status=='true'){
                                alert(res.list[0].mess)
                                layer.close(index);
                            }else{
                                alert(res.list[0].mess)
                            }
                        }
                    })
                    
                });
            })

        }
    })
}
edit(1, 10);


var timeout =null; 
$('.Grid_bd').on('mouseenter', 'tbody tr', function () {
    $(this).addClass('hoverTr');
});
$('.Grid_bd').on('mouseleave', 'tbody tr', function () {
    $(this).removeClass('hoverTr');
})

$('.Grid_bd').on('click', 'tr', function () {
    console.log($(this));
    clearTimeout(timeout);//停止单击定时事件
    timeout= window.setTimeout(function(){//延迟单击事件触发内容  
        console.log("this is click event");        
    }, 200);             
});
$('.Grid_bd').on('dblclick', 'tr', function () {
    console.log($(this));
    var comid=$(this).attr('data-val');
    var comName=$(this).attr('data-name');
    var width=$(window.parent.document).width();
    var height=$(window.parent.document).height()-150;
    if(width >= 980){
        var width='930';
    }else{
        var width=$(window.parent.document).width()-50;
    }
    console.log(height)
    // console.log(height)
    sessionStorage.setItem('ComID',comid);  
    sessionStorage.setItem('comName',comName);
    clearTimeout(timeout);//停止单击定时事件
    timeout= window.setTimeout(function(){//延迟单击事件触发内容  
        console.log("this is dblclick event"); 
        
        window.top.OpenFrame("./All_ElecComDetail.html?ComID=" + comid + "&ComName=" + comName, width, height, "SElect", comName, "", function (r) {

        });                    
    }, 200);             

});
// $('.Grid_bd').on('click','tr',function(event){ 
//     var that=$(this);
//     if(that.hasClass('selectTr')){
//         that.removeClass("selectTr");  
//     }else{
//         that.addClass("selectTr").siblings().removeClass("selectTr");
//     }
// });
//新增
function UserAdd() {
    var rid=localStorage.getItem('power');
    var powerId=localStorage.getItem('new_role');
    var width = $(window).width();
    var height = $(window).height();
    if(powerId == 1000 || rid.indexOf('10002001') !=-1) {
        layer.open({
            type: 2,
            title: '项目新增',
            maxmin: true,
            offset: ['50px'],
            shadeClose: true, //点击遮罩关闭层
            shade: 0.5, //不显示遮罩
            // area: [width + 'px', height + 'px'],
            area: [width*0.9 + 'px', height-100 + 'px'],
            content: '../Sys/SUser/EditAdd.html'
        });
        // window.top.OpenFrame('./Sys/SUser/EditAdd.html', '1100', '600', "", "项目新增", function (r) {

        // })
    }else{
        alert('用户无此权限,如需此权限请向上级申请')
    }
    
}
//编辑


//删除

$('#delePF').click(function(){
    var powerId=localStorage.getItem('new_role');
    var width = $(window).width();
    var height = $(window).height();
    console.log(powerId)
    if(powerId=='1000'){
        layer.open({
            type: 2,
            title: '删除责任人或防火员',
            maxmin: true,
            offset: ['50px'],
            shadeClose: true, //点击遮罩关闭层
            shade: 0.5, //不显示遮罩
            // area: [width + 'px', height + 'px'],
            area: [width*0.5 + 'px', height-100 + 'px'],
            content: '../Sys/SUser/respon.html'
        });
    }else{
        alert('用户无此权限,如需此权限请向上级申请')
    }
})
//刷新
function RefreshClick() {
    window.location.reload();
}


//搜索
    $('#BtnSearch').click(function(){
        var value=$('#QueryMC').val();
        console.log(value);
        edit(1,10)
    })

    //去第几页
$('#page-jump-go').click(function () {
    var pageCount = sessionStorage.getItem('num');
    var num = $('#page-jump-num').val();
    var fenSelect=$('#page-size-select').val();
    console.log(fenSelect)
    if(num=="" ){
        layer.open({
            content:'请输入页数'
        })
    }else{
        if( num=="0"){
            var num ='1'
        }
        if ( parseInt(num) > pageCount) {
            $('#page-jump-num').val('')
            layer.open({
                type: 1,
                offset: 'auto',
                id: 'layerDemoauto' //防止重复弹出
                    ,
                content: '<div style="padding: 20px 100px;">超出最大页面数</div>',
                btn: '关闭',
                btnAlign: 'c' //按钮居中
                    ,
                shade: 0.2 //不显示遮罩
                    ,
                yes: function () {
                    layer.closeAll();
                }
            });
        } else {
            $('#page-jump-num').val(num)
            edit(num, fenSelect)
        }
    }
    
})
//一页显示几条
$('#page-size-select').click(function () {
    var pageSize = $(this).val()
    edit(1, pageSize)
})
//点击页数
$(".pagination").on("click", "span", function (e) {
    e.preventDefault();
    // 2.获取当前页码
    var num = sessionStorage.getItem('num');
     console.log($(this).html());
    if ($(this).html() == '首页') {
        edit(1, 10);
    } else if ($(this).html() == '末页') {
        edit(num, 10);
    } else {
        var cp = parseInt($(this).html());
        console.log(cp);
        // 3.调用分页函数
        edit(cp, 10);
    }

})
