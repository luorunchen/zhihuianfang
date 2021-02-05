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
               // console.log(item);
                openCom(item.data.iD, item.data.mC);
            }
        },
        size: 10,
        draw: 'simple',
        zIndex:'0'
    };
    

    var userName=parseInt(localStorage.getItem('userName'));
    // var type=parseInt(localStorage.getItem('tpage'));
    var type="3";
    //加载单位信息
    var loadData = function () {
        //json/SElec_GetMapData.json
       // console.log(type+'---'+userName);
       
        doAction(url+"/WebProject/DeviceProject.action?username="+userName, "GET", {type:type}, function (result) {
       // doAction("http://zlh18122711575.55555.io:16799/earlyPlatform/admin/project/FindArea.action?username="+userName, "GET", {type:type}, function (result) {    
            gLastResult = result;
            console.log(result);
            mapObj.clearOverlays();
           
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
            var opts = {
				width : 250,     // 信息窗口宽度
				height: 80,     // 信息窗口高度
				//title : "<p style='background: url(../images/kjbg.png);border: solid 1px #fff;box-shadow: inset 0px 0px 30px #fff;border-radius: 7px;padding:0px 0 0 12px;color:#fff;margin:0px;width:217px;height:25   px;'>信息窗口</p>" , // 信息窗口标题
                
				enableMessage:true//设置允许信息窗发送短息
			   };
                var arr=[];
            for(var i=0;i<data.length;i++){
               // console.log(data[i].data);
               var pt = new BMap.Point(data[i].geometry.coordinates[0],data[i].geometry.coordinates[1]);
               arr.push(pt);
               
            //    console.log(pt);https://www.baidu.com/?tn=98012088_4_dg&ch=14
            
		       var myIcon = new BMap.Icon("../images/beijing.png", new BMap.Size(10,10));
                var marker = new BMap.Marker(pt,{icon:myIcon});  // 创建标注
               // console.log(marker);
                var content =new BMap.Label("<div style='white-space:normal;color: #fff;background: url(../images/kjbg.png);box-shadow: inset 0px 0px 30px #fff;border-radius: 7px;padding:5px 0 0 12px; width:250px;height:90px;z-index:600'><p style='margin:0;'>项目名称:"+data[i].data.mC+"</p><p style='margin:0;'>项目地址"+data[i].data.address+"</p></div>");
               // console.log(content);
                map.addOverlay(marker);  
                addClickHandler(content,marker);
                
            }
           // console.log(arr);
    
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
        doAction(url+"/WebProject/DeviceAlarm.action?username="+userName, "GET", {type:type}, function (result) {
            console.log(result);
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
                console.log(v.value);
            })
            console.log(arr);
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
            
        })
    }
    var loadNum = function () {
        var type="3";
        doAction(url+"/WebProject/DeviceNum.action?username="+userName, "GET", {type:type}, function (result) {
            console.log(result);
            var DevAll = 0;
            $("#Dev01").html(result.alarm);
            $("#Dev02").html(result.deviceNum);
            $("#Dev03").html(result.online);
            var DevAllStr =  parseInt(result.deviceNum) +  parseInt(result.online);
            console.log(DevAllStr)
            DevAllStr = "000000" + DevAllStr;
            DevAllStr = DevAllStr.substr(DevAllStr.length-6,6);

            $("#Dev00").find(".numCell").each(function (i, v) {
                 $(v).html(DevAllStr.substr(i,1));
            });
        })
    }

    // 打开单位用电情况
    var openCom = function (comid,comName) {
        //window.top.OpenFrame("/ExtApp/SElectric?ComID=" + comid, 870, 600, "SElect", comName, "", function (r) {

        //});
        sessionStorage.setItem('ComID',comid);  
        sessionStorage.setItem('comName',comName);
        window.top.OpenFrame("./SElec_ElecComDetail.html?ComID=" + comid + "&ComName=" + escape(comName), 930, 620, "SElect", comName, "", function (r) {

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