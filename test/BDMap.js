(function ($) {
    var htmlBox = null;

    var mapObj = null;  //地图对象



    var gMapData = null;

    var gMapTool = null;


    $.fn.OpenMap = function () {

        var mapBox = this[0];
        // console.log(mapBox);
        var point = new BMap.Point(113.275, 23.117);
        mapObj = new BMap.Map(mapBox, { enableMapClick: false });
        mapObj.addControl(new BMap.NavigationControl({ anchor: BMAP_ANCHOR_TOP_LEFT, offset: new BMap.Size(0, 100) }));
        mapObj.addControl(new BMap.MapTypeControl({ mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP], offset: new BMap.Size(0, 80) }));

        mapObj.centerAndZoom(point, 8);
       // mapObj.setCurrentCity("深圳");
    //    var stCtrl = new BMap.PanoramaControl(); //构造全景控件
    //     console.log(stCtrl);
    //     stCtrl.setOffset(new BMap.Size(120, 120));
    //     mapObj.addControl(stCtrl);//添加全景控件
        mapObj.enableScrollWheelZoom(true);

        mapObj.setMapStyle({ style: "midnight" });
        // setMapStyle()

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
        var blist = [];
        var districtLoading = 0;

        function getBoundary() {
            addDistrict("莆田城厢区");
            addDistrict("莆田涵江区");
            addDistrict("莆田荔城区");
            addDistrict("莆田秀屿区");
        }

        /**
         * 添加行政区划
         * @param {} districtName 行政区划名
         * @returns  无返回值
         */
        function addDistrict(districtName) {
            //使用计数器来控制加载过程
            districtLoading++;
            var bdary = new BMap.Boundary();
            bdary.get(districtName, function (rs) { //获取行政区域
                console.log(rs);
                var count = rs.boundaries.length; //行政区域的点有多少个
                if (count === 0) {
                    alert('未能获取当前输入行政区域');
                    return;
                }
                for (var i = 0; i < count; i++) {
                    blist.push({
                        points: rs.boundaries[i],
                        name: districtName
                    });
                };
                //加载完成区域点后计数器-1
                districtLoading--;
                if (districtLoading == 0) {
                    //全加载完成后画端点
                    drawBoundary();
                }
                console.log(blist);
            });
        }


        /**
         * 各种鼠标事件绑定
         */
        //点击哪个区显示哪个区的名字
        // function click(evt) {
        //     alert(evt.target.name);
        // }

        function mouseover(evt) {
            evt.target.label.setZIndex(99);
            evt.target.label.setPosition(evt.point);
            evt.target.label.show();
        }

        function mousemove(evt) {
            evt.target.label.setPosition(evt.point);
        }

        function mouseout(evt) {
            evt.target.label.hide();
        }

        function drawBoundary() {
            //包含所有区域的点数组
            var pointArray = [];

            /*画遮蔽层的相关方法
             *思路: 首先在中国地图最外画一圈，圈住理论上所有的中国领土，然后再将每个闭合区域合并进来，并全部连到西北角。
             *      这样就做出了一个经过多次西北角的闭合多边形*/
            //定义中国东南西北端点，作为第一层
            var pNW = {
                lat: 59.0,
                lng: 73.0
            }
            var pNE = {
                lat: 59.0,
                lng: 136.0
            }
            var pSE = {
                lat: 3.0,
                lng: 136.0
            }
            var pSW = {
                lat: 3.0,
                lng: 73.0
            }
            //向数组中添加一次闭合多边形，并将西北角再加一次作为之后画闭合区域的起点
            var pArray = [];
            pArray.push(pNW);
            pArray.push(pSW);
            pArray.push(pSE);
            pArray.push(pNE);
            pArray.push(pNW);
            //循环添加各闭合区域
            for (var i = 0; i < blist.length; i++) {
                //添加显示用标签层
                var label = new BMap.Label(blist[i].name, {
                    offset: new BMap.Size(20, -10)
                });
                label.hide();
                mapObj.addOverlay(label);

                //添加多边形层并显示
                var ply = new BMap.Polygon(blist[i].points, {
                    strokeWeight: 5,
                    strokeColor: "#ddd",
                    fillOpacity: 0.01,
                    fillColor: " #FFFFFF"
                }); //建立多边形覆盖物
                ply.name = blist[i].name;
                ply.label = label;
                // ply.addEventListener("click", click);
                ply.addEventListener("mouseover", mouseover);
                ply.addEventListener("mouseout", mouseout);
                ply.addEventListener("mousemove", mousemove);
                mapObj.addOverlay(ply);

                //添加名称标签层
                var centerlabel = new BMap.Label(blist[i].name, {
                    offset: new BMap.Size(0, 0)
                });
                centerlabel.setPosition(ply.getBounds().getCenter());
                mapObj.addOverlay(centerlabel);

                //将点增加到视野范围内
                var path = ply.getPath();
                pointArray = pointArray.concat(path);
                //将闭合区域加到遮蔽层上，每次添加完后要再加一次西北角作为下次添加的起点和最后一次的终点
                pArray = pArray.concat(path);
                pArray.push(pArray[0]);
            }

            //限定显示区域，需要引用api库
            var boundply = new BMap.Polygon(pointArray);
            BMapLib.AreaRestriction.setBounds(mapObj, boundply.getBounds());
            mapObj.setViewport(pointArray); //调整视野 
            console.log(pointArray);
            //添加遮蔽层
            var plyall = new BMap.Polygon(pArray, {
                strokeOpacity: 0.0000001,
                strokeColor: "#000000",
                strokeWeight: 0.00001,
                fillColor: "#ffffff",
                fillOpacity: 0.9
            }); //建立多边形覆盖物
            mapObj.addOverlay(plyall);
        }

        
        

        if (gMapData == null) {
            gMapData = new MapData(htmlBox, mapObj);
        }
        gMapData.Open();

        if (gMapTool == null) {
            gMapTool = new MapTool(htmlBox, mapObj, gMapData);
        }
        gMapTool.Open()
        setTimeout(function () {    
            getBoundary();
        }, 100);

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




