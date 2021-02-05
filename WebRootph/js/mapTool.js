function MapTool(box, map,mData) {


    var htmlBox = box;  //地图控件

    var mapObj = map;  //地图对象
   
    var mapData = mData;  //数据对象

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

                if (v.MC.indexOf(txt) >= 0 || v.AreaMC.indexOf(txt) >= 0 || v.Address.indexOf(txt) >= 0) {
                    var thtml = "<div class=\"resultItem\">";
                    thtml += "<div class=\"resultTitle\">" + v.MC + "</div>";
                    thtml += "<div class=\"resultText\">地址：" + v.Address + "</div>";
                    if (v.FireManagerTel && v.FireManagerTel != "") {
                        thtml += "<div class=\"resultText\">电话：" + v.FireManagerTel + "</div>";
                    }
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
        $("#ElecAlarmSum").find(".numItem").click(function () {
            var tt = $(this).attr("data-sign");


            doAction("json/SElec_DetailElecAlarm.json", "GET", { Status: tt }, function (result) {
                var pResult = $(".queryResult");
                pResult.empty();

                //单位列表
                var lstCompany = mapData.GetResult().Company;

                $.each(result, function (i, v) {

                    var comObj = null;
                    $.each(lstCompany, function (t, c) {
                        if (c.ID == v.BH) {
                            comObj = c;
                            return false;
                        }
                    });

                    var thtml = "<div class=\"resultItem\">";

                    if (comObj) {
                        thtml += "<div class=\"resultTitle\">" +  (i+1) + "、" + comObj.MC + "</div>";
                        thtml += "<div class=\"resultText\">地址：" + comObj.Address + "</div>";
                        if (comObj.FireManagerTel && comObj.FireManagerTel != "") {
                            thtml += "<div class=\"resultText\">电话：" + comObj.FireManagerTel + "</div>";
                        }
                    } else {
                        thtml += "<div class=\"resultText\">公司：" + v.BH + "</div>";
                    }
                    thtml += "<div class=\"resultText\">报警：" + v.Value + "次</div>";
                    thtml += "</div>";

                    var pItem = $(thtml);
                    CompanyClick(pItem, comObj);
                    pItem.appendTo(pResult);
                   
                });

            });
        });


        //设备明细
        $("#ElecDeviceSum").find(".numItem").click(function () {
            var tt = $(this).attr("data-sign");


            doAction("json/SElec_DetailElecAlarm.json", "GET", { Status: tt }, function (result) {
                var pResult = $(".queryResult");
                pResult.empty();

                //单位列表
                var lstCompany = mapData.GetResult().Company;

                $.each(result, function (i, v) {

                    var comObj = null;
                    $.each(lstCompany, function (t, c) {
                        if (c.ID == v.Value) {
                            comObj = c;
                            return false;
                        }
                    });

                    var thtml = "<div class=\"resultItem\">";

                    if (comObj) {
                        thtml += "<div class=\"resultTitle\">" + (i + 1) + "、" + comObj.MC + "</div>";
                        thtml += "<div class=\"resultText\">地址：" + comObj.Address + "</div>";
                        if (comObj.FireManagerTel && comObj.FireManagerTel != "") {
                            thtml += "<div class=\"resultText\">电话：" + comObj.FireManagerTel + "</div>";
                        }
                    }
                 
                    thtml += "<div class=\"resultText\">编号：" + v.BH + "</div>";
                    thtml += "<div class=\"resultText\">位置：" + v.Text + "</div>";
                    thtml += "</div>";

                    var pItem = $(thtml);
                    DeviceClick(pItem, comObj,v);
                    pItem.appendTo(pResult);

                });

            });
        });

    }


    //点击单位查询结果
    var CompanyClick = function (pobj, data) {

        pobj.click(function () {
            if (data){
                var point = new BMap.Point(data.MLng, data.MLat);
                mapObj.centerAndZoom(point, 14);
                mapData.OpenDetail(data);
            }
        });
    }
    //点击单位查询结果
    var DeviceClick = function (pobj, comObj, data) {

        pobj.click(function () {
            if (comObj){
                var point = new BMap.Point(comObj.MLng, comObj.MLat);
                mapObj.centerAndZoom(point, 14);
            }
            window.top.OpenThirdFrame("ElecDetail.html?devBH=" + data.BH, 800, 600, "win", comObj.MC + "(" + data.Text + ")");
        });
    }

    //加载报警趋势图表
    var loadChart = function () {
        doAction("json/SElec_SumElecByTime.json", "GET", {}, function (result) {

            var dd1 = [];

            $.each(result.TodayData, function (i, v) {
                dd1.push([v.BH + "时", v.Value]);
            });

            var dd2 = [];
            $.each(result.YesterdayData, function (i, v) {
                dd2.push([v.BH + "时", v.Value]);
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
                    categories: ['0时', '1时', '2时', '3时', '4时', '5时', '6时', '7时', '8时', '9时', '10时', '11时', '12时', '13时', '14时', '15时', '16时', '17时', '18时', '19时', '20时', '21时', '22时', '23时']
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
                series: [{ name: '今日报警', yAxis: 0, data: dd1 }, { name: '昨日报警', yAxis: 0, data: dd2 }]
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