$(function () {
  var username = parseInt(localStorage.getItem('userName'));

  function edit(cp, ls,alarm) {
    var value = $('#QueryMC').val() || "";
    //http://p240647i77.qicp.vip/newEarlyWarn/WebProject/getDealAlarmDevice.action?my_username=17720831119&PageNo=1&PageSize=10&object=%E6%81%92%E6%AC%A3&alarm=1
    $.ajax({
      type: 'get',
      url: url + '/WebProject/getDealAlarmDevice.action',
      data: 'my_username=' + username + '&PageNo=' + cp + '&alarm=' + alarm + '&PageSize=' + ls + '&object=' + value,
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
        var count = result.total;
        console.log(count);
        var num = Math.ceil(count / ls);
        sessionStorage.setItem('num', num);
        var html = "";
        $.each(list, function (i, v) {
          if(v.dealDate==null){
            var dealDate="";
          }else{
            var dealDate=v.dealDate
          }
          if (v.type == "漏电故障" || v.type == "剩余电流-报警" || v.type == "漏电故障-开路" || v.type == "漏电故障-短路" || v.type == "漏电报警") {
            html += "<tr><td style='width:60px;' class='td_center'>" + (i + 1) + "</td><td style='width:100px;' class='td_center'>" + v.pname + "</td><td style='width:100px;' class='td_center'>" + v.address + "</td><td style='width:300px;' class='td_center'>" + v.devno + "</td><td style='width:300px;' class='td_center'>" + v.type + ",告警值:" + v.leakageAlarmCurrentValue + "mA</td><td style='width:100px;' class='td_center'>" + v.regdate + "</td><td style='width:100px;' class='td_center'>" + dealDate + "</td><td style='width:150px;' class='td_center'><div class='btn-group btn-group-sm' role='group'><button type='button' aria-expanded='false'  class='btn btn-primary editor'  data-devId=" + v.devId + " data-type=" + v.type + " data-address=" + v.address + " data-pNum=" + v.devno + "><span class='glyphicon glyphicon-edit' aria-hidden='true' ></span>查看</button></div></td></tr>";
          } else if (v.type == "A相电流-报警" || v.type == "A相电流过载-报警" || v.type == "A相故障-开路" || v.type == "A相故障-短路") {
            html += "<tr><td style='width:60px;' class='td_center'>" + (i + 1) + "</td><td style='width:100px;' class='td_center'>" + v.pname + "</td><td style='width:100px;' class='td_center'>" + v.address + "</td><td style='width:100px;' class='td_center'>" + v.devno + "</td><td style='width:300px;' class='td_center'>" + v.type + ",告警值:" + v.currentAlarmAvalue + "A</td><td style='width:100px;' class='td_center'>" + v.regdate + "</td><td style='width:100px;' class='td_center'>" + dealDate + "</td><td style='width:150px;' class='td_center'><div class='btn-group btn-group-sm' role='group'><button type='button' aria-expanded='false'  class='btn btn-primary editor'  data-devId=" + v.devId + " data-type=" + v.type + " data-address=" + v.address + " data-pNum=" + v.devno + "><span class='glyphicon glyphicon-edit' aria-hidden='true' ></span>查看</button></div></td></tr>";
          } else if (v.type == "B相电流-报警" || v.type == "B相电流过载-报警" || v.type == "B相故障-开路" || v.type == "B相故障-短路") {
            html += "<tr><td style='width:60px;' class='td_center'>" + (i + 1) + "</td><td style='width:100px;' class='td_center'>" + v.pname + "</td><td style='width:100px;' class='td_center'>" + v.address + "</td><td style='width:100px;' class='td_center'>" + v.devno + "</td><td style='width:300px;' class='td_center'>" + v.type + ",告警值:" + v.currentAlarmBvalue + "A</td><td style='width:100px;' class='td_center'>" + v.regdate + "</td><td style='width:100px;' class='td_center'>" + dealDate + "</td><td style='width:150px;' class='td_center'><div class='btn-group btn-group-sm' role='group'><button type='button' aria-expanded='false'  class='btn btn-primary editor'  data-devId=" + v.devId + " data-type=" + v.type + " data-address=" + v.address + " data-pNum=" + v.devno + "><span class='glyphicon glyphicon-edit' aria-hidden='true' ></span>查看</button></div></td></tr>";
          } else if (v.type == "C相电流-报警" || v.type == "C相电流过载-报警" || v.type == "C相故障-开路" || v.type == "C相故障-短路") {
            html += "<tr><td style='width:60px;' class='td_center'>" + (i + 1) + "</td><td style='width:100px;' class='td_center'>" + v.pname + "</td><td style='width:100px;' class='td_center'>" + v.address + "</td><td style='width:100px;' class='td_center'>" + v.devno + "</td><td style='width:300px;' class='td_center'>" + v.type + ",告警值:" + v.currentAlarmCvalue + "A</td><td style='width:100px;' class='td_center'>" + v.regdate + "</td><td style='width:100px;' class='td_center'>" + dealDate + "</td><td style='width:150px;' class='td_center'><div class='btn-group btn-group-sm' role='group'><button type='button' aria-expanded='false'  class='btn btn-primary editor'  data-devId=" + v.devId + " data-type=" + v.type + " data-address=" + v.address + " data-pNum=" + v.devno + "><span class='glyphicon glyphicon-edit' aria-hidden='true' ></span>查看</button></div></td></tr>";
          } else if (v.type == "N温度-报警" || v.type == "N温度故障-开路" || v.type == "N温度故障-短路") {
            html += "<tr><td style='width:60px;' class='td_center'>" + (i + 1) + "</td><td style='width:100px;' class='td_center'>" + v.pname + "</td><td style='width:100px;' class='td_center'>" + v.address + "</td><td style='width:100px;' class='td_center'>" + v.devno + "</td><td style='width:300px;' class='td_center'>" + v.type + ",告警值:" + v.noAlarmNTemperatureValue + "°C</td><td style='width:100px;' class='td_center'>" + v.regdate + "</td><td style='width:150px;' class='td_center'><td style='width:100px;' class='td_center'>" + dealDate + "</td><div class='btn-group btn-group-sm' role='group'><button type='button' aria-expanded='false'  class='btn btn-primary editor'  data-devId=" + v.devId + " data-type=" + v.type + " data-address=" + v.address + " data-pNum=" + v.devno + "><span class='glyphicon glyphicon-edit' aria-hidden='true' ></span>查看</button></div></td></tr>";
          } else if (v.type == "A温度-报警" || v.type == "A温度故障-开路" || v.type == "A温度故障-短路") {
            html += "<tr><td style='width:60px;' class='td_center'>" + (i + 1) + "</td><td style='width:100px;' class='td_center'>" + v.pname + "</td><td style='width:100px;' class='td_center'>" + v.address + "</td><td style='width:100px;' class='td_center'>" + v.devno + "</td><td style='width:300px;' class='td_center'>" + v.type + ",告警值:" + v.temperatureAlarmAvalue + "°C</td><td style='width:100px;' class='td_center'>" + v.regdate + "</td><td style='width:100px;' class='td_center'>" + dealDate + "</td><td style='width:150px;' class='td_center'><div class='btn-group btn-group-sm' role='group'><button type='button' aria-expanded='false'  class='btn btn-primary editor'  data-devId=" + v.devId + " data-type=" + v.type + " data-address=" + v.address + " data-pNum=" + v.devno + "><span class='glyphicon glyphicon-edit' aria-hidden='true' ></span>查看</button></div></td></tr>";
          } else if (v.type == "B温度-报警" || v.type == "B温度故障-开路" || v.type == "B温度故障-短路") {
            html += "<tr><td style='width:60px;' class='td_center'>" + (i + 1) + "</td><td style='width:100px;' class='td_center'>" + v.pname + "</td><td style='width:100px;' class='td_center'>" + v.address + "</td><td style='width:100px;' class='td_center'>" + v.devno + "</td><td style='width:300px;' class='td_center'>" + v.type + ",告警值:" + v.temperatureAlarmBvalue + "°C</td><td style='width:100px;' class='td_center'>" + v.regdate + "</td><td style='width:100px;' class='td_center'>" + dealDate + "</td><td style='width:150px;' class='td_center'><div class='btn-group btn-group-sm' role='group'><button type='button' aria-expanded='false'  class='btn btn-primary editor'  data-devId=" + v.devId + " data-type=" + v.type + " data-address=" + v.address + " data-pNum=" + v.devno + "><span class='glyphicon glyphicon-edit' aria-hidden='true' ></span>查看</button></div></td></tr>";
            
          } else if (v.type == "C温度-报警" || v.type == "C温度故障-开路" || v.type == "C温度故障-短路") {
            html += "<tr><td style='width:60px;' class='td_center'>" + (i + 1) + "</td><td style='width:100px;' class='td_center'>" + v.pname + "</td><td style='width:100px;' class='td_center'>" + v.address + "</td><td style='width:100px;' class='td_center'>" + v.devno + "</td><td style='width:300px;' class='td_center'>" + v.type + ",告警值:" + v.temperatureAlarmCvalue + "°C</td><td style='width:100px;' class='td_center'>" + v.regdate + "</td><td style='width:150px;' class='td_center'><td style='width:100px;' class='td_center'>" + dealDate + "</td><div class='btn-group btn-group-sm' role='group'><button type='button' aria-expanded='false'  class='btn btn-primary editor'  data-devId=" + v.devId + " data-type=" + v.type + " data-address=" + v.address + " data-pNum=" + v.devno + "><span class='glyphicon glyphicon-edit' aria-hidden='true' ></span>查看</button></div></td></tr>";
          } else if (v.type == "A相电压-报警" || v.type == "A相电压过载-报警" || v.type == "A相电压过载，电流过载-报警") {
            html += "<tr><td style='width:60px;' class='td_center'>" + (i + 1) + "</td><td style='width:100px;' class='td_center'>" + v.pname + "</td><td style='width:100px;' class='td_center'>" + v.address + "</td><td style='width:100px;' class='td_center'>" + v.devno + "</td><td style='width:300px;' class='td_center'>" + v.type + ",告警值:" + v.voltageAlarmAvalue + "V</td><td style='width:100px;' class='td_center'>" + v.regdate + "</td><td style='width:100px;' class='td_center'>" + dealDate + "</td><td style='width:150px;' class='td_center'><div class='btn-group btn-group-sm' role='group'><button type='button' aria-expanded='false'  class='btn btn-primary editor'  data-devId=" + v.devId + " data-type=" + v.type + " data-address=" + v.address + " data-pNum=" + v.devno + "><span class='glyphicon glyphicon-edit' aria-hidden='true' ></span>查看</button></div></td></tr>";
          } else if (v.type == "B相电压-报警" || v.type == "B相电压过载-报警" || v.type == "B相电压过载，电流过载-报警") {
            html += "<tr><td style='width:60px;' class='td_center'>" + (i + 1) + "</td><td style='width:100px;' class='td_center'>" + v.pname + "</td><td style='width:100px;' class='td_center'>" + v.address + "</td><td style='width:100px;' class='td_center'>" + v.devno + "</td><td style='width:300px;' class='td_center'>" + v.type + ",告警值:" + v.voltageAlarmBvalue + "V</td><td style='width:100px;' class='td_center'>" + v.regdate + "</td><td style='width:100px;' class='td_center'>" + dealDate + "</td><td style='width:150px;' class='td_center'><div class='btn-group btn-group-sm' role='group'><button type='button' aria-expanded='false'  class='btn btn-primary editor'  data-devId=" + v.devId + " data-type=" + v.type + " data-address=" + v.address + " data-pNum=" + v.devno + "><span class='glyphicon glyphicon-edit' aria-hidden='true' ></span>查看</button></div></td></tr>";
          } else if (v.type == "C相电压-报警" || v.type == "C相电压过载-报警" || v.type == "C相电压过载，电流过载-报警") {
            html += "<tr><td style='width:60px;' class='td_center'>" + (i + 1) + "</td><td style='width:100px;' class='td_center'>" + v.pname + "</td><td style='width:100px;' class='td_center'>" + v.address + "</td><td style='width:100px;' class='td_center'>" + v.devno + "</td><td style='width:300px;' class='td_center'>" + v.type + ",告警值:" + v.voltageAlarmCvalue + "V</td><td style='width:100px;' class='td_center'>" + v.regdate + "</td><td style='width:100px;' class='td_center'>" + dealDate + "</td><td style='width:150px;' class='td_center'><div class='btn-group btn-group-sm' role='group'><button type='button' aria-expanded='false'  class='btn btn-primary editor'  data-devId=" + v.devId + " data-type=" + v.type + " data-address=" + v.address + " data-pNum=" + v.devno + "><span class='glyphicon glyphicon-edit' aria-hidden='true' ></span>查看</button></div></td></tr>";
          }else{
            console.log('ok')
          }

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
          var typeName = $(this).attr('data-type');
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
    var alarm=$('.zhuangtaiActive').attr('data-num')
    edit(1, 10, alarm)
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
    console.log(alarm)
    $(this).addClass('zhuangtaiActive').siblings().removeClass('zhuangtaiActive')
    edit(1,10,alarm)
  })
})