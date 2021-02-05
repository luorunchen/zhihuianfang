function MapTool(box, map, mData) {


    var htmlBox = box; //地图控件

    var mapObj = map; //地图对象

    var mapData = mData; //数据对象
    var userName = parseInt(localStorage.getItem('userName'));
    var region = localStorage.getItem('region');

    var loadEvent = function () {
        $(".queryBut").click(function () {
            var pResult = $(".queryResult");
            pResult.empty();

            var txt = $(".queryText").val();
            if (txt == "") {
                alert("请输入查询条件");
                return;
            }

            //单位列表
            var lstCompany = mapData.GetResult().Company;
            // console.log(txt)
            if(/^[0-9]+$/.test(txt)){//这是用正则表达是检查
                $.ajax({
                    type:'get',
                    url:url+'/WebProject/selectDeviceByNumber.action',
                    data:'number='+txt,
                    error:function(error){console.log(error)},
                    success:function(result){
                        console.log(result.length==0)
                        if(result.length!=0){
                            console.log(1);
                            $.each(result, function (i, v) {
                                if (v.productNumber.indexOf(txt) >= 0 ) {
                                    var thtml = "<div class=\"resultItem\">";
                                    // thtml += "<div class=\"resultTitle\">" + v.device_name + ","+v.productNumber +"</div>";
                                    thtml += "<div class=\"resultText\">设备名称：" + v.device_name + "</div>";
                                    thtml += "<div class=\"resultText\">设备号：" + v.productNumber + "</div>";
                                    thtml += "<div class=\"resultText\">地址：" + v.installLocation + "</div>";
                                    thtml += "</div>";
                                    var pItem = $(thtml);
                                    NumberClick(pItem, v);
                                    pItem.appendTo(pResult);
                                }
                            });
                        }else{
                            var thtml="<div class='resultItem' style='text-align: center;'>该设备暂无数据，请检查设备编号是否正确</div>";

                            var pItem = $(thtml);
                            console.log(pItem)
                            // // NumberClick(pItem, v);
                            pItem.appendTo(pResult);
                        }
                        
                    }
                })   
            }else{  
                $.each(lstCompany, function (i, v) {
                    if (v.mC.indexOf(txt) >= 0 || v.address.indexOf(txt) >= 0) {
                        var thtml = "<div class=\"resultItem\">";
                        thtml += "<div class=\"resultTitle\">" + v.mC + "</div>";
                        thtml += "<div class=\"resultText\">地址：" + v.address + "</div>";
                        thtml += "</div>";
                        var pItem = $(thtml);
                        CompanyClick(pItem, v);
                        pItem.appendTo(pResult);
                    }
                });
            }

            
        });

        $(".chartLabel").click(function () {
            $(".chartBox").addClass("chartBoxShow");
            loadChart();
        });

        $(".chartBut").click(function () {
            $(".chartBox").removeClass("chartBoxShow");
            $('.chartBody').empty();
        });


        //报警明细   //今日报警 
        $("#ElecAlarmSum").on('click', '.numItem', function () {
            //$("#ElecAlarmSum").find(".numItem").click(function () {
            var that = $(this);
            //  console.log(tt);
            $.ajax({
                tyle: 'get',
                url: url + '/WebProject/DeviceAlarm.action',
                data: 'username=' + username + '&type=3',
                error: function (error) {
                    console.log(error + '网络错误')
                },
                success: function (result) {
                    console.log(result);
                    var BH = that.attr("data-sign");
                    // console.log(BH);
                    doAction(url + "/admin/project/SElec_DetailElecDevice.action?pid=" + BH, "POST", {}, function (result) {
                        // console.log(result);
                        var pResult = $(".queryResult");
                        pResult.empty();
                        var lstCompany = mapData.GetResult().Company;
                        // console.log(lstCompany)
                        $.each(result, function (i, v) {
                            //  console.log('z'+v.BH);
                            var comObj = null;
                            $.each(lstCompany, function (t, c) {
                                // console.log(c.ID);  
                                if (c.iD == v.BH || c.iD == 'z' + v.BH) {

                                    comObj = c;
                                    // console.log(comObj);
                                    return false;
                                }
                            });
                            // console.log(comObj)
                            var thtml = "<div class=\"resultItem\">";

                            if (comObj) {
                                thtml += "<div class=\"resultTitle\">" + (i + 1) + "、" + comObj.mC + "</div>";
                                thtml += "<div class=\"resultText\">地址：" + comObj.address + "</div>";
                                if (comObj.fireManagerTel && comObj.fireManagerTel != "") {
                                    thtml += "<div class=\"resultText\">电话：" + comObj.fireManagerTel + "</div>";
                                }
                            } else {
                                thtml += "<div class=\"resultText\">公司：" + v.BH + "</div>";
                            }
                            thtml += "<div class=\"resultText\">报警：" + v.value + "次</div>";
                            thtml += "</div>";

                            var pItem = $(thtml);
                            CompanyClick(pItem, comObj);
                            pItem.appendTo(pResult);

                        });
                    })
                }
            })

            //json/SElec_DetailElecAlarm.json
            // doAction(url + "/admin/project/SElec_DetailElecDevice.action?pid=" + BH, "GET", {
            //     Status: tt
            // }, function (result) {
            //     var pResult = $(".queryResult");
            //     pResult.empty();
            //     //  console.log(result);
            //     //单位列表
            //     var lstCompany = mapData.GetResult().Company;
            //     // console.log(lstCompany);
            //     //  报警数BH 中可能包含 （Z） 需加一个 c.ID == 'z'+v.BH 判断
            // $.each(result, function (i, v) {
            //     //  console.log('z'+v.BH);
            //     var comObj = null;
            //     $.each(lstCompany, function (t, c) {
            //         // console.log(c.ID);  
            //         if (c.ID == v.BH || c.ID == 'z' + v.BH) {

            //             comObj = c;
            //             // console.log(comObj);
            //             return false;
            //         }
            //     });

            //     var thtml = "<div class=\"resultItem\">";

            //     if (comObj) {
            //         thtml += "<div class=\"resultTitle\">" + (i + 1) + "、" + comObj.MC + "</div>";
            //         thtml += "<div class=\"resultText\">地址：" + comObj.address + "</div>";
            //         if (comObj.fireManagerTel && comObj.fireManagerTel != "") {
            //             thtml += "<div class=\"resultText\">电话：" + comObj.fireManagerTel + "</div>";
            //         }
            //     } else {
            //         thtml += "<div class=\"resultText\">公司：" + v.BH + "</div>";
            //     }
            //     thtml += "<div class=\"resultText\">报警：" + v.value + "次</div>";
            //     thtml += "</div>";

            //     var pItem = $(thtml);
            //     CompanyClick(pItem, comObj);
            //     pItem.appendTo(pResult);

            // });

            // });
        });


        //设备明细
        $("#ElecDeviceSum").on('click', '.numItem', function () {
            //$("#ElecDeviceSum").find(".numItem").click(function () {
            var that = $(this);
            $.ajax({
                tyle: 'get',
                url: url + '/WebProject/DeviceNum.action',
                data: 'username=' + username + '&type=3' +'&region='+region,
                error: function (error) {
                    console.log(error + '网络错误')
                },
                success: function (result) {
                    console.log(result);
                    var tt = that.attr("data-sign");
                    if (tt == '01') {  //报警
                        var BH = result.alarmPid;
                    } else if (tt == '02') {  //在线
                        var BH = result.onlinePid;
                    } else {  //离线
                        var BH = result.offlinePid;
                    }
                    // console.log(BH)
                    if (BH != "") {
                        doAction(url + "/admin/project/SElec_DetailElecDevice.action?pid=" + BH, "POST", {
                            Status: tt
                        }, function (result) {
                            var pResult = $(".queryResult");
                            pResult.empty();
                            // console.log(result);
                            //单位列表
                            var lstCompany = mapData.GetResult().Company; //所有电器的项目
                            // console.log(lstCompany)
                            $.each(result, function (i, v) {

                                var comObj = null;
                                $.each(lstCompany, function (t, c) {
                                    if (c.iD == v.BH || c.iD == 'z' + v.BH) {
                                        comObj = c;
                                        return false;
                                    }
                                });
                                // console.log(comObj)
                                var thtml = "<div class=\"resultItem\">";

                                if (comObj) {
                                    thtml += "<div class=\"resultTitle\">" + (i + 1) + "、" + comObj.mC + "</div>";
                                    thtml += "<div class=\"resultText\">地址：" + comObj.address + "</div>";
                                    if (comObj.fireManagerTel && comObj.fireManagerTel != "") {
                                        thtml += "<div class=\"resultText\">电话：" + comObj.f
                                        ireManagerTel + "</div>";
                                    }
                                }

                                thtml += "<div class=\"resultText\">编号：" + v.BH + "</div>";
                                thtml += "<div class=\"resultText\">位置：" + v.text + "</div>";
                                thtml += "</div>";

                                var pItem = $(thtml);
                                CompanyClick(pItem, comObj);
                                pItem.appendTo(pResult);

                            });

                        });
                    }
                }
            })



        });


    }


    //点击单位查询结果
    var CompanyClick = function (pobj, data) {
        // console.log(pobj)
        // console.log(data)
        pobj.click(function () {
            if (data) {
                // console.log(data);
                var lng=data.long_latbai.split(',')[1];   
                var lat=data.long_latbai.split(',')[0];   
                if (lat > 54) { // 纬度
                    var lng = data.long_latbai.split(',')[0]; //经度
                    var lat = data.long_latbai.split(',')[1]; //纬度
                } else {
                    var lng = data.long_latbai.split(',')[1];
                    var lat = data.long_latbai.split(',')[0];
                } 
                var point = new BMap.Point(lng, lat);
                mapObj.centerAndZoom(point, 14);
                mapData.OpenDetail(data);
            }
        });
    }

    //点击单位查询设备结果
    var NumberClick = function (pobj, data) {
        pobj.click(function () {
            // console.log(data);
            var devBH=data.devId;
            var typeName=data.typeName
            var devMC=data.device_name
            var typeName=data.alarmType

            if(devMC==""){
                var devMC=devBH
            }
            if (data) {
               sessionStorage.setItem('DevBH', devBH); //devId 
              window.top.OpenThirdFrame("./ExtApp_SElectric_ElecDetail.html?devBH=" + devBH  + '&typeName=' + typeName, 1100, 600, "win", devMC);
            }
        });
    }

    //加载报警趋势图表
    var loadChart = function () {
        //json/SElec_SumElecByTime.json
        var userName = parseInt(localStorage.getItem('userName'));
        var type = parseInt(localStorage.getItem('tpage'));
        doAction(url + "/admin/project/SumElecByTime.action?username=" + userName, "GET", {
            type: type
        }, function (result) {
            // doAction("http://zlh18122711575.55555.io:16799/earlyPlatform/admin/project/SumElecByTime.action?username="+userName, "GET", {}, function (result) {
            var sum = result.Diagram;
            var dd1 = [];

            $.each(sum, function (i, v) {
                dd1.push([v.date, v.num]);
            });

            Highcharts.setOptions({
                colors: ['#5dacd3', '#50B432']
            });

            //隐患趋势图
            $('.chartBody').highcharts({
                chart: {
                    backgroundColor: 'rgba(0,0,0,0)'
                },
                title: {
                    text: '隐患趋势图',
                    style: {
                        color: '#ffffff'
                    }
                },
                xAxis: {
                    gridLineColor: "#73c4f1",
                    labels: {
                        style: {
                            color: '#ffffff'
                        }
                    },
                    categories: []
                },
                yAxis: [{
                    title: {
                        text: ''
                    },
                    gridLineColor: "#73c4f1",
                    labels: {
                        style: {
                            color: '#ffffff'
                        }
                    },
                    min: 0,
                    allowDecimals: false,
                    minTickInterval: 1

                }],
                legend: {
                    borderWidth: 0,
                    enabled: true,
                    itemStyle: {
                        color: '#ffffff',
                        fontWeight: 'bold'
                    }
                },
                plotOptions: {
                    line: {
                        dataLabels: {
                            enabled: true,
                            style: {
                                color: "#ffffff"
                            }
                        },
                        enableMouseTracking: false
                    }
                },
                series: [{
                    name: '今日报警',
                    yAxis: 0,
                    data: dd1
                }]
            });
        });
    }



    //清除痕迹
    this.Clear = function (vg) {

    }

    //加载数据
    this.Open = function () {
        this.Clear();
        loadEvent();
    }


}