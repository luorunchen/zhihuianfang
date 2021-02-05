$(function () {
  var devId = sessionStorage.getItem("DevBH");
  var address = sessionStorage.getItem('devMC'); //最后
  var name = sessionStorage.getItem('comName'); //最后
  var role = localStorage.getItem('role');
  var power = localStorage.getItem('power');
  var username = localStorage.getItem('userName');
  var productNumber = sessionStorage.getItem('productNumber') //设备号
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

  function loadData(day) {
    //  console.log(devId);
    $.ajax({
      type: 'get',
      data: 'devId=' + global.devBH + '&lstDate=' + day,
      url: url + '/admin/device/ElecData.action',
      // url:'http://p240647i77.qicp.vip/earlyWarn/admin/device/ElecData.action',
      dataType: 'json',
      error: function (err) {
        console.log('MDChart' + err);
      },
      success: function (result) {
        console.log(result);
        var ElecDetail = result.DevData[0];
        var data = result.Data;
        var res = ElecDetail.master;
        sessionStorage.setItem('res', res);
        var aFid = result.mess6[0].aFid
        sessionStorage.setItem('aFid', aFid)
        var devSignature = ElecDetail.productNumber;
        sessionStorage.setItem('devSignature', devSignature)
        var img = result.DevData[0].image.split(',');
        console.log(img);
        var html = '';
        // var {happenedTime,productNumber,productNumber,typeName,installLocation,master,regdate,status,newestDate}=c;
        //详细信息
        if (ElecDetail.policy == '0') {
          var policy = "";
        } else {
          var policy = ElecDetail.policy
        }
        if (ElecDetail.flow == '0') {
          var flow = "否";
        } else {
          var flow = ElecDetail.flowTime || "已开启"
        }
        html = "<div class='inforLine'><div class='inforLabel'>设备编号:</div><div class='inforValue'>" + ElecDetail.productNumber + "</div></div><div class='inforLine'><div class='inforLabel'>在线状态:</div><div class='inforValue'>" + ElecDetail.status + "</div></div><div class='inforLine'><div class='inforLabel'>报警手机:</div><div class='inforValue'>" + ElecDetail.master + "</div></div><div class='inforLine'><div class='inforLabel'>报警信息:</div><div class='inforValue' id='AlarmValue'>" + ElecDetail.typeName + "</div></div><div class='inforLine'><div class='inforLabel'>安装位置:</div><div class='inforValue' style='display:block;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;' title='" + ElecDetail.installLocation + "'>" + ElecDetail.installLocation + "</div></div><div class='inforLine'><div class='inforLabel'>安装日期:</div><div class='inforValue'>" + ElecDetail.regdate + "</div></div><div class='inforLine'><div class='inforLabel'>最新数据:</div><div class='inforValue'  id='newTime'>" + ElecDetail.newestDate + "</div></div><div class='inforLine'><div class='inforLabel'>保险单号:</div><div class='inforValue'>" + policy + "</div></div><div class='inforLine'><div class='inforLabel'>开启流量:</div><div class='inforValue'>" + flow + "</div></div>";
        $('#ElecAlarm').html(html);


        var img_html = "";
        if (img != "") {
          if (img.length >= '3') {
            img_html = "<div class='InforBox' style='width:97%;height:200px;    display: flex;justify-content: center;align-items: center;'><div class='tab2_photo_chuan_img'><form   enctype='multipart/form-data'  method='post' class='btn_form'><label for='file_head'  style='width: 30%; height: 29%;' ><img src='http://" + img_url + "/ctx/devPic/" + img[0] + "' alt=''   style='max-width: 175%;'><input type='text'  name='productNumber' value='" + ElecDetail.productNumber + "'  style='display:none;' /><input type='file' accept='image/*'  value='' index='2' style='display:none;' name='file' /><canvas id='canvas' hidden='hidden' id='canvas'></canvas></label></form></div><div class='tab2_photo_chuan_img'><form   enctype='multipart/form-data'  method='post' class='btn_form'><label for='file_head'  style='width: 30%; height: 29%;' ><img src='http://" + img_url + "/ctx/devPic/" + img[1] + "' alt=''  style='max-width: 175%;'  ><input type='text'  name='productNumber' value='" + ElecDetail.productNumber + "'  style='display:none;' /><input type='file' accept='image/*'  value='' index='2' style='display:none;' name='file' /><canvas id='canvas' hidden='hidden' id='canvas'></canvas></label></form></div><div class='tab2_photo_chuan_img'><form   enctype='multipart/form-data'  method='post' class='btn_form'><label for='file_head'  style='width: 30%; height: 29%;' ><img src='http://" + img_url + "/ctx/devPic/" + img[2] + "' alt=''  style='max-width: 175%;' ><input type='text'  name='productNumber' value='" + ElecDetail.productNumber + "'  style='display:none;' /><input type='file' accept='image/*'  value='' index='2' style='display:none;' name='file' /><canvas id='canvas' hidden='hidden' id='canvas'></canvas></label></form></div></div>";
          } else if (img.length == '2') {
            img_html = "<div class='InforBox' style='width:97%;height:200px;    display: flex;justify-content: center;align-items: center;'><div class='tab2_photo_chuan_img'><form   enctype='multipart/form-data'  method='post' class='btn_form'><label for='file_head'  style='width: 30%; height: 29%;' ><img src='http://" + img_url + "/ctx/devPic/" + img[0] + "' alt='' style='max-width: 175%;'  ><input type='text'  name='productNumber' value='" + ElecDetail.productNumber + "'  style='display:none;' /><input type='file' accept='image/*'  value='' index='2' style='display:none;' name='file' /><canvas id='canvas' hidden='hidden' id='canvas'></canvas></label></form></div><div class='tab2_photo_chuan_img'><form   enctype='multipart/form-data'  method='post' class='btn_form'><label for='file_head'  style='width: 30%; height: 29%;' ><img src='http://" + img_url + "/ctx/devPic/" + img[1] + "' alt='' style='max-width: 175%;'  ><input type='text'  name='productNumber' value='" + ElecDetail.productNumber + "'  style='display:none;' /><input type='file' accept='image/*'  value='' index='2' style='display:none;' name='file' /><canvas id='canvas' hidden='hidden' id='canvas'></canvas></label></form></div><div class='tab2_photo_chuan_img'><form   enctype='multipart/form-data'  method='post' class='btn_form'><label for='file_head'  style='width: 30%; height: 29%;' ><img src='./images/img_bg.png' alt=''   ><input type='text'  name='productNumber' value='" + ElecDetail.productNumber + "'  style='display:none;' /><input type='file' accept='image/*'  value='' index='2' style='display:none;' name='file' /><canvas id='canvas' hidden='hidden' id='canvas'></canvas></label></form></div></div>";
          } else {
            img_html = "<div class='InforBox' style='width:97%;height:200px;    display: flex;justify-content: center;align-items: center;'><div class='tab2_photo_chuan_img'><form   enctype='multipart/form-data'  method='post' class='btn_form'><label for='file_head'  style='width: 30%; height: 29%;' ><img src='http://" + img_url + "/ctx/devPic/" + img[0] + "' alt='' style='max-width: 175%;'  ><input type='text'  name='productNumber' value='" + ElecDetail.productNumber + "'  style='display:none;' /><input type='file' accept='image/*'  value='' index='2' style='display:none;' name='file' /><canvas id='canvas' hidden='hidden' id='canvas'></canvas></label></form></div><div class='tab2_photo_chuan_img'><form   enctype='multipart/form-data'  method='post' class='btn_form'><label for='file_head'  style='width: 30%; height: 29%;' ><img src='./images/img_bg.png' alt=''   ><input type='text'  name='productNumber' value='" + ElecDetail.productNumber + "'  style='display:none;' /><input type='file' accept='image/*'  value='' index='2' style='display:none;' name='file' /><canvas id='canvas' hidden='hidden' id='canvas'></canvas></label></form></div><div class='tab2_photo_chuan_img'><form   enctype='multipart/form-data'  method='post' class='btn_form'><label for='file_head'  style='width: 30%; height: 29%;' ><img src='./images/img_bg.png' alt=''   ><input type='text'  name='productNumber' value='" + ElecDetail.productNumber + "'  style='display:none;' /><input type='file' accept='image/*'  value='' index='2' style='display:none;' name='file' /><canvas id='canvas' hidden='hidden' id='canvas'></canvas></label></form></div></div>";
          }
        } else {
          img_html = "<div class='InforBox' style='width:97%;height:200px;    display: flex;justify-content: center;align-items: center;'><div class='tab2_photo_chuan_img'><form   enctype='multipart/form-data'  method='post' class='btn_form'><label for='file_head'  style='width: 30%; height: 29%;' ><img src='./images/img_bg.png' alt=''   ><input type='text'  name='productNumber' value='" + ElecDetail.productNumber + "'  style='display:none;' /><input type='file' accept='image/*'  value='' index='2' style='display:none;' name='file' /><canvas id='canvas' hidden='hidden' id='canvas'></canvas></label></form></div><div class='tab2_photo_chuan_img'><form   enctype='multipart/form-data'  method='post' class='btn_form'><label for='file_head'  style='width: 30%; height: 29%;' ><img src='./images/img_bg.png' alt=''   ><input type='text'  name='productNumber' value='" + ElecDetail.productNumber + "'  style='display:none;' /><input type='file' accept='image/*'  value='' index='2' style='display:none;' name='file' /><canvas id='canvas' hidden='hidden' id='canvas'></canvas></label></form></div><div class='tab2_photo_chuan_img'><form   enctype='multipart/form-data'  method='post' class='btn_form'><label for='file_head'  style='width: 30%; height: 29%;' ><img src='./images/img_bg.png' alt=''   ><input type='text'  name='productNumber' value='" + ElecDetail.productNumber + "'  style='display:none;' /><input type='file' accept='image/*'  value='' index='2' style='display:none;' name='file' /><canvas id='canvas' hidden='hidden' id='canvas'></canvas></label></form></div></div>";
        }
        $('#inforN').html(img_html)


        var btn = $('.tab2_photo_chuan_img');
        for (var i = 0; i < btn.length; i++) {
          btn[i].onclick = function () {
            var that = $(this);
            //console.log(that);
            var str = that.find('img')[0].src.split('/');
            // console.log(str);
            var str_last = str[str.length - 1];
            // console.log(str_last);
            if (str_last == 'img_bg.png') {

            } else {
              var img = that.find('img')[0].src;
              console.log(img);
              sessionStorage.setItem('img', img);
              window.open(img);
            }
          }
        }
      }
    })
  }

  var time = new Date();
  var year = time.getFullYear();
  var month = time.getMonth() + 1;
  var day = time.getDate();
  var now = year + '-' + month + '-' + day;
  loadData(now);


  //折线图
  //http://192.168.0.156:8080/earlyWarn/fracture.action?&did=0400000000304216
  function Humdit() {
    var st_date = $('#QueryDateStarHum').val();
    var en_date = $('#QueryDateEndHum').val();
    $.ajax({
      type: 'get',
      data: 'did=' + productNumber + '&my_username=' + username + '&st_date=' + st_date + '&en_date=' + en_date,
      url: url + '/fracture.action',
      error: function (err) {
        console.log('MDChart' + err);
      },
      success: function (result) {
        var res = JSON.parse(result)
        console.log(res)
        var temp = [];
        var humidity = [];
        var date = [];
        var data = res.data;
        $.each(data, function (i, v) {
          temp.push(v.temp)
          humidity.push(v.hum)
          date.push(v.time)
        })

        var domI = document.getElementById("divChartI");
        var myChart = echarts.init(domI);
        optionI = null;
        optionI = {
          tooltip: { //提示框组件
            trigger: 'axis', //触发类型。
            axisPointer: { //配置坐标轴指示器的快捷方式
              type: 'shadow', // 阴影指示器
              label: { //坐标轴指示器的文本标签。
                show: true //是否显示文本标签。
              }
            }
          },
          toolbox: { //工具栏	
            show: true, //是否显示工具栏组件。
            feature: { //各工具配置项。
              mark: {
                show: true
              },
              //dataView : {show: true, readOnly: false},
              magicType: {
                show: true,
                type: ['bar']
              },
              restore: {
                show: true
              },
              saveAsImage: {
                show: true
              }
            }
          },
          calculable: true,
          legend: {
            data: ['湿度(%)'], //图例的数据数组
            itemGap: 1 //图例每项之间的间隔
          },
          grid: {
            top: '12%', //grid 组件离容器上侧的距离。
            left: '5%',
            right: '2%',
            containLabel: true //区域是否包含坐标轴的刻度标签。
          },
          xAxis: [{
            type: 'category', //坐标轴类型。
            data: date,
            axisLabel: {
              /*****重点还是在这里哦**/ //
              textStyle: {
                color: '#7c8893',
                fontSize: 12
              },
              interval: 0,
              formatter: function (params) {
                var newParamsName = ""; // 最终拼接成的字符串
                var paramsNameNumber = params.length; // 实际标签的个数
                var provideNumber = 11; // 每行能显示的字的个数
                var rowNumber = Math.ceil(paramsNameNumber / provideNumber); // 换行的话，需要显示几行，向上取整
                /**
                 * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
                 */
                // 条件等同于rowNumber>1
                if (paramsNameNumber > provideNumber) {
                  /** 循环每一行,p表示行 */
                  for (var p = 0; p < rowNumber; p++) {
                    var tempStr = ""; // 表示每一次截取的字符串
                    var start = p * provideNumber; // 开始截取的位置
                    var end = start + provideNumber; // 结束截取的位置
                    // 此处特殊处理最后一行的索引值
                    if (p == rowNumber - 1) {
                      // 最后一次不换行
                      tempStr = params.substring(start, paramsNameNumber);
                    } else {
                      // 每一次拼接字符串并换行
                      tempStr = params.substring(start, end) + "\n";
                    }
                    newParamsName += tempStr; // 最终拼成的字符串
                  }

                } else {
                  // 将旧标签的值赋给新标签
                  newParamsName = params;
                }
                //将最终的字符串返回
                return newParamsName
              }
            }
          }],
          yAxis: [{
            type: 'value',
            name: '湿度(%)',
          }],
          dataZoom: [ //用于区域缩放
            {
              show: true,
              start: 0, //数据窗口范围的起始百分比
              end: 100
            },
            {
              type: 'inside',
              start: 0,
              end: 100
            },
          ],
          series: [{
            name: '湿度(%)',
            type: 'line',
            data: humidity
          }]
        };
        myChart.setOption(optionI, true);
      }
    })
  }

  function temp() {
    var st_date = $('#QueryDateStarTemp').val();
    var en_date = $('#QueryDateEndTemp').val();
    $.ajax({
      type: 'get',
      data: 'did=' + productNumber + '&my_username=' + username + '&st_date=' + st_date + '&en_date=' + en_date,
      url: url + '/fracture.action',
      error: function (err) {
        console.log('MDChart' + err);
      },
      success: function (result) {
        var res = JSON.parse(result)
        console.log(res)
        var temp = [];
        var humidity = [];
        var date = [];
        var data = res.data;
        $.each(data, function (i, v) {
          temp.push(v.temp)
          humidity.push(v.hum)
          date.push(v.time)
        })
        var domU = document.getElementById("divChartU");
        var myChart = echarts.init(domU);
        optionU = null;
        optionU = {
          tooltip: { //提示框组件
            trigger: 'axis', //触发类型。
            axisPointer: { //配置坐标轴指示器的快捷方式
              type: 'shadow', // 阴影指示器
              label: { //坐标轴指示器的文本标签。
                show: true //是否显示文本标签。
              }
            }
          },
          toolbox: { //工具栏	
            show: true, //是否显示工具栏组件。
            feature: { //各工具配置项。
              mark: {
                show: true
              },
              //dataView : {show: true, readOnly: false},
              magicType: {
                show: true,
                type: ['bar']
              },
              restore: {
                show: true
              },
              saveAsImage: {
                show: true
              }
            }
          },
          calculable: true,
          legend: {
            data: ['温度(°C)'], //图例的数据数组
            itemGap: 1 //图例每项之间的间隔
          },
          grid: {
            top: '12%', //grid 组件离容器上侧的距离。
            left: '5%',
            right: '2%',
            containLabel: true //区域是否包含坐标轴的刻度标签。
          },
          xAxis: [{
            type: 'category', //坐标轴类型。
            data: date,
            axisLabel: {
              /*****重点还是在这里哦**/ //
              textStyle: {
                color: '#7c8893',
                fontSize: 12
              },
              interval: 0,
              formatter: function (params) {
                var newParamsName = ""; // 最终拼接成的字符串
                var paramsNameNumber = params.length; // 实际标签的个数
                var provideNumber = 11; // 每行能显示的字的个数
                var rowNumber = Math.ceil(paramsNameNumber / provideNumber); // 换行的话，需要显示几行，向上取整
                /**
                 * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
                 */
                // 条件等同于rowNumber>1
                if (paramsNameNumber > provideNumber) {
                  /** 循环每一行,p表示行 */
                  for (var p = 0; p < rowNumber; p++) {
                    var tempStr = ""; // 表示每一次截取的字符串
                    var start = p * provideNumber; // 开始截取的位置
                    var end = start + provideNumber; // 结束截取的位置
                    // 此处特殊处理最后一行的索引值
                    if (p == rowNumber - 1) {
                      // 最后一次不换行
                      tempStr = params.substring(start, paramsNameNumber);
                    } else {
                      // 每一次拼接字符串并换行
                      tempStr = params.substring(start, end) + "\n";
                    }
                    newParamsName += tempStr; // 最终拼成的字符串
                  }

                } else {
                  // 将旧标签的值赋给新标签
                  newParamsName = params;
                }
                //将最终的字符串返回
                return newParamsName
              }
            }
          }],
          yAxis: [{
            type: 'value',
            name: '温度值(°C)',
          }],
          dataZoom: [ //用于区域缩放
            {
              show: true,
              start: 0, //数据窗口范围的起始百分比
              end: 100
            },
            {
              type: 'inside',
              start: 0,
              end: 100
            },
          ],
          series: [{
            name: '温度(°C)',
            type: 'line',
            data: temp
          }]
        };
        myChart.setOption(optionU, true);

      }
    })
  }
  setTimeout(()=>{
    Humdit();
    temp();
  },1000)
  $('#selectTemp').click(function () {
    temp();
  })
  $('#selectHum').click(function () {
    Humdit();
  })
  $.ajax({
    type: 'get',
    data: 'devid=' + global.devBH,
    url: url + '/admin/device/getDeviceByDevId.action',
    error: function (err) {
      console.log('MDChart' + err);
    },
    success: function (result) {
      var res = JSON.parse(result)
      console.log(res)

      var type1 = res.list[0].mess2[0].type1;
      var type2 = res.list[0].mess2[0].type2;
      var value1 = res.list[0].mess2[0].value1;
      var value2 = res.list[0].mess2[0].value2;
      var mie = [];
      var yan = [];
      if (type1 == '0') {
        var typeMie = '灭火器正常'
      } else {
        var messdata = res.list[0].mess5;
        console.log(messdata)
        $.each(messdata, function (i, v) {
          if (v.type == '0') {
            mie.push(v)
          }
        })
      }
      console.log(mie)

      if (type2 == '0') {
        var typeYan = '烟感正常'
      } else {
        var messdata = res.list[0].mess5;
        $.each(messdata, function (i, v) {
          if (v.type == '1') {
            yan.push(v)
          }
        })
      }
      console.log(yan)
      var html = "";
      html = "<div class='box_photo'><div style='  width: 30%;margin-top:10px;'><img src='./images/" + (type2 == '0' ? 'w_white.png ' : 'w_red.png') + "' alt='' style='display:inline-block;width:40px;height:40px;'><p>" + value2 + "°C</p></div><div style='  width: 30%;margin-top:10px;'><img src='./images/" + (type1 == '0' ? 'shidu.png' : 'shidu_red.png') + "' alt='' style='display:inline-block;width:40px;height:40px;'><p>" + value1 + "%</p></div></div><div style='display: flex;justify-content: flex-start;'><div style='margin-top:10px;font-size:16px;width:50%' class='box_xin'><div style='float:left;'>灭火器状态：</div><div style='" + (type1 == '0' ? 'color:#3cf' : 'color:#f00') + "'>" + (type1 == '0' ? '灭火器正常' : mie[0].typeName) + "</div><div style='float:left;'>报警时间：</div><div style='" + (type1 == '0' ? 'color:#BFBCBC' : 'color:#f00') + "'>" + (type1 == '0' ? '无' : mie[0].alarmFaultDate) + "</div></div><div style='margin-top:10px;font-size:16px;width:50%' class='box_xin'><div style='float:left;'>烟感状态：</div><div style='" + (type2 == '0' ? 'color:#3cf' : 'color:#f00') + "'>" + (type2 == '0' ? '烟感    正常' : yan[0].typeName) + "</div><div style='float:left;'>报警时间：</div><div style='" + (type2 == '0' ? 'color:#BFBCBC' : 'color:#f00') + "'>" + (type2 == '0' ? '无' : yan[0].alarmFaultDate) + "</div></div></div>";
      $('#tableDetail').html(html);
    }
  })

  $('#dispose').click(function () {
    //http://p240647i77.qicp.vip/newEarlyWarn/WebeditFileimageServlet
    var username = localStorage.getItem('userName');
    var cause = $('#txtDo').val();
    var aFid = sessionStorage.getItem('aFid');
    if (aFid == "") {
      alert('该设备没有报警，无需解除')
    } else {
      var user = username + ',' + aFid
      if (cause == "") {
        alert('请填写解除信息备注')
      } else {
        $.ajax({
          type: 'get',
          url: url + '/WebeditFileimageServlet',
          data: 'username=' + user + '&cause=' + cause,
          error: function (error) {
            console.log('MDchart---->doAlarm' + error);
          },
          success: function (res) {
            console.log(res)
            var res = JSON.parse(res);
            console.log(res);
            if (res.list[0].status == true) {
              console.log(1)
              layer.open({
                content: res.list[0].err_msg
              })
              setTimeout(function () {
                location.reload();
                layer.close();
              }, 1000)

            } else {
              layer.open({
                content: res.list[0].err_msg
              })
            }
          }
        })
      }
    }

  })

})