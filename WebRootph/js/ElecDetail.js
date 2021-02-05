﻿function ElecDetail(items, devBH) {

    var gDevBH = devBH;
    // console.log(gDevBH);
    // console.log(items);
    var gChartU = null;
    var gChartI = null;
    var gChartU = null;
    var gChartN = null;
    var gChartZ = null;

    var itemMap = {};
    itemMap["AU"] = { field: "ua", code: "U", isToday: true, showData: "dUA", color: "#f79407", maxLabel: "dUMax", minLabel: "dUMin" };
    // console.log(itemMap);
    itemMap["BU"] = { field: "ub", code: "U", isToday: true, showData: "dUB", color: "#50B432" };
    itemMap["CU"] = { field: "uc", code: "U", isToday: true, showData: "dUC", color: "#f45b5b" };


    itemMap["AI"] = { field: "ia", code: "I", isToday: true, showData: "dIA", color: "#f79407", maxLabel: "dIMax" };
    itemMap["BI"] = { field: "ib", code: "I", isToday: true, showData: "dIB", color: "#50B432" };
    itemMap["CI"] = { field: "ic", code: "I", isToday: true, showData: "dIC", color: "#f45b5b" };


    itemMap["LD"] = { field: "ld", code: "I", isToday: true, showData: "dIL", color: "#7cb5ec", maxLabel: "dILMax", yAxis: 1 };

    itemMap["LD2"] = { field: "LD2", code: "I", isToday: true, showData: "dIL2", color: "#f79407", yAxis: 1 };
    itemMap["LD3"] = { field: "LD3", code: "I", isToday: true, showData: "dIL3", color: "#50B432", yAxis: 1 };
    itemMap["LD4"] = { field: "LD4", code: "I", isToday: true, showData: "dIL4", color: "#f45b5b", yAxis: 1 };

    itemMap["LD5"] = { field: "LD5", code: "I", isToday: true, showData: "dIL5", color: "#8085E9", yAxis: 1 };
    itemMap["LD6"] = { field: "LD6", code: "I", isToday: true, showData: "dIL6", color: "#434348", yAxis: 1 };
    itemMap["LD7"] = { field: "LD7", code: "I", isToday: true, showData: "dIL7", color: "#90EE90", yAxis: 1 };
    itemMap["LD8"] = { field: "LD8", code: "I", isToday: true, showData: "dIL8", color: "#9A32CD", yAxis: 1 };


    itemMap["AT"] = { field: "ta", code: "T", isToday: true, showData: "dTA", color: "#f79407", maxLabel: "dTMax" };
    itemMap["BT"] = { field: "tb", code: "T", isToday: true, showData: "dTB", color: "#50B432" };
    itemMap["CT"] = { field: "tc", code: "T", isToday: true, showData: "dTC", color: "#f45b5b" };
    itemMap["NT"] = { field: "tn", code: "T", isToday: true, showData: "dTN", color: "#7cb5ec" };

    itemMap["T5"] = { field: "T5", code: "T", isToday: true, showData: "dT5", color: "#8085E9", maxLabel: "dTMax" };
    itemMap["T6"] = { field: "T6", code: "T", isToday: true, showData: "dT6", color: "#434348" };
    itemMap["T7"] = { field: "T7", code: "T", isToday: true, showData: "dT7", color: "#90EE90" };
    itemMap["T8"] = { field: "T8", code: "T", isToday: true, showData: "dT8", color: "#9A32CD" };




    itemMap["YG"] = { field: "yg", code: "N", isToday: true, showData: "dDN1", color: "#f45b5b" };
    itemMap["YG2"] = { field: "yg", code: "N", isToday: false, showData: "dDN2", color: "#50B432" };

    itemMap["GZDH"] = { field: "gzdh", code: "Z", isToday: true, showData: "dGZDH", color: "#f45b5b" };

    var labelClick = function (tLabel, tCode, tItemCode) {
        console.log(tLabel);
        console.log(tCode);
        console.log(tItemCode);
        $("#" + tLabel).parent().unbind().click(function () {
            var chart = null;
            if (tCode == "U") {
                chart = gChartU;
            } else if (tCode == "I") {
                chart = gChartI;
            } else if (tCode == "T") {
                chart = gChartT;
            } else if (tCode == "N") {
                chart = gChartN;
            } else if (tCode == "Z") {
                chart = gChartZ;
            }
            var tItem = $(this);

            $.each(chart.series, function (i, v) {
                if (v.userOptions.itemCode == tItemCode) {
                    if (v.visible) {
                        tItem.addClass("UnDataItem");
                        v.hide();
                    } else {
                        tItem.removeClass("UnDataItem");
                        v.show();
                    }
                    return false;
                }
            });
        });
    }

    var formatStr = function (v) {
        if (v == null) {
            return "";
        }
        return v;
    }

    var formatGZDH = function (v) {

        var t = parseInt(v);
        if (t == 0) {
            return "无负载";
        } else if (t == 1) {
            return "负载正常工作";
        } else if (t == 2) {
            return " 电弧提示";
        } else if (t == 3) {
            return " 电弧预警";
        } else if (t == 4) {
            return " 电弧报警";
        }
    }
    var formatDate = function (dd, format) {
        var o = {
            "M+": dd.getMonth() + 1, //month
            "d+": dd.getDate(), //day
            "h+": dd.getHours(), //hour
            "m+": dd.getMinutes(), //minute
            "s+": dd.getSeconds(), //second
            "q+": Math.floor((dd.getMonth() + 3) / 3), //quarter
            "S": dd.getMilliseconds() //millisecond
        }
        if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
            (dd.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o) if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1,
                RegExp.$1.length == 1 ? o[k] :
                    ("00" + o[k]).substr(("" + o[k]).length));
        return format;
    }
    $.each(items, function (i, v) {
        if (itemMap[v.ItemCode] == null) {
            return true;
        }

        var ty = 0;
        if (itemMap[v.ItemCode].yAxis != null) {
            ty = itemMap[v.ItemCode].yAxis;
        }

        if (v.ItemCode == 'YG') {
            itemMap[v.ItemCode].item = v;
            itemMap[v.ItemCode + "2"].item = v;

            itemMap[v.ItemCode].line = { itemCode: v.ItemCode, color: itemMap[v.ItemCode].color, name: "当日电能", yAxis: ty, data: [], tooltip: { valueSuffix: v.ItemUnit } };
            labelClick("dDN1", "N", "YG");

            itemMap[v.ItemCode + "2"].line = { itemCode: v.ItemCode + "2", color: itemMap[v.ItemCode + "2"].color, name: "昨日电能", yAxis: ty, data: [], tooltip: { valueSuffix: v.ItemUnit } };
            labelClick("dDN2", "N", "YG2");
        } else {
            itemMap[v.ItemCode].item = v;
            itemMap[v.ItemCode].line = { itemCode: v.ItemCode, color: itemMap[v.ItemCode].color, name: v.ItemName, yAxis: ty, data: [], tooltip: { valueSuffix: v.ItemUnit } };

        }
        if (itemMap[v.ItemCode].maxLabel != null && v.MaxV != null) {
            $("#" + itemMap[v.ItemCode].maxLabel).html(v.MaxV + formatStr(v.ItemUnit));
        }
        if (itemMap[v.ItemCode].minLabel != null && v.MinV != null) {
            $("#" + itemMap[v.ItemCode].minLabel).html(v.MinV + formatStr(v.ItemUnit));
        }
    });

    // 日期
    this.queryDate = function (qdate, isExcel) {
        $.getJSON("http://112.74.126.51/earlyWarn/earlyWarn/admin/device/ElecData.action?devBH=" + gDevBH + "&lstDate=" + qdate + "&IsExcel=" + isExcel,
            // $.getJSON("http://zlh18122711575.55555.io:16799/earlyWarn/admin/device/ElecData.action?devBH=" + gDevBH + "&lstDate=" + qdate + "&IsExcel=" + isExcel,
            function (data) {
                console.log(data);
                if (data == null) {
                    return;
                }

                if (data.ExcelFile) {
                    document.location = data.ExcelFile;
                    return;
                }

                //清除数据
                //  console.log(itemMap);
                $.each(itemMap, function (i, v) {
                    if (v.line != null) {
                        v.line.data = [];
                    }
                    if (v.Data) {
                        v.Data = [];
                    }
                });

                loopData(data, itemMap, qdate);
                var yg1 = loopYG(itemMap["YG"]);
                var yg2 = loopYG(itemMap["YG2"]);

                if (yg1 > 0 && yg2 > 0) {
                    $("#dDNHB").html(((yg1 - yg2) * 100 / yg2).toFixed(1) + "%");
                    $("#dDNHB").parent().show();
                }


                var itemU = [];
                var itemI = [];
                var itemT = [];
                var itemN = [];
                var itemZ = [];





                $.each(itemMap, function (i, v) {
                    if (v.line == null) {
                        return true;
                    }

                    if (v.code == "U") {
                        itemU.push(v.line);
                    } else if (v.code == "I") {
                        itemI.push(v.line);
                    } else if (v.code == "T") {
                        itemT.push(v.line);
                    } else if (v.code == "N") {
                        itemN.push(v.line);
                    } else if (v.code == "Z") {
                        itemZ.push(v.line);
                    }
                });

                if (itemU.length > 0) {
                    $("#inforU").show();
                    gChartU = LoadLines({
                        ChartDIV: "divChartU", yline: [{
                            title: {
                                text: '电压',
                                style: { color: '#89A54E' }
                            },
                            labels: {
                                format: '{value}V',
                                style: { color: '#89A54E' }
                            }
                        }]
                    }, itemU);
                }
                if (itemI.length > 0) {
                    $("#inforI").show();
                    gChartI = LoadLines({
                        ChartDIV: "divChart", yline: [{
                            title: {
                                text: '电流',
                                style: {
                                    color: '#89A54E'
                                }
                            },
                            labels: {
                                format: '{value}A',
                                style: {
                                    color: '#89A54E'
                                }
                            },
                        }, {
                            title: {
                                text: '剩余电流',
                                style: {
                                    color: '#4572A7'
                                }
                            },
                            labels: {
                                format: '{value}mA',
                                style: {
                                    color: '#4572A7'
                                }
                            },
                            opposite: true
                        }]
                    }, itemI);
                }
                if (itemT.length > 0) {
                    $("#inforT").show();
                    gChartT = LoadLines({
                        ChartDIV: "divChart2", yline: [{ // Primary yAxis
                            title: {
                                text: '温度',
                                style: {
                                    color: '#89A54E'
                                }
                            },
                            labels: {
                                format: '{value}℃',
                                style: {
                                    color: '#89A54E'
                                }
                            }
                        }]
                    }, itemT);
                }
                if (itemN.length > 0) {
                    $("#inforN").show();
                    gChartN = LoadYGLines({
                        ChartDIV: "divChartDN", yline: [{ // Primary yAxis
                            title: {
                                text: '电能',
                                style: {
                                    color: '#89A54E'
                                }
                            },
                            labels: {
                                format: '{value}kW·h',
                                style: {
                                    color: '#89A54E'
                                }
                            }
                        }]
                    }, itemN);
                }
                if (itemZ.length > 0) {
                    $("#inforZ").show();
                    gChartZ = LoadLines({
                        ChartDIV: "divChartGZDH", yline: [{ // Primary yAxis
                            title: {
                                text: '故障电弧',
                                style: {
                                    color: '#89A54E'
                                }
                            },
                            labels: {
                                style: {
                                    color: '#89A54E'
                                }
                            }
                        }],
                        tooltipFormat: function () {
                            return formatDate(new Date(this.x), "MM/dd hh:mm") + formatGZDH(this.y);
                        }
                    }, itemZ);
                }
            });

    }


    var loopData = function (oraData, itemMap, queryDate) {
        var data = oraData.Data;
        var dataUtil = oraData.Util;
        for (var idx = 0; idx < data.length; idx++) {
            var glstDate = data[idx].HappenedTime;
            var tx = Date.parse(glstDate.replace(/-/g, "/"));
            var currDay = glstDate.substr(0, 10);

            $.each(itemMap, function (i, v) {
                if (v.line == null) {
                    return true;
                }

                var tdd = data[idx];
                var tvalue = tdd[v.field];
                if (tvalue == null) {
                    if (dataUtil != null && dataUtil.length > 0) {
                        $.each(dataUtil, function (ui, uv) {
                            if (uv.DataID != tdd.ID) {
                                return true;
                            }
                            if (uv.ItemCode == v.field) {
                                tvalue = uv.ItemValue;
                                return false;
                            }
                        });
                    }
                }
                if (idx == data.length - 1) {
                    if ($("#" + v.showData).length <= 0) {
                        var tt = " <div style=\"display:inline-block\"> <div class=\"inforLine DataItem\"><div class=\"inforLabel\">" + v.item.ItemName + ":</div><div class=\"inforValue\" id=\"" + v.showData + "\"></div></div></div>";
                        $("#infor" + v.code).find(".InforCurrBox").append(tt);
                    }
                    $("#" + v.showData).parent().show();
                    labelClick(v.showData, v.code, v.item.ItemCode);
                }

                var tt = formatData(tvalue);
                if (tt == null) {
                    if (idx == data.length - 1) {
                        $("#" + v.showData).addClass("redBg");
                        $("#" + v.showData).html("故障");
                    }
                    return true;
                }
                if (v.Data == null) {
                    v.Data = [];
                }

                if (i == "YG") {
                    if (currDay == queryDate) {
                        v.Data.push({ "Date": glstDate, "Value": tt });
                    }

                } else if (i == "YG2") {
                    if (currDay != queryDate) {
                        v.Data.push({ "Date": glstDate, "Value": tt });
                    }
                } else {
                    if (currDay == queryDate) {
                        v.line.data.push([tx, tt]);
                        if (idx == data.length - 1) {
                            var tmax = -1000;
                            if (v.item.MaxV) {
                                tmax = parseFloat(v.item.MaxV);
                            }
                            var tmin = -1000;
                            if (v.item.MinV) {
                                tmin = parseFloat(v.item.MinV);
                            }
                            if (tmax > -1000 && tt >= tmax) {
                                $("#" + v.showData).addClass("redBg");
                            } else if (tmin > -1000 && tt <= tmin) {
                                $("#" + v.showData).addClass("redBg");
                            }
                            if (v.code == "Z") {
                                $("#" + v.showData).html(formatGZDH(tt));
                            } else {
                                $("#" + v.showData).html(tt + v.item.ItemUnit);
                            }
                        }
                    }
                }
            });
        }



    }

    var loopYG = function (item) {

        if (item.line == null) {
            return -1;
        }

        var sAll = -1;
        var eAll = -1;

        var lstHour = -1;
        var sValue = 0;
        var eValue = 0;
        if (item.Data)
            $.each(item.Data, function (i, v) {

                if (sAll == -1) {
                    sAll = v.Value;
                }
                eAll = v.Value;

                var tdate = v.Date;
                var tHour = parseInt(tdate.substr(11, 2));
                if (lstHour != tHour) {
                    if (lstHour >= 0) {
                        item.line.data.push([lstHour, Subtr(eValue, sValue)]);
                    }
                    lstHour = tHour;
                    sValue = v.Value;
                }
                eValue = v.Value;
            });

        if (lstHour > 0) {
            item.line.data.push([lstHour, Subtr(eValue, sValue)]);
        }
        var rtn = Subtr(eAll, sAll);

        $("#" + item.showData).html(rtn + "kW-h");
        $("#" + item.showData).parent().show();
        return rtn;
    }

    var LoadLines = function (elecOption, items) {

        var ys = elecOption.yline;

        //实时曲线
        return new Highcharts.Chart({
            chart: {
                renderTo: elecOption.ChartDIV,
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                backgroundColor: 'rgba(0,0,0,0)'
            },
            title: {
                text: ''
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 100,
                dateTimeLabelFormats: {
                    second: '%H:%M:%S',
                    minute: '%H:%M',
                    hour: '%H:%M',
                    day: '%m月%e日',
                    month: ' %y年%m月',
                    year: '%Y年'
                }
            },
            yAxis: ys,
            legend: {
                enabled: false
            },
            tooltip: {
                formatter: elecOption.tooltipFormat,
                xDateFormat: '%m/%d %H:%M',
                shared: true
            },
            series: items
        });

    }

    var LoadYGLines = function (elecOption, items) {

        var ys = elecOption.yline;

        //实时曲线
        return new Highcharts.Chart({
            chart: {
                renderTo: elecOption.ChartDIV,
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                backgroundColor: 'rgba(0,0,0,0)'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
            },
            yAxis: ys,
            legend: {
                enabled: false
            },
            tooltip: {
                // xDateFormat: '%m/%d %H:%M',
                shared: true
            },
            series: items
        });

    }
    var formatData = function (v) {
        if (v == null) {
            return null;
        }
        if (v == "") {
            return null;
        }
        if (v == undefined) {
            return null;
        }
        return Number(v);
    }
    function Subtr(arg1, arg2) {
        var r1, r2, m, n;
        try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
        try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
        m = Math.pow(10, Math.max(r1, r2));
        n = (r1 >= r2) ? r1 : r2;
        var rtn = ((arg1 * m - arg2 * m) / m).toFixed(n);
        return Number(rtn);
    }
}