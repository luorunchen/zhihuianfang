//请求数据
var doAction = function (url, Type, param, backFun) {
    $.ajax({
        type: Type,
        async: true,
        url: url,
        timeout:90000,
        dataType: "json",
        data: param,
        beforeSend: function () {
            //数据加载中
        },
        success: function (result) {
            backFun(result);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("mapUtil.js--->加载失败：" + textStatus + ":" + errorThrown);
        },
        complete: function () {
            // $.fn.masklayer({ action: "close" });
        }
    });
}

var getCenterPoint = function (ps) {
    // alert(ps);
    //alert(ps.length);

    var tp = null;
    var lp = null;
    var rp = null;
    var bp = null;

    $(ps).each(function (i, v) {

        if (tp == null) {
            tp = v.lat;
        } else if (tp > v.lat) {
            tp = v.lat;
        }

        if (bp == null) {
            bp = v.lat;
        } else if (bp < v.lat) {
            bp = v.lat;
        }

        if (lp == null) {
            lp = v.lng;
        } else if (lp < v.lng) {
            lp = v.lng;
        }

        if (rp == null) {
            rp = v.lng;
        } else if (rp > v.lng) {
            rp = v.lng;
        }
    });
    return new BMap.Point((lp + rp) / 2.0, (tp + bp) / 2.0);
}

//地图定位
var searchPos = function (mapObj) {

    doAction("json/BDMap_FindArea.json", "GET", { AreaBH: window.top.gAreaBH }, function (pp) {
        var tZoom = parseInt(pp.MinLevel);
        if (pp.Points == null || pp.Points == "") {
            var localSearch = new BMap.LocalSearch(window.top.gCity, { //智能搜索
                pageCapacity: 30,
                onSearchComplete: function (result) {
                    if (localSearch.getStatus() != BMAP_STATUS_SUCCESS) {
                        mapObj.centerAndZoom(new BMap.Point(116.405419, 39.91582), 6);
                        return;
                    }
                    if (result.getCurrentNumPois() > 0) {
                        var pInfor = result.getPoi(0);
                        mapObj.centerAndZoom(pInfor.point, tZoom);
                    }
                }
            });
            localSearch.search(window.top.gZoom);
        } else {
            var ps = unescape(pp.Points);
            var pps = JSON.parse(ps);
            var pos = getCenterPoint(pps);
            mapObj.centerAndZoom(pos, tZoom);
        }
    });
}