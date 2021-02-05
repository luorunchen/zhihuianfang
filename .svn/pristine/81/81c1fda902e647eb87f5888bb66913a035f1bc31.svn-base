$(function () {
  var global = (function () {
    var search = $('#ediModelIfm').context.URL;
    var search = decodeURI(search);
    var global = {};
    if (search != "") {
      search.slice(1).split('?')[1].split('&').forEach(
        function (val) {
          var arr = val.split("=");
          global[arr[0]] = arr[1];
        }
      );
    }
    return global;
  })();
  console.log(global);
  //http://p240647i77.qicp.vip/newEarlyWarn/WebProject/getNOSharedevice.action?my_username=13901088669&PageNo=1&PageSize=10
  var userName = parseInt(localStorage.getItem('userName'));

  function edit(cp, ls) {
    var value=$('#QueryMC').val() || '';
    $.ajax({
      type: 'get',
      url: url + '/WebProject/getNOSharedevice.action',
      data: 'my_username=' + username + '&PageNo=' + cp + '&PageSize=' + ls + '&username=' + global.username+'&object='+value,
      error: function (error) {
        console.log(res)
      },
      success: function (result) {
        console.log(result);
        var count = result.total;
        console.log(count);
        if(count==null){
          var count='0';
        }else{
          var count = result.total;
        }
        var html = "";
        html = "共有<span style='color:red'>" + count + "</span>台设备未被分享到此账号下";
        $('.facTotle').html(html)
        var num = Math.ceil(count / ls);
        console.log(num);
        sessionStorage.setItem('num', num);
        var html = "";
        var udata = result.list;
        if ( udata != null) {
          $.each(udata, function (i, v) {
            html += "<tr data-devId=" + v.devId + " data-pNum=" + v.productNumber + " data-devMC=" + v.installLocation + " data-pid=" + v.pid + " data-tpn=" + v.type + "><td  class='td_center' style='width:60px;' data-val=" + v.devId + ">" + (i + 1) + "</td><td  class='td_center' style='width:100px;' value=" + v.name + ">" + v.name + "</td><td  class='td_center' style='width:100px;' value=" + v.installLocation + ">" + v.installLocation + "</td><td  class='td_center' style='width:100px;' value=" + v.type + ">" + v.type + "</td><td  class='td_center' style='width:210px;' value=" + v.productNumber + ">" + v.productNumber + "</td><td  class='td_center' style='width:100px;' value=" + v.regdate + ">" + v.regdate + "</td><td  class='td_center' style='width:150px;'><div class='btn-group btn-group-sm' role='group'><button type='button' aria-expanded='false'  class='btn btn-success EditClick' data-pid="+v.pid+" data-devId="+v.devId+"><span class='glyphicon glyphicon-plus' aria-hidden='true'></span>分享 </button> </div></td> </tr>";
          })
          
        }else{
          html="<tr><td colspan='7' style='text-align: center;'>该账号下所有设备均已分享</td></tr>"
        }
        $('#GridTables').html(html);
        var html = "";
        html = "共&nbsp;<i id='page-total-count' class='blue'></i>&nbsp;" + count + "条记录,当前显示第&nbsp;<i id='page-total-num' class='blue'>" + cp + "</i>&nbsp;页";
        $("#page-total").html(html);

        var pInfo = "";
        var pno = parseInt(cp);
        pInfo += "<span class='FirstPno btn btn-default' >首页</span>";
        if (pno - 2 > 0) {
          pInfo += "<span class='' >" + (pno - 2) + "</span>";
        }
        if (pno - 1 > 0) {
          pInfo += "<span class='' >" + (pno - 1) + "</span>";
        }
        pInfo += "<span class='current' >" + pno + "</span>";
        if (pno + 1 <= num) {
          pInfo += "<span class='' >" + (pno + 1) + "</span>";
        }
        if (pno + 2 <= num) {
          pInfo += "<span class='' >" + (pno + 2) + "</span>";
        }
        pInfo += "<span class='LastPno btn btn-default' >末页</span>"
        $('#page-info').html(pInfo)

        $('.EditClick').click(function(){
          var pid=$(this).attr('data-pid');
          var devId=$(this).attr('data-devId')
          var id=pid+','+devId
          $.ajax({
            type: 'get',
            url: url + '/admin/device/addRegisterDevice.action',
            data: 'pid=' + id + '&username=' + global.username+'&my_username='+username,
            error: function (error) {
              console.log(error)
            },
            success: function (res) {
              console.log(res)
              var res = JSON.parse(res);
              if (res.list[0].status == 'true') {
                layer.open({
                  content:res.list[0].mess
                })
                var index = parent.layer.getFrameIndex(window.name);
                setTimeout(function(){
                  // location.reload()
                  parent.location.reload()
                  // layer.close(index);
                },1000) 
              } else {
                layer.open({
                  content:res.list[0].mess
                })
              }
            }
          })
        })
      }
    })
  }
  edit(1, 10)

  $('#BtnSearch').click(function(){
    edit(1, 10)
  })
  //去第几页
  $('#page-jump-go').click(function () {
    var pageCount = sessionStorage.getItem('num');
    var num = $('#page-jump-num').val();
    var fenSelect = $('#page-size-select').val();
    if (num == "") {
      layer.open({
        content: '请输入页数'
      })
    } else {
      if (num == "0") {
        var num = '1'
      }
      if (parseInt(num) > pageCount) {
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
  $(".pagination").on('click', 'span', function (e) {
    console.log($(this));
    var pageCount = sessionStorage.getItem('num');
    e.preventDefault();
    // 2.获取当前页码
    var pno = parseInt($(this).html());
    if ($(this).html() == '首页') {
      var pno = '1';
      console.log(pno)
    } else if ($(this).html() == '末页') {
      console.log(2)
      var pno = pageCount;
    } else {
      var pno = parseInt($(this).html());
      // 3.调用分页函数
    }
    var pageSize = parseInt($('#page-size-select').val());
    // 3.调用分页函数
    edit(pno, pageSize);
  })

  $('.reload').click(function(){
    location.reload();
  })
})