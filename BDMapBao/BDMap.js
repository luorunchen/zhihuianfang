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
        mapObj.addControl(new BMap.MapTypeControl({ mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP], offset: new BMap.Size(0, 80) }));
      
       
        mapObj.enableScrollWheelZoom(true);

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

        mapObj.centerAndZoom(point,8);
       // searchPos(mapObj);
        //searchPos();

        var panorama = mapObj.getPanorama();

        if (gMapData == null) {
            gMapData = new MapData(htmlBox, mapObj);
        }
        gMapData.Open();
        if (gMapTool == null) {
            gMapTool = new MapTool(htmlBox, mapObj,gMapData);
        }
        gMapTool.Open();

        
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


    var queryData = function () {

        var pp = null;

        $(".MapFilter").find(".fItem").each(function (i, v) {
            var tobj = $(v);
            var ttype = tobj.attr("qtype");
            var tvalue = tobj.attr("qvalue");
            if (pp == null) {
                pp = {};
            }
            pp[ttype] = tvalue;
        });

        gMapData.Clear(pp);
    }

    $.fn.MapWhere = function (ttext, ttype, tvalue) {

        var isHas = false;
        $(".MapFilter").find(".fItem").each(function (i, v) {
            var tobj = $(v);
            if (tobj.attr("qtype") == ttype) {
                tobj.html(ttext);
                tobj.attr("qvalue", tvalue);
                isHas = true;
                return false;
            }
        });

        if (isHas == false) {
            var thtml = "<div class=\"fItem\" qtype=\"" + ttype + "\"  qvalue=\"" + tvalue + "\">" + ttext + "</div>";
            var pItem = $(thtml);
            pItem.appendTo($(".MapFilter"));
            pItem.click(function (e) {
                pItem.remove();
                queryData();
            });
        }
        queryData();
    }
   
  
})(jQuery);

$(document).ready(function () {
    $(".MapBox").OpenMap();
});


