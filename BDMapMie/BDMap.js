(function ($) {
    var htmlBox = null;
    
    var mapObj = null;  //地图对象
   
   

    var gMapData = null;
   
    var gMapTool = null;
   

    $.fn.OpenMap = function () {

        var mapBox = this[0];
        var lat=localStorage.getItem('firstInfo').toString().split(',')
        var point = new BMap.Point(parseFloat(lat[0]),parseFloat(lat[1]));
        mapObj = new BMap.Map(mapBox, { enableMapClick: false});
        mapObj.addControl(new BMap.NavigationControl({ anchor: BMAP_ANCHOR_TOP_LEFT, offset: new BMap.Size(0, 100) }));
        mapObj.addControl(new BMap.MapTypeControl({ mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP], offset: new BMap.Size(0, 80) }));
      
       mapObj.centerAndZoom(point,8);
        mapObj.enableScrollWheelZoom(true);

        mapObj.setMapStyle({ style: "midnight" });


       // searchPos(mapObj);
        //searchPos();

        var panorama = mapObj.getPanorama();

        if (gMapData == null) {
            gMapData = new MapData(htmlBox, mapObj);
        }
        gMapData.Open();

        if (gMapTool == null) {
            gMapTool = new MapTool(htmlBox, mapObj, gMapData);
        }
        gMapTool.Open()
        
        
    };
    //var searchPos = function () {
    //    var tzoom =  10;

    //    var localSearch = new BMap.LocalSearch(window.top.gCity, { //智能搜索
    //        pageCapacity: 30,
    //        onSearchComplete: function (result) {
    //            if (localSearch.getStatus() != BMAP_STATUS_SUCCESS) {
    //                return;
    //            }
    //            if(result.getCurrentNumPois()>0){
    //                var pInfor = result.getPoi(0);
    //                mapObj.centerAndZoom(pInfor.point, tzoom);
    //            }
    //        }
    //    });
    //    localSearch.search(window.top.gZoom);
    //}

    var setMapStyle = function () {


        // 地图自定义样式
        mapObj.setMapStyle({
            styleJson: [{
                "featureType": "water",
                "elementType": "all",
                "stylers": {
                    "color": "#044161"
                }
            }, {
                "featureType": "land",
                "elementType": "all",
                "stylers": {
                    "color": "#091934"
                }
            }, {
                "featureType": "boundary",
                "elementType": "geometry",
                "stylers": {
                    "color": "#064f85"
                }
            }, {
                "featureType": "railway",
                "elementType": "all",
                "stylers": {
                    "visibility": "off"
                }
            }, {
                "featureType": "highway",
                "elementType": "geometry",
                "stylers": {
                    "color": "#004981"
                }
            }, {
                "featureType": "highway",
                "elementType": "geometry.fill",
                "stylers": {
                    "color": "#005b96",
                    "lightness": 1
                }
            }, {
                "featureType": "highway",
                "elementType": "labels",
                "stylers": {
                    "visibility": "on"
                }
            }, {
                "featureType": "arterial",
                "elementType": "geometry",
                "stylers": {
                    "color": "#004981",
                    "lightness": -39
                }
            }, {
                "featureType": "arterial",
                "elementType": "geometry.fill",
                "stylers": {
                    "color": "#00508b"
                }
            }, {
                "featureType": "poi",
                "elementType": "all",
                "stylers": {
                    "visibility": "off"
                }
            }, {
                "featureType": "green",
                "elementType": "all",
                "stylers": {
                    "color": "#056197",
                    "visibility": "off"
                }
            }, {
                "featureType": "subway",
                "elementType": "all",
                "stylers": {
                    "visibility": "off"
                }
            }, {
                "featureType": "manmade",
                "elementType": "all",
                "stylers": {
                    "visibility": "off"
                }
            }, {
                "featureType": "local",
                "elementType": "all",
                "stylers": {
                    "visibility": "off"
                }
            }, {
                "featureType": "arterial",
                "elementType": "labels",
                "stylers": {
                    "visibility": "off"
                }
            }, {
                "featureType": "boundary",
                "elementType": "geometry.fill",
                "stylers": {
                    "color": "#029fd4"
                }
            }, {
                "featureType": "building",
                "elementType": "all",
                "stylers": {
                    "color": "#1a5787"
                }
            }, {
                "featureType": "label",
                "elementType": "all",
                "stylers": {
                    "visibility": "off"
                }
            }, {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": {
                    "color": "#ffffff"
                }
            }, {
                "featureType": "poi",
                "elementType": "labels.text.stroke",
                "stylers": {
                    "color": "#1e1c1c"
                }
            }, {
                "featureType": "administrative",
                "elementType": "labels",
                "stylers": {
                    "visibility": "off"
                }
            }, {
                "featureType": "road",
                "elementType": "labels",
                "stylers": {
                    "visibility": "off"
                }
            }]
        });

    }


    //显示信息窗口
    var showInfor = function (marker, title, pInfor) {
        var sContent = "<div class=\"InforBox\">";
        sContent += "<h5>" + title + "</h5>";
        sContent += "<div class=\"InforText\">详情：" + pInfor.address + "</div>";
        if (pInfor.phoneNumber) {
            sContent += "<div class=\"InforText\">电话：" + pInfor.phoneNumber + "</div>";
        }
        sContent += "<div class=\"InforButBox\">";
        sContent += "<button type=\"button\" class=\"btn btn-success\" id=\"SetCompany\">关联单位</button>";

        sContent += "</div>"
        var infoWindow = new BMap.InfoWindow(sContent);  // 创建信息窗口对象

        infoWindow.addEventListener("open", function () {

            htmlBox.find("#SetCompany").click(function (e) {

                var pos = marker.getPosition();
                var pmc = pInfor.address;
                

                var pot = title.indexOf('-');
                if (pot > 0) {
                    title = title.substr(pot + 1);
                }
                //alert(pos);
                window.top.OpenSelFrame("../DDept/DCompanySel?MenuCode=DCompanySel&QueryMC=" + escape(title), 1000, 500, "DDCompany", "单位定位", "", function (r) {
                    if (r) {
                        doAction("BDMap/SavePos", "POST", { "ComIDs": r.RecComID, "Lng": pos.lng, "Lat": pos.lat }, function (result) {
                            if (result.Success == true) {
                                gMapData.Open();
                            }
                        });
                    }
                });
            });
        });
        marker.openInfoWindow(infoWindow); //开启信息窗口

    }

   
  
})(jQuery);

$(document).ready(function () {
    $(".MapBox").OpenMap();
});


