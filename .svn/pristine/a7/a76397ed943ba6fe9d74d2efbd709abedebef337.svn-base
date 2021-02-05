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


    //加载单位信息
    var loadData = function () {
          var type=parseInt(localStorage.getItem('tpage'));
        //   console.log(type);
         //json/SWater_GetMapData.json
         var userName=parseInt(localStorage.getItem('userName'));
       doAction(url+"/admin/project/FindArea.action?username="+userName, "GET", {type:type}, function (result) {
      //  doAction("http://zlh18122711575.55555.io:16799/earlyPlatform/admin/project/FindArea.action?username="+userName, "GET", {type:type}, function (result) {

            gLastResult = result;
            console.log(gLastResult);
            //return CJson.ModelToJson(new { Company= lstCompany,AlarmCom= ComIDS, LstDevice = lstDevice , LstAlarm = lstAlarm })

            var alarm=result.LstAlarm;
           // console.log(alarm);
            var html="";
            var html="<div class='numTitle'>今日报警(项目)</div><div class='numContent' id='Alarm00'><div class='numCell'>0</div><div class='numCell'>0</div><div class='numCell'>0</div><div class='numCell'>0</div><div class='numCell'>0</div><div class='numCell'>0</div></div>";
             $.each(alarm,function(i,v){
                  if(v.text==""){
                    html=html+"";
                }else{
                    html=html+"<div class='numItem bg1' data-sign="+v.MC+">"+v.text+"<div id="+'Alarm'+v.MC+" class='valueCell'></div></div>";
                }
             })
             $('#WaterAlarmSum').html(html);
            mapObj.clearOverlays();
            var comids=result.AlarmCom+"";
            console.log(result.Company.length)
            //添加大数据单位点
            var data = [];
           for (var i = 0; i < result.Company.length; i++) {
                var pp = result.Company[i];
                console.log(pp);
                var lng=pp.long_latbai.split(',')[1];
                var lat=pp.long_latbai.split(',')[0];
                // 大数据处理
                data.push({
                    geometry: {
                        type: 'Point',
                        coordinates: [lng, lat]
                    },
                    data: pp
                });


                

               // 报警处理
                if (comids != "") {
                    if (comids.indexOf(',' + pp.ID + ',') >= 0) { //添加报警点
                        var point = new BMap.Point(pp.MLng, pp.MLat);
                        var tm = new MyFocus(point, pp.ComName);
                        tm.Data = pp;
                        mapObj.addOverlay(tm);
                    }
                }
            }
           var opts = {
               width : 220,     // 信息窗口宽度
               height: 80,     // 信息窗口高度
               //title : "<p style='background: url(../images/kjbg.png);border: solid 1px #fff;box-shadow: inset 0px 0px 30px #fff;border-radius: 7px;padding:0px 0 0 12px;color:#fff;margin:0px;width:217px;height:25   px;'>信息窗口</p>" , // 信息窗口标题

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
                   content.setStyle({"border":"0","padding":"0","backgroundColor":"0","zIndex":"600","textAlign": "center","display":"block","width":"250px","height": "84px"});


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
            }else{
                gDataset = new mapv.DataSet(data);
            }
            gMapLayer = new mapv.baiduMapLayer(mapObj, gDataset, gOptions);

            var DevAll = 0;
            //接入设备数  LstDevice  //接入电气设备  一定要有编号MC 对应   
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
                    $("#Dev03").html(dd.value);
                } 
                
            }

            var DevAllStr = DevAll + "";
            DevAllStr = "000000" + DevAllStr;
            DevAllStr = DevAllStr.substr(DevAllStr.length-6,6);

            $("#Dev00").find(".numCell").each(function (i, v) {
                 $(v).html(DevAllStr.substr(i,1));
            });



            var AlarmAll = 0;

            //接入设备数   LstAlarm  今日报警
            for (var idx = 0; idx < result.LstAlarm.length; idx++) {
                var dd = result.LstAlarm[idx];
              // console.log(dd.BH);
                if (dd.BH == "1") {  
                    AlarmAll += parseInt(dd.value);
                    $("#Alarm01").html(dd.value);
                } else if (dd.BH == "2") {
                    AlarmAll += parseInt(dd.value);
                    $("#Alarm02").html(dd.value);
                } else if (dd.BH == "3") {
                    AlarmAll += parseInt(dd.value);
                    $("#Alarm03").html(dd.value);
                } else if (dd.BH == "4") {
                    AlarmAll += parseInt(dd.value);
                    $("#Alarm04").html(dd.value);
                }
            }


            var AlarmAllStr = AlarmAll + "";
            AlarmAllStr = "000000" + AlarmAllStr;
            AlarmAllStr = AlarmAllStr.substr(AlarmAllStr.length - 6, 6);

            $("#Alarm00").find(".numCell").each(function (i, v) {
                $(v).html(AlarmAllStr.substr(i, 1));
            });

           //setTimeout(loadData, 60000);
        });
    }

    //打开单位用水情况
    var openCom = function (comid,comName) {
        //window.top.OpenFrame("/ExtApp/SElectric?ComID=" + comid, 870, 600, "SElect", comName, "", function (r) {

        //});   
        sessionStorage.setItem('ComID',comid);  
        window.top.OpenFrame("./SWater_WaterComDetail.html?ComID=" + comid + "&ComName=" + escape(comName), 1220, 500, "SWater", comName, "", function (r) {

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