﻿function MapTool(box, map, mData) {

    var htmlBox = box; //地图控件

    var mapObj = map; //地图对象

    var mapData = mData; //数据对象

    var region = localStorage.getItem('region');
    var loadEvent = function () {

        var type = '2';
        var username = parseInt(localStorage.getItem('userName'));
        setTimeout(function () {
            console.log(mapData.GetResult())
            $(".queryBut").click(function () {

                var pResult = $(".queryResult");
                pResult.empty();

                var txt = $(".queryText").val();
                if (txt == "") {
                    alert("请输入查询条件");
                    return;
                }

                
                //单位列表
                // var lstCompany = result.Company;
                var lstCompany = mapData.GetResult().Company;
                // console.log(lstCompany);
                $.each(lstCompany, function (i, v) {
                    //console.log(v);
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
        }, 10000)
        // doAction(url + "/WebProject/DeviceProject.action", "GET", {
        //     username: username,
        //     type: type,
        //     region: region
        // }, function (result) {
        //     console.log(result)
        //     $(".queryBut").click(function () {

        //         var pResult = $(".queryResult");
        //         pResult.empty();

        //         var txt = $(".queryText").val();
        //         if (txt == "") {
        //             alert("请输入查询条件");
        //             return;
        //         }


        //         //单位列表
        //         var lstCompany = result.Company;
        //         // console.log(lstCompany);
        //         $.each(lstCompany, function (i, v) {
        //             //console.log(v);
        //             if (v.mC.indexOf(txt) >= 0 || v.address.indexOf(txt) >= 0) {
        //                 var thtml = "<div class=\"resultItem\">";
        //                 thtml += "<div class=\"resultTitle\">" + v.mC + "</div>";
        //                 thtml += "<div class=\"resultText\">地址：" + v.address + "</div>";
        //                 thtml += "</div>";

        //                 var pItem = $(thtml);
        //                 CompanyClick(pItem, v);
        //                 pItem.appendTo(pResult);
        //             }
        //         });

        //     });


        // })
    }

    //加载报警数据
    var loadData = function () {

        //json/SSmoke_GetMapData.json
        var type = '2';
        // console.log(type);
        var userName = parseInt(localStorage.getItem('username'));
        var username = userName;
        doAction(url + "/WebProject/DeviceAlarm.action?username=" + userName, "GET", {
            type: type,
            region: region
        }, function (result) {
            // doAction("http://zlh18122711575.55555.io:16799/earlyPlatform/admin/project/GetMapDataFire.action", "GET", {username:username,type:type}, function (result) {
            console.log(result);
            if (result.length != 0) {
                console.log(1);
                var html = "";
                var html = "<div class='numTitle'>今日报警(项目)</div><div class='numContent' id='Alarm00'><div class='numCell'>0</div><div class='numCell'>0</div><div class='numCell'>0</div><div class='numCell'>0</div><div class='numCell'>0</div><div class='numCell'>0</div></div>";
                var arr = [];
                $.each(result, function (i, v) {

                    //  console.log(alarm[i].BH);
                    //如果text值为空。在今日报警就不显示 一定要有text值
                    if (v.text == "") {
                        html = html + "";
                    } else {
                        html = html + "<div class='numItem bg1' data-sign=" + v.pid + ">" + v.typeName + "<div id=" + 'Alarm' + v.pid + " class='valueCell'>共" + v.value + "条未处理</div></div>";
                    }
                    arr.push(v.value)
                    // console.log(v.value);
                })
                // console.log(arr);
                var sum = 0;
                for (let i = 0; i < arr.length; i++) {
                    sum += arr[i];
                }
                $('#ElecDeviceSum').html(html);
                var AlarmAll = 0;
                AlarmAllStr = "000000" + sum;
                AlarmAllStr = AlarmAllStr.substr(AlarmAllStr.length - 6, 6);

                $("#Alarm00").find(".numCell").each(function (i, v) {
                    $(v).html(AlarmAllStr.substr(i, 1));
                });

                $(".alarmBox").empty(); //当前报警
            }

              //今日报警 
              $("#ElecDeviceSum").on('click', '.numItem', function () {
                //$("#ElecAlarmSum").find(".numItem").click(function () {
                var that = $(this);
                //  console.log(tt);
                $.ajax({
                    tyle: 'get',
                    url: url + '/WebProject/DeviceAlarm.action',
                    data: 'username=' + username + '&type=2',
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
            

        });
    }
    loadData()
    //加载报警数量
    var loadNum = function () {
        var type = "2";
        var userName = parseInt(localStorage.getItem('username'));
        doAction(url + "/WebProject/DeviceNum.action?username=" + userName, "GET", {
            type: type,
            region: region
        }, function (result) {
            //    console.log(result);
            if (result.length != 0) {
                var DevAll = 0;
                $("#Dev01").html(result.alarm);
                $("#Dev02").html(result.online);
                $("#Dev03").html(result.offline);
                var DevAllStr = parseInt(result.deviceNum)
                //  console.log(DevAllStr)
                DevAllStr = "000000" + DevAllStr;
                DevAllStr = DevAllStr.substr(DevAllStr.length - 6, 6);

                $("#ElecDeviceAll").find(".numCell").each(function (i, v) {
                    $(v).html(DevAllStr.substr(i, 1));
                });

                //报警明细
                $("#ElecDeviceAll").find(".numItem").click(function () {
                    var tt = $(this).attr("data-sign");
                    // console.log(tt);

                    if (tt == "01") { //报警
                        var BH = result.alarmPid;
                    } else if (tt == "02") { //在线
                        var BH = result.onlinePid;
                    } else if (tt == "03") { //离线
                        var BH = result.offlinePid;
                    }
                    // console.log(BH)
                    var BH = BH.join(',')
                    // console.log(BH)
                    //json/SWater_DetailWaterAlarm.json
                    doAction(url + "/admin/project/SElec_DetailElecDevice.action", "post", {
                        Status: tt,
                        pid: BH
                    }, function (res) {
                        //alert(111);
                        console.log(res);
                        var pResult = $(".queryResult");
                        pResult.empty();

                        //单位列表
                        var lstCompany = mapData.GetResult().Company;
                        // console.log(lstCompany);

                        $.each(res, function (i, v) {

                            var comObj = null;
                            $.each(lstCompany, function (t, c) {
                                if (c.iD == v.BH) {
                                    comObj = c;
                                    return false;
                                }
                            });
                            var thtml = "<div class=\"resultItem\">";

                            if (comObj) {
                                thtml += "<div class=\"resultTitle\">" + (i + 1) + "、" + comObj.mC + "</div>";
                                thtml += "<div class=\"resultText\">地址：" + comObj.address + "</div>";
                            } else {
                                thtml += "<div class=\"resultText\">公司：" + v.BH + "</div>";
                            }
                            thtml += "<div class=\"resultText\">报警：" + v.value + "次</div>";
                            thtml += "</div>";

                            var pItem = $(thtml);
                            CompanyClick(pItem, comObj);
                            pItem.appendTo(pResult);

                        });

                    });
                });

                
            }

        })
    }

    //点击单位查询结果
    var CompanyClick = function (pobj, data) {
        // console.log(data)

        pobj.click(function () {
            if (data) {
                var MLng = data.long_latbai.split(',')[1];
                var MLat = data.long_latbai.split(',')[0];
                if (MLat > 54) { // 纬度 
                    var MLng = data.long_latbai.split(',')[0]; //经度
                    var MLat = data.long_latbai.split(',')[1]; //纬度
                    console.log(0)
                } else {
                    var MLng = data.long_latbai.split(',')[1];
                    var MLat = data.long_latbai.split(',')[0];
                }
                var point = new BMap.Point(MLng, MLat);
                mapObj.centerAndZoom(point, 14);
                mapData.OpenDetail(data);
            }
        });
    }
    //点击单位查询结果
    var DeviceClick = function (pobj, comObj, data) {

        pobj.click(function () {
            if (comObj) {
                var point = new BMap.Point(comObj.MLng, comObj.MLat);
                mapObj.centerAndZoom(point, 14);
            }
            // window.top.OpenSelFrame("./ExtApp_Water_IndexLand.html?DevBH=" + data.BH, 800, 600, "win", "报警数据",null,null,true);
        });
    }


    //清除痕迹
    this.Clear = function (vg) {

    }

    //加载数据
    this.Open = function () {
        this.Clear();
        loadData();
        loadNum();
        loadEvent();
    }


}