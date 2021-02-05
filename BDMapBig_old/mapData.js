function MapData(box, map) {


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

    //获取音频对象
    var audio = $("#auto")[0];
    audio.addEventListener("ended", function () {
        if (playNum > 0) {
            playNum--;
            audio.play();
        }
    }, false)


    //播放报警
    var playAlarm = function () {
        playNum = 2;
        audio.play();
    }



    //大数据点样式
    var gOptions = {
        fillStyle: 'rgba(0, 255, 50, 1)',
        shadowColor: 'rgba(255, 255, 0, 1)',
        shadowBlur: 30,
        globalCompositeOperation: 'lighter',
        methods: {
            click: function (item) {
                //console.log(item);
                openCom(item.data.ID, item.data.MC, item.data.typeMC);
            }
        },
        size: 10,
        draw: 'simple',
        zIndex: '0'
    };



    //加载单位信息
    var loadData = function () {
        //json/SElec_GetMapData.json
        var userName = parseInt(localStorage.getItem('userName'));
        var type = parseInt(localStorage.getItem('tpage'));
        // console.log(type+'---'+userName);
        doAction(url + "/admin/project/FindArea.action?username=" + userName, "GET", {
            type: type
        }, function (result) {
            // doAction("http://zlh18122711575.55555.io:16799/earlyPlatform/admin/project/FindArea.action?username="+userName, "GET", {type:type}, function (result) {    
            gLastResult = result;
            console.log(result);
            var alarm = result.LstAlarm;
            var html = "";
            var html = "<div class='numTitle'>今日报警(项目)</div><div class='numContent' id='Alarm00'><div class='numCell'>0</div><div class='numCell'>0</div><div class='numCell'>0</div><div class='numCell'>0</div><div class='numCell'>0</div><div class='numCell'>0</div></div>";
            // console.log(alarm);
            $.each(alarm, function (i, v) {

                //  console.log(alarm[i].BH);
                // 如果text值为空。在今日报警就不显示 一定要有text值
                if (v.text == "") {
                    html = html + "";
                } else {
                    html = html + "<div class='numItem bg1' data-sign=" + v.MC + ">" + v.text + "<div id=" + 'Alarm' + v.MC + " class='valueCell'></div></div>";
                }

                //console.log(i);


            })

            $('#ElecAlarmSum').html(html);

            mapObj.clearOverlays();

            var yourString = "," + result.AlarmCom + ",";
            console.log(yourString)
            var yourStringH = "";
            var res = yourString.split(',');
            for (var i = 0; i < res.length; i++) {
                yourStringH = yourStringH + 'z' + res[i] + ',';
            }
            var comids = yourString + "," + yourStringH;
            //console.log(comids);
            // console.log(result.AlarmCom);
            if (result.AlarmCom != "") {
                playAlarm();
            }
            //添加大数据单位点
            console.log(result.Company)
            var data = [];
            for (var i = 0; i < result.Company.length; i++) {
                var pp = result.Company[i];
                var lng = pp.long_latbai.split(',')[1];
                var lat = pp.long_latbai.split(',')[0];
                // 大数据处理
                data.push({
                    geometry: {
                        type: 'Point',
                        coordinates: [lng, lat]
                    },
                    data: pp
                });
                //console.log(pp)
                //报警处理
                // console.log(comids)
                if (comids != "") {
                    // console.log(comids);
                     //console.log(pp.ID);  // ,522,55,
                    if (comids.indexOf(',' + pp.ID + ',') >= 0) { //添加报警点
                        var point = new BMap.Point(lng, lat);
                        var tm = new MyFocus(point, pp.ComName);
                      //  console.log(tm)
                        tm.Data = pp;
                        mapObj.addOverlay(tm);
                    } else {
                        //  console.log('no');
                    }
                }
            }
            //  console.log(data.length);
            // console.log(data);

            var opts = {
                width: 250, // 信息窗口宽度
                height: 80, // 信息窗口高度
                //title : "<p style='background: url(../images/kjbg.png);border: solid 1px #fff;box-shadow: inset 0px 0px 30px #fff;border-radius: 7px;padding:0px 0 0 12px;color:#fff;margin:0px;width:217px;height:25   px;'>信息窗口</p>" , // 信息窗口标题

                enableMessage: true //设置允许信息窗发送短息
            };
            var arr = [];
            for (var i = 0; i < data.length; i++) {
                // console.log(data[i].data);
                var pt = new BMap.Point(data[i].geometry.coordinates[0], data[i].geometry.coordinates[1]);
                arr.push(pt);

                //    console.log(pt);

                var myIcon = new BMap.Icon("../images/beijing.png", new BMap.Size(10, 10));
                var marker = new BMap.Marker(pt, {
                    icon: myIcon
                }); // 创建标注
                // console.log(marker);
                var content = new BMap.Label("<div style='white-space:normal;color: #FFF;background: url(../images/kjbg.png);box-shadow: inset 0px 0px 30px #fff;border-radius: 7px;padding:5px 0 0 12px; width:250px;height:90px;z-index:600'><p style='margin:0;'>项目名称:" + data[i].data.MC + "</p><p style='margin:0;'>项目地址" + data[i].data.address + "</p></div>");
                // console.log(content);
                map.addOverlay(marker);
                addClickHandler(content, marker);

            }
            // console.log(arr);

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
                        "height": "84px",
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
                // console.log(gDataset);
            }
            gMapLayer = new mapv.baiduMapLayer(mapObj, gDataset, gOptions);

            var DevAll = 0;
            //接入设备数    //接入电气设备  一定要有编号MC 对应
            for (var idx = 0; idx < result.LstDevice.length; idx++) {
                var dd = result.LstDevice[idx];
                // console.log(dd);
                if (dd.MC == "01") {
                    DevAll += parseInt(dd.value);
                    $("#Dev01").html(dd.value);
                } else if (dd.MC == "02") {
                    DevAll += parseInt(dd.value);
                    $("#Dev02").html(dd.value);
                } else if (dd.MC == "03") {
                    DevAll += parseInt(dd.value);
                    $("#Dev03").html(dd.value);
                }
            }

            var DevAllStr = DevAll + "";
            DevAllStr = "000000" + DevAllStr;
            DevAllStr = DevAllStr.substr(DevAllStr.length - 6, 6);

            $("#Dev00").find(".numCell").each(function (i, v) {
                $(v).html(DevAllStr.substr(i, 1));
            });



            var AlarmAll = 0;
            //接入设备数    接入报警设备处理数
            var tt1 = result.LstAlarm[0].value;
            var tt2 = result.LstAlarm[1].value;
            AlarmAll += tt1;
            $("#Alarm01").html("共" + tt1 + "/" + tt2 + "未处理");


            tt1 = result.LstAlarm[2].value;
            tt2 = result.LstAlarm[3].value;
            AlarmAll += tt1;
            $("#Alarm02").html("共" + tt1 + "/" + tt2 + "未处理");


            tt1 = result.LstAlarm[4].value;
            tt2 = result.LstAlarm[5].value;
            AlarmAll += tt1;
            $("#Alarm03").html("共" + tt1 + "/" + tt2 + "未处理");


            tt1 = result.LstAlarm[6].value;
            tt2 = result.LstAlarm[7].value;
            AlarmAll += tt1;
            $("#Alarm04").html("共" + tt1 + "/" + tt2 + "未处理");

            tt1 = result.LstAlarm[8].value;
            tt2 = result.LstAlarm[9].value;
            AlarmAll += tt1;
            $("#Alarm05").html("共" + tt1 + "/" + tt2 + "未处理");



            var AlarmAllStr = AlarmAll + "";
            AlarmAllStr = "000000" + AlarmAllStr;
            AlarmAllStr = AlarmAllStr.substr(AlarmAllStr.length - 6, 6);

            $("#Alarm00").find(".numCell").each(function (i, v) {
                $(v).html(AlarmAllStr.substr(i, 1));
            });

            //setTimeout(loadData, 60000);
        });
    }

    // 打开单位用电情况
    var openCom = function (comid, comName, comdSid) {
        //window.top.OpenFrame("/ExtApp/SElectric?ComID=" + comid, 870, 600, "SElect", comName, "", function (r) {

        //});
        //console.log(comdSid)
        sessionStorage.setItem('ComID', comid);
        sessionStorage.setItem('comName', comName);
        sessionStorage.setItem('comdSid', comdSid);

        window.top.OpenFrame("./All_ElecComDetail .html?ComID=" + comid + "&ComName=" + comName, 930, 620, "SElect", comName, "", function (r) {

        });
    }

    this.OpenDetail = function (comObj) {
        openCom(comObj.ID, comObj.MC);
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

    }


}