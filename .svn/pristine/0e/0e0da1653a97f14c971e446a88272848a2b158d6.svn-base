function MapData(box, map) {


    var htmlBox = box;  //地图控件

    var mapObj = map;  //地图对象
   var panoramaService = new BMap.PanoramaService();   //3D场景服务

    var panorama = null;//mapObj.getPanorama();
  

    //单位数据集
    var gDataset = null;

    //大数据图层
    var gMapLayer = null;

    //末次请求数据
    var gLastResult = null;

   





    //大数据点样式
    var gOptions = {
        fillStyle: 'rgba(0, 255, 50, 1)',
        shadowColor: 'rgba(255, 255, 0, 1)',
        shadowBlur: 30,
        globalCompositeOperation: 'lighter',
        methods: {
            click: function (item) {
                console.log(item)
                openCom(item.data.pid, item.data.name);
            }
        },
        size: 10,
        draw: 'simple',
        zIndex:'0'
    };
    
    // console.log(gOptions)
    //加载单位信息
    
    //http://fire.zhihuiwulian.net.cn/newEarlyWarn/region/getRegionList.action?region=%E6%B6%B5%E6%B1%9F%E5%8C%BA&username=13901088669&pno=1&pageSize=15
    var userName=parseInt(localStorage.getItem('userName'));
    var region=sessionStorage.getItem('regionName')
    console.log(region)
    var loadData = function () {   
        var pno=1;
        var pageSize=15000;
        doAction(url+"/region/getRegionList.action?username="+userName, "GET", {region:region,pno:pno,pageSize:pageSize}, function (result) {   
            gLastResult = result;
            console.log(result);
           //mapObj.clearOverlays();

            // var yourString=","+result.AlarmCom+"," ;
            // var yourStringH="";
            // var res=yourString.split(',');
            // for(var i=0;i<res.length;i++){
			// 	yourStringH=yourStringH+'z'+res[i]+',';
			// }
            // var comids=yourString+","+yourStringH;
            // if (result.AlarmCom != "") {
            //     playAlarm(); 
            // }
            var comids="";
            //添加大数据单位点
            var data = [];
            for (var i = 0; i < result.mess.length; i++) {
                var pp = result.mess[i];
                // console.log(pp);
                 var lng=pp.long_latbai.split(',')[1];   
                 var lat=pp.long_latbai.split(',')[0];   
               // 大数据处理
                if (lat > 54) { // 纬度
                    var lng = pp.long_latbai.split(',')[0]; //经度
                    var lat = pp.long_latbai.split(',')[1]; //纬度
                } else {
                    var lng = pp.long_latbai.split(',')[1];
                    var lat = pp.long_latbai.split(',')[0];
                } 
                data.push({
                    geometry: {
                        type: 'Point',
                        coordinates: [lng, lat]
                    },
                    data: pp
                });
                
                //报警处理
                if (comids != "") {
                    //console.log(comids);
                  //  console.log(pp);  // ,522,55,
                    if (comids.indexOf( ','+pp.iD + ',' ) >= 0) { //添加报警点
                        var point = new BMap.Point(lng, lat);
                        var tm = new MyFocus(point, pp.ComName);
                        tm.Data = pp;
                        mapObj.addOverlay(tm);
                    }else{
                       console.log('no');
                    }
                }else{
                    console.log('没有数据');
                }
            }
            console.log(data);
        //     var opts = {
		// 		width : 250,     // 信息窗口宽度
		// 		height: 80,     // 信息窗口高度
		// 		//title : "<p style='background: url(../images/kjbg.png);border: solid 1px #fff;box-shadow: inset 0px 0px 30px #fff;border-radius: 7px;padding:0px 0 0 12px;color:#fff;margin:0px;width:217px;height:25   px;'>信息窗口</p>" , // 信息窗口标题
                
		// 		enableMessage:true//设置允许信息窗发送短息
		// 	   };
        //         var arr=[];
        //     for(var i=0;i<data.length;i++){
        //        // console.log(data[i].data);
        //        var pt = new BMap.Point(data[i].geometry.coordinates[0],data[i].geometry.coordinates[1]);
        //        arr.push(pt);
               
        //     //    console.log(pt);https://www.baidu.com/?tn=98012088_4_dg&ch=14
            
		//        var myIcon = new BMap.Icon("../images/beijing.png", new BMap.Size(10,10));
        //         var marker = new BMap.Marker(pt,{icon:myIcon});  // 创建标注
        //        // console.log(marker);
        //         var content =new BMap.Label("<div style='white-space:normal;color: #fff;background: url(../images/kjbg.png);box-shadow: inset 0px 0px 30px #fff;border-radius: 7px;padding:5px 0 0 12px; width:250px;height:90px;z-index:600'><p style='margin:0;'>项目名称:"+data[i].data.name+"</p><p style='margin:0;'>项目地址"+data[i].data.location+"</p></div>");
        //        // console.log(content);
        //         map.addOverlay(marker);  
        //         addClickHandler(content,marker);
                
        //     }
        //    // console.log(arr);
    
        //     function addClickHandler(content,marker){
        //         //console.log(marker);
        //         marker.addEventListener('mouseover',function(){
        //             content.setStyle({"border":"0","padding":"0","backgroundColor":"0","zIndex":"600","textAlign": "center","display":"block","width":"250px","height": "84px",});   
        //             map.openInfoWindow(content);
        //             marker.setLabel(content); //为标注添加一个标签       
        //         })
        //         marker.addEventListener('mouseout',function(){
        //             map.removeOverlay(content);
        //            // map.closeInfoWindow(content);
        //         }) 
        //     }
            
            if (gDataset) {
                gDataset.set(data);  //修改数据
            }else{
                gDataset = new mapv.DataSet(data);
               // console.log(gDataset);
            }
            gMapLayer = new mapv.baiduMapLayer(mapObj, gDataset, gOptions);
        });

    }
    

    // 打开单位用电情况
    var openCom = function (comid,comName) {
        //window.top.OpenFrame("/ExtApp/SElectric?ComID=" + comid, 870, 600, "SElect", comName, "", function (r) {

        //});
        var width=$(window).width();
        var height=$(window).height()-150;

        console.log(height)
        if(width >= 980){
            var width='930';
        }else{
            var width=$(window).width()-50;
        }
        console.log(width)
        sessionStorage.setItem('ComID',comid);  
        sessionStorage.setItem('comName',comName);
        window.top.OpenFrame("./SElec_ElecComDetail.html?ComID=" + comid + "&ComName=" + escape(comName), width, height, "SElect", comName, "", function (r) {

        });
    }

    this.OpenDetail = function (comObj) {
        console.log(comObj)
        openCom(comObj.iD, comObj.mC);
    }
    
    this.GetResult = function () {
        return gLastResult;
    }

    //清除痕迹
    this.Clear = function (vg) {
        
    }
    //加载数据
    this.Open = function () {
        this.Clear();
        loadData();

    }
    setInterval(function(){
        loadData();
    },600000)
   
}