function MapTool(box, map,mData) {


    var htmlBox = box;  //地图控件

    var mapObj = map;  //地图对象
   
    var mapData = mData;  //数据对象
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
            $.each(lstCompany, function (i, v) {
                if (v.mC.indexOf(txt) >= 0  || v.address.indexOf(txt) >= 0) {
                    var thtml = "<div class=\"resultItem\">";
                    thtml += "<div class=\"resultTitle\">" + v.mC + "</div>";
                    thtml += "<div class=\"resultText\">地址：" + v.address + "</div>";
                    thtml += "</div>";

                    var pItem = $(thtml);
                    CompanyClick(pItem, v);
                    pItem.appendTo(pResult);
                }
            });

        });

        $(".chartLabel").click(function () {
            $(".chartBox").addClass("chartBoxShow");
            loadChart();
        });

        $(".chartBut").click(function () {
            $(".chartBox").removeClass("chartBoxShow");
            $('.chartBody').empty();
        });


        //报警明细
        $("#WaterAlarmSum").on('click', '.numItem', function () {
            var that=$(this);
            console.log(that);
            $.ajax({
                tyle: 'get',
                url: url + '/WebProject/DeviceAlarm.action',
                data: 'username=' + username + '&type=21',
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
        });


        //设备明细
        $("#WaterDeviceSum").find(".numItem").click(function () {
           // var tt = $(this).attr("data-sign");
            var that=$(this);
           // console.log(tt);
            $.ajax({
                tyle: 'get',
                url: url + '/WebProject/DeviceNum.action',
                data: 'username=' + username + '&type=21' +'&region='+region,
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
        console.log(data);
        var lng=data.long_latbai.split(',')[1];
        var lat=data.long_latbai.split(',')[0];
        // 大数据处理
        if (lat > 54) { // 纬度
            var lng = data.long_latbai.split(',')[0]; //经度
            var lat = data.long_latbai.split(',')[1]; //纬度
        } else {
            var lng = data.long_latbai.split(',')[1];
            var lat = data.long_latbai.split(',')[0];
        } 
        pobj.click(function () {
            if (data){
                var point = new BMap.Point(lng, lat);
                mapObj.centerAndZoom(point, 14);
                mapData.OpenDetail(data);
            }
        });
    }
    //点击单位查询结果


    //加载报警趋势图表
    var loadChart = function () {
        var userName=parseInt(localStorage.getItem('userName'));
        var type=parseInt(localStorage.getItem('tpage'));
        doAction(url+"/admin/project/SumElecByTime.action?username="+userName, "GET", {type:type}, function (result) {
            var sum=result.Diagram;
            var dd1 = [];
            var dd1 = [];

            $.each(sum, function (i, v) {
                dd1.push([v.date , v.num]);
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
                    style: { color: '#ffffff' }
                },
                xAxis: {
                    gridLineColor: "#73c4f1",
                    labels: { style: { color: '#ffffff' } },
                    categories: []
                },
                yAxis: [{
                    title: {
                        text: ''
                    },
                    gridLineColor: "#73c4f1",
                    labels: {
                        style: { color: '#ffffff' }
                    },
                    min: 0,
                    allowDecimals: false,
                    minTickInterval: 1

                }],
                legend: {
                    borderWidth: 0,
                    enabled: true,
                    itemStyle: { color: '#ffffff', fontWeight: 'bold' }
                },
                plotOptions: {
                    line: {
                        dataLabels: {
                            enabled: true,
                            style: {color:"#ffffff" }
                        },
                        enableMouseTracking: false
                    }
                },
                series: [{ name: '今日报警', yAxis: 0, data: dd1 }]
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