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
            //    console.log(item);
                openCom(item.data.iD, item.data.mC);
            }
        },
        size: 10,
        draw: 'simple',
        zIndex:'0'
    };
    

    var userName=parseInt(localStorage.getItem('userName'));
    var region=localStorage.getItem('region')
    // var type=parseInt(localStorage.getItem('tpage'));
    var type="3";
    //加载单位信息
    var loadData = function () {
        //json/SElec_GetMapData.json
       // console.log(type+'---'+userName);
       
        doAction(url+"/WebProject/DeviceProject.action?username="+userName, "GET", {type:type,region:region}, function (result) {  
            gLastResult = result;
            console.log(result);
            mapObj.clearOverlays();
        //    console.log(result.AlarmCom.split(','))
            var yourString=","+result.AlarmCom+"," ;
            var yourStringH="";
            var res=yourString.split(',');
            for(var i=0;i<res.length;i++){
				yourStringH=yourStringH+'z'+res[i]+',';
			}
            var comids=yourString+","+yourStringH;
            if (result.AlarmCom != "") {
                playAlarm(); 
            }
            //添加大数据单位点
            var data = [];
            for (var i = 0; i < result.Company.length; i++) {
                var pp = result.Company[i];
                 //console.log(pp);
                 var lng=pp.long_latbai.split(',')[1];   
                 var lat=pp.long_latbai.split(',')[0];   
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
                
                //报警处理
                if (comids != "") {
                    //console.log(comids);
                  //  console.log(pp);  // ,522,55,
                    if (comids.indexOf( ','+pp.iD + ',' ) >= 0) { //添加报警点
                        var point = new BMap.Point(lng, lat);
                        var tm = new MyFocus(point, pp.ComName);
                        tm.Data = pp;
                        mapObj.addOverlay(tm);
                    }else{
                      //  console.log('no');
                    }
                }else{
                    console.log('没有数据');
                }
            }
            
            if (gDataset) {
                gDataset.set(data);  //修改数据
            }else{
                gDataset = new mapv.DataSet(data);
               // console.log(gDataset);
            }
            gMapLayer = new mapv.baiduMapLayer(mapObj, gDataset, gOptions);

            // var DevAll = 0;
            // //接入设备数    //接入电气设备  一定要有编号MC 对应
            // for (var idx = 0; idx < result.LstDevice.length; idx++) {
            //     var dd = result.LstDevice[idx];
            //   // console.log(dd);
            //     if (dd.MC == "01") {
            //         DevAll += parseInt(dd.value);
            //         $("#Dev01").html(dd.value);
            //     } else if (dd.MC == "02") {
            //         DevAll += parseInt(dd.value);
            //         $("#Dev02").html(dd.value);
            //     } else if (dd.MC == "03") {
            //         DevAll += parseInt(dd.value);
            //         $("#Dev03").html(dd.value);
            //     } 
            // }

            // var DevAllStr = DevAll + "";
            // DevAllStr = "000000" + DevAllStr;
            // DevAllStr = DevAllStr.substr(DevAllStr.length-6,6);

            // $("#Dev00").find(".numCell").each(function (i, v) {
            //      $(v).html(DevAllStr.substr(i,1));
            // });



            // var AlarmAll = 0;
            // //接入设备数    接入报警设备处理数
            // var tt1 = result.LstAlarm[0].value;
            // var tt2 = result.LstAlarm[1].value;
            // AlarmAll += tt1;
            // $("#Alarm01").html("共" + tt1 + "/" + tt2 + "未处理");


            // tt1 = result.LstAlarm[2].value;
            // tt2 = result.LstAlarm[3].value;
            // AlarmAll += tt1;
            // $("#Alarm02").html("共" + tt1 + "/" + tt2 + "未处理");


            // tt1 = result.LstAlarm[4].value;
            // tt2 = result.LstAlarm[5].value;
            // AlarmAll += tt1;
            // $("#Alarm03").html("共" + tt1 + "/" + tt2 + "未处理");


            // tt1 = result.LstAlarm[6].value;
            // tt2 = result.LstAlarm[7].value;
            // AlarmAll += tt1;
            // $("#Alarm04").html("共" + tt1 + "/" + tt2 + "未处理");

            // tt1 = result.LstAlarm[8].value;
            // tt2 = result.LstAlarm[9].value;
            // AlarmAll += tt1;
            // $("#Alarm05").html("共" + tt1 + "/" + tt2 + "未处理");

            // // tt1 = result.LstAlarm[10].value;
            // // tt2 = result.LstAlarm[11].value;
            // // AlarmAll += tt1;
            // // $("#Alarm06").html("共" + tt1 + "/" + tt2 + "未处理");

            // var AlarmAllStr = AlarmAll + "";
            // AlarmAllStr = "000000" + AlarmAllStr;
            // AlarmAllStr = AlarmAllStr.substr(AlarmAllStr.length - 6, 6);

            // $("#Alarm00").find(".numCell").each(function (i, v) {
            //     $(v).html(AlarmAllStr.substr(i, 1));
            // });

            //setTimeout(loadData, 60000);
        });
    }

    var loadAalarm = function () {
        var type="3";
        //http://p240647i77.qicp.vip/newEarlyWarn/WebProject/DeviceNum.action?username=13808567844&type=3&region=
        doAction(url+"/WebProject/DeviceAlarm.action?username="+userName, "GET", {type:type,region:region}, function (result) {
            console.log(result);
            if(result.length==0){
                var html="";
                var html="<div class='numTitle'>今日报警(项目)</div><div class='numContent' id='Alarm00'><div class='numCell'>0</div><div class='numCell'>0</div><div class='numCell'>0</div><div class='numCell'>0</div><div class='numCell'>0</div><div class='numCell'>0</div></div>";
                $('#ElecAlarmSum').html(html);
                console.log('没有数据')
            }else{
                var html="";
                var html="<div class='numTitle'>今日报警(项目)</div><div class='numContent' id='Alarm00'><div class='numCell'>0</div><div class='numCell'>0</div><div class='numCell'>0</div><div class='numCell'>0</div><div class='numCell'>0</div><div class='numCell'>0</div></div>";
                var arr=[];
                $.each(result,function(i,v){
                    //  console.log(alarm[i].BH);
                //如果text值为空。在今日报警就不显示 一定要有text值
                    if(v.text==""){
                        html=html+"";
                    }else{
                        html=html+"<div class='numItem bg1' data-sign="+v.pid+">"+v.typeName+"<div id="+'Alarm'+v.pid+" class='valueCell'>共"+v.value+"条未处理</div></div>";
                    }
                    arr.push(v.value)
                    // console.log(v.value);
                })
                // console.log(arr);
                var sum = 0;
                for (let i = 0; i < arr.length; i++) {
                    sum += arr[i];
                }
                $('#ElecAlarmSum').html(html);
                var AlarmAll=0;
                AlarmAllStr = "000000" + sum;
                AlarmAllStr = AlarmAllStr.substr(AlarmAllStr.length - 6, 6);

                $("#Alarm00").find(".numCell").each(function (i, v) {
                    $(v).html(AlarmAllStr.substr(i, 1));
                });
            }
            
        })
    }
    var loadNum = function () {
        var type="3";
        doAction(url+"/WebProject/DeviceNum.action?username="+userName, "GET", {type:type,region:region}, function (result) {
            console.log(result);
            if(result.length!=0){
                var DevAll = 0;
                $("#Dev01").html(result.alarm);
                $("#Dev02").html(result.online);
                $("#Dev03").html(result.offline);
                var DevAllStr =  parseInt(result.deviceNum) 
                // console.log(DevAllStr)
                DevAllStr = "000000" + DevAllStr;
                DevAllStr = DevAllStr.substr(DevAllStr.length-6,6);

                $("#Dev00").find(".numCell").each(function (i, v) {
                    $(v).html(DevAllStr.substr(i,1));
                });
            }
            
        })
    }

    // 打开单位用电情况
    var openCom = function (comid,comName) {
        //window.top.OpenFrame("/ExtApp/SElectric?ComID=" + comid, 870, 600, "SElect", comName, "", function (r) {

        //});
        sessionStorage.setItem('ComID',comid);  
        sessionStorage.setItem('comName',comName);
        window.top.OpenFrame("./SElec_ElecComDetail.html?ComID=" + comid + "&ComName=" + comName, 930, 620, "SElect", comName, "", function (r) {

        });
    }

    this.OpenDetail = function (comObj) {
        //console.log(comObj)
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
        loadAalarm();
        loadNum();
    }

   
}