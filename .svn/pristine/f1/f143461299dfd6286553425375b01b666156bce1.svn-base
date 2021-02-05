$(function () {
  var username = parseInt(localStorage.getItem('userName'));
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
  function edit(cp, ls,alarm) {
    var value = $('#QueryMC').val() || "";
    //http://p240647i77.qicp.vip/newEarlyWarn/WebProject/getDeviceStatus.action?my_username=17720831119&PageNo=1&PageSize=10&type=3&username=17720831119&status=0&object=%E4%B8%80%E6%A5%BC

    //http://fire.zhihuiwulian.net.cn/newEarlyWarn/WebProject/getDeviceStatus.action?my_username=13901088669&PageNo=1&alarm=&PageSize=10&object=&type=3&username=13901088669&status=1
    $.ajax({
      type: 'get',
      url: url + '/WebProject/getDeviceStatus.action',
      data: 'my_username=' + username + '&PageNo=' + cp + '&alarm=' + alarm + '&PageSize=' + ls + '&object=' + value+'&type=3'+'&username='+username+'&status='+global.sign,
      dataType: 'json',
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.log(XMLHttpRequest);
        console.log(textStatus);
        console.log(errorThrown);
        console.log('DDept/js/details' + errorThrown);
      },
      success: function (result) {
        console.log(result);
        var list = result.list;
        console.log(list)
        var count = result.total;
        console.log(count);
        var num = Math.ceil(count / ls);
        sessionStorage.setItem('num', num);
        var html = "";
        $.each(list, function (i, v) {
          if(v.flow=='0'){
              var flow ='未开启流量';
          }else{
              var flow =v.flowTime || "已开启流量";
          }
          if(v.policy==0){
              var policy ='暂无保险单号';
          }else{
              var policy=v.policy;
          }
            html += "<tr><td style='width:60px;' class='td_center'>" + (i + 1) + "</td><td style='width:100px;' class='td_center'>" + v.name + "</td><td style='width:100px;' class='td_center'>" + v.installLocation + "</td><td style='width:200px;' class='td_center'>" + v.productNumber + "</td><td style='width:300px;' class='td_center'>" + policy + "</span></td><td style='width:100px;' class='td_center'>" + v.regdate + "</td><td style='width:100px;' class='td_center'>" + v.regdate + "</td><td style='width:150px;' class='td_center'><div class='btn-group btn-group-sm' role='group'><button type='button' aria-expanded='false'  class='btn btn-primary editor'  data-devId=" + v.devId + "  data-address=" + v.installLocation + " data-pNum=" + v.productNumber + " ><span class='glyphicon glyphicon-edit' aria-hidden='true' ></span>查看</button></div></td></tr>";

        })
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

        $('.editor').click(function () {
          console.log($(this));
          var width = $(window.parent.document).width();
          var height = $(window.parent.document).height() - 150;
          if (width >= 980) {
            var width = '930';
          } else {
            var width = $(window.parent.document).width();
          }
          var devBH = $(this).attr('data-devId');
          var devMC = $(this).attr('data-address');
          if(global.sign == 1){
            var typeName='正常'
          }else{
            var typeName='离线' || ''
          }
          var pNum = $(this).attr('data-devno');
          sessionStorage.setItem('DevBH', devBH); //devId 
          sessionStorage.setItem('devMC', devMC); //v.address
          sessionStorage.setItem('productNumber', pNum); //devno
          window.top.OpenThirdFrame("./ExtApp_SElectric_ElecDetail.html?devBH=" + devBH + '&typeName=' + typeName, width, height, "win", devMC);
        })
      }
    })
  }
  edit(1, 10, '')
  $('#BtnSearch').click(function(){
    edit(1, 10, '')
  })

  //去第几页
  $('#page-jump-go').click(function () {
    var pageCount = sessionStorage.getItem('num');
    var num = $('#page-jump-num').val();
    var fenSelect = $('#page-size-select').val();
    console.log(fenSelect)
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
        var alarm=$('.zhuangtaiActive').attr('data-num')
        edit(num, fenSelect,alarm)
      }
    }

  })
  //一页显示几条
  $('#page-size-select').click(function () {
    var pageSize = $(this).val()
    var alarm=$('.zhuangtaiActive').attr('data-num')
    edit(1, pageSize,alarm);
  })
  //点击页数
  $(".pagination").on('click', 'span', function (e) {
    console.log($(this));
    var pageCount = sessionStorage.getItem('num');
    console.log(pageCount)
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
    var alarm=$('.zhuangtaiActive').attr('data-num')
    edit(pno, pageSize,alarm);
  })


  $('.zhuangtaiDiv').on('click','span',function(){
    console.log($(this).attr('data-num'));
    var alarm=$(this).attr('data-num')
    $(this).addClass('zhuangtaiActive').siblings().removeClass('zhuangtaiActive')
    edit(1,10,alarm)
  })
})