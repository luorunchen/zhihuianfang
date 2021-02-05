function MapTool(box, map, mData) {


    var htmlBox = box; //地图控件

    var mapObj = map; //地图对象

    var mapData = mData; //数据对象

    var loadEvent = function () {
        $(".queryBut").click(function () {

            var pResult = $(".queryResult");
            pResult.empty();

            var txt = $(".queryText").val();
            if (txt == "") {
                alert("请输入查询条件");
                return;
            }


            //单位列表
            var lstCompany = mapData.GetResult().pro;
            console.log(lstCompany);
            $.each(lstCompany, function (i, v) {
                console.log(v)
                if (v.MC.indexOf(txt) >= 0 || v.areaMC.indexOf(txt) >= 0 || v.address.indexOf(txt) >= 0) {
                    console.log(v);
                    var thtml = "<div class=\"resultItem\">";
                    thtml += "<div class=\"resultTitle\">" + (i + 1) + "、" + v.address + "</div>";
                    thtml += "<div class=\"resultText\">地址：" + v.MC + "</div>";
                    if (v.fireManagerTel && v.fireManagerTel != "") {
                        thtml += "<div class=\"resultText\">电话：" + v.fireManagerTel + "</div>";
                    }
                    thtml += "</div>";

                    var pItem = $(thtml);
                    console.log(pItem)
                    CompanyClick(pItem, v);
                    pItem.appendTo(pResult);
                }
            });

        });




        //报警明细
        $("#ElecDeviceSum").find(".numItem").click(function () {
            var tt = $(this).attr("data-sign");
            console.log(tt);
            console.log(mapData.GetResult().FASAlarmLst)
            var BH = [];
            if (tt == "01") {
                var lstCompany = mapData.GetResult().FASAlarmLst; //设备报警
            } else if (tt == "02") {
                var lstCompany = mapData.GetResult().FasOnLst; //设备在线
            } else {
                var lstCompany = mapData.GetResult().isOffDevice; //设备离线
            }
            console.log(lstCompany);
            if(lstCompany==[]||lstCompany.length==0){
                var html="";
                $('.queryResult').html(html);
            }else{
                doAction(url + "/admin/project/SElec_DetailElecDevice.action?pid=" + lstCompany, "GET", {Status: tt}, function (result) {
                    //alert(111);
                    console.log(result);
                    var pResult = $(".queryResult");
                    pResult.empty();
                    if (result.mess == "") {
                        console.log(1)
                    } else {
                        //单位列表
                        var all=mapData.GetResult().pro;
                        console.log(all)
                        $.each(all, function (i, v) {
                             console.log(v)
                            var comObj = null;
                            $.each(result, function (t, c) {
                                 console.log(c)
                                if (v.ID == c.BH  ) {
                                    comObj = c;
                                    return false;
                                }
                            });
                            console.log(comObj)
                            var thtml = "<div class=\"resultItem\">";
                            if (comObj) {
                                thtml += "<div class=\"resultTitle\">" + (i + 1) + "、" + comObj.text + "</div>";
                                thtml += "<div class=\"resultText\">地址：" + v.address + "</div>";
                            } else {
                                thtml += "<div class=\"resultText\">公司：" + comObj.text + "</div>";
                            }
                            thtml += "<div class=\"resultText\">报警：" + comObj.value + "次</div>";
                            thtml += "</div>";
                            var pItem = $(thtml);
                            console.log(pItem)
                            CompanyClick(pItem, v);
                            pItem.appendTo(pResult);
                        })
                    }
                });
            }
           
        });



    }


    //点击单位查询结果
    var CompanyClick = function (pobj, data) {
        console.log(pobj);
        console.log(data);
        pobj.click(function () {
            console.log(data);
            if (data) {
                
                var point = new BMap.Point(data.MLng, data.MLat);
                mapObj.centerAndZoom(point, 14);
                mapData.OpenDetail(data);
            }
        });
    }
    //点击单位查询结果
    var DeviceClick = function (pobj, comObj, data) {         
		pobj.click(function () {
            if (comObj) {
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