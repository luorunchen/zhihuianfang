$(function () {
  var role = localStorage.getItem('role')
  var global = (function () {
    var search = location.search;
    var search = decodeURI(search);
    var global = {};
    if (search != "") {
      search.slice(1).split("&").forEach(function (val) {
        var arr = val.split("=");
        global[arr[0]] = arr[1];
      });
    }
    return global;
  })();
  console.log(global);
  // var type = parseInt(localStorage.getItem('tpage'));
  var type = '7';
  var devId = sessionStorage.getItem("devId");
  var dSid = sessionStorage.getItem("dSid");
  if (global.dSid == '1' || global.dSid == '6') {
    $.ajax({
      type: 'get',
      data: 'devId=' + global.devId + '&type=' + type,
      url: url + '/admin/device/ElecData.action',
      dataType: 'json',
      error: function (err) {
        console.log('SGasAlarm------>' + err);
      },
      success: function (result) {
        console.log(result);
        var data = result.DevData;
        // console.log(data);
        var cdata = result.Data[0];
        console.log(cdata);
        var html = "";
        html = "<h4 style='text-align:center'>所在地址：<lable style='color:darkorange'>" + cdata
          .name + "</lable>，所在位置：<lable style='color:darkorange'>" + cdata.installLocation +
          "</lable><br>时间：<lable style='color:darkorange'>" + cdata.heartbeatTime +
          "</lable>, 设备编号：<lable style='color:darkorange'>" + cdata.productNumber +
          "</lable></h4><h5 style='text-align:right;color:red'>告警数：" + data.length + "</h5>"
        $('#Showalarm').html(html)
        var html = "";
        if (data != null && data != "") {
          $.each(data, function (i, v) {
            // console.log(v);
            html +=
              "<table class='tabBox' style='margin-bottom:20px'><tr><td style='width:120px; ' class='tabLabel'>报警类型</td><td colspan='3'>" +
              v.typeName +
              "</td></tr><tr><td style='width:120px; ' class='tabLabel'>所属单位</td><td colspan='3'>" +
              v.name +
              "</td></tr><tr><td style='width:120px; ' class='tabLabel'>设备位置</td><td colspan='3'>" +
              v.installLocation +
              "</td></tr><tr><td style='width:120px; ' class='tabLabel'>报警时间</td><td colspan='3'>" +
              v.alarmFaultDate + "</td></tr></table>";
          })
          //  var {alarmFaultDate,deviceid,typeName,installLocation,name}=c;
        } else {
          var html = "<h1 style='text-align:center'>页面暂无报警</h1>";
        }
        $('#ShowTable').html(html);
      }
    })
  } else {
    $('#ShowTable').css({
      'width': '95%',
      'height': '200px',
      'display': 'flex',
      'justify-content': 'space-around',
      'margin-bottom': '10px',
    })
    $.ajax({
      type: 'get',
      url: url + '/admin/device/getDeviceByDevId.action',
      data: 'devid=' + global.devId,
      error: function (error) {
        console.log(error)
      },
      dataType: 'json',
      success: function (res) {
        console.log(res)
        var cdata = res.list[0].mess[0];
        var isOnLine=res.list[0].mess[0].isOnLine;
        var html = "";
        html = "<h4 style='text-align:center'>所在地址：<lable style='color:darkorange'>" + cdata
          .name + "</lable>，所在位置：<lable style='color:darkorange'>" + cdata.installLocation +
          "</lable><br>时间：<lable style='color:darkorange'>" + cdata.date +
          "</lable>, 设备编号：<lable style='color:darkorange'>" + cdata.productNumber +
          "</lable></h4>"
        $('#Showalarm').html(html)

        var mess2 = res.list[0].mess2[0];
        var html = "";
        if (mess2 == null) {
         $('#ShowTable').css('display','none');
         $('.noInfo').css('display','block');
        } else {

          console.log(res.list[0].mess2[0].value1.split(','))
          var mess2Data1 = res.list[0].mess2[0].value1.replace('/', '%'); // 实时值
          console.log(mess2Data1)
          var notwo = res.list[0].mess2[0].value2
          if (notwo != null) { // 判断有没有第二个设备
            var mess2Data2 = notwo.replace('/', '%'); // 实时值
          } else {
            var mess2Data2 = "";
          }
          console.log(mess2Data2)

          var mess5 = res.list[0].mess5[0];
          console.log(mess5)
          if (mess5 != '[') { //报警
            var alarmFaultDate = mess5.alarmFaultDate
            var typeName = mess5.typeName.split(',')

            var alarmValue = mess5.alarmValue
            var panduanNum = mess5.alarmValue.indexOf('='); //判断他有几个报警
            var typeNum = mess5.typeName.indexOf('2号') //判断哪一个探头报警
            var mess5Data1 = alarmValue.split(',')[0].replace('/', '%')
            if (panduanNum != '-1') { //多个报警
              var firstAlarm = mess5.alarmValue.split('=')[0].split(',')[0].replace('/', '%'); //一号报警
              var secondAlarm = mess5.alarmValue.split('=')[1].split(',')[0].replace('/', '%'); //二号报警
              var firstDu = mess5.alarmValue.split('=')[0].split(',')[1]; //一号报警浓度精度
              var secondDu = mess5.alarmValue.split('=')[1].split(',')[1]; //二号报警浓度精度
              html =
                "<div class='box_photo'><div><p style='margin-top:55px;color:red'>实时值</p></div><div><img src='./images/gong_hong.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" +
                mess2Data1 +
                "</p></div><div><img src='./images/gong_hong.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" +
                mess2Data2 +
                "</p></div></div><div style='margin-top:10px;font-size:16px;    display: flex;' class='box_xin'><div style='width:50%'><div style='float:left;margin-left:15px;'>一号探头报警状态：</div><div style='color:#f10c0c'>" +
                typeName[0] +
                "</div><div style='float:left;margin-left:15px;'>一号探头浓度精度：</div><div style='color:#f10c0c'>" +
                firstDu +
                "</div><div style='float:left;margin-left:15px;'>一号探头报警值：</div><div style='color:#f10c0c;'>" +
                firstAlarm +
                "</div><div style='float:left;margin-left:15px;'>一号探头报警时间：</div><div style='color:#f10c0c'>" +
                alarmFaultDate +
                "</div></div ><div style='width:50%'><div style='float:left;margin-left:15px;'>二号探头报警状态：</div><div style='color:#f10c0c'>" +
                typeName[1] +
                "</div><div style='float:left;margin-left:15px;'>二号探头浓度精度：</div><div style='color:#f10c0c'>" +
                secondDu +
                "</div><div style='float:left;margin-left:15px;'>二号探头报警值：</div><div style='color:#f10c0c;'>" +
                secondAlarm +
                "</div><div style='float:left;margin-left:15px;'>二号探头报警时间：</div><div style='color:#f10c0c'>" +
                alarmFaultDate + "</div></div></div>";
            } else { //单个报警
              if (typeNum == '-1') { //一号报警
                console.log('a')
                var firstAlarm = mess5.alarmValue.split('=')[0].split(',')[0].replace('/', '%'); //一号报警
                var firstDu = mess5.alarmValue.split('=')[0].split(',')[1]; //一号报警浓度精度
                var secondAlarm = " </br>";
                var secondDu = " </br>";
              } else {
                console.log('b');
                var firstAlarm = " </br>";
                var firstDu = " </br>";
                var secondAlarm = mess5.alarmValue.split('=')[1].split(',')[0].replace('/', '%'); //二号报警
                var secondDu = mess5.alarmValue.split('=')[1].split(',')[1]; //二号报警浓度精度
              }
              html =
                "<div class='box_photo'><div><p style='margin-top:55px;color:red'>实时值</p></div><div><img src='./images/" +
                (typeNum == '-1' ? 'gong_hong.png' : 'gongye_zheng.png') +
                "' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" +
                (typeNum == '-1' ? mess2Data1 : mess2Data2) +
                "</p></div><div><img src='./images/" + (typeNum != '-1' ? 'gong_hong.png' : 'gongye_zheng.png') +
                "' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" +
                (typeNum == '-1' ? mess2Data2 : mess2Data1) +
                "</p></div></div><div style='margin-top:10px;font-size:16px;    display: flex;' class='box_xin'><div style='width:50%'><div style='float:left;margin-left:15px;'>一号探头报警状态：</div><div style='" +
                (typeNum == '-1' ? 'color:#f10c0c' : 'color:#757373') + "'>" + (typeNum ==
                  '-1' ? typeName[0] : typeName[1]) +
                "</div><div style='float:left;margin-left:15px;'>一号探头报警值：</div><div style='" +
                (typeNum == '-1' ? 'color:#f10c0c' : 'color:#757373') + "'>" + (typeNum ==
                  '-1' ? firstAlarm : secondAlarm) +
                "</div><div style='float:left;margin-left:15px;'>一号探头浓度精度：</div><div style='" +
                (typeNum == '-1' ? 'color:#f10c0c' : 'color:#757373') + "'>" + (typeNum ==
                  '-1' ? firstAlarm : secondAlarm) +
                "</div><div style='float:left;margin-left:15px;'>一号探头报警时间：</div><div style='" +
                (typeNum == '-1' ? 'color:#f10c0c' : 'color:#757373') + "'>" +
                alarmFaultDate +
                "</div></div ><div style='width:50%'><div style='float:left;margin-left:15px;'>二号探头报警状态：</div><div style='color:#757373'>" +
                (typeNum != '-1' ? typeName[0] : ' <br>') +
                "</div><div style='float:left;margin-left:15px;'>二号探头浓度精度：</div><div style='" +
                (typeNum != '-1' ? 'color:#f10c0c' : 'color:#757373') + "'>" + (typeNum ==
                  '-1' ? secondAlarm : firstAlarm) +
                "</div><div style='float:left;margin-left:15px;'>二号探头报警值：</div><div style='" +
                (typeNum != '-1' ? 'color:#f10c0c' : 'color:#757373') + "'>" +
                (typeNum == '-1' ? secondAlarm : firstAlarm) +
                "</div><div style='float:left;margin-left:15px;'>二号探头报警时间：</div><div style='color:#757373'></div></div></div>";
            }
          } else { //没报警
            
            if (mess2Data2 == '') { //只有一个探头
              html = "<div class='box_photo'><div><p style='margin-top:55px;color:red'>实时值</p></div><div><img src='./images/"+(global.typeName==''?'gongye_li':'gongye_zheng')+".png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p>" + mess2Data1 + "</p></div></div><div style='margin-top:10px;font-size:16px;    display: flex;' class='box_xin'><div style='width:52%'></div><div style='width:33%'><div style='float:left;margin-left:15px;'>一号探头报警状态：</div><div style='color:#757373'>"+(global.typeName==''?'离线':'正常')+"</div><div style='float:left;margin-left:15px;'>一号探头报警值：</div><div style='color:#757373;'></div><div style='float:left;margin-left:15px;'>一号探头报警时间：</div><div style='color:#757373'><br /><span style='float:right'></span></div></div ></div>";
            } else {
              html = "<div class='box_photo'><div><p style='margin-top:55px;color:red'>实时值</p></div><div><img src='./images/"+(global.typeName==''?'gongye_li':'gongye_zheng')+".png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p>" + mess2Data1 + "</p></div><div><img src='./images/"+(global.typeName==''?'gongye_li':'gongye_zheng')+".png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p>" + mess2Data2 + "</p></div></div><div style='margin-top:10px;font-size:16px;    display: flex;' class='box_xin'><div style='width:30%'></div><div style='width:30%'><div style='float:left;margin-left:15px;'>一号探头报警状态：</div><div style='color:#757373'>"+(global.typeName==''?'离线':'正常')+"</div><div style='float:left;margin-left:15px;'>一号探头报警值：</div><div style='color:#757373;'></div><div style='float:left;margin-left:15px;'>一号探头报警时间：</div><div style='color:#757373'><br /><span style='float:right'></span></div></div ><div style='width:30%'><div style='float:left;margin-left:15px;'>二号探头报警状态：</div><div style='color:#757373'>"+(global.typeName==''?'离线':'正常')+"</div><div style='float:left;margin-left:15px;'>二号探头报警值：</div><div style='color:#757373;'></div><div style='float:left;margin-left:15px;'>二号探头报警时间：</div><div style='color:#757373'><br /><span style='float:right'></span> </div></div></div>"
            }
          }
          $('.box').html(html)
        }

      }
    })
  }
})