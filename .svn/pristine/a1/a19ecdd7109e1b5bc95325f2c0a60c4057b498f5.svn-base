function MapTool(box, map,mData) {


    var htmlBox = box;  //地图控件

    var mapObj = map;  //地图对象
   
    var mapData = mData;  //数据对象

    var loadEvent = function () {

        $("#dev01").click(function (e) {
            // $(".MapBox").MapWhere("在线设备", "ElecDevice", "LstDevice01Company");
            $(".MapBox").MapWhere("消防水设备", "GasDevice", "LstDevice01Company");
        });
        $("#dev03").click(function (e) {
            $(".MapBox").MapWhere("电气火灾设备", "GasDevice", "LstDevice03Company");
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