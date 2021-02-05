﻿function MapData(box, map) {


    var htmlBox = box; //地图控件

    var mapObj = map; //地图对象
    var panoramaService = new BMap.PanoramaService(); //3D场景服务

    var panorama = null; //mapObj.getPanorama();


    //单位数据集
    var gDataset = null;

    //大数据图层
    var gMapLayer = null;

    //末次请求数据
    var gLastResult = null;


    //大数据点样式
    var gOptions = {
        fillStyle: 'rgba(0, 255, 50, 1)',
        shadowColor: 'rgba(255, 255, 0, 1)',
        shadowBlur: 30,
        globalCompositeOperation: 'lighter',
        methods: {
            click: function (item) {
                openCom(item.data.iD, item.data.mC);
            }
        },
        size: 10,
        draw: 'simple'
    };

    var type = '4,8';
    var userName = parseInt(localStorage.getItem('userName'));
    var region = localStorage.getItem('region')
    //加载单位信息
    var loadData = function () {
        doAction(url + "/WebProject/DeviceProject.action?username=" + userName, "GET", {
            type: type,
            region: region
        }, function (result) {
            //  doAction("http://zlh18122711575.55555.io:16799/earlyPlatform/admin/project/FindArea.action?username="+userName, "GET", {type:type}, function (result) {

            gLastResult = result;
            console.log(gLastResult);

            mapObj.clearOverlays();

            var comids = result.AlarmCom + "";

            //添加大数据单位点
            var data = [];
            if (result.length != 0) {
                for (var i = 0; i < result.Company.length; i++) {
                    var pp = result.Company[i];
                    // console.log(pp);
                    var lng = pp.long_latbai.split(',')[1];
                    var lat = pp.long_latbai.split(',')[0];
                    // 大数据处理
                    if (lat > 54) { // 纬度
                        var lng = pp.long_latbai.split(',')[0]; //经度
                        var lat = pp.long_latbai.split(',')[1]; //纬度
                    } else {
                        var lng = pp.long_latbai.split(',')[1];
                        var lat = pp.long_latbai.split(',')[0];
                    }
                    data.push({
                        geometry: {
                            type: 'Point',
                            coordinates: [lng, lat]
                        },
                        data: pp
                    });




                    // 报警处理
                    if (comids != "") {
                        if (comids.indexOf(',' + pp.iD + ',') >= 0) { //添加报警点
                            var point = new BMap.Point(pp.lng, pp.lat);
                            var tm = new MyFocus(point, pp.mC);
                            tm.Data = pp;
                            mapObj.addOverlay(tm);
                        }
                    }
                }
                var opts = {
                    width: 220, // 信息窗口宽度
                    height: 80, // 信息窗口高度
                    //title : "<p style='background: url(../images/kjbg.png);border: solid 1px #fff;box-shadow: inset 0px 0px 30px #fff;border-radius: 7px;padding:0px 0 0 12px;color:#fff;margin:0px;width:217px;height:25   px;'>信息窗口</p>" , // 信息窗口标题

                    enableMessage: true //设置允许信息窗发送短息
                };

                for (var i = 0; i < data.length; i++) {
                    // console.log(data[i].data);
                    var pt = new BMap.Point(data[i].geometry.coordinates[0], data[i].geometry.coordinates[1]);

                    var myIcon = new BMap.Icon("../images/beijing.png", new BMap.Size(10, 10));
                    var marker = new BMap.Marker(pt, {
                        icon: myIcon
                    }); // 创建标注
                    // console.log(marker);
                    //
                    var content = new BMap.Label("<div style='white-space:normal;color: #fff;background: url(../images/kjbg.png);box-shadow: inset 0px 0px 30px #fff;border-radius: 7px;padding:5px 0 0 12px; width:250px;height:90px;z-index:600'><p style='margin:0;'>项目名称:" + data[i].data.mC + "</p><p style='margin:0;'>项目地址" + data[i].data.address + "</p></div>");
                    // console.log(content);
                    map.addOverlay(marker);
                    addClickHandler(content, marker);

                }

                function addClickHandler(content, marker) {
                    //console.log(marker);
                    marker.addEventListener('mouseover', function () {
                        content.setStyle({
                            "border": "0",
                            "padding": "0",
                            "backgroundColor": "0",
                            "zIndex": "600",
                            "textAlign": "center",
                            "display": "block",
                            "width": "250px",
                            "height": "84px"
                        });
                        map.openInfoWindow(content);
                        marker.setLabel(content); //为标注添加一个标签
                    })
                    marker.addEventListener('mouseout', function () {
                        map.removeOverlay(content);
                        // map.closeInfoWindow(content);
                    })
                }

                if (gDataset) {
                    gDataset.set(data); //修改数据
                } else {
                    gDataset = new mapv.DataSet(data);
                }
                gMapLayer = new mapv.baiduMapLayer(mapObj, gDataset, gOptions);
            }

        });
    }

    var loadAalarm = function () {
        //http://p240647i77.qicp.vip/newEarlyWarn/WebProject/DeviceNum.action?username=13808567844&type=3&region=
        doAction(url + "/WebProject/DeviceAlarm.action?username=" + userName, "GET", {
            type: type,
            region: region
        }, function (result) {
            console.log(result);
            if (result.length == 0) {
                var html = "";
                var html = "<div class='numTitle'>今日报警(项目)</div><div class='numContent' id='Alarm00'><div class='numCell'>0</div><div class='numCell'>0</div><div class='numCell'>0</div><div class='numCell'>0</div><div class='numCell'>0</div><div class='numCell'>0</div></div>";
                $('#WaterAlarmSum').html(html);
                console.log('没有数据')
            } else {
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
                })
                // console.log(arr);
                var sum = 0;
                for (let i = 0; i < arr.length; i++) {
                    sum += arr[i];
                }
                $('#WaterAlarmSum').html(html);
                var AlarmAll = 0;
                AlarmAllStr = "000000" + sum;
                AlarmAllStr = AlarmAllStr.substr(AlarmAllStr.length - 6, 6);

                $("#WaterAlarmSum").find(".numCell").each(function (i, v) {
                    $(v).html(AlarmAllStr.substr(i, 1));
                });
            }

        })
    }

    var loadNum = function () {
        var type = "4,8";
        doAction(url + "/WebProject/DeviceNum.action?username=" + userName, "GET", {
            type: type,
            region: region
        }, function (result) {
            console.log(result);
            if (result.length != 0) {
                var DevAll = 0;
                $("#Dev01").html(result.alarm);
                $("#Dev02").html(result.online);
                $("#Dev03").html(result.offline);
                var DevAllStr = parseInt(result.deviceNum)
                // console.log(DevAllStr)
                DevAllStr = "000000" + DevAllStr;
                DevAllStr = DevAllStr.substr(DevAllStr.length - 6, 6);

                $("#Dev00").find(".numCell").each(function (i, v) {
                    $(v).html(DevAllStr.substr(i, 1));
                });
            }

        })
    }
    //打开单位用水情况
    var openCom = function (comid, comName) {
        //window.top.OpenFrame("/ExtApp/SElectric?ComID=" + comid, 870, 600, "SElect", comName, "", function (r) {

        //});   
        var width=$(window).width()
        var height=$(window).height()
        console.log(width)
        console.log(height)
        sessionStorage.setItem('ComID', comid);
        window.top.OpenFrame("./SWater_WaterComDetail.html?ComID=" + comid + "&ComName=" + escape(comName), 930, 600, "SWater", comName, "", function (r) {

        });
    }

    this.OpenDetail = function (comObj) {
        openCom(comObj.iD, comObj.mC);
    }

    this.GetResult = function () {

        return gLastResult;
    }

    //清除痕迹
    this.Clear = function (vg) {

    }

    //加载数据
    this.Open = function () {
        this.Clear();
        loadData();
        loadAalarm()
        loadNum()
    }


}