$(function () {
    var devId = sessionStorage.getItem("DevBH");
    console.log(devId)
    var address = sessionStorage.getItem('devMC');
    var name = sessionStorage.getItem('comName');
    var productNumber = sessionStorage.getItem('productNumber');
    //console.log(productNumber+"---"+name+"---"+address);
    //console.log(devId);   
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
            // window.open("http://118.89.29.100/earlyPlatform/admin/device/poidownloadtest.action?productNumber="+productNumber+"&pname="+name+"&installLocation="+address);

        }
        // var val=document.getElementById('time');
        // val.onchange=function(){
        //     loadData(this.value);
        // }


    }
    detailDate();


    var time = document.getElementById('select');
    var calendar = document.getElementById('QueryDate');
    // console.log(time);
    time.onclick = function () {
        calendar.onchange = function () {
            loadData(this.value);
        }
        // loadData(this.value); 
    }

    function loadData(day) {
        //  console.log(devId);
        $.ajax({
            type: 'get',
            data: 'devId=' + devId + '&lstDate=' + day,
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
                var devSignature = ElecDetail.productNumber;
                // console.log(ElecDetail);
                // console.log(data);
                var img = result.DevData[0].image.split(',');
                console.log(img);
                var html = '';
                // var {happenedTime,productNumber,productNumber,typeName,installLocation,master,regdate,status,newestDate}=c;
                //详细信息
                html = "<div class='inforLine'><div class='inforLabel'>设备编号:</div><div class='inforValue'>" + ElecDetail.productNumber + "</div></div><div class='inforLine'><div class='inforLabel'>在线状态:</div><div class='inforValue'>" + ElecDetail.status + "</div></div><div class='inforLine'><div class='inforLabel'>报警手机:</div><div class='inforValue'>" + ElecDetail.master + "</div></div><div class='inforLine'><div class='inforLabel'>报警信息:</div><div class='inforValue' id='AlarmValue'>" + ElecDetail.typeName + "</div></div><div class='inforLine'><div class='inforLabel'>安装位置:</div><div class='inforValue' style='display:block;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;' title='9#P5配电总柜'>" + ElecDetail.installLocation + "</div></div><div class='inforLine'><div class='inforLabel'>安装日期:</div><div class='inforValue'>" + ElecDetail.regdate + "</div></div><div class='inforLine'><div class='inforLabel'>最新数据:</div><div class='inforValue'  id='newTime'>" + ElecDetail.newestDate + "</div></div>";
                $('#ElecAlarm').html(html);

                //图表中的所有值都是获取第一个值、
                var tableDetail = result.alarmDetail[0];
                console.log(tableDetail);

                $.ajax({
                    type: 'get',
                    data: 'id=' + devSignature,
                    url: url + '/ReadParameterApi.action',
                    error: function (err) {
                        console.log('MDChart---->ReadParameterApi' + err);
                    },
                    success: function (result) {
                        var result = JSON.parse(result);
                        // console.log(result);
                        var row = result.row;
                        // console.log(row);
                        var html = "";
                        // if(ElecDetail.typeName=="正常"){ 
                        //             var html="<div>用电正常</div>"
                        //             $('#tableDetail').html(html);
                        //             $('#tableDetail').addClass('safeBox');
                        // }else{
                        //     if(result.status=='1'){
                        //         var html="<table border='1'  cellpadding='5' cellspacing='2' style='font-size:12px; color: #0000ff;text-align:center;height:182px;border:1px solid #ddd'    width='350px'><tr><td>设备箱</td><td>实时值</td><td>报警阀值</td><td>设备箱</td><td>实时值</td><td>报警阀值</td></tr><tr><td>A相温度/Ta</td><td>"+tableDetail.noAlarmATemperatureValue+"°C</td><td>"+row.AWenDu+"°C</td><td>A相电流/la</td><td>"+tableDetail.noLeakageAlarmACurrentValue+"A</td><td>"+row.ADianLiu+"A</td></tr><tr><td>B相温度/Tb</td><td>"+tableDetail.noAlarmBTemperatureValue+"°C</td><td>"+row.BWenDu+"°C</td><td>B相电流/lb</td><td>"+tableDetail.noLeakageAlarmBCurrentValue+"A</td><td>"+row.BDianLiu+"A</td></tr><tr><td>C相温度/Tc</td><td>"+tableDetail.noAlarmCTemperatureValue+"°C</td><td>"+row.CWenDu+"°C</td><td>C相电流/lc</td><td>"+tableDetail.noLeakageAlarmCCurrentValue+"A</td><td>"+row.CDianLiu+"A</td></tr><tr><td>N相温度/Tn</td><td>"+tableDetail.noAlarmNTemperatureValue+"°C</td><td>"+row.NWenDu+"°C</td><td>剩余电流/ln</td><td>"+tableDetail.leakageAlarmCurrentValue+"mA</td><td>"+row.SYdianliu+"mA</td></tr><tr><td>A相电压/Ua</td><td>"+tableDetail.noVoltageAlarmAValue+"V</td><td>"+row.ADianYa+"V</td><td>B相电压/Ub</td><td>"+tableDetail.noVoltageAlarmBValue+"V</td><td>"+row.BDianYa+"V</td></tr><tr><td>C相电压/Uc</td><td>"+tableDetail.noVoltageAlarmCValue+"V</td><td>"+row.CDianYa+"V</td><td colspan='3'></td></tr></table>";
                        //     }else{
                        //         var html="<div>网络超时，请重新刷新</div><button class='btn btn-info' id='refresh' onclick='window.location.reload();'>刷新</button>";  
                        //     }
                        // }
                        if (ElecDetail.status == '在线') {
                            if (ElecDetail.typeName == "正常") {
                                var html = "<div>用电正常</div>"
                                $('#tableDetail').html(html);
                                $('#tableDetail').addClass('safeBox');
                            } else {
                                var html = "<div>" + ElecDetail.typeName + "</div>"
                                $('#tableDetail').html(html);
                                $('#tableDetail').addClass('alarmBox');
                            }
                        } else {
                            var html = "<div>设备离线</div>"
                            $('#tableDetail').html(html);
                            $('#tableDetail').addClass('huiBox');

                        }

                        $('#tableDetail').html(html);
                    }
                })

                /**
                 *    inforBox
                 */
                var html = "";
                if (tableDetail != "" && tableDetail != null && tableDetail != 'undefined') {
                    var ele = tableDetail.leakageAlarmCurrentValue;
                    console.log(ele)
                    if (parseInt(ele) > 10000) {
                        ele = ele.substring(0, ele.length - 1);
                        console.log(ele)
                    }
                    if (ElecDetail.typeName == "漏电报警" || ElecDetail.typeName == "漏电故障" || ElecDetail.typeName == "剩余电流-故障" || ElecDetail.typeName == "剩余电流-报警") {
                        html = "<div class='box'><div class='box_photo'><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + tableDetail.noLeakageAlarmACurrentValue + "A</p></div><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + tableDetail.noLeakageAlarmBCurrentValue + "A</p></div><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + tableDetail.noLeakageAlarmCCurrentValue + "A</p></div><div><img src='./images/s_red.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p style='color:#D93822'>" + ele + "mA</p></div></div><div style='margin-top:10px;font-size:16px;' class='box_xin'><div style='float:left;margin-left:15px;'>报警状态：</div><div style='color:#D93822'>" + ElecDetail.typeName + "</div><div style='float:left;margin-left:15px;'>报警值：</div><div style='color:#D93822;'>" + ele + "mA</div><div style='float:left;margin-left:15px;'>报警时间：</div><div style='color:#D93822;float:right;font-size: 13px;line-height:21px'>" + tableDetail.regdate + " </div></div></div><div class='box'><div class='box_photo'><div><img src='./images/v_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + tableDetail.noVoltageAlarmAValue + "V</p></div><div><img src='./images/v_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + tableDetail.noVoltageAlarmBValue + "V</p></div><div><img src='./images/v_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + tableDetail.noVoltageAlarmCValue + "V</p></div></div><div class='box_xin' style='margin-top:10px;font-size:16px;'><div style='float:left;margin-left:15px;'>报警状态：</div><div style='color:#BFBCBC'>无</div><div style='float:left;margin-left:15px;'>报警值：</div><div style='color:#BFBCBC;'>无</div><div style='float:left;margin-left:15px;'>报警时间：</div><div style='color:#BFBCBC'>无  </div></div></div><div class='box'><div class='box_photo'><div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + tableDetail.noAlarmATemperatureValue + "°C</p></div><div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + tableDetail.noAlarmBTemperatureValue + "°C</p></div> <div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + tableDetail.noAlarmCTemperatureValue + "°C</p></div><div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + tableDetail.noAlarmNTemperatureValue + "°C</p> </div> </div><div  class='box_xin' style='margin-top:10px;font-size:16px;'><div style='float:left;margin-left:15px;'>报警状态：</div><div style='color:#BFBCBC'>无</div><div style='float:left;margin-left:15px;'>报警值：</div><div style='color:#BFBCBC;'>无</div><div style='float:left;margin-left:15px;'>报警时间：</div><div style='color:#BFBCBC'>无</div></div></div>";
                    } else if (ElecDetail.typeName == "N温度-报警" || ElecDetail.typeName == "N温度-故障" || ElecDetail.typeName == "N相温度故障" || ElecDetail.typeName == "N相温度报警") {
                        html = "<div class='box'><div class='box_photo'><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + tableDetail.noLeakageAlarmACurrentValue + "A</p></div><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + tableDetail.noLeakageAlarmBCurrentValue + "A</p></div><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + tableDetail.noLeakageAlarmCCurrentValue + "A</p></div><div><img src='./images/s_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + ele + "mA</p></div></div><div style='margin-top:10px;font-size:16px;' class='box_xin'><div style='float:left;margin-left:15px;'>报警状态：</div><div style='color:#BFBCBC'>无</div><div style='float:left;margin-left:15px;'>报警值：</div><div style='color:#BFBCBC;'>无</div><div style='float:left;margin-left:15px;'>报警时间：</div><div style='color:#BFBCBC;'>无</div></div></div><div class='box'><div class='box_photo'><div><img src='./images/v_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + tableDetail.noVoltageAlarmAValue + "V</p></div><div><img src='./images/v_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + tableDetail.noVoltageAlarmBValue + "V</p></div><div><img src='./images/v_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + tableDetail.noVoltageAlarmCValue + "V</p></div></div><div class='box_xin' style='margin-top:10px;font-size:16px;'><div style='float:left;margin-left:15px;'>报警状态：</div><div style='color:#BFBCBC'>无</div><div style='float:left;margin-left:15px;'>报警值：</div><div style='color:#BFBCBC;'>无</div><div style='float:left;margin-left:15px;'>报警时间：</div><div style='color:#BFBCBC'>无  </div></div></div><div class='box'><div class='box_photo'><div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + tableDetail.noAlarmATemperatureValue + "°C</p></div><div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + tableDetail.noAlarmBTemperatureValue + "°C</p></div> <div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + tableDetail.noAlarmCTemperatureValue + "°C</p></div><div><img src='./images/w_red.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p style='color:#D93822'>" + tableDetail.noAlarmNTemperatureValue + "°C</p> </div> </div><div  class='box_xin' style='margin-top:10px;font-size:16px;'><div style='float:left;margin-left:15px;'>报警状态：</div><div style='color:#D93822'>" + ElecDetail.typeName + "</div><div style='float:left;margin-left:15px;'>报警值：</div><div style='color:#D93822;'>" + tableDetail.noAlarmNTemperatureValue + "°C</div><div style='float:left;margin-left:15px;'>报警时间：</div><div style='color:#D93822;float:right;font-size: 13px;line-height:21px'>" + tableDetail.regdate + " </div></div></div>";
                    } else if (ElecDetail.typeName == "A温度-报警" || ElecDetail.typeName == "A温度-故障" || ElecDetail.typeName == "A相温度故障" || ElecDetail.typeName == "A相温度报警") {
                        html = "<div class='box'><div class='box_photo'><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + tableDetail.noLeakageAlarmACurrentValue + "A</p></div><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + tableDetail.noLeakageAlarmBCurrentValue + "A</p></div><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + tableDetail.noLeakageAlarmCCurrentValue + "A</p></div><div><img src='./images/s_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + ele + "mA</p></div></div><div style='margin-top:10px;font-size:16px;' class='box_xin'><div style='float:left;margin-left:15px;'>报警状态：</div><div style='color:#BFBCBC'>无</div><div style='float:left;margin-left:15px;'>报警值：</div><div style='color:#BFBCBC;'>无</div><div style='float:left;margin-left:15px;'>报警时间：</div><div style='color:#BFBCBC;'>无</div></div></div><div class='box'><div class='box_photo'><div><img src='./images/v_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + tableDetail.noVoltageAlarmAValue + "V</p></div><div><img src='./images/v_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + tableDetail.noVoltageAlarmBValue + "V</p></div><div><img src='./images/v_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + tableDetail.noVoltageAlarmCValue + "V</p></div></div><div class='box_xin' style='margin-top:10px;font-size:16px;'><div style='float:left;margin-left:15px;'>报警状态：</div><div style='color:#BFBCBC'>无</div><div style='float:left;margin-left:15px;'>报警值：</div><div style='color:#BFBCBC;'>无</div><div style='float:left;margin-left:15px;'>报警时间：</div><div style='color:#BFBCBC'>无  </div></div></div><div class='box'><div class='box_photo'><div><img src='./images/w_red.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p style='color:#D93822'>" + tableDetail.noAlarmATemperatureValue + "°C</p></div><div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + tableDetail.noAlarmBTemperatureValue + "°C</p></div> <div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + tableDetail.noAlarmCTemperatureValue + "°C</p></div><div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + tableDetail.noAlarmNTemperatureValue + "°C</p> </div> </div><div  class='box_xin' style='margin-top:10px;font-size:16px;'><div style='float:left;margin-left:15px;'>报警状态：</div><div style='color:#D93822'>" + ElecDetail.typeName + "</div><div style='float:left;margin-left:15px;'>报警值：</div><div style='color:#D93822;'>" + tableDetail.noAlarmATemperatureValue + "°C</div><div style='float:left;margin-left:15px;'>报警时间：</div><div style='color:#D93822;float:right;font-size: 13px;line-height:21px'>" + tableDetail.regdate + " </div></div></div>";
                    } else if (ElecDetail.typeName == "B温度-报警" || ElecDetail.typeName == "B温度-故障" || ElecDetail.typeName == "B相温度故障" || ElecDetail.typeName == "B相温度报警") {
                        html = "<div class='box'><div class='box_photo'><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + tableDetail.noLeakageAlarmACurrentValue + "A</p></div><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + tableDetail.noLeakageAlarmBCurrentValue + "A</p></div><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + tableDetail.noLeakageAlarmCCurrentValue + "A</p></div><div><img src='./images/s_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + ele + "mA</p></div></div><div style='margin-top:10px;font-size:16px;' class='box_xin'><div style='float:left;margin-left:15px;'>报警状态：</div><div style='color:#BFBCBC'>无</div><div style='float:left;margin-left:15px;'>报警值：</div><div style='color:#BFBCBC;'>无</div><div style='float:left;margin-left:15px;'>报警时间：</div><div style='color:#BFBCBC;'>无</div></div></div><div class='box'><div class='box_photo'><div><img src='./images/v_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + tableDetail.noVoltageAlarmAValue + "V</p></div><div><img src='./images/v_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + tableDetail.noVoltageAlarmBValue + "V</p></div><div><img src='./images/v_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + tableDetail.noVoltageAlarmCValue + "V</p></div></div><div class='box_xin' style='margin-top:10px;font-size:16px;'><div style='float:left;margin-left:15px;'>报警状态：</div><div style='color:#BFBCBC'>无</div><div style='float:left;margin-left:15px;'>报警值：</div><div style='color:#BFBCBC;'>无</div><div style='float:left;margin-left:15px;'>报警时间：</div><div style='color:#BFBCBC'>无  </div></div></div><div class='box'><div class='box_photo'><div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + tableDetail.noAlarmATemperatureValue + "°C</p></div><div><img src='./images/w_red.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p style='color:#D93822'>" + tableDetail.noAlarmBTemperatureValue + "°C</p></div> <div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + tableDetail.noAlarmCTemperatureValue + "°C</p></div><div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + tableDetail.noAlarmNTemperatureValue + "°C</p> </div> </div><div  class='box_xin' style='margin-top:10px;font-size:16px;'><div style='float:left;margin-left:15px;'>报警状态：</div><div style='color:#D93822'>" + ElecDetail.typeName + "</div><div style='float:left;margin-left:15px;'>报警值：</div><div style='color:#D93822;'>" + tableDetail.noAlarmBTemperatureValue + "°C</div><div style='float:left;margin-left:15px;'>报警时间：</div><div style='color:#D93822;float:right;font-size: 13px;line-height:21px'>" + tableDetail.regdate + " </div></div></div>";
                    } else if (ElecDetail.typeName == "C温度-报警" || ElecDetail.typeName == "C温度-故障" || ElecDetail.typeName == "C相温度故障" || ElecDetail.typeName == "C相温度报警") {
                        html = "<div class='box'><div class='box_photo'><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + tableDetail.noLeakageAlarmACurrentValue + "A</p></div><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + tableDetail.noLeakageAlarmBCurrentValue + "A</p></div><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + tableDetail.noLeakageAlarmCCurrentValue + "A</p></div><div><img src='./images/s_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + ele + "mA</p></div></div><div style='margin-top:10px;font-size:16px;' class='box_xin'><div style='float:left;margin-left:15px;'>报警状态：</div><div style='color:#BFBCBC'>无</div><div style='float:left;margin-left:15px;'>报警值：</div><div style='color:#BFBCBC;'>无</div><div style='float:left;margin-left:15px;'>报警时间：</div><div style='color:#BFBCBC;'>无</div></div></div><div class='box'><div class='box_photo'><div><img src='./images/v_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + tableDetail.noVoltageAlarmAValue + "V</p></div><div><img src='./images/v_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + tableDetail.noVoltageAlarmBValue + "V</p></div><div><img src='./images/v_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + tableDetail.noVoltageAlarmCValue + "V</p></div></div><div class='box_xin' style='margin-top:10px;font-size:16px;'><div style='float:left;margin-left:15px;'>报警状态：</div><div style='color:#BFBCBC'>无</div><div style='float:left;margin-left:15px;'>报警值：</div><div style='color:#BFBCBC;'>无</div><div style='float:left;margin-left:15px;'>报警时间：</div><div style='color:#BFBCBC'>无  </div></div></div><div class='box'><div class='box_photo'><div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + tableDetail.noAlarmATemperatureValue + "°C</p></div><div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + tableDetail.noAlarmBTemperatureValue + "°C</p></div> <div><img src='./images/w_red.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p style='color:#D93822'>" + tableDetail.noAlarmCTemperatureValue + "°C</p></div><div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + tableDetail.noAlarmNTemperatureValue + "°C</p> </div> </div><div  class='box_xin' style='margin-top:10px;font-size:16px;'><div style='float:left;margin-left:15px;'>报警状态：</div><div style='color:#D93822'>" + ElecDetail.typeName + "</div><div style='float:left;margin-left:15px;'>报警值：</div><div style='color:#D93822;'>" + tableDetail.noAlarmCTemperatureValue + "°C</div><div style='float:left;margin-left:15px;'>报警时间：</div><div style='color:#D93822;float:right;font-size: 13px;line-height:21px'>" + tableDetail.regdate + " </div></div></div>";
                    } else {
                        html = "<div class='box'><div class='box_photo'><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + tableDetail.noLeakageAlarmACurrentValue + "A</p></div><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + tableDetail.noLeakageAlarmBCurrentValue + "A</p></div><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + tableDetail.noLeakageAlarmCCurrentValue + "A</p></div><div><img src='./images/s_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + ele + "mA</p></div></div><div style='margin-top:10px;font-size:16px;' class='box_xin'><div style='float:left;margin-left:15px;'>报警状态：</div><div style='color:#BFBCBC'>无</div><div style='float:left;margin-left:15px;'>报警值：</div><div style='color:#BFBCBC;'>无</div><div style='float:left;margin-left:15px;'>报警时间：</div><div style='color:#BFBCBC;'>无</div></div></div><div class='box'><div class='box_photo'><div><img src='./images/v_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + tableDetail.noVoltageAlarmAValue + "V</p></div><div><img src='./images/v_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + tableDetail.noVoltageAlarmBValue + "V</p></div><div><img src='./images/v_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + tableDetail.noVoltageAlarmCValue + "V</p></div></div><div class='box_xin' style='margin-top:10px;font-size:16px;'><div style='float:left;margin-left:15px;'>报警状态：</div><div style='color:#BFBCBC'>无</div><div style='float:left;margin-left:15px;'>报警值：</div><div style='color:#BFBCBC;'>无</div><div style='float:left;margin-left:15px;'>报警时间：</div><div style='color:#BFBCBC'>无  </div></div></div><div class='box'><div class='box_photo'><div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + tableDetail.noAlarmATemperatureValue + "°C</p></div><div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + tableDetail.noAlarmBTemperatureValue + "°C</p></div> <div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + tableDetail.noAlarmCTemperatureValue + "°C</p></div><div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >" + tableDetail.noAlarmNTemperatureValue + "°C</p> </div> </div><div  class='box_xin' style='margin-top:10px;font-size:16px;'><div style='float:left;margin-left:15px;'>报警状态：</div><div style='color:#BFBCBC'>无</div><div style='float:left;margin-left:15px;'>报警值：</div><div style='color:#BFBCBC;'>无</div><div style='float:left;margin-left:15px;'>报警时间：</div><div style='color:#BFBCBC;font-size: 13px;line-height:21px'>无 </div></div></div>";
                    }
                } else {
                    html = "<div class='box'><div class='box_photo'><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >无</p></div><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >无</p></div><div><img src='./images/a_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >无</p></div><div><img src='./images/s_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >无</p></div></div><div style='margin-top:10px;font-size:16px;' class='box_xin'><div style='float:left;margin-left:15px;'>报警状态：</div><div style='color:#BFBCBC'>无</div><div style='float:left;margin-left:15px;'>报警值：</div><div style='color:#BFBCBC;'>无</div><div style='float:left;margin-left:15px;'>报警时间：</div><div style='color:#BFBCBC;'>无</div></div></div><div class='box'><div class='box_photo'><div><img src='./images/v_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >无</p></div><div><img src='./images/v_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >无</p></div><div><img src='./images/v_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >无</p></div></div><div class='box_xin' style='margin-top:10px;font-size:16px;'><div style='float:left;margin-left:15px;'>报警状态：</div><div style='color:#BFBCBC'>无</div><div style='float:left;margin-left:15px;'>报警值：</div><div style='color:#BFBCBC;'>无</div><div style='float:left;margin-left:15px;'>报警时间：</div><div style='color:#BFBCBC'>无  </div></div></div><div class='box'><div class='box_photo'><div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >无</p></div><div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >无</p></div> <div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >无</p></div><div><img src='./images/w_white.png' alt='' style='display:inline-block;width:40px;height:40px;margin-top: 15px;'><p >无</p> </div> </div><div  class='box_xin' style='margin-top:10px;font-size:16px;'><div style='float:left;margin-left:15px;'>报警状态：</div><div style='color:#BFBCBC'>无</div><div style='float:left;margin-left:15px;'>报警值：</div><div style='color:#BFBCBC;'>无</div><div style='float:left;margin-left:15px;'>报警时间：</div><div style='color:#BFBCBC;font-size: 13px;line-height:21px'>无 </div></div></div>";
                }
                $('#inforBox').html(html);
                var html = "";
                if (data != "" && data != null) {
                    $.each(data, function (i, v) {
                        html = "<div class='InforBox' style='width:97%;height:200px;'><div class='LeftBox' style='height:95%;' ><div class='InforCurrBox'><div style='display:inline-block'><div class='inforLine DataItem'><div class='inforLabel'>A相电压:</div><div class='inforValue' id='dUA'>" + data[0].ua + "V</div></div></div><div style='display:inline-block'><div class='inforLine DataItem'><div class='inforLabel'>B相电压:</div><div class='inforValue' id='dUB'>" + data[0].ub + "V</div></div></div><div style='display:inline-block'><div class='inforLine DataItem'><div class='inforLabel'>C相电压:</div><div class='inforValue' id='dUC'>" + data[0].uc + "V</div></div></div></div></div><div class='RightBox' style='height:95%;'><div class='chartBox'><div id='divChartU' class='chartdemo'></div></div></div></div>";
                    })
                    $('#inforU').html(html);
                    var dd1 = [];
                    var dd2 = [];
                    var dd3 = [];
                    // console.log(data);
                    $.each(data, function (i, v) {

                        dd1.push([v.happenedTime, parseFloat(v.ua)]);
                        dd2.push([v.happenedTime, parseFloat(v.ub)]);
                        dd3.push([v.happenedTime, parseFloat(v.uc)]);

                    })

                    //console.log(dd1);

                    $('#divChartU').highcharts({

                        chart: {
                            type: 'spline',
                            backgroundColor: 'rgba(0,0,0,0)',
                            animation: true
                        },
                        title: {
                            text: ''
                        },
                        xAxis: {
                            type: 'datetime',
                            labels: {
                                style: {
                                    color: '#FF0000'
                                },
                            },
                            tickInterval: 10,
                            tickPixelInterval: 100,
                            minTickInterval: 3,
                            categories: [],
                        },

                        yAxis: [{
                            title: {
                                text: '电压'
                            },
                            gridLineColor: "#98B066",
                            labels: {
                                style: {
                                    color: '#ddd'
                                }
                            },
                            min: 0,
                            allowDecimals: false,


                        }],
                        legend: {
                            layout: 'vertical',
                            align: 'right',
                            verticalAlign: 'middle',
                        },
                        tooltip: {
                            valueSuffix: 'V',
                            split: true,
                            padding: 5,
                            dateTimeLabelFormats: {
                                hour: '%m-%d %H:%M'
                            }

                        },
                        plotOptions: {
                            series: {
                                label: {
                                    connectorAllowed: false
                                },
                            },
                            spline: {
                                states: {
                                    hover: {
                                        lineWidth: 2 //线的宽度
                                    }
                                },
                                marker: {
                                    enabled: false
                                },
                            }

                        },
                        series: [{
                            name: 'A相电压',
                            yAxis: 0,
                            data: dd1
                        },
                        {
                            name: 'B相电压',
                            yAxis: 0,
                            data: dd2
                        },
                        {
                            name: 'C相电压',
                            yAxis: 0,
                            data: dd3
                        },

                        ]
                    })
                    var html = '';
                    // console.log(data[0].ld*1000);
                    $.each(data, function (i, v) {
                        html = "<div class='InforBox' style='width:97%;height:200px;'><div class='LeftBox' style='height:95%;'><div class='InforCurrBox'><div style='display:inline-block'><div class='inforLine DataItem'><div class='inforLabel'>A相电流:</div><div class='inforValue' id='dUA'>" + data[0].ia + "A</div></div></div><div style='display:inline-block'><div class='inforLine DataItem'><div class='inforLabel'>B相电流:</div><div class='inforValue' id='dUB'>" + data[0].ib + "A</div></div></div><div style='display:inline-block'><div class='inforLine DataItem'><div class='inforLabel'>C相电流:</div><div class='inforValue' id='dUC'>" + data[0].ic + "A</div></div></div><div style='display:inline-block'><div class='inforLine DataItem'><div class='inforLabel'>剩余电流:</div><div class='inforValue' >" + (data[0].ld) + "mA</div></div></div></div></div><div class='RightBox' style='height:95%;'><div class='chartBox'><div id='divChartI' class='chartdemo'></div></div></div></div>";
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
                    console.log(dI1);
                    var newTime = dI1[0][0];
                    var html = "";
                    html = " " + newTime + " ";
                    $('#newTime').html(html);

                    $('#divChartI').highcharts({
                        chart: {
                            backgroundColor: 'rgba(0,0,0,0)'
                        },
                        title: {
                            text: ''
                        },
                        xAxis: {
                            type: 'datetime',
                            labels: {
                                style: {
                                    color: '#FF0000'
                                },
                            },
                            //tickInterval:4,    
                            categories: [],
                            tickInterval: 10,
                            tickPixelInterval: 100,

                        },
                        yAxis: [{
                            title: {
                                text: '电流'
                            },
                            gridLineColor: "#98B066",
                            labels: {
                                style: {
                                    color: '#ddd'
                                }
                            },
                            min: 0,
                            allowDecimals: false,
                            minTickInterval: 1

                        }],
                        legend: {
                            layout: 'vertical',
                            align: 'right',
                            verticalAlign: 'middle'
                        },
                        tooltip: {
                            valueSuffix: 'mA',
                            split: true,
                            padding: 5,
                        },
                        plotOptions: {
                            series: {
                                label: {
                                    connectorAllowed: false
                                },
                            },
                            spline: {
                                lineWidth: 4,
                                states: {
                                    hover: {
                                        lineWidth: 4
                                    }
                                },
                                marker: {
                                    enabled: false
                                },
                                // pointInterval: 3600 * 1000, // 曲线每个点的间隔
                                // pointStart: Date.UTC(2014, 6, 10)
                            }

                        },
                        series: [{
                            name: 'A相电流',
                            yAxis: 0,
                            data: dI1,
                        },
                        {
                            name: 'B相电流',
                            yAxis: 0,
                            data: dI2,
                        },
                        {
                            name: 'C相电流',
                            yAxis: 0,
                            data: dI3,
                        },
                        {
                            name: '剩余电流',
                            yAxis: 0,
                            data: dI4,
                        }
                        ]


                    })

                    var html = '';
                    //  console.log(data);
                    $.each(data, function (i, v) {

                        html = "<div class='InforBox' style='width:97%;height:200px;'><div class='LeftBox' style='height:95%;'><div class='InforCurrBox'><div style='display:inline-block'> <div class='inforLine DataItem'><div class='inforLabel'>A相温度:</div><div class='inforValue' id='dUA'>" + data[0].ta + "℃</div></div></div><div style='display:inline-block'><div class='inforLine DataItem'><div class='inforLabel'>B相温度:</div><div class='inforValue' id='dUA'>" + data[0].tb + "℃</div></div></div><div style='display:inline-block'><div class='inforLine DataItem'><div class='inforLabel'>C相温度:</div><div class='inforValue' id='dUA'>" + data[0].tc + "℃</div></div></div><div style='display:inline-block'><div class='inforLine DataItem'><div class='inforLabel'>N相温度:</div><div class='inforValue' id='dUA'>" + data[0].tn + "℃</div></div></div></div></div><div class='RightBox' style='height:95%;'><div class='chartBox'><div id='divChartT' class='chartdemo'></div></div></div>";
                    })


                    $('#inforT').html(html);
                    var dT1 = [];
                    var dT2 = [];
                    var dT3 = [];
                    var dT4 = [];
                    $.each(data, function (i, v) {
                        dT1.push([v.happenedTime, parseFloat(v.ta)]);
                        dT2.push([v.happenedTime, parseFloat(v.tb)]);
                        dT3.push([v.happenedTime, parseFloat(v.tc)]);
                        dT4.push([v.happenedTime, parseFloat(v.tn)]);
                    })

                    $('#divChartT').highcharts({
                        chart: {
                            backgroundColor: 'rgba(0,0,0,0)'
                        },
                        title: {
                            text: ''
                        },
                        xAxis: {
                            type: 'datetime',
                            labels: {
                                style: {
                                    color: '#FF0000'
                                },
                            },
                            //tickInterval:4,    
                            categories: [],
                            tickInterval: 10,
                            tickPixelInterval: 100,

                        },
                        yAxis: [{
                            title: {
                                text: '温度'
                            },
                            gridLineColor: "#98B066",
                            labels: {
                                style: {
                                    color: '#ddd'
                                }
                            },
                            min: 0,
                            allowDecimals: false,
                            minTickInterval: 1

                        }],
                        legend: {
                            layout: 'vertical',
                            align: 'right',
                            verticalAlign: 'middle'
                        },
                        tooltip: {
                            valueSuffix: '℃',
                            split: true,
                            padding: 5,
                        },
                        plotOptions: {
                            series: {
                                label: {
                                    connectorAllowed: false
                                },
                            },
                            spline: {
                                lineWidth: 4,
                                states: {
                                    hover: {
                                        lineWidth: 4
                                    }
                                },
                                marker: {
                                    enabled: false
                                },
                                // pointInterval: 3600 * 1000, // 曲线每个点的间隔
                                // pointStart: Date.UTC(2014, 6, 10)
                            }

                        },
                        series: [{
                            name: 'A相温度',
                            yAxis: 0,
                            data: dT1,
                        },
                        {
                            name: 'B相温度',
                            yAxis: 0,
                            data: dT2,
                        },
                        {
                            name: 'C相温度',
                            yAxis: 0,
                            data: dT3,
                        },
                        {
                            name: 'N相温度',
                            yAxis: 0,
                            data: dT4,
                        }
                        ]


                    })
                } else {
                    var html = "";
                    html = "  ";
                    $('#newTime').html(html);
                }

                var img_html = "";
                if (img != "") {
                    if (img.length >= '3') {
                        img_html = "<div class='InforBox' style='width:97%;height:200px;    display: flex;justify-content: center;align-items: center;'><div class='tab2_photo_chuan_img'><form   enctype='multipart/form-data'  method='post' class='btn_form'><label for='file_head'  style='width: 30%; height: 29%;' ><img src='http://112.74.126.51/earlyWarn/ctx/devPic/" + img[0] + "' alt=''   style='max-width: 175%;'><input type='text'  name='productNumber' value='" + ElecDetail.productNumber + "'  style='display:none;' /><input type='file' accept='image/*'  value='' index='2' style='display:none;' name='file' /><canvas id='canvas' hidden='hidden' id='canvas'></canvas></label></form></div><div class='tab2_photo_chuan_img'><form   enctype='multipart/form-data'  method='post' class='btn_form'><label for='file_head'  style='width: 30%; height: 29%;' ><img src='http://112.74.126.51/earlyWarn/ctx/devPic/" + img[1] + "' alt=''  style='max-width: 175%;'  ><input type='text'  name='productNumber' value='" + ElecDetail.productNumber + "'  style='display:none;' /><input type='file' accept='image/*'  value='' index='2' style='display:none;' name='file' /><canvas id='canvas' hidden='hidden' id='canvas'></canvas></label></form></div><div class='tab2_photo_chuan_img'><form   enctype='multipart/form-data'  method='post' class='btn_form'><label for='file_head'  style='width: 30%; height: 29%;' ><img src='http://112.74.126.51/earlyWarn/ctx/devPic/" + img[2] + "' alt=''  style='max-width: 175%;' ><input type='text'  name='productNumber' value='" + ElecDetail.productNumber + "'  style='display:none;' /><input type='file' accept='image/*'  value='' index='2' style='display:none;' name='file' /><canvas id='canvas' hidden='hidden' id='canvas'></canvas></label></form></div></div>";
                    } else if (img.length == '2') {
                        img_html = "<div class='InforBox' style='width:97%;height:200px;    display: flex;justify-content: center;align-items: center;'><div class='tab2_photo_chuan_img'><form   enctype='multipart/form-data'  method='post' class='btn_form'><label for='file_head'  style='width: 30%; height: 29%;' ><img src='http://112.74.126.51/earlyWarn/ctx/devPic/" + img[0] + "' alt='' style='max-width: 175%;'  ><input type='text'  name='productNumber' value='" + ElecDetail.productNumber + "'  style='display:none;' /><input type='file' accept='image/*'  value='' index='2' style='display:none;' name='file' /><canvas id='canvas' hidden='hidden' id='canvas'></canvas></label></form></div><div class='tab2_photo_chuan_img'><form   enctype='multipart/form-data'  method='post' class='btn_form'><label for='file_head'  style='width: 30%; height: 29%;' ><img src='http://112.74.126.51/earlyWarn/ctx/devPic/" + img[1] + "' alt='' style='max-width: 175%;'  ><input type='text'  name='productNumber' value='" + ElecDetail.productNumber + "'  style='display:none;' /><input type='file' accept='image/*'  value='' index='2' style='display:none;' name='file' /><canvas id='canvas' hidden='hidden' id='canvas'></canvas></label></form></div><div class='tab2_photo_chuan_img'><form   enctype='multipart/form-data'  method='post' class='btn_form'><label for='file_head'  style='width: 30%; height: 29%;' ><img src='./images/img_bg.png' alt=''   ><input type='text'  name='productNumber' value='" + ElecDetail.productNumber + "'  style='display:none;' /><input type='file' accept='image/*'  value='' index='2' style='display:none;' name='file' /><canvas id='canvas' hidden='hidden' id='canvas'></canvas></label></form></div></div>";
                    } else {
                        img_html = "<div class='InforBox' style='width:97%;height:200px;    display: flex;justify-content: center;align-items: center;'><div class='tab2_photo_chuan_img'><form   enctype='multipart/form-data'  method='post' class='btn_form'><label for='file_head'  style='width: 30%; height: 29%;' ><img src='http://112.74.126.51/earlyWarn/ctx/devPic/" + img[0] + "' alt='' style='max-width: 175%;'  ><input type='text'  name='productNumber' value='" + ElecDetail.productNumber + "'  style='display:none;' /><input type='file' accept='image/*'  value='' index='2' style='display:none;' name='file' /><canvas id='canvas' hidden='hidden' id='canvas'></canvas></label></form></div><div class='tab2_photo_chuan_img'><form   enctype='multipart/form-data'  method='post' class='btn_form'><label for='file_head'  style='width: 30%; height: 29%;' ><img src='./images/img_bg.png' alt=''   ><input type='text'  name='productNumber' value='" + ElecDetail.productNumber + "'  style='display:none;' /><input type='file' accept='image/*'  value='' index='2' style='display:none;' name='file' /><canvas id='canvas' hidden='hidden' id='canvas'></canvas></label></form></div><div class='tab2_photo_chuan_img'><form   enctype='multipart/form-data'  method='post' class='btn_form'><label for='file_head'  style='width: 30%; height: 29%;' ><img src='./images/img_bg.png' alt=''   ><input type='text'  name='productNumber' value='" + ElecDetail.productNumber + "'  style='display:none;' /><input type='file' accept='image/*'  value='' index='2' style='display:none;' name='file' /><canvas id='canvas' hidden='hidden' id='canvas'></canvas></label></form></div></div>";
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
                        console.log(str);
                        var str_last = str[str.length - 1];
                        console.log(str_last);
                        if (str_last == 'img_bg.png') {
                            // that.find('form').attr('id', 'upload').parent().siblings().find('form').removeAttr("id");
                            // that.find('input').eq(1).attr('id', 'file_head').parent().parent().parent().siblings().find('input').removeAttr("id");
                            // that.find('img').attr('id', 'FacdImg').parent().parent().parent().siblings().find('img').removeAttr("id");
                            // console.log(1);
                            // $("#file_head").on('change', function () {
                            //     var reader = new FileReader();
                            // console.log(reader);
                            //     var file = this.files[0];
                            //     console.log(file);
                            //     reader.onload = function (e) {
                            //         //图片压缩
                            //         selectFileImage(file, function (imgdata) {
                            //             // console.log(imgdata);
                            //             $("#FacdImg").attr("src", imgdata);
                            //         });
                            //     };
                            //     reader.readAsDataURL(this.files[0]);
                            // });
                        } else {
                            var img = that.find('img')[0].src;
                            console.log(img);
                            sessionStorage.setItem('img', img);
                            window.open(img);
                        }
                    }
                }
                // $('.btn_form').on('change',function(e){
                //     console.log(e);
                //     var form = document.getElementById('upload')
                //     var formData = new FormData(form);
                //         console.log(formData);
                //         console.log(form);
                //     /*    $.ajax({
                //             url:"http://118.89.29.100/earlyPlatform/editFileimageServlet2.action",
                //             type:"post",
                //             data:formData,
                //             dataType:"json",
                //             processData:false,
                //             contentType:false,
                //             success:function(res){
                //             console.log(res);
                //             if(res.list[0].err_code=='1000'){
                //                 console.log("上传成功！");
                //                 alert(res.list[0].err_msg)
                //                 location.reload();
                //             }else{
                //                 alert(res.list[0].err_msg)
                //             }
                //             },
                //             error:function(err){
                //                 console.log("网络连接失败,稍后重试",err);
                //             }
                //         });*/
                // })
            }
        })
    }

    var time = new Date();
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var day = time.getDate();
    var now = year + '-' + month + '-' + day;
    loadData(now);
    var devStatus = sessionStorage.getItem('devStatus');
    // if(devStatus=='0'){
    //     var html="<div class='sageBoxCirred'>用电报警</div>";
    //     $('#divChartAlarm').html(html);
    // }else if(devStatus=='1'){
    //     var html="<div class='safeBox'>用电正常</div>";
    //     $('#divChartAlarm').html(html);
    // }else{
    //     var html="<div class='sageBoxGrey'>离线</div>";
    //     $('#divChartAlarm').html(html);
    // }

    var aFid = sessionStorage.getItem('aFid');
    var user = localStorage.getItem('userName');
    //var address=sessionStorage.getItem('devMC');   
    var res = sessionStorage.getItem('res');
    //var name=sessionStorage.getItem('comName');
    // var res = "13265542038";

    // console.log("--"+aFid+"--"+user+"--"+res+"--"+name+"--"+address);
    $('#dispose').click(function () {
        var mess = document.getElementById('txtDo').value;
        var html = "";
        html = "<img src='./images/loading.gif' style='margin-top:215px;' id='loadingstart'><img src='./images/gtk-ok.png' style='margin-top:215px ;display:none;' id='loadingend'>";
        $('.elecDoLog').html(html);

        $.ajax({
            type: 'get',
            url: url + '/relieveServlet.action',
            data: 'aFid=' + aFid + '&user=' + user + '&address=' + address + '&res=' + res + '&name=' + name + '&mess=' + mess,
            error: function (error) {
                console.log('MDchart---->doAlarm' + error);
            },
            beforeSend: function () {
                $('#dispose').attr('disabled', 'disabled');
            },
            success: function (result) {
                //  console.log(result);
                var result = JSON.parse(result);
                if (result.mess == 'true') {
                    console.log('告警已处理');
                    setTimeout("$('#loadingstart').hide()", 2000);
                    setTimeout("$('#loadingend').show()", 2200);
                    setTimeout("$('#loadingend').hide()", 3500);
                } else {
                    console.log('报警处理情况不能为空');
                }
            }
        })
    })



})