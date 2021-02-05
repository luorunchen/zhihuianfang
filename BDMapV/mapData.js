﻿function MapData(box, map) {


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
   // var type=parseInt(localStorage.getItem('tpage'));
    var userName=parseInt(localStorage.getItem('userName'));
    var region=localStorage.getItem('region')
    var  type='9,13,20' 
    // var loadCompany = function () {
    //         //json/SVideoAlarm_LoadCompany.json
        
              
    // doAction(url+"/WebProject/DeviceProject.action?username="+userName, "GET", {type:type,region:region}, function (result) { 
    //     //  doAction("http://zlh18122711575.55555.io:16799/earlyPlatform/admin/project/LoadCompany.action?username="+userName, "GET", {type:type}, function (result) {
    //         gLastResult = result;
    //         console.log(gLastResult);
    //         showCompany({});
    //         loadData();
    //     });
    // }


    var loadData = function () {
        //json/SElec_GetMapData.json
        doAction(url+"/WebProject/DeviceProject.action?username="+userName, "GET", {type:type,region:region}, function (result) {  
            gLastResult = result;
            console.log(result);
            mapObj.clearOverlays();
           console.log(result.AlarmCom.split(','))
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
        });
    }

    var loadAalarm = function () {
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
                $('#ElecDeviceSum').html(html);
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
        doAction(url+"/WebProject/DeviceNum.action?username="+userName, "GET", {type:type,region:region}, function (result) {
            console.log(result);
            if(result.length==0){
                
            }else{
                var DevAll = 0;
               // $("#Dev01").html(result.alarm);
                $("#Video03").html(result.online);
                $("#Video01").html(result.offline);
                var DevAllStr =  parseInt(result.deviceNum) 
                // console.log(DevAllStr)
                DevAllStr = "000000" + DevAllStr;
                DevAllStr = DevAllStr.substr(DevAllStr.length-6,6);

                $("#VideoAlarm").find(".numCell").each(function (i, v) {
                    $(v).html(DevAllStr.substr(i,1));
                });
            }
            
        })
    }

    //打开单位用电情况(这边是重点部位预警分析)点击地图上面的项目，然后显示在页面上
    //comid(PID),comName(项目名称)
    var openCom = function (comid,comName) {
    		var type=parseInt(localStorage.getItem('tpage'));
        	window.top.OpenFrame("./SVideoAlarm_ComDetail.html?ComID=" + comid + "&ComName=" + type, 870, 600, "SVideo", comName, "", function (r) {
        	});
    }

    //点击单位查询结果
    var CompanyClick = function (pobj,pp) {
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
    this.GetResult= function (){
        return gLastResult;
    }
    //加载数据
    this.Open = function () {
        loadData();
        // loadAalarm()
        loadNum()
        //地址查询
    //    $("#butSuggest").click(function () {
    //         var tv = $("#suggestId").val();
    //         if (tv == null || tv == undefined || tv == "") {
    //             return;
    //         }
    //         $(".MapBox").MapWhere(tv,"QueryText",tv);
    //    });

       $(".moreAlarm").click(function (e) {
           window.top.OpenFrame("./SElecAlarm/ElecAlarmLog?MenuCode=ElecAlarmLog", 870, 600, "SElect", "报警历史", "", function (r) {
           });
       });


    }

   
}