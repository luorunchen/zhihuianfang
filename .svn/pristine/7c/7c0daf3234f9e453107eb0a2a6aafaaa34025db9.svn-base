function MapTool(box, map, mData) {


    var htmlBox = box; //地图控件

    var mapObj = map; //地图对象

    var mapData = mData; //数据对象

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
            console.log(lstCompany);
            $.each(lstCompany, function (i, v) {
                // console.log(v);
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

        });
        var region = localStorage.getItem('region')
        $('#ElecDeviceSum').find(".numItem ").click(function () {
            var tt = $(this).attr("data-sign");
            console.log(tt);

            $.ajax({
                tyle: 'get',
                url: url + '/WebProject/DeviceNum.action',
                data: 'username=' + username + '&type=1,6,11' + '&region=' + region,
                error: function (error) {
                    console.log(error + '网络错误')
                },
                success: function (result) {
                    console.log(result)
                    var BH = [];
                    if (tt == "01") {
                        var lstCompany = result.onlinePid //设备在线
                        BH.push(lstCompany);
                    } else if (tt == "02") {
                        var lstCompany = result.offlinePid; //设备离线
                        BH.push(lstCompany);
                    } else {
                        var lstCompany = result.alarmPid; //设备报警
                        BH.push(lstCompany);
                    }
                    console.log(BH);
                    if (BH != "") {
                        doAction(url + "/admin/project/SElec_DetailElecDevice.action?pid=" + BH[0], "POST", {
                            Status: tt
                        }, function (result) {
                            console.log(result)
                            var pResult = $(".queryResult");
                            pResult.empty();
                            var AllFac = mapData.GetResult().Company;
                             //所有设备
                             console.log(AllFac)
                            $.each(result, function (i, v) {
                                //console.log(v);
                                var comObj = null;
                                $.each(AllFac, function (t, c) {
                                    if (c.iD == v.BH) {
                                        comObj = c;
                                        return false;
                                    }
                                });
                                //console.log(comObj);
                                var thtml = "<div class=\"resultItem\">";

                                if (comObj) {
                                    thtml += "<div class=\"resultTitle\">" + (i + 1) + "、" + comObj.mC + "</div>";
                                    thtml += "<div class=\"resultText\">地址：" + comObj.address + "</div>";
                                }

                                thtml += "<div class=\"resultText\">编号：" + v.BH + "</div>";
                                thtml += "<div class=\"resultText\">位置：" + v.text + "</div>";
                                thtml += "</div>";
                                var pItem = $(thtml);
                                CompanyClick(pItem, comObj);
                                pItem.appendTo(pResult);
                            })
                        })

                    } else {
                        var thtml = "";
                        $('.queryResult').html(thtml);
                    }
                }
            })




        })

        //地址查询
        $("#butSuggest").click(function () {

            var tv = $("#suggestId").val();
            if (tv == null || tv == undefined || tv == "") {
                return;
            }

            $(".MapBox").MapWhere(tv, "QueryText", tv);
        });

        // $("#dev01").click(function (e) {
        //     // $(".MapBox").MapWhere("在线设备", "ElecDevice", "LstDevice01Company");
        //     $(".MapBox").MapWhere("在线设备", "GasDevice", "LstDevice01Company");
        // });

        // $("#dev02").click(function (e) {
        //     $(".MapBox").MapWhere("离线设备", "GasDevice", "LstDevice02Company");
        // });
        // $("#dev03").click(function (e) {
        //     $(".MapBox").MapWhere("报警设备", "GasDevice", "LstDevice03Company");
        // });

        // $("#dev04").click(function (e) {
        //     $(".MapBox").MapWhere("到期设备", "GasDevice", "LstDeviceTrippingCompany");
        // });

        $(".moreAlarm").click(function (e) {

            window.top.OpenFrame("./SGasAlarm_GasAlarmLog.html?MenuCode=GasAlarmLog", 870, 600, "SGas", "报警历史", "", function (r) {

            });

        });


    }

    //加载报警趋势图表
    //var loadChart = function () {
    //    doAction("SGasAlarm/SumGasByDay", "GET", {}, function (result) {

    //        var dd1 = [];
    //        var dd2 = [];

    //        var devNum = result.GasDev[0].Value;

    //        for (var idx = 0; idx < result.Days.length; idx++) {
    //            var isHas = false;

    //            for (var t = 0; t < result.GasAlarm.length; t++) {
    //                if (result.GasAlarm[t].BH == result.Days[idx]) {
    //                    isHas=true;
    //                    dd1.push({ name: result.Days[idx], y: result.GasAlarm[t].Value });
    //                    break;
    //                }
    //            }
    //            if (isHas == false) {
    //                dd1.push({ name: result.Days[idx], y: 0 });
    //            }

    //            for (var t = 0; t < result.GasDev.length; t++) {
    //                if (result.GasDev[t].BH == result.Days[idx]) {
    //                    devNum += result.GasDev[t].Value;
    //                    break;
    //                }
    //            }
    //            dd2.push({ name: result.Days[idx], y: devNum });
    //        }


    //        Highcharts.setOptions({
    //            colors: ['#FF0000', '#50B432']
    //        });

    //        //隐患趋势图
    //        $('.chartBody').highcharts({
    //            chart: {
    //                backgroundColor: 'rgba(0,0,0,0)'
    //            },
    //            title: {
    //                text: '隐患趋势图',
    //                style: { color: '#ffffff' }
    //            },
    //            xAxis: {
    //                gridLineColor: "#73c4f1",
    //                labels: { style: { color: '#ffffff' } },
    //                categories: result.Days
    //            },
    //            yAxis: [{
    //                title: {
    //                    text: ''
    //                },
    //                gridLineColor: "#73c4f1",
    //                labels: {
    //                    style: { color: '#ffffff' }
    //                },
    //                min: 0,
    //                allowDecimals: false,
    //                minTickInterval: 1

    //            }],
    //            legend: {
    //                borderWidth: 0,
    //                enabled: true,
    //                itemStyle: { color: '#ffffff', fontWeight: 'bold' }
    //            },
    //            plotOptions: {
    //                line: {
    //                    dataLabels: {
    //                        enabled: true,
    //                        style: {color:"#ffffff" }
    //                    }
    //                }
    //            },
    //            series: [{ name: "燃气报警", yAxis: 0, data: dd1 }, { name: "设备接入", yAxis: 0, data: dd2 }]
    //        });
    //    });
    //}



    //清除痕迹
    this.Clear = function (vg) {

    }
    //点击单位查询结果
    var CompanyClick = function (pobj, data) {
        console.log(data)
        
        pobj.click(function () {
            if (data) {
                var MLng = data.long_latbai.split(',')[1];
                var MLat = data.long_latbai.split(',')[0];
                if (MLat > 54) { // 纬度
                    var MLng = data.long_latbai.split(',')[0]; //经度
                    var MLat = data.long_latbai.split(',')[1]; //纬度
                } else {
                    var MLng = data.long_latbai.split(',')[1];
                    var MLat = data.long_latbai.split(',')[0];
                }
                console.log(MLng)
                var point = new BMap.Point(MLng, MLat);
                mapObj.centerAndZoom(point, 14);
                mapData.OpenDetail(data);
            }
        });
    }
    //加载数据
    this.Open = function () {
        this.Clear();
        loadEvent();
    }


}