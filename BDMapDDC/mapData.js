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
               // console.log(item);
                openCom(item.data.pid, item.data.name);
            }
        },
        size: 10,
        draw: 'simple'
    };
    
    // //播放次数

    // var playNum = 0;

    // //获取音频对象
    // var audio = $("#auto")[0];
    // audio.addEventListener("ended", function () {
    //     if (playNum > 0) {
    //         playNum--;
    //         audio.play();
    //     }
    // }, false)


    // //播放报警
    // var playAlarm = function () {
    //     playNum = 2;
    //     audio.play();
    // }

    //加载单位信息
    var loadCompany = function () {
            //json/SGasAlarm_LoadCompany.json
            var type=parseInt(localStorage.getItem('tpage'));
            var userName=parseInt(localStorage.getItem('userName'));
            var username=userName;
        doAction(url+"/electrombile/getquyu.action", "GET", {username:username,labeltype:type}, function (result) {
            gLastResult = result;
          // console.log(gLastResult);
            // console.log(gLastResult.length);
            console.log(result);      
            showCompany({});
            loadData();
        });
    }

    var AlarmOverlay = []; //报警覆盖物
    var showCompany = function (pfilter) {
       // console.log(pfilter);   
        //添加大数据单位点
        //console.log(gLastResult.Company)
        var Company=[];
            Company.push(gLastResult);
           // console.log(Company);
           // console.log(Company[0].length);
        var data = [];
       // var comids = ","+gLastResult.gas[0].lstGasAlarm+",";
        
        for (var i = 0; i < Company[0].length; i++) {
            var pp = Company[0][i];
           // console.log(pp);
            var lng=pp.long_latbai.split(',')[1];   
            var lat=pp.long_latbai.split(',')[0];
                //如果pfilter 不为null 才开始执行以下判断
              //  console.log(pfilter);
           
            // if (pfilter != null) {
            //       //1.查询
            //     if (pfilter.QueryText) {
            //         if (pp.MC.indexOf(pfilter.QueryText) < 0) {
            //             continue;
            //         }
            //     }
              
            //     if (pfilter.GasDevice) {   //gLastResult  报警数据
            //             //在线设备
            //         if (pfilter.GasDevice == "LstDevice01Company") {
            //           //  console.log(1);
            //             // ,"593,575,572,590",.indexOf(,590,)
            //             if (("," + gLastResult.gas[0].lstDevice01Company + ",").indexOf("," + pp.ID + ",") < 0) {
            //                 continue;
            //             }
            //         }
            //             //离线设备
            //         if (pfilter.GasDevice == "LstDevice02Company") {
            //             // ,"584,587,593,23,575",.indexOf(,590,)
            //             $.each(AlarmOverlay, function (i, v) {
            //                 mapObj.removeOverlay(v);
            //             });
            //             if (("," + gLastResult.gas[0].lstDevice02Company + ",").indexOf("," + pp.ID + ",") < 0) {
            //                 continue;
            //             }
            //         }
            //             //告警设备
            //         if (pfilter.GasDevice == "LstDevice03Company") {         
            //             if (("," + gLastResult.gas[0].lstDevice03Company + ",").indexOf("," + pp.ID + ",") < 0) {
            //                 continue;
            //             }
            //         }
            //             //到期设备
            //         if (pfilter.GasDevice == "LstDeviceTrippingCompany") {
            //             $.each(AlarmOverlay, function (i, v) {
            //                 mapObj.removeOverlay(v);
            //             });
            //             if (("," + gLastResult.gas[0].lstDeviceTrippingCompany + ",").indexOf("," + pp.ID + ",") < 0) {
            //                 continue;
            //             }
            //         }
            //     }
                
            // }
            
            // if (comids != "") {
            //   //   console.log(comids);  
            //     if (comids.indexOf(',' + pp.ID + ',' ) >= 0) { //添加报警点
            //         var point = new BMap.Point(lng, lat);
            //         var tm = new MyFocus(point, pp.MC);
            //         tm.Data = pp;
            //         mapObj.addOverlay(tm);
            //         AlarmOverlay.push(tm);
            //     }
            // }
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
        console.log(data);

        var NumStr = "000000" + Company[0].length;
        
            NumStr = NumStr.substr(NumStr.length - 6, 6);
           // console.log(NumStr);
            $("#Alarm00").find(".numCell").each(function (i, v) {
                $(v).html(NumStr.substr(i, 1));
            });
           
            $("#Alarm01").html( Company[0].length+"个");
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
                    var content =new BMap.Label("<div style='white-space:normal;color: #fff;background: url(../images/kjbg.png);box-shadow: inset 0px 0px 30px #fff;border-radius: 7px;padding:5px 0 0 12px; width:250px;height:90px;z-index:600'><p style='margin:0;'>项目名称:"+data[i].data.name+"</p><p style='margin:0;'>项目地址"+data[i].data.location+"</p></div>");
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
        doAction(url+"/electrombile/GetMapDataFire.action", "GET", {username:username,labeltype:type}, function (result) {
     //   doAction("http://zlh18122711575.55555.io:16799/earlyWarn/admin/project/GetMapDataFire.action", "GET", {username:username,type:type}, function (result) {
                console.log(result);
            //lastAlarm = result.gas[0].lastAlarm;
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
            if (result.list[0].count && result.list[0].count.length > 0) {
                playAlarm();
               // pItem[0].scrollIntoView();
            }


            // var NumStr = "000000" + result.list[0].dvCount;
            // NumStr = NumStr.substr(NumStr.length - 6, 6);

            // $("#Alarm00").find(".numCell").each(function (i, v) {
            //     $(v).html(NumStr.substr(i, 1));
            // });
           
            // $("#Alarm01").html(result.gas[0].alarmCompanyNum+"个");
            //$("#Alarm02").html(result.LocalServiceNum+"次");
            //$("#Alarm03").html(result.RemoteServiceNum + "次");
            //$("#Alarm04").html(result.CompanyServiceNum + "次");
            

            $("#Dev01").html(result.list[0].dvCount);

            $("#Dev02").html(result.list[0].count);

            // $("#Dev03").html(result.gas[0].lstDevice03);
            // $("#Dev04").html(result.gas[0].lstDeviceTripping);

            var DevAllStr = result.list[0].dvCount + "";
            DevAllStr = "000000" + DevAllStr;
            DevAllStr = DevAllStr.substr(DevAllStr.length-6,6);

            $("#Dev00").find(".numCell").each(function (i, v) {
                 $(v).html(DevAllStr.substr(i,1));
            });

            //setTimeout(loadData, 300000);
        });
    }

    //点击单位查询结果
    var CompanyClick = function (pobj, pp, pcom) {
        pobj.click(function () {
            if (pp) {
                if (pcom.MLng!==null){
                    var point = new BMap.Point(pcom.MLng, pcom.MLat);
                    mapObj.centerAndZoom(point, 18);
                }
                openCom(pcom.ID, pcom.MC)
            }
        });
    }


    //打开单位用电情况
    var openCom = function (comid,comName) {
       // console.log(comid);
       // console.log(comName);
        sessionStorage.setItem('ComID',comid);  
        window.top.OpenFrame("./DDCAlarm_AlarmDetail.html?ComID=" + comid + "&ComName=" + escape(comName), 1220, 620, "SGas", comName, "", function (r) {

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