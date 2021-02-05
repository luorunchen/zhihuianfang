function MapData(box, map) {


    var htmlBox = box;  //地图控件

    var mapObj = map;  //地图对象
    var panoramaService = new BMap.PanoramaService();   //3D场景服务

    var panorama = null;//mapObj.getPanorama();
    var loadEvent = function () {

        //$(".chartLabel").click(function () {
        //    $(".chartBox").addClass("chartBoxShow");
        //    loadChart();
        //});

        //$(".chartBut").click(function () {
        //    $(".chartBox").removeClass("chartBoxShow");
        //    $('.chartBody').empty();
        //});


        $("#service01").click(function (e) {
            $(".MapBox").MapWhere("接入单位", "GasCompany", "true");
        });

        //$("#service02").click(function (e) {
        //    $(".MapBox").MapWhere("现场服务单位", "LocalService", "true");
        //});
        //$("#service03").click(function (e) {
        //    $(".MapBox").MapWhere("远程服务单位", "RemoteService", "true");
        //});
        //$("#service04").click(function (e) {
        //    $(".MapBox").MapWhere("反馈单位", "CompanyService", "true");
        //});

        //地址查询   查询
        $("#butSuggest").click(function () {

            var tv = $("#suggestId").val();
            if (tv == null || tv == undefined || tv == "") {
                return;
            }

            $(".MapBox").MapWhere(tv, "QueryText", tv);
        });

        $("#dev01").click(function (e) {
            // $(".MapBox").MapWhere("在线设备", "ElecDevice", "LstDevice01Company");
            $(".MapBox").MapWhere("在线设备", "GasDevice", "LstDevice01Company");
        });

        $("#dev02").click(function (e) {
            $(".MapBox").MapWhere("离线设备", "GasDevice", "LstDevice02Company");
        });
        $("#dev03").click(function (e) {
            $(".MapBox").MapWhere("告警设备", "GasDevice", "LstDevice03Company");
        });

        $("#dev04").click(function (e) {
            $(".MapBox").MapWhere("到期设备", "GasDevice", "LstDeviceTrippingCompany");
        });

        $(".moreAlarm").click(function (e) {

            window.top.OpenFrame("SGasAlarm/GasAlarmLog?MenuCode=GasAlarmLog", 870, 600, "SGas", "报警历史", "", function (r) {

            });

        });


    }


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
    var AlarmOverlay = [];
    //获取音频对象
    var audio = $("#alarmAudio")[0];
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
            //json/SFASAlarm_LoadCompany.json
            var type=parseInt(localStorage.getItem('tpage'));
           // console.log(type);
           var username=parseInt(localStorage.getItem('userName'));
           
        doAction(url+"/admin/project/GetMapDataFire.action", "GET", {username:username,type:type}, function (result) {
       // doAction("http://zlh18122711575.55555.io:16799/earlyPlatform/admin/project/LoadCompany.action?username="+userName, "GET", {type:type}, function (result) {
            gLastResult = result;
            console.log(gLastResult);
            showCompany({});
            loadData();
        });

        $("#FAS03").click(function (e) {
           
            $(".MapBox").MapWhere("到期设备", "FasDevice", "LstDeviceIsOff");
        });
    }


    var showCompany = function (pfilter) {
       //    console.log(pfilter);
        //添加大数据单位点
        var data = [];
        var comids = ","+gLastResult.FASAlarmLst[0]+",";
           //console.log(comids);
        for (var i = 0; i < gLastResult.pro.length; i++) {
            var pp = gLastResult.pro[i];
            var lng=pp.comName.split(',')[1];   
            var lat=pp.comName.split(',')[0];
           // console.log(pp);
            if (pfilter != null) {
                if (pfilter.QueryText) {
                    $.each(AlarmOverlay, function (i, v) {
                        mapObj.removeOverlay(v);
                    });
                    if (pp.MC.indexOf(pfilter.QueryText) < 0) {
                        continue;
                    }
                }
                // if (pfilter.FasDevice) {
                    
                    //     if (pfilter.FasDevice == "LstDeviceIsOff") {
                    //       //  console.log(gAlarmResult.isOffDevice);
                    //         if (("," + gAlarmResult.isOffDevice + ",").indexOf("," + pp.ID + ",") < 0) {
                    //             continue;
                    //         }
                    //     }

                    //     if (pfilter.FasDevice == "LstDevice02Company") {
                    //         if (("," + gAlarmResult.LstDevice02Company + ",").indexOf("," + pp.ID + ",") < 0) {
                    //             continue;
                    //         }
                    //     }


                    //     if (pfilter.FasDevice == "LstDevice03Company") {
                    //         if (("," + gAlarmResult.LstDevice03Company + ",").indexOf("," + pp.ID + ",") < 0) {
                    //             continue;
                    //         }
                    //     }
                    // }
            }
            

            
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
    

    //加载报警数据
    var loadData = function () {
        var username=parseInt(localStorage.getItem('userName'));
        var type=parseInt(localStorage.getItem('tpage'));
    	try {
    	    //json/SFASAlarm_GetMapData.json
            doAction(url+"/admin/project/GetMapDataFire.action", "GET", { username:username,type:type }, function (result) {
              //  console.log(result);
                lastAlarm = result.lastAlarm;
                gAlarmResult = result;
               // console.log(gAlarmResult);
                

                $(".alarmBox").empty();//当前报警

                //添加大数据单位点
                // var comids = ",";
                
                // for (var i = 0; i < result.FASAlarmLst.length; i++) {
                //     var pp = result.FASAlarmLst[i];
                //     //console.log(pp);
                //   //  console.log(result.FASAlarmLst[i]);
                //     if (comids.indexOf(',' + pp + ',') <= 0) { //添加报警点
                //         for (var t = 0; t < gLastResult.length; t++) {
                //             var pcom = gLastResult[t];
                //            // console.log(pcom);
                //             if (pcom.ID != pp) {
                //                 continue;
                //             }
                //             var point = new BMap.Point(pcom.MLng, pcom.MLat);
                //             var tm = new MyFocus(point, pcom.MC);
                //            // console.log(tm);
                //             tm.Data = pp;
                //             mapObj.addOverlay(tm);
                //             AlarmOverlay.push(tm);
                //         }
                //         comids += pp + ",";
                //     }
                //    // console.log(comids);

                //     //单位列表
                //     // var thtml = "<div class=\"alarmItem\"  data-sign=\"" + pp.DATA_NO + "\" data-DevBH=\"" + pp.TRANSDEVICEID + "\">";
                //     // thtml += "<div class=\"resultTitle\">" + pp.ComName + "</div>";
                //     // thtml += "<div class=\"resultText\">位置：" + pp.DATA_POS + "</div>";
                //     // thtml += "<div class=\"resultText\">原因：" + pp.WARNING_INFO + "</div>";
                //     // thtml += "<div class=\"resultText\">时间：" + pp.HAPPENTIME + "</div>";
                //     // if (pp.WARNING_INFO.indexOf("类型") > 0) {
                //     //     var result = pp.WARNING_INFO.substr(pp.WARNING_INFO.indexOf("类型") + 3, pp.WARNING_INFO.length-1);
                //     //     if (result.length >1) {
                //     //         thtml += "<div class=\"resultText\">探测器类型：" + result + "</div>";
                //     //     }
                //     //     else {
                //     //         thtml += "<div class=\"resultText\">探测器类型：其他</div>";
                //     //     }
                //     // }
                //     // else if (pp.WARNING_INFO.indexOf(pp.DATA_NAME) > 0) {
                //     //     thtml += "<div class=\"resultText\">探测器类型：" + pp.DATA_NAME + "</div>";
                //     // }
                //     // else {
                //     //     thtml += "<div class=\"resultText\">探测器类型：其他</div>";
                //     // }
                    
                //     // thtml += "</div>";

                //     // var pItem = $(thtml);
                //     //CompanyClick(pItem, pp);
                //    // pItem.appendTo($(".AlarmResult"));
                // }

                //播放报警
                if (result.FASAlarmLst && result.FASAlarmLst.length > 0) {
                    playAlarm();
                  //  pItem[0].scrollIntoView();
                }

                $("#FAS01").html(result.FASAlarm);
                $("#FAS02").html(result.FasOn);
                $("#FAS03").html(result.FasOff);
                var AllNum=result.FasOn + result.FasOff;
                console.log(AllNum)
                NumStr = "000000" +AllNum;
                NumStr = NumStr.substr(NumStr.length - 6, 6);

                $("#FASAlarm").find(".numCell").each(function (i, v) {
                    $(v).html(NumStr.substr(i, 1));
                });

            });
		} catch (e) {
			
		}
    }

    //打开单位火灾自动报警情况
    var openCom = function (OwnComID, OwnComName, vv) {
        //console.log($(".AlarmResult"));
        //var tt = $(".AlarmResult").find(".alarmItem");
        var K = "";
        if (vv != "" && vv != null && vv != undefined) {
            K = vv.ID;
        }
          sessionStorage.setItem('OwnComID',OwnComID);   
        window.top.OpenFrame("SFASAlarm_FASComDetail.html?ComID=" + OwnComID + "&ComName=" + escape(OwnComName) + "&FasID=" + K, 930, 620, "FasUnitState", OwnComName, "", function (r) {
            if (r) {
                loadData();
                $(".AlarmResult").find(".alarmItem").each(function () {
                    if ($(this).attr("data-sign") == vv.DATA_NO && $(this).attr("data-DevBH") == vv.TRANSDEVICEID) {
                        $(this).remove();
                    }
                });
            }
        });
    }

    //点击单位查询结果
    var CompanyClick = function (pobj, pp) {

        pobj.click(function () {
            if (pp) {

                openCom(pp.ComID, pp.ComName, pp);

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
       
        //地址查询
        $("#butSuggest").click(function () {

            var tv = $("#suggestId").val();
            if (tv == null || tv == undefined || tv == "") {
                return;
            }

            $(".MapBox").MapWhere(tv, "QueryText", tv);
        });

        $(".moreAlarm").click(function (e) {

            window.top.OpenFrame("./SElecAlarm/ElecAlarmLog?MenuCode=ElecAlarmLog", 870, 600, "SElect", "报警历史", "", function (r) {

            });

        });


    }


}