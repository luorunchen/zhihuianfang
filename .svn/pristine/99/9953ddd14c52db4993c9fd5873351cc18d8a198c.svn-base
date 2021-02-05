var userName = parseInt(localStorage.getItem('userName'));

function edit(pno, pageSize) {
    var value = $('#QueryMC').val() || "";
    $.ajax({
        type: 'get',
        url: url + '/admin/device/gridSource.action',
        data: 'username=' + userName + '&pageNo=' + pno + '&pageSize=' + pageSize + '&object=' + value,
        dataType: 'json',
        error: function (error) {
            console.log('Sys/js/details' + error);
        },
        success: function (result) {
            console.log(result);
            // console.log(result.data);
            var count = result.total;
            //  console.log(count);
            var num = Math.ceil(count / pageSize);
            sessionStorage.setItem('num', num);
            var udata = result.data;
            var udatelength = result.role.length
            var rdata = result.role;
            var html = "";
            var comName = result.data.comName;
            localStorage.setItem('comName', comName);
            console.log(rdata);
            $.each(rdata, function (i, v) {
                if (v.new_role == '') {
                    var new_role = '0'
                } else {
                    var new_role = v.new_role
                }
                if (v.powername == '') {
                    var powername = '0'
                } else {
                    var powername = v.powername
                }
                if (v.roleMC == '') {
                    var roleMC = '0'
                } else {
                    var roleMC = v.roleMC
                }
                console.log(v.powername)
                html += "<tr class='' data-user=" + v.user_name + "><td class='td_center' style='width:60px;' value=" + v.user_name + " data-use=" + v.user_name + ">" + (i + 1) + "</td><td class='td_center' style='width:100px;' value='" + v.userName + "'>" + v.userName + "</td><td class='td_center' style='width:100px;' value='" + v.company_phone + "'>" + v.company_phone + "</td><td class='td_center' style='width:150px;' value='" + v.address + "'>" + v.address + "</td><td class=' td_center' style='width:150px;' value='" + v.company + "'>" + v.company + "</td><td class='td_center' style='width:150px;' value='" + v.mobile + "'>" + v.mobile + "</td><td class='td_center' style='width:100px;' value='" + v.phone + "'>" + v.phone + "</td><td class='td_center' style='width:100px;' value='" + v.newRoleName + "'>" + v.newRoleName + "</td><td class='td_center' style='width:150px;' ><div class='btn-group btn-group-sm' role='group'><button type='button' aria-expanded='false'  class='btn btn-primary useedit '  data-user_name=" + v.user_name + " data-userName=" + v.userName + " data-companyPhone=" + v.company_phone + " data-address=" + v.address + " data-company=" + v.company + " data-mobile=" + v.mobile + " data-phone=" + v.phone + " data-roleMC=" + roleMC + "  data-rid=" + new_role + " data-powerOther=" + powername + "><span class='glyphicon glyphicon-edit ' aria-hidden='true' ></span>编辑 </button> </div><div class='btn-group btn-group-sm' role='group'><button type='button' aria-expanded='false'  class='btn btn-success chongFa' data-phone=" + v.user_name + "><span class='glyphicon glyphicon-share-alt' aria-hidden='true'></span>重发 </button> </div></td></tr>";
            })
            $('#GridTable').html(html);
            //编辑
            $('.useedit').click(function () {
                console.log($(this));
                var user_name = $(this).attr('data-user_name')
                var realName = $(this).attr('data-userName')
                var company_phone = $(this).attr('data-companyPhone')
                var address = $(this).attr('data-address')
                var company = $(this).attr('data-company')
                var mobile = $(this).attr('data-mobile')
                console.log(mobile)
                var phone = $(this).attr('data-phone')
                var roleMC = $(this).attr('data-roleMC')
                var new_role = $(this).attr('data-rid')
                var powerOther = $(this).attr('data-powerOther')
                var width = $(window).width();
                var height = $(window).height();
                var rid = localStorage.getItem('power');
                var powerId = localStorage.getItem('new_role');
                if (powerId == 1000 || rid.indexOf('10001002') != -1) {
                    console.log(height)
                    layer.open({
                        type: 2,
                        title: '用户编辑',
                        maxmin: true,
                        offset: ['50px'],
                        shadeClose: true, //点击遮罩关闭层
                        shade: 0.5, //不显示遮罩
                        // area: [width + 'px', height + 'px'],
                        area: [width * 0.8 + 'px', height - 50 + 'px'],
                        content: "./SUser/useEdit.html?realName=" + realName + '&address=' + address + '&phone=' + phone + '&company_phone=' + company_phone + '&company=' + company + '&mobile=' + mobile + '&user_name=' + user_name + '&roleMC=' + roleMC + '&new_role=' + new_role + '&powerOther=' + powerOther
                    });
                } else {
                    alert('用户无此权限,如需此权限请向上级申请')
                }
                console.log(realName + '--' + address + '--' + phone + '--' + company_phone + '--' + company + '--' + mobile + '--' + user_name + '--' + roleMC + '--' + new_role);

            })
            $('.delectBtn').click(function () {
                var rid = localStorage.getItem('power');
                var powerId = localStorage.getItem('new_role');
                if (powerId == 1000) {
                    alert('功能暂不开放')
                } else if (rid.indexOf('10001004') != -1) {
                    alert('功能暂不开放')
                } else {
                    alert('用户无此权限,如需此权限请向上级申请')
                }
                //alert('请在app或者微信公众号内删除');
            })
            //重发
            $('.chongFa').click(function () {
                var phone = $(this).attr('data-phone');
                $.ajax({
                    type: 'get',
                    url: url + '/admin/device/SendUsername.action',
                    data: 'username=' + phone,
                    error: function (error) {
                        console.log(error)
                    },
                    success: function (res) {
                        console.log(res)
                        var res = JSON.parse(res);
                        console.log(res);
                        if (res.list[0].status == true) {
                            alert(res.list[0].mess)
                        } else {
                            alert(res.list[0].mess)
                        }
                    }
                })
            })

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

        }

    })
}
edit(1, 10);


var timeout = null;
$('.Grid_bd').on('mouseenter', 'tbody tr', function () {
    // console.log($(this));
    $(this).addClass('hoverTr');
});
$('.Grid_bd').on('mouseleave', 'tbody tr', function () {
    $(this).removeClass('hoverTr');
})
$('.Grid_bd').on('click', 'tbody tr', function () {
    console.log($(this));
    clearTimeout(timeout); //停止单击定时事件
    timeout = window.setTimeout(function () { //延迟单击事件触发内容  
        console.log("this is click event");

    }, 200);

});
$('.Grid_bd').on('dblclick', 'tbody tr', function () {
    console.log($(this));
    var username = $(this).attr('data-user');
    var width = $(window).width();
    var height = $(window).height();
    // if(width >= 980){
    //     var width='930';
    // }else{
    //     var width=$(window.parent.document).width()-50;
    // }
    console.log(height)
    clearTimeout(timeout); //停止单击定时事件
    timeout = window.setTimeout(function () { //延迟单击事件触发内容  
        //console.log("this is dblclick event");    
        // window.top.OpenThirdFrame("../../DDept/user_facadmin.html?username="+username, width, height, "win", username );           
        layer.open({
            type: 2,
            title: '用户账号下现有设备',
            maxmin: true,
            offset: ['25px'],
            shadeClose: true, //点击遮罩关闭层
            shade: 0.5, //不显示遮罩
            // area: [width + 'px', height + 'px'],
            area: [width * 0.99 + 'px', height - 25 + 'px'],
            content: "../DDept/user_facadmin.html?username=" + username
        });
    }, 200);

});


//点击新增  10001003
$('#btn_add').click(function () {
    var width = $(window).width();
    var height = $(window).height();
    console.log(height)
    layer.open({
        type: 2,
        title: '用户管理',
        maxmin: true,
        offset: ['50px'],
        shadeClose: true, //点击遮罩关闭层
        shade: 0.5, //不显示遮罩
        // area: [width + 'px', height + 'px'],
        area: [width * 0.8 + 'px', height - 50 + 'px'],
        content: './SUser/UserAdd.html'
    });

})


$("#pagination").on("click", "a", function (e) {
    e.preventDefault();
    // 2.获取当前页码
    var num = sessionStorage.getItem('num');
    //  console.log($(this).html());
    if ($(this).html() == '首页') {
        edit(1, 10);
    } else if ($(this).html() == '末页') {
        edit(num, 10);
    } else {
        var pno = parseInt($(this).html());
        console.log(pno);
        // 3.调用分页函数
        edit(pno, 10);
    }

})

$('#BtnSearch').click(function () {
    edit(1, 10);

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


function RefreshClick() {
    window.location.reload();
}