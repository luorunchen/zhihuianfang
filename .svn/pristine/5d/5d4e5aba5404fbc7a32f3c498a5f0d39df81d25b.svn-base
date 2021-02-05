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
                // console.log(item)
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
    var region = localStorage.getItem('region');
    var loadCompany = function () {
        //json/SSmoke_LoadCompany.json
        // var type=parseInt(localStorage.getItem('tpage'));
        var type = '10,15,16,19,18'; // 门磁,声光报警, 紧急呼叫,消防手动报警器,水浸报警器
        // console.log(type);
        var userName = parseInt(localStorage.getItem('userName'));
        doAction(url + "/WebProject/DeviceProject.action", "GET", {
            username: userName,
            type: type,
            region:region
        }, function (result) {
            console.log(result);
            gLastResult = result;
            //    console.log(gLastResult);
            if(result.length == 0){

            }else{
                console.log(1);
                showCompany({});
            }
            
        });
    }


    var showCompany = function (pfilter) {

        //添加大数据单位点
        var data = [];
        var comids = gLastResult.AlarmCom + "";
        //播放报警
        if (gLastResult.AlarmCom != "") {
            playAlarm(); 
        }
        // console.log(comids)
        var d1=new Date();
        console.log(d1)
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

            //大数据处理
            data.push({
                geometry: {
                    type: 'Point',
                    coordinates: [lng, lat]
                },
                data: pp
            });

            if (comids != "") {
                if (comids.indexOf(',' + pp.iD + ',') >= 0) { //添加报警点
                    var point = new BMap.Point(lng, lat);
                    var tm = new MyFocus(point, pp.ComName);
                    tm.Data = pp;
                    mapObj.addOverlay(tm);
                } else {
                    //  console.log('no');
                }
            } else {
                console.log('没有数据');
            }
        }
        if (gDataset) {
            gDataset.set(data); //修改数据
        } else {
            gDataset = new mapv.DataSet(data);
            
        }
        gMapLayer = new mapv.baiduMapLayer(mapObj, gDataset, gOptions);
        //报警处理
        var d2=new Date();
        var x=d2-d1
        
        console.log(d2)
        console.log(x)

    }

    var lastAlarm = null;
    var AlarmOverlay = [];

    
    //打开单位烟雾报警情况
    var openCom = function (OwnComID, OwnComName) {
        var width=$(window).width()
        var height=$(window).height()
        console.log(width)
        console.log(height)
        sessionStorage.setItem('ComID', OwnComID);
        window.top.OpenFrame("./BBbao_SMComDetail.html?ComID=" + OwnComID + "&ComName=" + escape(OwnComName), 930, 500, "FasUnitState", OwnComName, "", function (r) {

        });
    }

    //点击单位查询结果
    var CompanyClick = function (pobj, pp) {

        pobj.click(function () {
            if (pp) {

                for (var i = 0; i < gLastResult.length; i++) {
                    var pcom = gLastResult[i];
                    if (pcom.ID != pp.ComID) {
                        continue;
                    }
                    var point = new BMap.Point(pcom.MLng, pcom.MLat);
                    mapObj.centerAndZoom(point, 14);
                }
                //mapData.OpenDetail(pcom);
            }
        });
    }


    this.OpenDetail = function (comObj) {
        openCom(comObj.iD, comObj.mC);
    }


    //清除痕迹
    this.Clear = function (vg) {
        showCompany(vg);
    }
    this.GetResult = function () {
        return gLastResult;
    }
    //加载数据
    this.Open = function () {
        loadCompany();
        //地址查询
        $("#butSuggest").click(function () {

            var tv = $("#suggestId").val();
            if (tv == null || tv == undefined || tv == "") {
                return;
            }

            $(".MapBox").MapWhere(tv, "QueryText", tv);
        });

        $(".moreAlarm").click(function (e) {

            window.top.OpenFrame("/SElecAlarm/ElecAlarmLog?MenuCode=ElecAlarmLog", 870, 600, "SElect", "报警历史", "", function (r) {

            });

        });


    }


}