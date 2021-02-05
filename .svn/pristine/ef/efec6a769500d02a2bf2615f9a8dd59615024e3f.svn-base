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
            //json/SSmoke_LoadCompany.json
            var type=parseInt(localStorage.getItem('tpage'));
           // console.log(type);
            var userName=parseInt(localStorage.getItem('userName'));
        doAction(url+"/admin/project/LoadCompany.action", "GET", {username:userName,type:type}, function (result) {
            console.log(result);
            gLastResult = result;
        //    console.log(gLastResult);
            showCompany({});
            loadData();
        });
    }


    var showCompany = function (pfilter) {
        
        //添加大数据单位点
        var data = [];
        var comids=gLastResult.AlarmCom+"";
        for (var i = 0; i < gLastResult.length; i++) {
            var pp = gLastResult[i];
            var lng=pp.comName.split(',')[1];   
            var lat=pp.comName.split(',')[0];
              //  console.log(pp);
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

            //json/SSmoke_GetMapData.json
            var type=parseInt(localStorage.getItem('tpage'));
           // console.log(type);
           var userName=parseInt(localStorage.getItem('userName'));
            var username=userName;
        doAction(url+"/admin/project/GetMapDataFire.action", "GET", {username:username,type:type}, function (result) {
       // doAction("http://zlh18122711575.55555.io:16799/earlyPlatform/admin/project/GetMapDataFire.action", "GET", {username:username,type:type}, function (result) {
            console.log(result);
            lastAlarm = result[0].lastAlarm;
         
            // $.each(AlarmOverlay, function (i, v) {
            //     mapObj.removeOverlay(v);
            // });

            $(".alarmBox").empty();//当前报警

            //添加大数据单位点
            var comids = ","+result[0].FASAlarmLst+",";
           // console.log(comids);
                //result[0]
                for (var i = 0; i < gLastResult.length; i++) {
                    var pp = gLastResult[i];
                    var lng=pp.comName.split(',')[1];   
                    var lat=pp.comName.split(',')[0];
                   //  console.log(pp);  //23
                    if (comids != "") {
                        // console.log(comids);
                        // console.log(pp.ID);  // ,522,55,
                        if (comids.indexOf(',' + pp.ID + ',') >= 0) { //添加报警点
                            var point = new BMap.Point(lng, lat);
                            var tm = new MyFocus(point, pp.MC);
                            tm.Data = pp;
                            mapObj.addOverlay(tm);
                           // AlarmOverlay.push(tm);
                        }
                    }

              
                }
            

            //播放报警
            if (result[0].FASAlarmLst && result[0].FASAlarmLst.length > 0) {
                playAlarm();
                
            }


            $("#Dev01").html(result[0].FASAlarm);
            $("#Dev02").html(result[0].fasOn);
            $("#Dev03").html(result[0].fasOff);
            var AllNum=parseFloat(result[0].fasOn) + parseFloat(result[0].fasOff)
            NumStr = "000000" + AllNum;
            NumStr = NumStr.substr(NumStr.length - 6, 6);
            

            $("#Dev00").find(".numCell").each(function (i, v) {
               
                $(v).html(NumStr.substr(i, 1));
            });

           // setTimeout(loadData, 60000);
        });
    }

    //打开单位烟雾报警情况
    var openCom = function (OwnComID, OwnComName) {
        sessionStorage.setItem('ComID',OwnComID);  
       // console.log(OwnComID);
      //  console.log(OwnComName);
        window.top.OpenFrame("./SSmoke_SMComDetail.html?ComID=" + OwnComID + "&ComName=" + escape(OwnComName), 1220, 620, "FasUnitState", OwnComName, "", function (r) {

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

            $(".MapBox").MapWhere(tv, "QueryText", tv);
       });

       $(".moreAlarm").click(function (e) {

           window.top.OpenFrame("/SElecAlarm/ElecAlarmLog?MenuCode=ElecAlarmLog", 870, 600, "SElect", "报警历史", "", function (r) {

           });

       });


    }

   
}