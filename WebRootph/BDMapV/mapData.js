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
                openCom(item.data.ID, item.data.MC);
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

    var loadCompany = function () {
            //json/SVideoAlarm_LoadCompany.json
            var type=parseInt(localStorage.getItem('tpage'));
          // console.log(type);
           var userName=parseInt(localStorage.getItem('userName'));
           
       doAction(url+"/admin/project/LoadCompany.action?username="+userName, "GET", {type:type}, function (result) {
        //  doAction("http://zlh18122711575.55555.io:16799/earlyPlatform/admin/project/LoadCompany.action?username="+userName, "GET", {type:type}, function (result) {
            gLastResult = result;
            console.log(gLastResult);
            showCompany({});
            loadData();
        });
    }


    var showCompany = function (pfilter) {
        //添加大数据单位点
        var data = [];
        for (var i = 0; i < gLastResult.length; i++) {
            var pp = gLastResult[i];
            var lng=pp.comName.split(',')[1];   
            var lat=pp.comName.split(',')[0];
            if (pfilter != null){
                if (pfilter.QueryText) {
                    if (pp.MC.indexOf(pfilter.QueryText) < 0) {
                        continue;
                    }
                }
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
            var opts = {
				width : 220,     // 信息窗口宽度
				height: 110,     // 信息窗口高度
			 //	title : "<p style='background: url(../images/kjbg.png);border: solid 1px #fff;box-shadow: inset 0px 0px 30px #fff;border-radius: 7px;padding:0px 0 0 12px;color:#fff;margin:0px;width:217px;height:25   px;'>信息窗口</p>" , // 信息窗口标题
                
				enableMessage:true//设置允许信息窗发送短息
			   };
            
            for(var i=0;i<data.length;i++){
               // console.log(data[i].data);
               var pt = new BMap.Point(data[i].geometry.coordinates[0],data[i].geometry.coordinates[1]);
               
		       var myIcon = new BMap.Icon("../images/beijing.png", new BMap.Size(10,10));
                var marker = new BMap.Marker(pt,{icon:myIcon});  // 创建标注
               // console.log(marker);
               //
                var content =new BMap.Label("<div style='white-space:normal;color: #fff;background: url(../images/kjbg.png);box-shadow: inset 0px 0px 30px #fff;border-radius: 7px;padding:5px 0 0 12px; width:250px;height:90px;z-index:600'><p style='margin:0;'>项目名称:"+data[i].data.MC+"</p><p style='margin:0;'>项目地址"+data[i].data.address+"</p></div>");
               // console.log(content);
                map.addOverlay(marker);  
                addClickHandler(content,marker);
                
            }
            
            function addClickHandler(content,marker){
                //console.log(marker);
                marker.addEventListener('mouseover',function(){
                    content.setStyle({"border":"0","padding":"0","backgroundColor":"0","zIndex":"600","textAlign": "center","display":"block","width":"250px","height": "84px",});   
                    
                    
                    map.openInfoWindow(content);
                    marker.setLabel(content); //为标注添加一个标签
                    
                })
                marker.addEventListener('mouseout',function(){
                    map.removeOverlay(content);
                   // map.closeInfoWindow(content);
                })
                 
                
            }
        if (gDataset) {
            gDataset.set(data);  //修改数据
        } else {
            gDataset = new mapv.DataSet(data);
            gMapLayer = new mapv.baiduMapLayer(mapObj, gDataset, gOptions);
        }
       
    }

    var lastAlarm = null;
    var AlarmOverlay = [];

    //加载报警数据
    var loadData = function () {
    	//zlh edit
    	   var type=parseInt(localStorage.getItem('tpage'));
          // console.log(type);
           var userName=parseInt(localStorage.getItem('userName'));
        //json/SVideoAlarm_GetMapData.json
    	doAction(url+"/admin/project/GetMapDataFire.action?username="+userName, "GET", { type :type}, function (result) {
        //doAction("json/SVideoAlarm_GetMapData.json", "GET", { lastAlarm: lastAlarm }, function (result) {
            console.log(result);
            lastAlarm = result[0].lastAlarm;
          //  alert("1");
            $.each(AlarmOverlay, function (i, v) {
                mapObj.removeOverlay(v);
            });
           // alert("2");这边是把右边的当前报警的内容先清空
            //$(".alarmBox").empty();
            //添加大数据单位点
            var comids = ",";
         //   alert("3");

            for (var i = 0; i < result[0].videoAlarmLst.length; i++) {
                var pp = result[0].videoAlarmLst[i];
                var lng=pp.comName.split(',')[1];   
            var lat=pp.comName.split(',')[0];
                if (comids.indexOf(',' + pp.ComID + ',') <= 0) { //添加报警点
                    for (var t = 0; t < gLastResult.length; t++) {
                        var pcom = gLastResult[t];
                        if (pcom.ID != pp.ComID) {
                            continue;
                        }
                        var point = new BMap.Point(pcom.MLng, pcom.MLat);
                        var tm = new MyFocus(point, pcom.MC);
                        tm.Data = pp;
                        mapObj.addOverlay(tm);
                        AlarmOverlay.push(tm);
                    }
                    comids += pp.ComID + ",";
                }
                //单位列表
                var thtml = "<div class=\"alarmItem\">";
                thtml += "<div class=\"resultTitle\">" + pp.ComName + "</div>";
                thtml += "<div class=\"resultText\">位置：" + pp.Location + "</div>";
                thtml += "<div class=\"resultText\">防区：" + pp.RegionMC + "</div>";
                thtml += "<div class=\"resultText\">时间：" + pp.WarnDate + "</div>";
                thtml += "</div>";

                var pItem = $(thtml);
                CompanyClick(pItem, pp);
                //下面是往当前报警里面写数据
                //pItem.appendTo($(".AlarmResult"));
            }

            //播放报警
            if (result[0].videoAlarmLst && result[0].videoAlarmLst.length > 0) {
                playAlarm();
                pItem[0].scrollIntoView();
            }


            $("#Video03").html(result[0].fasOn);   //在线设备
            $("#Video01").html(result[0].fasOff);  //离线设备

            NumStr = "000000" + result[0].videoAlarm;
            NumStr = NumStr.substr(NumStr.length - 6, 6);

            $("#VideoAlarm").find(".numCell").each(function (i, v) {
                $(v).html(NumStr.substr(i, 1));
            });

            //setTimeout(loadData, 60000);
        });
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
        openCom(comObj.ID, comObj.MC);
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
        loadCompany();

        //地址查询
       $("#butSuggest").click(function () {
            var tv = $("#suggestId").val();
            if (tv == null || tv == undefined || tv == "") {
                return;
            }
            $(".MapBox").MapWhere(tv,"QueryText",tv);
       });

       $(".moreAlarm").click(function (e) {
           window.top.OpenFrame("./SElecAlarm/ElecAlarmLog?MenuCode=ElecAlarmLog", 870, 600, "SElect", "报警历史", "", function (r) {
           });
       });


    }

   
}