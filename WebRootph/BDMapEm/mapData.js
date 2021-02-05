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

    //报警数据
    var gAlarmResult = null;


    //大数据点样式
    var gOptions = {
        fillStyle: 'rgba(0, 255, 50, 1)',
        shadowColor: 'rgba(255, 255, 0, 1)',
        shadowBlur: 30,
        globalCompositeOperation: 'lighter',
        methods: {
            click: function (item) {
              //  console.log(item.data.typeMC); 
                if(item.data.typeMC=='水压'){
                    openCom(item.data.ID, item.data.MC);
                } 
              //  openCom(item.data.ID, item.data.MC);
            }
        },
        size: 10,
        draw: 'simple'
    };
    

    //加载单位信息
    var loadCompany = function () {
            //json/SGasAlarm_LoadCompany.json
            var type=parseInt(localStorage.getItem('tpage'));
           // console.log(type);
            var userName=parseInt(localStorage.getItem('userName'));
            var username=userName;
        doAction(url+"/admin/project/FindArea.action", "GET", {username:username,type:type}, function (result) {
            gLastResult = result;
           console.log(gLastResult);
          // console.log(gLastResult.Company.length);
            showCompany({});
            loadData();
        });
    }

    var AlarmOverlay = []; //报警覆盖物
    var showCompany = function (pfilter) {
       // console.log(pfilter);   
        //添加大数据单位点
        var data = [];
         var yourString=","+gLastResult.AlarmCom+"," ;
            var yourStringH="";
            var res=yourString.split(',');
            for(var i=0;i<res.length;i++){
				yourStringH=yourStringH+'z'+res[i]+',';
			}
            var comids=yourString+","+yourStringH;
         //console.log(comids);
        for (var i = 0; i < gLastResult.Company.length; i++) {
            var pp = gLastResult.Company[i];
            var lng=pp.long_latbai.split(',')[1];   
            var lat=pp.long_latbai.split(',')[0]; 
              // console.log(pp.ID);
                //如果pfilter 不为null 才开始执行以下判断
            if (pfilter != null) { 
                if (pfilter.GasDevice) {   //gAlarmResult  报警数据
                    //消防水
                    if (pfilter.GasDevice == "LstDevice01Company") {
                        // ,"593,575,572,590",.indexOf(,590,)
                        $.each(AlarmOverlay, function (i, v) {
                            mapObj.removeOverlay(v);
                        });
                        if (("," + gLastResult.water + ",").indexOf("," + pp.ID + ",") < 0) {
                            continue;
                        }
                    }
                        //电气火灾
                    if (pfilter.GasDevice == "LstDevice03Company") {         
                        if (("," + gLastResult.AlarmCom + ",").indexOf("," + pp.ID + ",") < 0) {
                            continue;
                           
                        }
                    }   
                    
                }
            }
            if (comids != "") {
                // console.log(comids);
                // console.log(pp.ID);  // ,522,55,
                if (comids.indexOf(',' + pp.ID + ',') >= 0) { //添加报警点
                    var point = new BMap.Point(lng, lat);
                    var tm = new MyFocus(point, pp.ComName);
                    tm.Data = pp;
                    mapObj.addOverlay(tm);
                    AlarmOverlay.push(tm);
                }
            }
            
            
            //大数据处理
            data.push({
                geometry: {
                    type: 'Point',
                    coordinates: [lng, lat]
                },
                data: pp
            }); 
           
        }
       // console.log(data);
      //  console.log(pp.MLng);
           var searchInfoWindow = null;   
          var opts = {
            // title  : "",      //标题
			width  : 300,             //宽度
			height : 60,              //高度
			panel  : "panel",         //检索结果面板
			enableAutoPan : true,     //自动平移
            enableSendToPhone:false ,
			searchTypes   :[
				//BMAPLIB_TAB_SEARCH,   //周边检索
				BMAPLIB_TAB_TO_HERE,  //到这里去
				BMAPLIB_TAB_FROM_HERE //从这里出发
			]
         }
         for(var i=0;i<data.length;i++){
           //  console.log(data[i].data.address);
			var pt = new BMap.Point(data[i].geometry.coordinates[0],data[i].geometry.coordinates[1]);  // 创建标注
            var myIcon = new BMap.Icon("../images/beijing.png", new BMap.Size(10,10));
            var marker = new BMap.Marker(pt,{icon:myIcon}); 
           // console.log(marker);
			
			var content = "<div style='margin:0;line-height:20px;padding:2px;'>项目名称："+data[i].data.MC+"<br/>项目地址:"+data[i].data.address+"</div>";
			//console.log(content);
            
			map.addOverlay(marker); //在地图中添加marker
            
       // console.log(searchInfoWindow);
			addClickHandler(content,marker);
		}
		function addClickHandler(content,marker){
            var SearchInfoWindow = new BMapLib.SearchInfoWindow(map,content,opts);
            
			marker.addEventListener("mouseover",function(e){
				SearchInfoWindow.open(marker);
			}); 
		}
		 

            
            
            
            
        if (gDataset) {
            gDataset.set(data);  //修改数据
        } else {
            gDataset = new mapv.DataSet(data);
            gMapLayer = new mapv.baiduMapLayer(mapObj, gDataset, gOptions);
        }

    }
       
            
        
    var lastAlarm = null;  //末次报警
    

    //加载单位信息
 
    var loadData = function () {
            //json/SGasAlarm_GetMapData.json
            var type=parseInt(localStorage.getItem('tpage'));
           // console.log(type);
           var userName=parseInt(localStorage.getItem('userName'));
            var username=userName;
    }

    //点击单位查询结果
    var CompanyClick = function (pobj, pp, pcom) {
        pobj.click(function () {
            if (pp) {
                if (pcom.MLng!==null){
                    var point = new BMap.Point(pcom.MLng, pcom.MLat);
                    mapObj.centerAndZoom(point, 18);
                }
                openCom(pcom.ID, pcom.MC)
            }
        });
    }
    

    //打开单位用电情况
    var openCom = function (comid,comName) {
        console.log(comid);
       // console.log(comName);
        sessionStorage.setItem('ComID',comid);  
        window.top.OpenFrame("./SWater_WaterComDetail.html?ComID=" + comid + "&ComName=" + escape(comName), 1220, 500, "SWater", comName, "", function (r) {

        });
    }

    this.OpenDetail = function (comObj) {
        openCom(comObj.ID, comObj.MC);
    }
    
    this.GetResult = function () {

        return gLastResult;
    }

    //清除痕迹
    this.Clear = function (vg) {
        showCompany(vg);
    }

    //加载数据
    this.Open = function () {
        loadCompany();
    }
}