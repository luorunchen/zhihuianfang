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

    //加载单位信息
    var loadCompany = function () {
            //json/SGasAlarm_LoadCompany.json
            var type=parseInt(localStorage.getItem('tpage'));
           // console.log(type);
            var userName=parseInt(localStorage.getItem('userName'));
            var username=userName;
        doAction(url+"/admin/project/GetMapDataFire.action", "GET", {username:username,type:type}, function (result) {
            gLastResult = result;
           console.log(gLastResult);
            // console.log(gLastResult.length);
            showCompany({});
            loadData();
        });
    }

    var AlarmOverlay = []; //报警覆盖物
    
    
    var showCompany = function (pfilter) {
        // console.log(pfilter);   
        //添加大数据单位点
       // console.log(gLastResult.Company)
        var data = [];
        var comids = ","+gLastResult.gas[0].lstGasAlarm+",";
        console.log(comids);
        
        for (var i = 0; i < gLastResult.Company.length; i++) {
            var pp = gLastResult.Company[i];
            var lng=pp.comName.split(',')[1];   
            var lat=pp.comName.split(',')[0];
            if (comids != "") {
              //   console.log(comids);  
                if (comids.indexOf(',' + pp.ID + ',' ) >= 0) { //添加报警点
                    var point = new BMap.Point(lng, lat);
                    var tm = new MyFocus(point, pp.MC);
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
       // console.log(data);
            //信息框
            if(data!=""&&data!=null){
               // console.log(2);
                var opts = {
                    width : 220,     // 信息窗口宽度
                    height: 110,     // 信息窗口高度
                 //   title : "<p style='background: url(../images/kjbg.png);border: solid 1px #fff;box-shadow: inset 0px 0px 30px #fff;border-radius: 7px;padding:0px 0 0 12px;color:#fff;margin:0px;width:217px;height:25   px;'>信息窗口</p>" , // 信息窗口标题
                    
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
            }


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
            //json/SGasAlarm_GetMapData.json
            var type=parseInt(localStorage.getItem('tpage'));
           // console.log(type);
           var userName=parseInt(localStorage.getItem('userName'));
            var username=userName;
            
        doAction(url+"/admin/project/GetMapDataFire.action", "GET", {username:username,type:type}, function (result) {
     //   doAction("http://zlh18122711575.55555.io:16799/earlyPlatform/admin/project/GetMapDataFire.action", "GET", {username:username,type:type}, function (result) {
                
            lastAlarm = result.gas[0].lastAlarm;
            // gLastResult = result;
            // $.each(AlarmOverlay, function (i, v) {
            //     mapObj.removeOverlay(v);
            // });

            //添加大数据单位点
          //  var comids = ",";
            var pItem = null;
            // console.log(gLastResult.Company.length);
            //     for (var i = 0; i < gLastResult.Company.length; i++) {
            //         var pp = gLastResult.Company[i];
                    // if (comids != "") {
                    //     if (comids.indexOf(',' + pp.ID + ',') >= 0) { //添加报警点
                    //         var point = new BMap.Point(pp.MLng, pp.MLat);
                    //         var tm = new MyFocus(point, pp.MC);
                    //         tm.Data = pp;
                    //         mapObj.addOverlay(tm);
                    //        // AlarmOverlay.push(tm);
                    //     }
                    // }

              
                // }
                
           // for (var i = 0; i < result.gas[0].lstGasAlarm.length; i++) {
                // var pp = result.gas[0].lstGasAlarm[i];
                // if (pp.AlarmType == "02") {
                //     pp.AlarmType = "浓度报警";
                // }
                // if (pp.AlarmType == "03") {
                //     pp.AlarmType = "设备到期";
                // }
                // var pcom = null;
                // for (var t = 0; t < gLastResult.length; t++) {
                //     //pcom = gLastResult[t];
                //     if (gLastResult[t].ID != pp.ComID) {
                //         continue;
                //     }
                    
                //     pcom = gLastResult[t];
                //     if (comids.indexOf(',' + pp.ComID + ',') <= 0) { //添加报警点
                //         var point = new BMap.Point(pcom.MLng, pcom.MLat);
                //         var tm = new MyFocus(point, pcom.MC);
                //         tm.Data = pp;
                //         mapObj.addOverlay(tm);
                //         AlarmOverlay.push(tm);
                //         comids += pp.ComID + ",";
                //     }
                //     break;
                // }

                // if (pcom == null) {
                //     pcom = { ID: pp.ComID, MC: pp.ComName };
                // }

                //单位列表
                // var thtml = "<div class=\"alarmItem\">";
                // thtml += "<div class=\"resultTitle\">" + pp.ComName + "</div>";
                // thtml += "<div class=\"resultText\">位置：" + pp.DevMC + "</div>";
                // thtml += "<div class=\"resultText\">报警：" + pp.AlarmType + "</div>";
                // thtml += "<div class=\"resultText\">时间：" + pp.AlarmTime + "</div>";
                // thtml += "</div>";



                // pItem = $(thtml);
                // CompanyClick(pItem, pp, pcom);
                // pItem.appendTo($(".AlarmResult"));
          //  }

            //播放报警
            if (result.gas[0].lstGasAlarm && result.gas[0].lstGasAlarm.length > 0) {
                playAlarm();
               // pItem[0].scrollIntoView();
            }


            var NumStr = "000000" + result.gas[0].alarmNum;
            NumStr = NumStr.substr(NumStr.length - 6, 6);

            $("#Alarm00").find(".numCell").each(function (i, v) {
                $(v).html(NumStr.substr(i, 1));
            });
           
            // $("#Alarm01").html(result.gas[0].alarmCompanyNum+"个");

            $("#Dev01").html(result.gas[0].lstDevice01);

            $("#Dev02").html(result.gas[0].lstDevice02);

            $("#Dev03").html(result.gas[0].lstDevice03);
            // $("#Dev04").html(result.gas[0].lstDeviceTripping);

            var DevAllStr = result.gas[0].lstDeviceAll + "";
            DevAllStr = "000000" + DevAllStr;
            DevAllStr = DevAllStr.substr(DevAllStr.length-6,6);

            $("#Dev00").find(".numCell").each(function (i, v) {
                 $(v).html(DevAllStr.substr(i,1));
            });

            //setTimeout(loadData, 300000);
        });
    }

    //点击单位查询结果
   var CompanyClick = function (pobj, data) {
        console.log(pobj)
        pobj.click(function () {
            if (data){
                var point = new BMap.Point(data.MLng, data.MLat);
                mapObj.centerAndZoom(point, 14);
                OpenDetail(data);
            }
        });
}


    //打开单位用电情况
    var openCom = function (comid,comName) {
      //  console.log(comid);
       // console.log(comName);
        sessionStorage.setItem('ComID',comid);  
        window.top.OpenFrame("./SGasAlarm_AlarmDetail.html?ComID=" + comid + "&ComName=" + escape(comName), 1220, 620, "SGas", comName, "", function (r) {

        }, "blackModal");
    }

    this.OpenDetail = function (comObj) {
        openCom(comObj.ID, comObj.MC);
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