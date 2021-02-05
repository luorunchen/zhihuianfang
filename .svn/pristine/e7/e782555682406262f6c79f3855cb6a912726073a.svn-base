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
                var aFid= ElecDetail.aFid
                sessionStorage.setItem('aFid', aFid);
                sessionStorage.setItem('res', res);
                var devSignature = ElecDetail.productNumber;
                sessionStorage.setItem('devSignature',devSignature)
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
                html = "<div class='inforLine'><div class='inforLabel'>设备编号:</div><div class='inforValue'>" + ElecDetail.productNumber + "</div></div><div class='inforLine'><div class='inforLabel'>在线状态:</div><div class='inforValue'>" + ElecDetail.status + "</div></div><div class='inforLine'><div class='inforLabel'>报警手机:</div><div class='inforValue'>" + ElecDetail.master + "</div></div><div class='inforLine'><div class='inforLabel'>报警信息:</div><div class='inforValue' id='AlarmValue'>" + ElecDetail.typeName + "</div></div><div class='inforLine'><div class='inforLabel'>安装位置:</div><div class='inforValue' style='display:block;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;' title='" + ElecDetail.installLocation + "'>" + (ElecDetail.dSid=='24'?'智能重合闸':ElecDetail.installLocation) + "</div></div><div class='inforLine'><div class='inforLabel'>安装日期:</div><div class='inforValue'>" + ElecDetail.regdate + "</div></div><div class='inforLine'><div class='inforLabel'>最新数据:</div><div class='inforValue'  id='newTime'>" + ElecDetail.newestDate + "</div></div><div class='inforLine'><div class='inforLabel'>保险单号:</div><div class='inforValue'>" + policy + "</div></div><div class='inforLine'><div class='inforLabel'>开启流量:</div><div class='inforValue'>" + flow + "</div></div>";
                $('#ElecAlarm').html(html);

                if (ElecDetail.status == '在线') {
                    if (ElecDetail.typeName == "正常") {
                        var html = "<div style='font-size:16px;'>用电正常</div>"
                        $('#tableDetail').html(html);
                        $('#tableDetail').addClass('safeBox');
                    } else {
                        var html = "<div style='font-size:16px;'>" + ElecDetail.typeName + "</div>"
                        $('#tableDetail').html(html);
                        $('#tableDetail').addClass('alarmBox');
                    }
                } else {
                    var html = "<div style='font-size:16px;'>设备离线/" + ElecDetail.typeName + "</div>"
                    $('#tableDetail').html(html);
                    $('#tableDetail').addClass('huiBox');

                }
                $('#tableDetail').html(html);

                var html = "";
                html = "<div style='width:100%;display: flex;justify-content: space-around;margin: 5px 0;'><button class='btn btn-danger col-xs-2'  id='yuanDuan'>远程断电</button><button class='btn btn-warning col-xs-2'  id='yuanKai'>远程 开机</button><button class='btn btn-warning col-xs-2'  id='yuanGuan'>远程停机</button><button class='btn btn-primary col-xs-2'  id='yuanXiao'>远程消音</button></div><div style='width:100%;display: flex;justify-content: space-around;margin: 5px 0;'><button class='btn btn-default col-xs-2'  id='yuanLiang'>开启流量</button><button class='btn btn-default col-xs-2'  id='yuanKaiFeng'>开启蜂鸣器</button><button class='btn btn-default col-xs-2'  id='yuanGuanFeng'>关闭蜂鸣器</button></div><div style='width:100%;display: flex;justify-content: space-around;margin: 5px 0;'><input type='text' name='InsuranceNo:' class='col-xs-9' id='baoNum'><button class='btn btn-default '  id='yuanBao'>下发保险单</button></div><div style='width:100%;display: flex;justify-content: space-around;margin: 5px 0;'><button class='btn btn-default col-xs-3' id='shareDev'>分享设备</button><button class='btn btn-default col-xs-3' id='FazhiDev'>阀值设置</button></div>";
                //$('#inforC').html(html);
                //远程操作
                //http://120.24.53.206/earlyWarn/resetclose.action



                var img_html = "";
                if (img != "") {
                    if (img.length >= '3') {
                        img_html = "<div class='InforBox' style='width:97%;height:200px;    display: flex;justify-content: center;align-items: center;'><div class='tab2_photo_chuan_img'><form   enctype='multipart/form-data'  method='post' class='btn_form'><label for='file_head'  style='width: 30%; height: 29%;' ><img src='http://"+img_url+"/ctx/devPic/" + img[0] + "' alt=''   style='max-width: 175%;'><input type='text'  name='productNumber' value='" + ElecDetail.productNumber + "'  style='display:none;' /><input type='file' accept='image/*'  value='' index='2' style='display:none;' name='file' /><canvas id='canvas' hidden='hidden' id='canvas'></canvas></label></form></div><div class='tab2_photo_chuan_img'><form   enctype='multipart/form-data'  method='post' class='btn_form'><label for='file_head'  style='width: 30%; height: 29%;' ><img src='http://"+img_url+"/ctx/devPic/" + img[1] + "' alt=''  style='max-width: 175%;'  ><input type='text'  name='productNumber' value='" + ElecDetail.productNumber + "'  style='display:none;' /><input type='file' accept='image/*'  value='' index='2' style='display:none;' name='file' /><canvas id='canvas' hidden='hidden' id='canvas'></canvas></label></form></div><div class='tab2_photo_chuan_img'><form   enctype='multipart/form-data'  method='post' class='btn_form'><label for='file_head'  style='width: 30%; height: 29%;' ><img src='http://"+img_url+"/ctx/devPic/" + img[2] + "' alt=''  style='max-width: 175%;' ><input type='text'  name='productNumber' value='" + ElecDetail.productNumber + "'  style='display:none;' /><input type='file' accept='image/*'  value='' index='2' style='display:none;' name='file' /><canvas id='canvas' hidden='hidden' id='canvas'></canvas></label></form></div></div>";
                    } else if (img.length == '2') {
                        img_html = "<div class='InforBox' style='width:97%;height:200px;    display: flex;justify-content: center;align-items: center;'><div class='tab2_photo_chuan_img'><form   enctype='multipart/form-data'  method='post' class='btn_form'><label for='file_head'  style='width: 30%; height: 29%;' ><img src='http://"+img_url+"/ctx/devPic/" + img[0] + "' alt='' style='max-width: 175%;'  ><input type='text'  name='productNumber' value='" + ElecDetail.productNumber + "'  style='display:none;' /><input type='file' accept='image/*'  value='' index='2' style='display:none;' name='file' /><canvas id='canvas' hidden='hidden' id='canvas'></canvas></label></form></div><div class='tab2_photo_chuan_img'><form   enctype='multipart/form-data'  method='post' class='btn_form'><label for='file_head'  style='width: 30%; height: 29%;' ><img src='http://"+img_url+"/ctx/devPic/" + img[1] + "' alt='' style='max-width: 175%;'  ><input type='text'  name='productNumber' value='" + ElecDetail.productNumber + "'  style='display:none;' /><input type='file' accept='image/*'  value='' index='2' style='display:none;' name='file' /><canvas id='canvas' hidden='hidden' id='canvas'></canvas></label></form></div><div class='tab2_photo_chuan_img'><form   enctype='multipart/form-data'  method='post' class='btn_form'><label for='file_head'  style='width: 30%; height: 29%;' ><img src='./images/img_bg.png' alt=''   ><input type='text'  name='productNumber' value='" + ElecDetail.productNumber + "'  style='display:none;' /><input type='file' accept='image/*'  value='' index='2' style='display:none;' name='file' /><canvas id='canvas' hidden='hidden' id='canvas'></canvas></label></form></div></div>";
                    } else {
                        img_html = "<div class='InforBox' style='width:97%;height:200px;    display: flex;justify-content: center;align-items: center;'><div class='tab2_photo_chuan_img'><form   enctype='multipart/form-data'  method='post' class='btn_form'><label for='file_head'  style='width: 30%; height: 29%;' ><img src='http://"+img_url+"/ctx/devPic/" + img[0] + "' alt='' style='max-width: 175%;'  ><input type='text'  name='productNumber' value='" + ElecDetail.productNumber + "'  style='display:none;' /><input type='file' accept='image/*'  value='' index='2' style='display:none;' name='file' /><canvas id='canvas' hidden='hidden' id='canvas'></canvas></label></form></div><div class='tab2_photo_chuan_img'><form   enctype='multipart/form-data'  method='post' class='btn_form'><label for='file_head'  style='width: 30%; height: 29%;' ><img src='./images/img_bg.png' alt=''   ><input type='text'  name='productNumber' value='" + ElecDetail.productNumber + "'  style='display:none;' /><input type='file' accept='image/*'  value='' index='2' style='display:none;' name='file' /><canvas id='canvas' hidden='hidden' id='canvas'></canvas></label></form></div><div class='tab2_photo_chuan_img'><form   enctype='multipart/form-data'  method='post' class='btn_form'><label for='file_head'  style='width: 30%; height: 29%;' ><img src='./images/img_bg.png' alt=''   ><input type='text'  name='productNumber' value='" + ElecDetail.productNumber + "'  style='display:none;' /><input type='file' accept='image/*'  value='' index='2' style='display:none;' name='file' /><canvas id='canvas' hidden='hidden' id='canvas'></canvas></label></form></div></div>";
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
    var aFid = sessionStorage.getItem('aFid');
    
    $('#dispose').click(function () {
        //http://p240647i77.qicp.vip/newEarlyWarn/WebeditFileimageServlet
        var username = localStorage.getItem('userName');
        var cause=$('#txtDo').val();
        var aFid=sessionStorage.getItem('aFid');
        if(aFid==""){
            alert('该设备没有报警，无需解除')
        }else{
            var user=username+','+aFid
            if(cause==""){
                alert('请填写解除信息备注')
            }else{
                $.ajax({
                    type: 'get',
                    url: url + '/WebeditFileimageServlet',
                    data: 'username=' + user + '&cause=' + cause ,
                    error: function (error) {
                        console.log('MDchart---->doAlarm' + error);
                    },
                    success:function(res){
                        console.log(res)
                        var res=JSON.parse(res);
                        console.log(res);
                        if(res.list[0].status==true){
                            console.log(1)
                            layer.open({
                                content:res.list[0].err_msg
                            })
                            setTimeout(function(){
                                location.reload();
                                layer.close();
                            },1000)
                            
                        }else{
                            layer.open({
                                content:res.list[0].err_msg
                            })
                        }
                    }
                })
            }
        }
        
    })
    //http://p240647i77.qicp.vip/newEarlyWarn/WebProject/getHistory.action?deviceId=0460043006308600
    
    function History(){
        var devSignature=sessionStorage.getItem('devSignature')
        $.ajax({
            type:'get',
            url:url+'/WebProject/getHistory.action',
            data:'deviceId='+global.devSignature,
            error:function(error){console.log(error)},
            success:function(result){
                console.log(result);
                //detailAlarm
                var li=result.li;
                var list=result.list;
                var html=""
                html="<li style='text-align: center;color:red;'>报警信息</li>";
                $.each(li,function(i,v){
                    html+="<li style='margin: 10px 0;'>设备为<span class='colorSpan'>"+v.deviceid+"</span>的设备在 <span class='colorSpan'>"+v.alarmFaultDate+"</span> 发生 <span class='colorSpan'>"+v.typeName+"</span>,请速速派人前去查看</li>";
                })
                $('#detailAlarm').html(html);

                var html=""
                html="<li style='text-align: center;color:red;'>解除报警信息</li>";
                $.each(list,function(i,v){
                    html+="<li style='margin: 10px 0;'>用户账号<span class='colorSpan'>"+v.user_name+"</span>"+v.info+"</li>";
                })
                $('#detailJie').html(html);
            }
        })
    }
    setTimeout(function(){
        History();
    },2000)


    function zhexianData(day) {
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
                html="<div class='InforBox' style='width:97%;height:300px;'><div class='RightBox' style='height:95%;'><div class='chartBox'><div id='divChartU' class='chartdemo'></div></div></div></div>";
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
                html="<div class='InforBox' style='width:97%;height:300px;'><div class='RightBox' style='height:95%;'><div class='chartBox'><div id='divChartI' class='chartdemo'></div></div></div></div>";
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
                html="<div class='InforBox' style='width:97%;height:300px;'><div class='RightBox' style='height:95%;'><div class='chartBox'><div id='divChartT' class='chartdemo'></div></div></div></div>";
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
    zhexianData(now)
})