function MapTool(box, map,mData) {


    var htmlBox = box;  //地图控件

    var mapObj = map;  //地图对象
   
    var mapData = mData;  //数据对象

    var loadEvent = function () {

        //$(".chartLabel").click(function () {
        //    $(".chartBox").addClass("chartBoxShow");
        //    loadChart();
        //});

        //$(".chartBut").click(function () {
        //    $(".chartBox").removeClass("chartBoxShow");
        //    $('.chartBody').empty();
        //});


        $("#service01").click(function (e) {
            $(".MapBox").MapWhere("接入单位", "GasCompany", "true");
        });

        //$("#service02").click(function (e) {
        //    $(".MapBox").MapWhere("现场服务单位", "LocalService", "true");
        //});
        //$("#service03").click(function (e) {
        //    $(".MapBox").MapWhere("远程服务单位", "RemoteService", "true");
        //});
        //$("#service04").click(function (e) {
        //    $(".MapBox").MapWhere("反馈单位", "CompanyService", "true");
        //});

        //地址查询
        $("#butSuggest").click(function () {

            var tv = $("#suggestId").val();
            if (tv == null || tv == undefined || tv == "") {
                return;
            }

            $(".MapBox").MapWhere(tv, "QueryText", tv);
        });

        $("#dev01").click(function (e) {
            // $(".MapBox").MapWhere("在线设备", "ElecDevice", "LstDevice01Company");
            $(".MapBox").MapWhere("消防水设备", "GasDevice", "LstDevice01Company");
        });

        $("#dev02").click(function (e) {
            $(".MapBox").MapWhere("离线设备", "GasDevice", "LstDevice02Company");
        });
        $("#dev03").click(function (e) {
            $(".MapBox").MapWhere("电气火灾设备", "GasDevice", "LstDevice03Company");
        });

        $("#dev04").click(function (e) {
            $(".MapBox").MapWhere("到期设备", "GasDevice", "LstDeviceTrippingCompany");
        });

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

    //加载数据
    this.Open = function () {
        this.Clear();
       loadEvent();
    }


}