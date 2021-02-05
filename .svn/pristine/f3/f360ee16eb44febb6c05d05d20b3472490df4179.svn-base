(function ($) {
    var htmlBox = null;

    var mapObj = null;  //地图对象



    var gMapData = null;

    var gMapTool = null;


    $.fn.OpenMap = function () {

        var mapBox = this[0];
        // console.log(mapBox);
        var lat=localStorage.getItem('firstInfo').toString().split(',')
        var point = new BMap.Point(parseFloat(lat[0]),parseFloat(lat[1]));
        mapObj = new BMap.Map(mapBox, { enableMapClick: false });
        mapObj.addControl(new BMap.NavigationControl({ anchor: BMAP_ANCHOR_TOP_LEFT, offset: new BMap.Size(0, 100) }));
        mapObj.addControl(new BMap.MapTypeControl({ mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP], offset: new BMap.Size(0, 80) }));

        mapObj.centerAndZoom(point, 8);
       // mapObj.setCurrentCity("深圳");
        mapObj.enableScrollWheelZoom(true);

        // mapObj.setMapStyle({ style: "midnight" });
        setMapStyle()
        var numLabel = new BMap.Label();
        numLabel.setStyle({ 
            color : "#fff", 
            fontSize : "16px", 
            backgroundColor :"#red",
            border :"0", 
            fontWeight :"bold" 
        });

        //searchPos();
        //searchPos(mapObj);

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
    // var searchPos = function () {
    //     var tzoom = 10;

    //     var localSearch = new BMap.LocalSearch(window.top.gCity, { //智能搜索
    //         pageCapacity: 30,
    //         onSearchComplete: function (result) {
    //             if (localSearch.getStatus() != BMAP_STATUS_SUCCESS) {
    //                 return;
    //             }
    //             if (result.getCurrentNumPois() > 0) {
    //                 var pInfor = result.getPoi(0);
    //                 mapObj.centerAndZoom(pInfor.point, tzoom);
    //             }
    //         }
    //     });
    //     localSearch.search(window.top.gZoom);
    // }

    var setMapStyle = function () {


        // 地图自定义样式
        mapObj.setMapStyle({
            styleJson: [
                {
                          "featureType": "water",
                          "elementType": "all",
                          "stylers": {
                                    "color": "#021019"
                          }
                },
                {
                          "featureType": "highway",
                          "elementType": "geometry.fill",
                          "stylers": {
                                    "color": "#000000"
                          }
                },
                {
                          "featureType": "highway",
                          "elementType": "geometry.stroke",
                          "stylers": {
                                    "color": "#147a92"
                          }
                },
                {
                          "featureType": "arterial",
                          "elementType": "geometry.fill",
                          "stylers": {
                                    "color": "#000000"
                          }
                },
                {
                          "featureType": "arterial",
                          "elementType": "geometry.stroke",
                          "stylers": {
                                    "color": "#0b3d51"
                          }
                },
                {
                          "featureType": "local",
                          "elementType": "geometry",
                          "stylers": {
                                    "color": "#000000"
                          }
                },
                {
                          "featureType": "land",
                          "elementType": "all",
                          "stylers": {
                                    "color": "#08304b"
                          }
                },
                {
                          "featureType": "railway",
                          "elementType": "geometry.fill",
                          "stylers": {
                                    "color": "#000000"
                          }
                },
                {
                          "featureType": "railway",
                          "elementType": "geometry.stroke",
                          "stylers": {
                                    "color": "#08304b"
                          }
                },
                {
                          "featureType": "subway",
                          "elementType": "geometry",
                          "stylers": {
                                    "lightness": -70
                          }
                },
                {
                          "featureType": "building",
                          "elementType": "geometry.fill",
                          "stylers": {
                                    "color": "#000000"
                          }
                },
                {
                          "featureType": "all",
                          "elementType": "labels.text.fill",
                          "stylers": {
                                    "color": "#857f7f"
                          }
                },
                {
                          "featureType": "all",
                          "elementType": "labels.text.stroke",
                          "stylers": {
                                    "color": "#000000"
                          }
                },
                {
                          "featureType": "building",
                          "elementType": "geometry",
                          "stylers": {
                                    "color": "#022338"
                          }
                },
                {
                          "featureType": "green",
                          "elementType": "geometry",
                          "stylers": {
                                    "color": "#062032"
                          }
                },
                {
                          "featureType": "boundary",
                          "elementType": "all",
                          "stylers": {
                                    "color": "#1e1c1c"
                          }
                },
                {
                          "featureType": "manmade",
                          "elementType": "geometry",
                          "stylers": {
                                    "color": "#022338"
                          }
                },
                {
                          "featureType": "poi",
                          "elementType": "all",
                          "stylers": {
                                    "visibility": "off"
                          }
                },
                {
                          "featureType": "all",
                          "elementType": "labels.icon",
                          "stylers": {
                                    "visibility": "off"
                          }
                },
                {
                          "featureType": "all",
                          "elementType": "labels.text.fill",
                          "stylers": {
                                    "color": "#2da0c6",
                                    "visibility": "on"
                          }
                }
            ]
        });

    }


    //显示信息窗口
    var showInfor = function (marker, title, pInfor) {
        // console.log(marker);
        // console.log(title);
        // console.log(pInfor);


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
                alert(pos);
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


