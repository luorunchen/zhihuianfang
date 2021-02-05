function MapTool(box, map,mData) {


    var htmlBox = box;  //地图控件

    var mapObj = map;  //地图对象
   
    var mapData = mData;  //数据对象
    // console.log(mapData)
    // console.log(mapData.GetResult());
    var loadEvent = function () {
        var type = parseInt(localStorage.getItem('tpage'));
        // console.log(type);
        var userName = parseInt(localStorage.getItem('userName'));
        var username = userName;
        doAction(url + "/admin/project/GetMapDataFire.action", "GET", {
            username: username,
            type: type
        }, function (result) {
            console.log(result);
            $(".queryBut").click(function () {

                var pResult = $(".queryResult");
                pResult.empty();

                var txt = $(".queryText").val();
                if (txt == "") {
                    alert("请输入查询条件");
                    return;
                }


                //单位列表
                var lstCompany = mapData.GetResult();
                console.log(lstCompany);
                $.each(lstCompany, function (i, v) {
                    //console.log(v);
                    if (v.MC.indexOf(txt) >= 0 || v.areaMC.indexOf(txt) >= 0 || v.address.indexOf(txt) >= 0) {
                        var thtml = "<div class=\"resultItem\">";
                        thtml += "<div class=\"resultTitle\">" + v.MC + "</div>";
                        thtml += "<div class=\"resultText\">地址：" + v.address + "</div>";
                        if (v.fireManagerTel && v.fireManagerTel != "") {
                            thtml += "<div class=\"resultText\">电话：" + v.fireManagerTel + "</div>";
                        }
                        thtml += "</div>";

                        var pItem = $(thtml);
                        CompanyClick(pItem, v);
                        pItem.appendTo(pResult);
                    }
                });

            });




            //报警明细
            $("#ElecDeviceSum").find(".numItem").click(function () {
                var tt = $(this).attr("data-sign");
                // console.log(result);
                if (tt == "01") {
                    var BH = result[0].isOffDevice;    //离线
                } else if (tt == "03") {
                    var BH = result[0].fasOnLst;  //在线
                }  
                console.log(BH);
                    //json/SWater_DetailWaterAlarm.json
                doAction(url+"/admin/project/SElec_DetailElecDevice.action?pid="+BH, "GET", { Status: tt }, function (res) {
                    //alert(111);
                    console.log(res);
                    var pResult = $(".queryResult");
                    pResult.empty();

                    //单位列表
                    var lstCompany = mapData.GetResult();
                    //   console.log(lstCompany);
                    
                    $.each(res, function (i, v) {

                        var comObj = null;
                        $.each(lstCompany, function (t, c) {
                            if (c.ID == v.BH) {
                                comObj = c;
                                return false;
                            }
                        });
                        console.log(comObj)
                        var thtml = "<div class=\"resultItem\">";

                        if (comObj) {
                            thtml += "<div class=\"resultTitle\">" + (i + 1) + "、" + comObj.MC + "</div>";
                            thtml += "<div class=\"resultText\">地址：" + comObj.address + "</div>";
                            if (comObj.fireManagerTel && comObj.fireManagerTel != "") {
                                thtml += "<div class=\"resultText\">电话：" + comObj.fireManagerTel + "</div>";
                            }
                        } else {
                            thtml += "<div class=\"resultText\">公司：" + v.BH + "</div>";
                        }
                        thtml += "<div class=\"resultText\">报警：" + v.value + "次</div>";
                        thtml += "</div>";

                        var pItem = $(thtml);
                        CompanyClick(pItem, comObj);
                        pItem.appendTo(pResult);

                    });

                });
            });
        })

        
    }


    //点击单位查询结果
    var CompanyClick = function (pobj, data) {

        pobj.click(function () {
            if (data){
                var point = new BMap.Point(data.MLng, data.MLat);
                mapObj.centerAndZoom(point, 14);
                mapData.OpenDetail(data);
            }
        });
    }
    //点击单位查询结果
    var DeviceClick = function (pobj, comObj, data) {
            
        pobj.click(function () {
            if (comObj){
                var point = new BMap.Point(comObj.MLng, comObj.MLat);
                mapObj.centerAndZoom(point, 14);
            }
           // window.top.OpenSelFrame("./ExtApp_Water_IndexLand.html?DevBH=" + data.BH, 800, 600, "win", "报警数据",null,null,true);
        });
    }


    //清除痕迹
    this.Clear = function (vg) {

    }

    //加载数据
    this.Open = function () {
        this.Clear();
        loadEvent();
    }


}