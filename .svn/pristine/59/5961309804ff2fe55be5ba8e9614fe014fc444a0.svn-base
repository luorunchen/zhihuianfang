function MapData(box, map) {


    var htmlBox = box;  //地图控件

    var mapObj = map;  //地图对象
   var panoramaService = new BMap.PanoramaService();   //3D场景服务

    var panorama = null;//mapObj.getPanorama();
  

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
                console.log(item);
                openCom(item.data.pid, item.data.name);
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
    var loadCompany = function () {
            //json/SGasAlarm_LoadCompany.json
            var type=parseInt(localStorage.getItem('tpage'));
           // console.log(type);
            var userName=parseInt(localStorage.getItem('userName'));
            var username=userName;
        doAction(url+"/ChargingPile/getquyu.action", "GET", {}, function (result) {
            gLastResult = result;
           console.log(gLastResult);
            // console.log(gLastResult.length);
            showCompany({});
            loadData();
        });
    }

    var AlarmOverlay = []; //报警覆盖物
    var showCompany = function (pfilter) {
        //console.log(pfilter);   
        //添加大数据单位点
       // console.log(gLastResult.Company)
       var DevAllStr = gLastResult.Company.length + "";
        DevAllStr = "000000" + DevAllStr;
        DevAllStr = DevAllStr.substr(DevAllStr.length-6,6);

            $("#Dev00").find(".numCell").each(function (i, v) {
                 $(v).html(DevAllStr.substr(i,1));
            });
        var data = [];
        //var comids = ","+gLastResult.gas[0].lstGasAlarm+",";
        //console.log(comids);
        for (var i = 0; i < gLastResult.Company.length; i++) {
            var pp = gLastResult.Company[i];
            var lng=pp.longitude;   
            var lat=pp.latitude;

            if (lat > 54) { // 纬度
                var lng = pp.latitude; //经度
                var lat = pp.longitude; //纬度
            } else {
                var lng = pp.longitude;
                var lat = pp.latitude;
            } 
            //大数据处理
            data.push({
                geometry: {
                    type: 'Point',
                    coordinates: [lng, lat]
                },
                data: pp
            });

             
        }
       console.log(data);
            //信息框


        if (gDataset) {
            gDataset.set(data);  //修改数据
        } else {
            gDataset = new mapv.DataSet(data);
            gMapLayer = new mapv.baiduMapLayer(mapObj, gDataset, gOptions);
        }

    }

    var lastAlarm = null;  //末次报警
    

    //加载单位信息
    var loadData = function () {
            var type=parseInt(localStorage.getItem('tpage'));
           var userName=parseInt(localStorage.getItem('userName'));
            var username=userName;
            
        doAction(url+"/ChargingPile/GetMapDataFire.action", "GET", {}, function (result) {
     //   doAction("http://zlh18122711575.55555.io:16799/earlyPlatform/admin/project/GetMapDataFire.action", "GET", {username:username,type:type}, function (result) {
                console.log(result);

            //添加大数据单位点
          //  var comids = ",";
            var pItem = null;
          
            $("#Dev01").html(result.list[0][2]);
            $("#Dev02").html(result.list[0][0]);
            $("#Dev03").html(result.list[0][1]);
        });
    }

    //点击单位查询结果
    // var CompanyClick = function (pobj, pp, pcom) {
    //     console.log(pobj);
    //     pobj.click(function () {
    //         if (pp) {
    //             if (pcom.MLng!==null){
    //                 var point = new BMap.Point(pcom.MLng, pcom.MLat);
    //                 mapObj.centerAndZoom(point, 18);
    //             }
    //             openCom(pcom.ID, pcom.MC)
    //         }
    //     });
    // }
    


    //打开单位用电情况
    var openCom = function (comid,comName) {
        console.log(comid);
        console.log(comName);
        sessionStorage.setItem('ComID',comid);  
        window.top.OpenFrame("./CDZAlarm_AlarmDetail.html?ComID=" + comid + "&ComName=" + escape(comName), 1150, 620, "", "充电桩", "", function (r) {

        }, "blackModal");
    }

    this.OpenDetail = function (comObj) {
        console.log(comObj);
        openCom(comObj.pid, comObj.name);
    }
    
    this.GetResult = function () {

        return gLastResult;
    }

    //清除痕迹
    this.Clear = function (vg) {
        showCompany(vg);
    }

    //加载数据
    this.Open = function () {
        loadCompany();
    }
}