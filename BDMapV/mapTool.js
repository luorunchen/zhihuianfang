function MapTool(box, map,mData) {


    var htmlBox = box;  //地图控件

    var mapObj = map;  //地图对象
   
    var mapData = mData;  //数据对象
    // console.log(mapData)
    // console.log(mapData.GetResult());
    var userName = parseInt(localStorage.getItem('userName'));
    var region = localStorage.getItem('region');
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
            var lstCompany = mapData.GetResult().Company;
            // console.log(txt)
                $.each(lstCompany, function (i, v) {
                    if (v.mC.indexOf(txt) >= 0 || v.address.indexOf(txt) >= 0) {
                        var thtml = "<div class=\"resultItem\">";
                        thtml += "<div class=\"resultTitle\">" + v.mC + "</div>";
                        thtml += "<div class=\"resultText\">地址：" + v.address + "</div>";
                        thtml += "</div>";
                        var pItem = $(thtml);
                        CompanyClick(pItem, v);
                        pItem.appendTo(pResult);
                    }
                });
        });

        $(".chartLabel").click(function () {
            $(".chartBox").addClass("chartBoxShow");
            loadChart();
        });

        $(".chartBut").click(function () {
            $(".chartBox").removeClass("chartBoxShow");
            $('.chartBody').empty();
        });

        //设备明细
        $("#ElecDeviceSum").on('click', '.numItem', function () {
            //$("#ElecDeviceSum").find(".numItem").click(function () {
            var that = $(this);
            $.ajax({
                tyle: 'get',
                url: url + '/WebProject/DeviceNum.action',
                data: 'username=' + username + '&type=9,13,20' +'&region='+region,
                error: function (error) {
                    console.log(error + '网络错误')
                },
                success: function (result) {
                    console.log(result);
                    var tt = that.attr("data-sign");
                    if (tt == '01') {  //报警
                        var BH = result.offlinePid;
                    } else if (tt == '03') {  //在线
                        var BH = result.onlinePid;
                    }
                    // console.log(BH)
                    if (BH != "") {
                        doAction(url + "/admin/project/SElec_DetailElecDevice.action?pid=" + BH, "POST", {
                            Status: tt
                        }, function (result) {
                            var pResult = $(".queryResult");
                            pResult.empty();
                            // console.log(result);
                            //单位列表
                            var lstCompany = mapData.GetResult().Company; //所有电器的项目
                            // console.log(lstCompany)
                            $.each(result, function (i, v) {

                                var comObj = null;
                                $.each(lstCompany, function (t, c) {
                                    if (c.iD == v.BH || c.iD == 'z' + v.BH) {
                                        comObj = c;
                                        return false;
                                    }
                                });
                                // console.log(comObj)
                                var thtml = "<div class=\"resultItem\">";

                                if (comObj) {
                                    thtml += "<div class=\"resultTitle\">" + (i + 1) + "、" + comObj.mC + "</div>";
                                    thtml += "<div class=\"resultText\">地址：" + comObj.address + "</div>";
                                    if (comObj.fireManagerTel && comObj.fireManagerTel != "") {
                                        thtml += "<div class=\"resultText\">电话：" + comObj.f
                                        ireManagerTel + "</div>";
                                    }
                                }

                                thtml += "<div class=\"resultText\">编号：" + v.BH + "</div>";
                                thtml += "<div class=\"resultText\">位置：" + v.text + "</div>";
                                thtml += "</div>";

                                var pItem = $(thtml);
                                CompanyClick(pItem, comObj);
                                pItem.appendTo(pResult);

                            });

                        });
                    }
                }
            })



        });


    }


    //点击单位查询结果
    var CompanyClick = function (pobj, data) {
        console.log(data)
        pobj.click(function () {
            if (data){
                var lng=data.long_latbai.split(',')[1];   
                var lat=data.long_latbai.split(',')[0];   
                if (lat > 54) { // 纬度
                    var lng = data.long_latbai.split(',')[0]; //经度
                    var lat = data.long_latbai.split(',')[1]; //纬度
                } else {
                    var lng = data.long_latbai.split(',')[1];
                    var lat = data.long_latbai.split(',')[0];
                } 
                var point = new BMap.Point(lng, lat);
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