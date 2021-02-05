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




    //大数据点样式
    var gOptions = {
        fillStyle: 'rgba(0, 255, 50, 1)',
        shadowColor: 'rgba(255, 255, 0, 1)',
        shadowBlur: 30,
        globalCompositeOperation: 'lighter',
        methods: {
            click: function (item) {
                console.log(item)
                openCom(item.data.iD, item.data.mC);
            }
        },
        size: 10,
        draw: 'simple'
    };

    //播放次数

    var playNum = 0;

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

    //加载单位信息

    var userName = parseInt(localStorage.getItem('userName'));
    var region = localStorage.getItem('region')
    var type = '1,6,11'
    var loadCompany = function () {
        //json/SGasAlarm_LoadCompany.json
        //var type=parseInt(localStorage.getItem('tpage'));

        // console.log(type);
        doAction(url + "/WebProject/DeviceProject.action?username=" + userName, "GET", {
            type: type,
            region: region
        }, function (result) {
            gLastResult = result;
            console.log(gLastResult);
            // console.log(gLastResult.length);
            if(result.length!=0){
                var data = [];
            var comids = "," + gLastResult.AlarmCom + ",";
            console.log(comids);

            for (var i = 0; i < gLastResult.Company.length; i++) {
                var pp = gLastResult.Company[i];
                var lng = pp.long_latbai.split(',')[1];
                var lat = pp.long_latbai.split(',')[0];
                if (lat > 54) { // 纬度
                    var lng = pp.long_latbai.split(',')[0]; //经度
                    var lat = pp.long_latbai.split(',')[1]; //纬度
                } else {
                    var lng = pp.long_latbai.split(',')[1];
                    var lat = pp.long_latbai.split(',')[0];
                }
                if (comids != "") {
                    //   console.log(comids);  
                    if (comids.indexOf(',' + pp.iD + ',') >= 0) { //添加报警点
                        var point = new BMap.Point(lng, lat);
                        var tm = new MyFocus(point, pp.mC);
                        tm.Data = pp;
                        mapObj.addOverlay(tm);
                        AlarmOverlay.push(tm);
                    }
                }
                //  console.log(data);
                //大数据处理
                data.push({
                    geometry: {
                        type: 'Point',
                        coordinates: [lng, lat]
                    },
                    data: pp
                });


            }
            //信息框
            if (data != "" && data != null) {
                // console.log(2);
                var opts = {
                    width: 220, // 信息窗口宽度
                    height: 110, // 信息窗口高度
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
            }
            if (gDataset) {
                gDataset.set(data); //修改数据
            } else {
                gDataset = new mapv.DataSet(data);
                gMapLayer = new mapv.baiduMapLayer(mapObj, gDataset, gOptions);
            }
            }
            
        });
    }

    var AlarmOverlay = []; //报警覆盖物

    var lastAlarm = null; //末次报警


    //加载设备数量
    var loadData = function () {
        doAction(url+"/WebProject/DeviceNum.action?username="+userName, "GET", {type:type,region:region}, function (result) {
            console.log(result);
            if(result.length != 0){
                $("#Dev01").html(result.online);  //在线
                $("#Dev02").html(result.offline); //离线
                $("#Dev03").html(result.alarm);  //报警
                var DevAllStr = result.deviceNum + "";
                DevAllStr = "000000" + DevAllStr;
                DevAllStr = DevAllStr.substr(DevAllStr.length - 6, 6);

                $("#Dev00").find(".numCell").each(function (i, v) {
                    $(v).html(DevAllStr.substr(i, 1));
                });
            }
            
        });
    }

    //点击单位查询结果
    var CompanyClick = function (pobj, data) {
        console.log(pobj)
        pobj.click(function () {
            if (data) {
                var point = new BMap.Point(data.MLng, data.MLat);
                mapObj.centerAndZoom(point, 14);
                OpenDetail(data);
            }
        });
    }


    //打开单位用电情况
    var openCom = function (comid, comName) {
         console.log(comid);
        console.log(comName);
        var width=$(window).width();
        var height=$(window).height();
        sessionStorage.setItem('ComID', comid);
        window.top.OpenFrame("./SGasAlarm_AlarmDetail.html?ComID=" + comid + "&ComName=" + escape(comName), 930, 600, "SGas", comName, "", function (r) {

        }, "blackModal");
    }

    this.OpenDetail = function (comObj) {
        console.log(comObj)
        openCom(comObj.iD, comObj.mC);
    }

    this.GetResult = function () {
        return gLastResult;
    }

    //清除痕迹
    this.Clear = function (vg) {
        loadCompany();
    }

    //加载数据
    this.Open = function () {
        loadCompany();
        loadData()
    }
}