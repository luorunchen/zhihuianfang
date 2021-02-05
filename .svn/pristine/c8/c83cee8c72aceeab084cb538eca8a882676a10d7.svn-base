(function ($) {
    var htmlBox = null;
    
    var mapObj = null;  //地图对象
   
   

    var gMapData = null;
   
    var gMapTool = null;
   
    
    $.fn.OpenMap = function () {

        var mapBox = this[0];
        var point = new BMap.Point(113.275,23.117);
        
        mapObj = new BMap.Map(mapBox, { enableMapClick: false});
        mapObj.addControl(new BMap.MapTypeControl({ mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP], offset: new BMap.Size(0, 80) }));
      
       mapObj.centerAndZoom(point,8);
        mapObj.enableScrollWheelZoom(true);

        mapObj.setMapStyle({ style: "midnight" });


      //  searchPos(mapObj);
        //searchPos();

        var panorama = mapObj.getPanorama();

        if (gMapData == null) {
            gMapData = new MapData(htmlBox, mapObj);
        }
        gMapData.Open();
        //console.log(gMapData);
        if (gMapTool == null) {
            gMapTool = new MapTool(htmlBox, mapObj, gMapData);
        }
        gMapTool.Open()
        //console.log(gMapTool);
        

        
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


