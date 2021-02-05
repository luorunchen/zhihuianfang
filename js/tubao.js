$(function () {
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
  /**
   *    inforBox
   */

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
      var messZheng = res.list[0].mess2[0]   // 设备实时数据
      var ElecDetail = res.list[0].mess[0];  //设备信息
      console.log(messZheng != 'null')
      var Pnum = res.list[0].mess[0].productNumber
      sessionStorage.setItem('productNumber', Pnum) //用户设备导出
      var mess = res.list[0].mess5[0]  // 设备报警时数据
      //离线
      if (messZheng != '[') {
        console.log('下一个ajax')
        $.ajax({
          type: 'get',
          data: 'id=' + Pnum,
          url: url + '/ReadParameterApi.action',
          error: function (err) {
            console.log('MDChart' + err);
          },
          success: function (result) {
            var result = JSON.parse(result)
            console.log(result)
            var faData = result.row
            if (global.typeName == '' || global.typeName == '离线' || global.typeName == '正常') {  // 离线 正常 的时候
              //if (messZheng != '[' ) {   // 实时数据部位不为空的时候
              console.log('实时数据部位不为空的时候')
              var ele = mess.leakageAlarmCurrentValue;
              var ele2 = messZheng.leakageAlarmCurrentValue;
              if (parseInt(ele) > 10000) {
                ele = ele.substring(0, ele.length - 1);
              }
              if (parseInt(ele2) > 10000) {
                ele2 = ele2.substring(0, ele2.length - 1);
              }
              html = "<div class='box' style='width:6%;'><div style='margin-top:55px;font-size:16px;'><p style='color:red;font-size: 13px;'>实时值</p><p style='color:red;font-size: 13px;'>阀值</p></div></div><div class='box'><div class='box_photo'><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noLeakageAlarmACurrentValue + "A</p><p >" + faData.ADianLiu + "A</p></div><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noLeakageAlarmBCurrentValue + "A</p><p >" + faData.BDianLiu + "A</p></div><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noLeakageAlarmCCurrentValue + "A</p><p >" + faData.CDianLiu + "A</p></div><div><img src='./images/s_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + ele2 + "mA</p><p >" + faData.SYdianliu + "mA</p></div></div><div style='margin-top:10px;font-size:16px;' class='box_xin'><div style='float:left;margin-left:15px;'>报警状态：</div><div style='color:#BFBCBC'>无</div><div style='float:left;margin-left:15px;'>报警值：</div><div style='color:#BFBCBC;'>无</div><div style='float:left;margin-left:15px;'>报警时间：</div><div style='color:#BFBCBC;'>无</div></div></div><div class='box'><div class='box_photo'><div><img src='./images/v_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noVoltageAlarmAValue + "V</p><p >" + faData.ADianYa + "V</p></div><div><img src='./images/v_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noVoltageAlarmBValue + "V</p><p >" + faData.BDianYa + "V</p></div><div><img src='./images/v_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noVoltageAlarmCValue + "V</p><p >" + faData.CDianYa + "V</p></div></div><div class='box_xin' style='margin-top:10px;font-size:16px;'><div style='float:left;margin-left:15px;'>报警状态：</div><div style='color:#BFBCBC'>无</div><div style='float:left;margin-left:15px;'>报警值：</div><div style='color:#BFBCBC;'>无</div><div style='float:left;margin-left:15px;'>报警时间：</div><div style='color:#BFBCBC'>无  </div></div></div><div class='box'><div class='box_photo'><div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noAlarmATemperatureValue + "°C</p><p >" + faData.AWenDu + "°C</p></div><div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noAlarmBTemperatureValue + "°C</p><p >" + faData.BWenDu + "°C</p></div> <div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noAlarmCTemperatureValue + "°C</p><p >" + faData.CWenDu + "°C</p></div><div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noAlarmNTemperatureValue + "°C</p><p >" + faData.NWenDu + "°C</p></div> </div><div  class='box_xin' style='margin-top:10px;font-size:16px;'><div style='float:left;margin-left:15px;'>报警状态：</div><div style='color:#BFBCBC'>无</div><div style='float:left;margin-left:15px;'>报警值：</div><div style='color:#BFBCBC;'>无</div><div style='float:left;margin-left:15px;'>报警时间：</div><div style='color:#BFBCBC;font-size: 13px;line-height:21px'>无 </div></div></div>";
              /* } 
             else {
                html = "<div class='box' style='width:6%;'><div style='margin-top:55px;font-size:16px;'><p style='color:red;font-size: 13px;'>实时值</p><p style='color:red;font-size: 13px;'>阀值</p></div></div><div class='box'><div class='box_photo'><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >无</p></div><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >无</p></div><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >无</p></div><div><img src='./images/s_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >无</p></div></div><div style='margin-top:10px;font-size:16px;' class='box_xin'><div style='float:left;margin-left:15px;'>报警状态：</div><div style='color:#BFBCBC'>无</div><div style='float:left;margin-left:15px;'>报警值：</div><div style='color:#BFBCBC;'>无</div><div style='float:left;margin-left:15px;'>报警时间：</div><div style='color:#BFBCBC;'>无</div></div></div><div class='box'><div class='box_photo'><div><img src='./images/v_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >无</p></div><div><img src='./images/v_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >无</p></div><div><img src='./images/v_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >无</p></div></div><div class='box_xin' style='margin-top:10px;font-size:16px;'><div style='float:left;margin-left:15px;'>报警状态：</div><div style='color:#BFBCBC'>无</div><div style='float:left;margin-left:15px;'>报警值：</div><div style='color:#BFBCBC;'>无</div><div style='float:left;margin-left:15px;'>报警时间：</div><div style='color:#BFBCBC'>无  </div></div></div><div class='box'><div class='box_photo'><div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >无</p></div><div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >无</p></div> <div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >无</p></div><div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >无</p> </div> </div><div  class='box_xin' style='margin-top:10px;font-size:16px;'><div style='float:left;margin-left:15px;'>报警状态：</div><div style='color:#BFBCBC'>无</div><div style='float:left;margin-left:15px;'>报警值：</div><div style='color:#BFBCBC;'>无</div><div style='float:left;margin-left:15px;'>报警时间：</div><div style='color:#BFBCBC;font-size: 13px;line-height:21px'>无 </div></div></div>";
              }*/
            } else { // 报警
              var ele = mess.leakageAlarmCurrentValue;
              var ele2 = messZheng.leakageAlarmCurrentValue;
              console.log(ele2)
              if (mess != '[') { //报警数据不为空的时候
                if (parseInt(ele) > 10000) {
                  ele = ele.substring(0, ele.length - 1);
                }
                if (parseInt(ele2) > 10000) {
                  ele2 = ele2.substring(0, ele2.length - 1);
                }
                if (mess.info == "20" || mess.info == "25" || mess.info == "26" || mess.info == "27" || (mess.info == '0' && mess.type.indexOf('漏电') != -1) || (mess.info == '0' && mess.type.indexOf('剩余') != -1)) {//漏电
                  console.log('漏电')
                  html = "<div class='box' style='width:6%;'><div style='margin-top:55px;font-size:16px;'><p style='color:red;font-size: 13px;'>实时值</p><p style='color:red;font-size: 13px;'>阀值</p></div></div><div class='box'><div class='box_photo'><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noLeakageAlarmACurrentValue + "A</p><p >" + faData.ADianLiu + "A</p></div><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noLeakageAlarmBCurrentValue + "A</p><p >" + faData.BDianLiu + "A</p></div><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noLeakageAlarmCCurrentValue + "A</p><p >" + faData.CDianLiu + "A</p></div><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.leakageAlarmCurrentValue + "mA</p><p >" + faData.SYdianliu + "mA</p></div></div><div style='margin-top:10px;font-size:16px;' class='box_xin'><div style='float:left;margin-left:15px;'>报警状态：</div><div style='color:#D93822'>" + mess.type + "</div><div style='float:left;margin-left:15px;'>报警值：</div><div style='color:#D93822;'>" + mess.leakageAlarmCurrentValue + "mA</div><div style='float:left;margin-left:15px;'>报警时间：</div><div style='color:#D93822;float:right;font-size: 13px;line-height:21px'>" + mess.regdate + " </div></div></div><div class='box'><div class='box_photo'><div><img src='./images/v_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noVoltageAlarmAValue + "V</p><p >" + faData.ADianYa + "V</p></div><div><img src='./images/v_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noVoltageAlarmBValue + "V</p><p >" + faData.BDianYa + "V</p></div><div><img src='./images/v_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noVoltageAlarmCValue + "V</p><p >" + faData.CDianYa + "V</p></div></div><div class='box_xin' style='margin-top:10px;font-size:16px;'><div style='float:left;margin-left:15px;'>报警状态：</div><div style='color:#BFBCBC'>无</div><div style='float:left;margin-left:15px;'>报警值：</div><div style='color:#BFBCBC;'>无</div><div style='float:left;margin-left:15px;'>报警时间：</div><div style='color:#BFBCBC'>无  </div></div></div><div class='box'><div class='box_photo'><div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noAlarmATemperatureValue + "°C</p><p >" + faData.AWenDu + "°C</p></div><div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noAlarmBTemperatureValue + "°C</p><p >" + faData.BWenDu + "°C</p></div><div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noAlarmCTemperatureValue + "°C</p><p >" + faData.CWenDu + "°C</p></div><div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noAlarmNTemperatureValue + "°C</p><p >" + faData.NWenDu + "°C</p> </div> </div><div  class='box_xin' style='margin-top:10px;font-size:16px;'><div style='float:left;margin-left:15px;'>报警状态：</div><div style='color:#BFBCBC'>无</div><div style='float:left;margin-left:15px;'>报警值：</div><div style='color:#BFBCBC;'>无</div><div style='float:left;margin-left:15px;'>报警时间：</div><div style='color:#BFBCBC'>无</div></div></div>"
                } else if (mess.info == "16" || mess.info == "21" || mess.info == "40" || mess.info == "41" || (mess.info == '0' && mess.type.indexOf('N温度') != -1)) {//N温度
                  html = "<div class='box' style='width:6%;'><div style='margin-top:55px;font-size:16px;'><p style='color:red;font-size: 13px;'>实时值</p><p style='color:red;font-size: 13px;'>阀值</p></div></div><div class='box'><div class='box_photo'><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noLeakageAlarmACurrentValue + "A</p><p >" + faData.ADianLiu + "A</p></div><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noLeakageAlarmBCurrentValue + "A</p><p >" + faData.BDianLiu + "A</p></div><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noLeakageAlarmCCurrentValue + "A</p><p >" + faData.CDianLiu + "A</p></div><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.leakageAlarmCurrentValue + "mA</p><p >" + faData.SYdianliu + "mA</p></div></div><div style='margin-top:10px;font-size:16px;' class='box_xin'><div style='float:left;margin-left:15px;'>报警状态：</div><div style='color:#BFBCBC;'>无</div><div style='float:left;margin-left:15px;'>报警值：</div><div style='color:#BFBCBC;'>无</div><div style='float:left;margin-left:15px;'>报警时间：</div><div style='font-size: 13px;line-height:21px;color:#BFBCBC;'>无 </div></div></div><div class='box'><div class='box_photo'><div><img src='./images/v_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noVoltageAlarmAValue + "V</p><p >" + faData.ADianYa + "V</p></div><div><img src='./images/v_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noVoltageAlarmBValue + "V</p><p >" + faData.BDianYa + "V</p></div><div><img src='./images/v_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noVoltageAlarmCValue + "V</p><p >" + faData.CDianYa + "V</p></div></div><div class='box_xin' style='margin-top:10px;font-size:16px;'><div style='float:left;margin-left:15px;'>报警状态：</div><div style='color:#BFBCBC'>无</div><div style='float:left;margin-left:15px;'>报警值：</div><div style='color:#BFBCBC;'>无</div><div style='float:left;margin-left:15px;'>报警时间：</div><div style='color:#BFBCBC'>无  </div></div></div><div class='box'><div class='box_photo'><div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noAlarmATemperatureValue + "°C</p><p >" + faData.AWenDu + "°C</p></div><div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noAlarmBTemperatureValue + "°C</p><p >" + faData.BWenDu + "°C</p></div> <div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noAlarmCTemperatureValue + "°C</p><p >" + faData.CWenDu + "°C</p></div><div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.temperatureAlarmNvalue + "°C</p> <p >" + faData.NWenDu + "°C</p></div> </div><div  class='box_xin' style='margin-top:10px;font-size:16px;'><div style='float:left;margin-left:15px;'>报警状态：</div><div style='color:#D93822'>" + mess.type + "</div><div style='float:left;margin-left:15px;'>报警值：</div><div style='color:#D93822'>" + (mess.temperatureAlarmNvalue == '' ? mess.noAlarmNTemperatureValue : mess.temperatureAlarmNvalue) + "°C</div><div style='float:left;margin-left:15px;'>报警时间：</div><div style='color:#D93822'>" + mess.regdate + " </div> </div></div>"
                } else if (mess.info == "19" || mess.info == "24" || mess.info == "35" || mess.info == "34" || (mess.info == '0' && mess.type.indexOf('A温度') != -1)) {//A温度
                  html = "<div class='box' style='width:6%;'><div style='margin-top:55px;font-size:16px;'><p style='color:red;font-size: 13px;'>实时值</p><p style='color:red;font-size: 13px;'>阀值</p></div></div><div class='box'><div class='box_photo'><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noLeakageAlarmACurrentValue + "A</p><p >" + faData.ADianLiu + "A</p></div><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noLeakageAlarmBCurrentValue + "A</p><p >" + faData.BDianLiu + "A</p></div><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noLeakageAlarmCCurrentValue + "A</p><p >" + faData.CDianLiu + "A</p></div><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.leakageAlarmCurrentValue + "mA</p><p >" + faData.SYdianliu + "mA</p></div></div><div style='margin-top:10px;font-size:16px;' class='box_xin'><div style='float:left;margin-left:15px;'>报警状态：</div><div style='color:#BFBCBC;'>无</div><div style='float:left;margin-left:15px;'>报警值：</div><div style='color:#BFBCBC;'>无</div><div style='float:left;margin-left:15px;'>报警时间：</div><div style='font-size: 13px;line-height:21px;color:#BFBCBC;'>无 </div></div></div><div class='box'><div class='box_photo'><div><img src='./images/v_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noVoltageAlarmAValue + "V</p><p >" + faData.ADianYa + "V</p></div><div><img src='./images/v_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noVoltageAlarmBValue + "V</p><p >" + faData.BDianYa + "V</p></div><div><img src='./images/v_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noVoltageAlarmCValue + "V</p><p >" + faData.CDianYa + "V</p></div></div><div class='box_xin' style='margin-top:10px;font-size:16px;'><div style='float:left;margin-left:15px;'>报警状态：</div><div style='color:#BFBCBC'>无</div><div style='float:left;margin-left:15px;'>报警值：</div><div style='color:#BFBCBC;'>无</div><div style='float:left;margin-left:15px;'>报警时间：</div><div style='color:#BFBCBC'>无  </div></div></div><div class='box'><div class='box_photo'><div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noAlarmATemperatureValue + "°C</p><p >" + faData.AWenDu + "°C</p></div><div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noAlarmBTemperatureValue + "°C</p><p >" + faData.BWenDu + "°C</p></div> <div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noAlarmCTemperatureValue + "°C</p><p >" + faData.CWenDu + "°C</p></div><div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p>" + messZheng.temperatureAlarmNvalue + "°C</p> <p >" + faData.NWenDu + "°C</p></div> </div><div  class='box_xin' style='margin-top:10px;font-size:16px;'><div style='float:left;margin-left:15px;'>报警状态：</div><div style='color:#D93822'>" + mess.type + "</div><div style='float:left;margin-left:15px;'>报警值：</div><div style='color:#D93822'>" + (mess.temperatureAlarmAvalue == '' ? mess.noAlarmATemperatureValue : mess.temperatureAlarmAvalue) + "°C</div><div style='float:left;margin-left:15px;'>报警时间：</div><div style='color:#D93822'>" + mess.regdate + " </div> </div></div>"
                } else if (mess.info == "18" || mess.info == "23" || mess.info == "36" || mess.info == "37" || (mess.info == '0' && mess.type.indexOf('B温度') != -1)) { //B温度
                  html = "<div class='box' style='width:6%;'><div style='margin-top:55px;font-size:16px;'><p style='color:red;font-size: 13px;'>实时值</p><p style='color:red;font-size: 13px;'>阀值</p></div></div><div class='box'><div class='box_photo'><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noLeakageAlarmACurrentValue + "A</p><p >" + faData.ADianLiu + "A</p></div><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noLeakageAlarmBCurrentValue + "A</p><p >" + faData.BDianLiu + "A</p></div><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noLeakageAlarmCCurrentValue + "A</p><p >" + faData.CDianLiu + "A</p></div><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.leakageAlarmCurrentValue + "mA</p><p >" + faData.SYdianliu + "mA</p></div></div><div style='margin-top:10px;font-size:16px;' class='box_xin'><div style='float:left;margin-left:15px;'>报警状态：</div><div style='color:#BFBCBC;'>无</div><div style='float:left;margin-left:15px;'>报警值：</div><div style='color:#BFBCBC;'>无</div><div style='float:left;margin-left:15px;'>报警时间：</div><div style='font-size: 13px;line-height:21px;color:#BFBCBC;'>无 </div></div></div><div class='box'><div class='box_photo'><div><img src='./images/v_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noVoltageAlarmAValue + "V</p><p >" + faData.ADianYa + "V</p></div><div><img src='./images/v_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noVoltageAlarmBValue + "V</p><p >" + faData.BDianYa + "V</p></div><div><img src='./images/v_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noVoltageAlarmCValue + "V</p><p >" + faData.CDianYa + "V</p></div></div><div class='box_xin' style='margin-top:10px;font-size:16px;'><div style='float:left;margin-left:15px;'>报警状态：</div><div style='color:#BFBCBC'>无</div><div style='float:left;margin-left:15px;'>报警值：</div><div style='color:#BFBCBC;'>无</div><div style='float:left;margin-left:15px;'>报警时间：</div><div style='color:#BFBCBC'>无  </div></div></div><div class='box'><div class='box_photo'><div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noAlarmATemperatureValue + "°C</p><p >" + faData.AWenDu + "°C</p></div><div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noAlarmBTemperatureValue + "°C</p><p >" + faData.BWenDu + "°C</p></div> <div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noAlarmCTemperatureValue + "°C</p><p >" + faData.CWenDu + "°C</p></div><div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p>" + messZheng.temperatureAlarmNvalue + "°C</p> <p >" + faData.NWenDu + "°C</p></div> </div><div  class='box_xin' style='margin-top:10px;font-size:16px;'><div style='float:left;margin-left:15px;'>报警状态：</div><div style='color:#D93822'>" + mess.type + "</div><div style='float:left;margin-left:15px;'>报警值：</div><div style='color:#D93822'>" + mess.temperatureAlarmBvalue + "°C</div><div style='float:left;margin-left:15px;'>报警时间：</div><div style='color:#D93822'>" + mess.regdate + " </div> </div></div>"
                } else if (mess.info == "17" || mess.info == "22" || mess.info == "38" || mess.info == "39" || (mess.info == '0' && mess.type.indexOf('C温度') != -1)) {//C温度
                  html = "<div class='box' style='width:6%;'><div style='margin-top:55px;font-size:16px;'><p style='color:red;font-size: 13px;'>实时值</p><p style='color:red;font-size: 13px;'>阀值</p></div></div><div class='box'><div class='box_photo'><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noLeakageAlarmACurrentValue + "A</p><p >" + faData.ADianLiu + "A</p></div><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noLeakageAlarmBCurrentValue + "A</p><p >" + faData.BDianLiu + "A</p></div><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noLeakageAlarmCCurrentValue + "A</p><p >" + faData.CDianLiu + "A</p></div><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.leakageAlarmCurrentValue + "mA</p><p >" + faData.SYdianliu + "mA</p></div></div><div style='margin-top:10px;font-size:16px;' class='box_xin'><div style='float:left;margin-left:15px;'>报警状态：</div><div style='color:#BFBCBC;'>无</div><div style='float:left;margin-left:15px;'>报警值：</div><div style='color:#BFBCBC;'>无</div><div style='float:left;margin-left:15px;'>报警时间：</div><div style='font-size: 13px;line-height:21px;color:#BFBCBC;'>无 </div></div></div><div class='box'><div class='box_photo'><div><img src='./images/v_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noVoltageAlarmAValue + "V</p><p >" + faData.ADianYa + "V</p></div><div><img src='./images/v_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noVoltageAlarmBValue + "V</p><p >" + faData.BDianYa + "V</p></div><div><img src='./images/v_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noVoltageAlarmCValue + "V</p><p >" + faData.CDianYa + "V</p></div></div><div class='box_xin' style='margin-top:10px;font-size:16px;'><div style='float:left;margin-left:15px;'>报警状态：</div><div style='color:#BFBCBC'>无</div><div style='float:left;margin-left:15px;'>报警值：</div><div style='color:#BFBCBC;'>无</div><div style='float:left;margin-left:15px;'>报警时间：</div><div style='color:#BFBCBC'>无  </div></div></div><div class='box'><div class='box_photo'><div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noAlarmATemperatureValue + "°C</p><p >" + faData.AWenDu + "°C</p></div><div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noAlarmBTemperatureValue + "°C</p><p >" + faData.BWenDu + "°C</p></div> <div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noAlarmCTemperatureValue + "°C</p><p >" + faData.CWenDu + "°C</p></div><div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p>" + messZheng.temperatureAlarmNvalue + "°C</p> <p >" + faData.NWenDu + "°C</p></div> </div><div  class='box_xin' style='margin-top:10px;font-size:16px;'><div style='float:left;margin-left:15px;'>报警状态：</div><div style='color:#D93822'>" + mess.type + "</div><div style='float:left;margin-left:15px;'>报警值：</div><div style='color:#D93822'>" + mess.temperatureAlarmCvalue + "°C</div><div style='float:left;margin-left:15px;'>报警时间：</div><div style='color:#D93822'>" + mess.regdate + " </div> </div></div>"
                } else if (mess.info == "3" || mess.info == "28" || mess.info == "29" || (mess.info == '0' && mess.type.indexOf('A电流') != -1)) { //A电流
                  html = "<div class='box' style='width:6%;'><div style='margin-top:55px;font-size:16px;'><p style='color:red;font-size: 13px;'>实时值</p><p style='color:red;font-size: 13px;'>阀值</p></div></div><div class='box'><div class='box_photo'><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noLeakageAlarmACurrentValue + "A</p><p >" + faData.ADianLiu + "A</p></div><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noLeakageAlarmBCurrentValue + "A</p><p >" + faData.BDianLiu + "A</p></div><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noLeakageAlarmCCurrentValue + "A</p><p >" + faData.CDianLiu + "A</p></div><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p>" + messZheng.leakageAlarmCurrentValue + "mA</p><p >" + faData.SYdianliu + "mA</p></div></div><div style='margin-top:10px;font-size:16px;' class='box_xin'><div style='float:left;margin-left:15px;'>报警状态：</div><div style='color:#D93822'>" + mess.type + "</div><div style='float:left;margin-left:15px;'>报警值：</div><div style='color:#D93822;'>" + mess.currentAlarmAvalue + "A</div><div style='float:left;margin-left:15px;'>报警时间：</div><div style='color:#D93822;float:right;font-size: 13px;line-height:21px'>" + mess.regdate + " </div></div></div><div class='box'><div class='box_photo'><div><img src='./images/v_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noVoltageAlarmAValue + "V</p><p >" + faData.ADianYa + "V</p></div><div><img src='./images/v_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noVoltageAlarmBValue + "V</p><p >" + faData.BDianYa + "V</p></div><div><img src='./images/v_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noVoltageAlarmCValue + "V</p><p >" + faData.CDianYa + "V</p></div></div><div class='box_xin' style='margin-top:10px;font-size:16px;'><div style='float:left;margin-left:15px;'>报警状态：</div><div style='color:#BFBCBC'>无</div><div style='float:left;margin-left:15px;'>报警值：</div><div style='color:#BFBCBC;'>无</div><div style='float:left;margin-left:15px;'>报警时间：</div><div style='color:#BFBCBC'>无  </div></div></div><div class='box'><div class='box_photo'><div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noAlarmATemperatureValue + "°C</p><p >" + faData.AWenDu + "°C</p></div><div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noAlarmBTemperatureValue + "°C</p><p >" + faData.BWenDu + "°C</p></div><div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noAlarmCTemperatureValue + "°C</p><p >" + faData.CWenDu + "°C</p></div><div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noAlarmNTemperatureValue + "°C</p><p >" + faData.NWenDu + "°C</p> </div> </div><div  class='box_xin' style='margin-top:10px;font-size:16px;'><div style='float:left;margin-left:15px;'>报警状态：</div><div style='color:#BFBCBC'>无</div><div style='float:left;margin-left:15px;'>报警值：</div><div style='color:#BFBCBC;'>无</div><div style='float:left;margin-left:15px;'>报警时间：</div><div style='color:#BFBCBC'>无</div></div></div>"
                } else if (mess.info == "2" || mess.info == "30" || mess.info == "31" || (mess.info == '0' && mess.type.indexOf('B电流') != -1)) { //B电流
                  html = "<div class='box' style='width:6%;'><div style='margin-top:55px;font-size:16px;'><p style='color:red;font-size: 13px;'>实时值</p><p style='color:red;font-size: 13px;'>阀值</p></div></div><div class='box'><div class='box_photo'><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noLeakageAlarmACurrentValue + "A</p><p >" + faData.ADianLiu + "A</p></div><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noLeakageAlarmBCurrentValue + "A</p><p >" + faData.BDianLiu + "A</p></div><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noLeakageAlarmCCurrentValue + "A</p><p >" + faData.CDianLiu + "A</p></div><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p>" + messZheng.leakageAlarmCurrentValue + "mA</p><p >" + faData.SYdianliu + "mA</p></div></div><div style='margin-top:10px;font-size:16px;' class='box_xin'><div style='float:left;margin-left:15px;'>报警状态：</div><div style='color:#D93822'>" + mess.type + "</div><div style='float:left;margin-left:15px;'>报警值：</div><div style='color:#D93822;'>" + mess.currentAlarmBvalue + "A</div><div style='float:left;margin-left:15px;'>报警时间：</div><div style='color:#D93822;float:right;font-size: 13px;line-height:21px'>" + mess.regdate + " </div></div></div><div class='box'><div class='box_photo'><div><img src='./images/v_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noVoltageAlarmAValue + "V</p><p >" + faData.ADianYa + "V</p></div><div><img src='./images/v_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noVoltageAlarmBValue + "V</p><p >" + faData.BDianYa + "V</p></div><div><img src='./images/v_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noVoltageAlarmCValue + "V</p><p >" + faData.CDianYa + "V</p></div></div><div class='box_xin' style='margin-top:10px;font-size:16px;'><div style='float:left;margin-left:15px;'>报警状态：</div><div style='color:#BFBCBC'>无</div><div style='float:left;margin-left:15px;'>报警值：</div><div style='color:#BFBCBC;'>无</div><div style='float:left;margin-left:15px;'>报警时间：</div><div style='color:#BFBCBC'>无  </div></div></div><div class='box'><div class='box_photo'><div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noAlarmATemperatureValue + "°C</p><p >" + faData.AWenDu + "°C</p></div><div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noAlarmBTemperatureValue + "°C</p><p >" + faData.BWenDu + "°C</p></div><div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noAlarmCTemperatureValue + "°C</p><p >" + faData.CWenDu + "°C</p></div><div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noAlarmNTemperatureValue + "°C</p><p >" + faData.NWenDu + "°C</p> </div> </div><div  class='box_xin' style='margin-top:10px;font-size:16px;'><div style='float:left;margin-left:15px;'>报警状态：</div><div style='color:#BFBCBC'>无</div><div style='float:left;margin-left:15px;'>报警值：</div><div style='color:#BFBCBC;'>无</div><div style='float:left;margin-left:15px;'>报警时间：</div><div style='color:#BFBCBC'>无</div></div></div>"
                } else if (mess.info == "1" || mess.info == "32" || mess.info == "33" || (mess.info == '0' && mess.type.indexOf('C电流') != -1)) {//C电流
                  html = "<div class='box' style='width:6%;'><div style='margin-top:55px;font-size:16px;'><p style='color:red;font-size: 13px;'>实时值</p><p style='color:red;font-size: 13px;'>阀值</p></div></div><div class='box'><div class='box_photo'><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noLeakageAlarmACurrentValue + "A</p><p >" + faData.ADianLiu + "A</p></div><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noLeakageAlarmBCurrentValue + "A</p><p >" + faData.BDianLiu + "A</p></div><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noLeakageAlarmCCurrentValue + "A</p><p >" + faData.CDianLiu + "A</p></div><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p>" + messZheng.leakageAlarmCurrentValue + "mA</p><p >" + faData.SYdianliu + "mA</p></div></div><div style='margin-top:10px;font-size:16px;' class='box_xin'><div style='float:left;margin-left:15px;'>报警状态：</div><div style='color:#D93822'>" + mess.type + "</div><div style='float:left;margin-left:15px;'>报警值：</div><div style='color:#D93822;'>" + mess.currentAlarmCvalue + "A</div><div style='float:left;margin-left:15px;'>报警时间：</div><div style='color:#D93822;float:right;font-size: 13px;line-height:21px'>" + mess.regdate + " </div></div></div><div class='box'><div class='box_photo'><div><img src='./images/v_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noVoltageAlarmAValue + "V</p><p >" + faData.ADianYa + "V</p></div><div><img src='./images/v_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noVoltageAlarmBValue + "V</p><p >" + faData.BDianYa + "V</p></div><div><img src='./images/v_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noVoltageAlarmCValue + "V</p><p >" + faData.CDianYa + "V</p></div></div><div class='box_xin' style='margin-top:10px;font-size:16px;'><div style='float:left;margin-left:15px;'>报警状态：</div><div style='color:#BFBCBC'>无</div><div style='float:left;margin-left:15px;'>报警值：</div><div style='color:#BFBCBC;'>无</div><div style='float:left;margin-left:15px;'>报警时间：</div><div style='color:#BFBCBC'>无  </div></div></div><div class='box'><div class='box_photo'><div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noAlarmATemperatureValue + "°C</p><p >" + faData.AWenDu + "°C</p></div><div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noAlarmBTemperatureValue + "°C</p><p >" + faData.BWenDu + "°C</p></div><div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noAlarmCTemperatureValue + "°C</p><p >" + faData.CWenDu + "°C</p></div><div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noAlarmNTemperatureValue + "°C</p><p >" + faData.NWenDu + "°C</p> </div> </div><div  class='box_xin' style='margin-top:10px;font-size:16px;'><div style='float:left;margin-left:15px;'>报警状态：</div><div style='color:#BFBCBC'>无</div><div style='float:left;margin-left:15px;'>报警值：</div><div style='color:#BFBCBC;'>无</div><div style='float:left;margin-left:15px;'>报警时间：</div><div style='color:#BFBCBC'>无</div></div></div>"
                } else if (mess.info == "6" || mess.info == "9" || mess.info == "12" || mess.info == "15" || (mess.info == '0' && mess.type.indexOf('A电压') != -1)) {//A电压
                  html = "<div class='box' style='width:6%;'><div style='margin-top:55px;font-size:16px;'><p style='color:red;font-size: 13px;'>实时值</p><p style='color:red;font-size: 13px;'>阀值</p></div></div><div class='box'><div class='box_photo'><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noLeakageAlarmACurrentValue + "A</p><p >" + faData.ADianLiu + "A</p> </div> <div> <img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noLeakageAlarmBCurrentValue + "A</p><p >" + faData.BDianLiu + "A</p></div><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noLeakageAlarmCCurrentValue + "A</p><p >" + faData.CDianLiu + "A</p></div><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.leakageAlarmCurrentValue + "mA</p><p >" + faData.SYdianliu + "mA</p></div></div><div style='margin-top:10px;font-size:16px;' class='box_xin'><div style='float:left;margin-left:15px;'>报警状态：</div> <div style='color:#BFBCBC'>无</div> <div style='float:left;margin-left:15px;'>报警值：</div><div style='color:#BFBCBC'>无</div><div style='float:left;margin-left:15px;'>报警时间：</div><div style='font-size: 13px;line-height:21px;color:#BFBCBC'>无 </div></div></div><div class='box'><div class='box_photo'><div><img src='./images/v_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noVoltageAlarmAValue + "V</p> <p >" + faData.ADianYa + "V</p></div> <div> <img src='./images/v_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noVoltageAlarmBValue + "V</p> <p >" + faData.BDianYa + "V</p></div><div> <img src='./images/v_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'> <p >" + messZheng.noVoltageAlarmCValue + "V</p><p >" + faData.CDianYa + "V</p> </div></div><div class='box_xin' style='margin-top:10px;font-size:16px;'> <div style='float:left;margin-left:15px;'>报警状态：</div> <div style='color:#D93822'>" + mess.type + "</div> <div style='float:left;margin-left:15px;'>报警值：</div><div style='color:#D93822;'>" + mess.noVoltageAlarmAValue + "V</div> <div style='float:left;margin-left:15px;'>报警时间：</div> <div style='color:#D93822'>" + mess.regdate + " </div></div></div><div class='box'> <div class='box_photo'>  <div>  <img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noAlarmATemperatureValue + "°C</p><p >" + faData.AWenDu + "°C</p> </div> <div> <img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'> <p >" + messZheng.noAlarmBTemperatureValue + "°C</p> <p >" + faData.BWenDu + "°C</p> </div>  <div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'> <p >" + messZheng.noAlarmCTemperatureValue + "°C</p> <p >" + faData.CWenDu + "°C</p></div> <div> <img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'> <p >" + messZheng.noAlarmNTemperatureValue + "°C</p><p >" + faData.NWenDu + "°C</p>  </div> </div><div  class='box_xin' style='margin-top:10px;font-size:16px;'> <div style='float:left;margin-left:15px;'>报警状态：</div> <div style='color:#BFBCBC'>无</div> <div style='float:left;margin-left:15px;'>报警值：</div> <div style='color:#BFBCBC'>无</div> <div style='float:left;margin-left:15px;'>报警时间：</div> <div style='color:#BFBCBC'>无</div> </div> </div>";
                } else if (mess.info == "5" || mess.info == "8" || mess.info == "11" || mess.info == "14" || (mess.info == '0' && mess.type.indexOf('B电压') != -1)) {//B电压
                  html = "<div class='box' style='width:6%;'><div style='margin-top:55px;font-size:16px;'><p style='color:red;font-size: 13px;'>实时值</p><p style='color:red;font-size: 13px;'>阀值</p></div></div><div class='box'><div class='box_photo'><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noLeakageAlarmACurrentValue + "A</p><p >" + faData.ADianLiu + "A</p> </div> <div> <img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noLeakageAlarmBCurrentValue + "A</p><p >" + faData.BDianLiu + "A</p></div><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noLeakageAlarmCCurrentValue + "A</p><p >" + faData.CDianLiu + "A</p></div><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.leakageAlarmCurrentValue + "mA</p><p >" + faData.SYdianliu + "mA</p></div></div><div style='margin-top:10px;font-size:16px;' class='box_xin'><div style='float:left;margin-left:15px;'>报警状态：</div> <div style='color:#BFBCBC'>无</div> <div style='float:left;margin-left:15px;'>报警值：</div><div style='color:#BFBCBC'>无</div><div style='float:left;margin-left:15px;'>报警时间：</div><div style='font-size: 13px;line-height:21px;color:#BFBCBC'>无 </div></div></div><div class='box'><div class='box_photo'><div><img src='./images/v_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p>" + messZheng.noVoltageAlarmAValue + "V</p> <p >" + faData.ADianYa + "V</p></div> <div> <img src='./images/v_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noVoltageAlarmBValue + "V</p> <p >" + faData.BDianYa + "V</p></div><div> <img src='./images/v_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'> <p >" + messZheng.noVoltageAlarmCValue + "V</p><p >" + faData.CDianYa + "V</p> </div></div><div class='box_xin' style='margin-top:10px;font-size:16px;'> <div style='float:left;margin-left:15px;'>报警状态：</div> <div style='color:#D93822'>" + mess.type + "</div> <div style='float:left;margin-left:15px;'>报警值：</div><div style='color:#D93822;'>" + mess.noVoltageAlarmBValue + "V</div> <div style='float:left;margin-left:15px;'>报警时间：</div> <div style='color:#D93822'>" + mess.regdate + " </div></div></div><div class='box'> <div class='box_photo'>  <div>  <img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noAlarmATemperatureValue + "°C</p><p >" + faData.AWenDu + "°C</p> </div> <div> <img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'> <p >" + messZheng.noAlarmBTemperatureValue + "°C</p> <p >" + faData.BWenDu + "°C</p> </div>  <div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'> <p >" + messZheng.noAlarmCTemperatureValue + "°C</p> <p >" + faData.CWenDu + "°C</p></div> <div> <img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'> <p >" + messZheng.noAlarmNTemperatureValue + "°C</p><p >" + faData.NWenDu + "°C</p>  </div> </div><div  class='box_xin' style='margin-top:10px;font-size:16px;'> <div style='float:left;margin-left:15px;'>报警状态：</div> <div style='color:#BFBCBC'>无</div> <div style='float:left;margin-left:15px;'>报警值：</div> <div style='color:#BFBCBC'>无</div> <div style='float:left;margin-left:15px;'>报警时间：</div> <div style='color:#BFBCBC'>无</div> </div> </div>";
                } else if (mess.info == "4" || mess.info == "7" || mess.info == "10" || mess.info == "13" || (mess.info == '0' && mess.type.indexOf('C电压') != -1)) {//C电压
                  html = "<div class='box' style='width:6%;'><div style='margin-top:55px;font-size:16px;'><p style='color:red;font-size: 13px;'>实时值</p><p style='color:red;font-size: 13px;'>阀值</p></div></div><div class='box'><div class='box_photo'><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noLeakageAlarmACurrentValue + "A</p> </div> <div> <img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noLeakageAlarmBCurrentValue + "A</p></div><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noLeakageAlarmCCurrentValue + "A</p></div><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.leakageAlarmCurrentValue + "mA</p></div></div><div style='margin-top:10px;font-size:16px;' class='box_xin'><div style='float:left;margin-left:15px;'>报警状态：</div> <div style='color:#BFBCBC'>无</div> <div style='float:left;margin-left:15px;'>报警值：</div><div style='color:#BFBCBC'>无</div><div style='float:left;margin-left:15px;'>报警时间：</div><div style='font-size: 13px;line-height:21px;color:#BFBCBC'>无 </div></div></div><div class='box'><div class='box_photo'><div><img src='./images/v_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p>" + messZheng.noVoltageAlarmAValue + "V</p> </div> <div> <img src='./images/v_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noVoltageAlarmBValue + "V</p> </div><div> <img src='./images/v_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'> <p >" + messZheng.noVoltageAlarmCValue + "V</p> </div></div><div class='box_xin' style='margin-top:10px;font-size:16px;'> <div style='float:left;margin-left:15px;'>报警状态：</div> <div >" + mess.type + "</div> <div style='float:left;margin-left:15px;'>报警值：</div><div style='color:#D93822;'>" + mess.noVoltageAlarmCValue + "V</div> <div style='float:left;margin-left:15px;'>报警时间：</div> <div style='color:#D93822'>" + mess.regdate + " </div></div></div><div class='box'> <div class='box_photo'>  <div>  <img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noAlarmATemperatureValue + "°C</p> </div> <div> <img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'> <p >" + messZheng.noAlarmBTemperatureValue + "°C</p>  </div>  <div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'> <p >" + messZheng.noAlarmCTemperatureValue + "°C</p> </div> <div> <img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'> <p >" + messZheng.noAlarmNTemperatureValue + "°C</p>  </div> </div><div  class='box_xin' style='margin-top:10px;font-size:16px;'> <div style='float:left;margin-left:15px;'>报警状态：</div> <div style='color:#BFBCBC'>无</div> <div style='float:left;margin-left:15px;'>报警值：</div> <div style='color:#BFBCBC'>无</div> <div style='float:left;margin-left:15px;'>报警时间：</div> <div style='color:#BFBCBC'>无</div> </div> </div>";
                } else {
                  console.log('无')
                  html = "<div class='box' style='width:6%;'><div style='margin-top:55px;font-size:16px;'><p style='color:red;font-size: 13px;'>实时值</p><p style='color:red;font-size: 13px;'>阀值</p></div></div><div class='box'><div class='box_photo'><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noLeakageAlarmACurrentValue + "A</p><p >" + faData.ADianLiu + "A</p> </div> <div> <img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noLeakageAlarmBCurrentValue + "A</p><p >" + faData.BDianLiu + "A</p></div><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noLeakageAlarmCCurrentValue + "A</p><p >" + faData.CDianLiu + "A</p></div><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.leakageAlarmCurrentValue + "mA</p><p >" + faData.SYdianliu + "mA</p></div></div><div style='margin-top:10px;font-size:16px;' class='box_xin'><div style='float:left;margin-left:15px;'>报警状态：</div> <div style='color:#BFBCBC'>无</div> <div style='float:left;margin-left:15px;'>报警值：</div><div style='color:#BFBCBC'>无</div><div style='float:left;margin-left:15px;'>报警时间：</div><div style='font-size: 13px;line-height:21px;color:#BFBCBC'>无 </div></div></div><div class='box'><div class='box_photo'><div><img src='./images/v_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p>" + messZheng.noVoltageAlarmAValue + "V</p> <p >" + faData.ADianYa + "V</p></div> <div> <img src='./images/v_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noVoltageAlarmBValue + "V</p> <p >" + faData.BDianYa + "V</p></div><div> <img src='./images/v_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'> <p >" + messZheng.noVoltageAlarmCValue + "V</p><p >" + faData.CDianYa + "V</p> </div></div><div class='box_xin' style='margin-top:10px;font-size:16px;'> <div style='float:left;margin-left:15px;'>报警状态：</div> <div style='color:#BFBCBC'>无</div> <div style='float:left;margin-left:15px;'>报警值：</div><div style='color:#BFBCBC;'>无</div> <div style='float:left;margin-left:15px;'>报警时间：</div> <div style='color:#BFBCBC'>无 </div></div></div><div class='box'> <div class='box_photo'>  <div>  <img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noAlarmATemperatureValue + "°C</p><p >" + faData.AWenDu + "°C</p> </div> <div> <img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'> <p >" + messZheng.noAlarmBTemperatureValue + "°C</p> <p >" + faData.BWenDu + "°C</p> </div>  <div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'> <p >" + messZheng.noAlarmCTemperatureValue + "°C</p> <p >" + faData.CWenDu + "°C</p></div> <div> <img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'> <p >" + messZheng.noAlarmNTemperatureValue + "°C</p><p >" + faData.NWenDu + "°C</p>  </div> </div><div  class='box_xin' style='margin-top:10px;font-size:16px;'> <div style='float:left;margin-left:15px;'>报警状态：</div> <div style='color:#BFBCBC'>无</div> <div style='float:left;margin-left:15px;'>报警值：</div> <div style='color:#BFBCBC'>无</div> <div style='float:left;margin-left:15px;'>报警时间：</div> <div style='color:#BFBCBC'>无</div> </div> </div>";
                }
              } else {
                console.log('报警数据为空的时候')
                html = "<div class='box' style='width:6%;'><div style='margin-top:55px;font-size:16px;'><p style='color:red;font-size: 13px;'>实时值</p><p style='color:red;font-size: 13px;'>阀值</p></div></div><div class='box'><div class='box_photo'><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noLeakageAlarmACurrentValue + "A</p><p >" + faData.ADianLiu + "A</p></div><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noLeakageAlarmBCurrentValue + "A</p><p >" + faData.BDianLiu + "A</p></div><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noLeakageAlarmCCurrentValue + "A</p><p >" + faData.CDianLiu + "A</p></div><div><img src='./images/s_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + ele2 + "mA</p><p >" + faData.SYdianliu + "mA</p></div></div><div style='margin-top:10px;font-size:16px;' class='box_xin'><div style='float:left;margin-left:15px;'>报警状态：</div><div style='color:#BFBCBC'>无</div><div style='float:left;margin-left:15px;'>报警值：</div><div style='color:#BFBCBC;'>无</div><div style='float:left;margin-left:15px;'>报警时间：</div><div style='color:#BFBCBC;'>无</div></div></div><div class='box'><div class='box_photo'><div><img src='./images/v_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noVoltageAlarmAValue + "V</p><p >" + faData.ADianYa + "V</p></div><div><img src='./images/v_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noVoltageAlarmBValue + "V</p><p >" + faData.BDianYa + "V</p></div><div><img src='./images/v_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noVoltageAlarmCValue + "V</p><p >" + faData.CDianYa + "V</p></div></div><div class='box_xin' style='margin-top:10px;font-size:16px;'><div style='float:left;margin-left:15px;'>报警状态：</div><div style='color:#BFBCBC'>无</div><div style='float:left;margin-left:15px;'>报警值：</div><div style='color:#BFBCBC;'>无</div><div style='float:left;margin-left:15px;'>报警时间：</div><div style='color:#BFBCBC'>无  </div></div></div><div class='box'><div class='box_photo'><div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noAlarmATemperatureValue + "°C</p><p >" + faData.AWenDu + "°C</p></div><div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noAlarmBTemperatureValue + "°C</p><p >" + faData.BWenDu + "°C</p></div> <div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noAlarmCTemperatureValue + "°C</p><p >" + faData.CWenDu + "°C</p></div><div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + messZheng.noAlarmNTemperatureValue + "°C</p><p >" + faData.NWenDu + "°C</p></div> </div><div  class='box_xin' style='margin-top:10px;font-size:16px;'><div style='float:left;margin-left:15px;'>报警状态：</div><div style='color:#BFBCBC'>无</div><div style='float:left;margin-left:15px;'>报警值：</div><div style='color:#BFBCBC;'>无</div><div style='float:left;margin-left:15px;'>报警时间：</div><div style='color:#BFBCBC;font-size: 13px;line-height:21px'>无 </div></div></div>";
              }
            }
            $('#inforBox').html(html);
            //右上table


            //多级操作
            html = "<div style='width:100%;display: flex;justify-content: space-around;margin: 5px 0;'><button class='btn btn-danger col-xs-2'  id='accredit'>设备设置</button></div>"
            $('#inforC').html(html);
            $('#accredit').click(function () {
              var width = $(window).width();
              var height = $(window).height();
              //Pnum 
              var policy = res.list[0].mess[0].policy;  //保险单号
              var flowTime = res.list[0].mess[0].flowTime;  //首次开启流量时间
              var pid = res.list[0].mess[0].pid;  //pid
              var flow = res.list[0].mess[0].flow;
              // var authorize= res.list[0].mess[0].authorize; 
              var authorize = '0'  //授权  默认未授权
              var devId = res.list[0].mess[0].devId;  //
              if (policy == '0') {
                var policy = "";
              } else {
                var policy = policy
              }
              layer.open({
                type: 2,
                title: '设备命令管理',
                maxmin: true,
                offset: ['25px'],
                shadeClose: true, //点击遮罩关闭层
                shade: 0.5, //不显示遮罩
                area: [width * 0.8 + 'px', height - 50 + 'px'],
                content: "./Sys/SUser/facCommand.html?devSignature=" + Pnum + '&devId=' + devId + '&policy=' + policy + '&authorize=' + authorize + '&flow=' + flow + '&flowTime=' + flowTime + '&pid=' + pid
              });
            })
          }
        })

        //电能
        var dianneng = res.list[0].mess7[0];  //mess7  只有电能设备才有
        console.log(dianneng)
        if (dianneng != null) {
          $('#eleNengGV').show();
          console.log(2)
          var html = "";
          html = "<tr><td>合相有功功率</td><td>" + dianneng.phasepower + "W</td></tr><tr><td>合相无功功率</td><td>" + dianneng.nonphasepower + "W</td></tr><tr><td>合相视在功率</td><td>" + dianneng.viewphasepower + "W</td></tr><tr><td>合相功率因数</td><td>" + dianneng.powerParam + "</td></tr><tr><td>正向有功功率</td><td>" + dianneng.phasepowerkw + "Kwh</td></tr><tr><td>反向有功功率</td><td>" + dianneng.reversepowerkw + "kvar</td></tr><tr><td>正向无功功率</td><td>" + dianneng.nonphasekw + "kwh</td></tr><tr><td>反向无功功率</td><td>" + dianneng.reversephasekw + "kvar</td></tr>";
          $('.eleNeng').html(html);
          //eleNeng
        } else {
          console.log('不是电能设备')
        }
      } else {
        $('#inforBox').hide();
      }

    }
  })


  function detailDate() {
    var myDate = new Date(); //获取今天日期
    myDate.setDate(myDate.getDate() - 7);
    var dateArray = [];
    var yearArray = [];
    var dateTemp;
    var yearTemp;
    var flag = 1;
    for (var i = 0; i < 8; i++) {
      dateTemp = ((myDate.getMonth() + 1) + "-" + myDate.getDate());
      yearTemp = (myDate.getFullYear() + "-" + "0" + (myDate.getMonth() + 1) + "-" + "0" + myDate.getDate());
      dateArray.push(dateTemp);
      yearArray.push(yearTemp);
      myDate.setDate(myDate.getDate() + flag);
    }
    var html = "";
    //console.log(yearArray);

    html = "<div class='btn-group btn-group-sm btn-data' role='group' style='float:right;margin-right:0px;' value='1'><button type='button' class='btn btn-info' aria-expanded='false'  >" + dateArray[7] + "</button></div><div class='btn-group btn-group-sm btn-data' role='group' style='float:right;margin-right:5px;' value='1'><button type='button' class='btn btn-info' aria-expanded='false'  >" + dateArray[6] + "</button></div><div class='btn-group btn-group-sm btn-data' role='group' style='float:right;margin-right:5px;' value='1'><button type='button' class='btn btn-info' aria-expanded='false'  >" + dateArray[5] + "</button></div><div class='btn-group btn-group-sm btn-data' role='group' style='float:right;margin-right:5px;' value='1'><button type='button' class='btn btn-info' aria-expanded='false'  >" + dateArray[4] + "</button></div><div class='btn-group btn-group-sm btn-data' role='group' style='float:right;margin-right:5px;' value='1'><button type='button' class='btn btn-info' aria-expanded='false'  >" + dateArray[3] + "</button></div><div class='btn-group btn-group-sm btn-data' role='group' style='float:right;margin-right:5px;' value='1'><button type='button' class='btn btn-info' aria-expanded='false'  >" + dateArray[2] + "</button></div><div class='btn-group btn-group-sm btn-data' role='group' style='float:right;margin-right:5px;' value='1'><button type='button' class='btn btn-info' aria-expanded='false'  >" + dateArray[1] + "</button></div>";


    $('.MDright').html(html);
    var a = document.getElementsByClassName('btn-info');
    for (var i = 0; i < a.length; i++) {
      a[6].onclick = function () {
        loadData(yearArray[1]);
      }
      a[5].onclick = function () {
        loadData(yearArray[2]);
      }
      a[4].onclick = function () {
        loadData(yearArray[3]);
      }
      a[3].onclick = function () {
        loadData(yearArray[4]);
      }
      a[2].onclick = function () {
        loadData(yearArray[5]);
      }
      a[1].onclick = function () {
        loadData(yearArray[6]);
      }
      a[0].onclick = function () {
        loadData(yearArray[7]);
      }

    }


  }
  detailDate();

  var time = document.getElementById('select');
  var calendar = document.getElementById('QueryDate');
  // console.log(time);
  time.onclick = function () {
    calendar.onchange = function () {
      loadData(this.value);
    }
  }

  var time = new Date();
  var year = time.getFullYear();
  var month = time.getMonth() + 1;
  var day = time.getDate();
  var now = year + '-' + month + '-' + day;
  // loadData(now);
  //折线图
  function loadData(day) {
    $.ajax({
      type: 'get',
      data: 'devId=' + global.devBH + '&lstDate=' + day,
      url: url + '/admin/device/ElectricDeviceDate.action',
      dataType: 'json',
      error: function (err) {
        console.log('MDChart' + err);
      },
      success: function (result) {
        console.log(result)
        var data = result.Data;
        if (data != "" && data != null) {
          $.each(data, function (i, v) {
            html = "<div class='InforBox' style='width:97%;height:300px;'><div class='RightBox' style='height:95%;'><div class='chartBox'><div id='divChartU' class='chartdemo'></div></div></div></div>";
          })
          $('#inforU').html(html);
          var dd1 = [];
          var dd2 = [];
          var dd3 = [];
          var dd4 = [];
          // console.log(data);
          $.each(data, function (i, v) {

            dd1.push([v.happenedTime, parseFloat(v.ua)]);
            dd2.push([v.happenedTime, parseFloat(v.ub)]);
            dd3.push([v.happenedTime, parseFloat(v.uc)]);
            dd4.push([v.happenedTime]);

          })

          //console.log(dd1);
          var dom = document.getElementById("divChartU");
          var myChart = echarts.init(dom);
          var app = {};
          option = null;
          option = {
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
              data: ['A电压(V)', 'B电压(V)', 'C电压(V)'], //图例的数据数组
              itemGap: 1 //图例每项之间的间隔
            },
            grid: {
              top: '12%', //grid 组件离容器上侧的距离。
              left: '1%',
              right: '10%',
              containLabel: true //区域是否包含坐标轴的刻度标签。
            },
            xAxis: [{
              type: 'category', //坐标轴类型。
              data: dd4
            }],
            yAxis: [{
              type: 'value',
              name: '电压值(V)',
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
              name: 'A电压(V)',
              type: 'line',
              data: dd1
            },
            {
              name: 'B电压(V)',
              type: 'line',
              data: dd2
            },
            {
              name: 'C电压(V)',
              type: 'line',
              data: dd3
            }
            ]
          };
          myChart.setOption(option, true);
          var html = '';
          // console.log(data[0].ld*1000);
          $.each(data, function (i, v) {
            // html = "<div class='InforBox' style='width:97%;height:300px;'><div class='LeftBox' style='height:95%;'><div class='InforCurrBox'><div style='display:inline-block'><div class='inforLine DataItem'><div class='inforLabel'>A相电流:</div><div class='inforValue' id='dUA'>" + data[0].ia + "A</div></div></div><div style='display:inline-block'><div class='inforLine DataItem'><div class='inforLabel'>B相电流:</div><div class='inforValue' id='dUB'>" + data[0].ib + "A</div></div></div><div style='display:inline-block'><div class='inforLine DataItem'><div class='inforLabel'>C相电流:</div><div class='inforValue' id='dUC'>" + data[0].ic + "A</div></div></div><div style='display:inline-block'><div class='inforLine DataItem'><div class='inforLabel'>剩余电流:</div><div class='inforValue' >" + (data[0].ld) + "mA</div></div></div></div></div><div class='RightBox' style='height:95%;'><div class='chartBox'><div id='divChartI' class='chartdemo'></div></div></div></div>";
            html = "<div class='InforBox' style='width:97%;height:300px;'><div class='RightBox' style='height:95%;'><div class='chartBox'><div id='divChartI' class='chartdemo'></div></div></div></div>";
          })

          $('#inforI').html(html);
          var dI1 = [];
          var dI2 = [];
          var dI3 = [];
          var dI4 = [];
          $.each(data, function (i, v) {
            // console.log(v.happenedTime);
            var date = new Date(v.happenedTime);
            //console.log(date);
            var now = date.getTime();
            //console.log(now);
            dI1.push([v.happenedTime, parseFloat(v.ia * 1000)]);
            dI2.push([v.happenedTime, parseFloat(v.ib * 1000)]);
            dI3.push([v.happenedTime, parseFloat(v.ic * 1000)]);
            dI4.push([v.happenedTime, parseFloat(v.ld)]);
            //console.log(data[0].ld);
          })
          // console.log(dI1);
          // var newTime = dI1[0][0];
          // var html = "";
          // html = " " + newTime + " ";
          // $('#newTime').html(html);
          var dom = document.getElementById("divChartI");
          var myChart = echarts.init(dom);
          var app = {};
          option = null;
          option = {
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
                // mark: {
                //     show: true
                // },
                // dataView: {
                //     show: true,
                //     readOnly: false
                // },
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
              data: ['A电流(mA)', 'B电流(mA)', 'C电流(mA)', '剩余电流(mA)'], //图例的数据数组
              itemGap: 1 //图例每项之间的间隔
            },
            grid: {
              top: '12%', //grid 组件离容器上侧的距离。
              left: '1%',
              right: '10%',
              containLabel: true //区域是否包含坐标轴的刻度标签。
            },
            xAxis: [{
              type: 'category', //坐标轴类型。
              data: dd4
            }],
            yAxis: [{
              type: 'value',
              name: '电流值(mA)',
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
              name: 'A电流(mA)',
              type: 'line',
              data: dI1
            },
            {
              name: 'B电流(mA)',
              type: 'line',
              data: dI2
            },
            {
              name: 'C电流(mA)',
              type: 'line',
              data: dI3
            },
            {
              name: '剩余电流(mA)',
              type: 'line',
              data: dI4
            }
            ]
          };
          myChart.setOption(option, true);

          var html = '';
          //  console.log(data);
          $.each(data, function (i, v) {

            // html = "<div class='InforBox' style='width:97%;height:300px;'><div class='LeftBox' style='height:95%;'><div class='InforCurrBox'><div style='display:inline-block'> <div class='inforLine DataItem'><div class='inforLabel'>A相温度:</div><div class='inforValue' id='dUA'>" + data[0].ta + "℃</div></div></div><div style='display:inline-block'><div class='inforLine DataItem'><div class='inforLabel'>B相温度:</div><div class='inforValue' id='dUA'>" + data[0].tb + "℃</div></div></div><div style='display:inline-block'><div class='inforLine DataItem'><div class='inforLabel'>C相温度:</div><div class='inforValue' id='dUA'>" + data[0].tc + "℃</div></div></div><div style='display:inline-block'><div class='inforLine DataItem'><div class='inforLabel'>N相温度:</div><div class='inforValue' id='dUA'>" + data[0].tn + "℃</div></div></div></div></div><div class='RightBox' style='height:95%;'><div class='chartBox'><div id='divChartT' class='chartdemo'></div></div></div>";
            html = "<div class='InforBox' style='width:97%;height:300px;'><div class='RightBox' style='height:95%;'><div class='chartBox'><div id='divChartT' class='chartdemo'></div></div></div></div>";
          })


          $('#inforT').html(html);
          var dT1 = [];
          var dT2 = [];
          var dT3 = [];
          var dT4 = [];
          var dT5 = [];
          $.each(data, function (i, v) {
            dT1.push([v.happenedTime, parseFloat(v.ta)]);
            dT2.push([v.happenedTime, parseFloat(v.tb)]);
            dT3.push([v.happenedTime, parseFloat(v.tc)]);
            dT4.push([v.happenedTime, parseFloat(v.tn)]);
            dT5.push([v.happenedTime]);
          })
          var dom = document.getElementById("divChartT");
          var myChart = echarts.init(dom);
          var app = {};
          option = null;
          option = {
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
              data: ['A温度(°C)', 'B温度(°C)', 'C温度(°C)', 'N温度(°C)'], //图例的数据数组
              itemGap: 1 //图例每项之间的间隔
            },
            grid: {
              top: '12%', //grid 组件离容器上侧的距离。
              left: '1%',
              right: '10%',
              containLabel: true //区域是否包含坐标轴的刻度标签。
            },
            xAxis: [{
              type: 'category', //坐标轴类型。
              data: dT5
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
              name: 'A温度(°C)',
              type: 'line',
              data: dT1
            },
            {
              name: 'B温度(°C)',
              type: 'line',
              data: dT2
            },
            {
              name: 'C温度(°C)',
              type: 'line',
              data: dT3
            },
            {
              name: 'N温度(°C)',
              type: 'line',
              data: dT4
            }
            ]
          };
          myChart.setOption(option, true);

        } else {

        }
      }
    })
  }


})