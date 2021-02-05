/*
function pro_num(state){  //0 防火员 1责任人
        $.ajax({
            tyle:'get',
            url:url+'/admin/project/check/getLegalFireMan.action',
            data:'state='+state,
            error:function(error){console.log(error+'网络错误')},
            success:function(result){
                var res=JSON.parse(result);
                console.log(res);
                var data=res.list[0].mess
                var html="";
                html="<option value='' data-pid=''></option>"
            //     for(var item of data){
            //        // html+="<option value='"+item.user_name+','+item.phone+'--'+item.pid+"' data-pid='"+item.pid+"'>"+item.user_name+""+item.phone+"</option>";
            //     }
            for(var i=0;i<data.length;i++){
                html+="<option value='"+data[i].user_name+','+data[i].phone+'--'+data[i].pid+"' data-pid='"+data[i].pid+"'>"+data[i].user_name+""+data[i].phone+"</option>";
            }
                $('#peo_num').html(html); 
            }
        })
    }
    pro_num(0)
    
    function res_num(state){  //0 防火员 1责任人
        $.ajax({
            tyle:'get',
            url:url+'/admin/project/check/getLegalFireMan.action',
            data:'state='+state,
            error:function(error){console.log(error+'网络错误')},
            success:function(result){
                var res=JSON.parse(result);
                console.log(res)
                var data=res.list[0].mess
                var html="";
                html="<option value='' data-pid=''></option>";
                for(var i=0;i<data.length;i++){
                    html+="<option value='"+data[i].user_name+','+data[i].phone+'--'+data[i].pid+"' data-pid='"+data[i].pid+"'>"+data[i].user_name+""+data[i].phone+"</option>";
                }
                $('#res_num').html(html);
                
            }
        })
    }
    res_num(1)

    function createMap(){
        var map = new BMap.Map("allmap");  
        var geoc = new BMap.Geocoder();   //地址解析对象  
        var markersArray = [];  
        var geolocation = new BMap.Geolocation();  
        var point = new BMap.Point(114.046252, 22.640817);  
        map.centerAndZoom(point, 12); // 中心点  
        geolocation.getCurrentPosition(function (r) {  
            var address = r.address.province + r.address.city + r.address.district + r.address.street + r.address.street_number; 
			if (this.getStatus() == BMAP_STATUS_SUCCESS) {  
				var mk = new BMap.Marker(r.point);  
				map.addOverlay(mk);  
				map.panTo(r.point);  
				map.enableScrollWheelZoom(true);  
				// document.getElementById('lng').value = r.point.lng;  
				// document.getElementById('lat').value =  r.point.lat;  
				document.getElementById('address').value = address;  
			}  
			else {  
				alert('failed' + this.getStatus());  
			}  
        }, {enableHighAccuracy: true})  
        map.addEventListener("click", showInfo);  
        //清除标识  
        function clearOverlays() {  
            if (markersArray) {
                for (var i in markersArray) {  
                    map.removeOverlay(markersArray[i])  
                }  
            }  
        } 
        //地图上标注  
        function addMarker(point) {     
            var marker = new BMap.Marker(point);  
            markersArray.push(marker);  
            clearOverlays();  
            map.addOverlay(marker);  
        } 
        //点击地图时间处理  
        function showInfo(e) {  
            map.clearOverlays();
            geoc.getLocation(e.point, function (rs) {  
                var addComp = rs.addressComponents;  
                var address = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;  
                console.log(address)
                    // document.getElementById('lng').value = e.point.lng;  
                    // document.getElementById('lat').value =  e.point.lat; 
                     document.getElementById('address').value = address;   
            });  
            addMarker(e.point);  
        }  
        var localSearch = new BMap.LocalSearch(map);
        localSearch.enableAutoViewport(); //允许自动调节窗体大小
        function searchByStationName() {
            map.clearOverlays();//清空原来的标注
            var keyword = document.getElementById("address").value;
            console.log(keyword);
                //setSearchCompleteCallback--->设置检索结束后的回调函数
            localSearch.setSearchCompleteCallback(function (searchResult) {
                var poi = searchResult.getPoi(0);   // searchResult.Ar 数组中的第一个
                // document.getElementById("lng").value = poi.point.lng 
                // document.getElementById("lat").value= poi.point.lat;
                map.centerAndZoom(poi.point, 13);
                var marker = new BMap.Marker(new BMap.Point(poi.point.lng, poi.point.lat));  // 创建标注，为要查询的地方对应的经纬度
                map.addOverlay(marker);
            });
            localSearch.search(keyword);
        } 
        document.getElementById('r-result').onclick=function(){
            searchByStationName();
        }
    }
    createMap();
    
    $('#btn_on').click(function(){
        var projName=$('#projName').val().trim();   //项目名称
        var projLocation=$('#address').val();   //详细地址
        
        // var legalPersonId=sessionStorage.getItem('res_pid')   //责任id
        var peo_num=$('#peo_num').val().split('--')[0];
        var fireGuardId=$('#peo_num').val().split('--')[1];
        var res_num=$('#res_num').val().split('--')[0];
        var legalPersonId=$('#res_num').val().split('--')[1];
        console.log(peo_num);
        console.log(fireGuardId);
        console.log(res_num);
        console.log(legalPersonId);
        var projIntroduction=$('#into').val();     //介绍
        var projRemark=$('#beizhu').val();    //备注
        var username=localStorage.getItem('userName');  //登陆账号
        var key="16e7b5568d36fe3ae4fb17a2deba37b0";
        if(projLocation!=""){
            var key="16e7b5568d36fe3ae4fb17a2deba37b0";
            $.ajax({
                type:'get',
                url:'https://restapi.amap.com/v3/geocode/geo',
                data:'key='+key+'&address='+projLocation,
                error:function(error){console.log(error)},
                success:function(result){
                    console.log(result);
                    var long_lat=result.geocodes[0].location;
                    sessionStorage.setItem('long_lat',long_lat);
                    if(result.geocodes[0].province=='广东省'){
                        var provincial='440000';  //省份编号
                    }else if(result.geocodes[0].province=='北京市'){
                        var provincial='110000';
                    }else if(result.geocodes[0].province=='天津市'){
                        var provincial='120000';
                    }else if(result.geocodes[0].province=='重庆市'){
                        var provincial='500000';
                    }else if(result.geocodes[0].province=='上海市'){
                        var provincial='310000';              //4个市
                    }else if(result.geocodes[0].province=='内蒙古自治区'){
                        var provincial='150000';
                    }else if(result.geocodes[0].province=='广西壮族自治区'){
                        var provincial='450000';
                    }else if(result.geocodes[0].province=='西藏自治区'){
                        var provincial='540000';
                    }else if(result.geocodes[0].province=='宁夏回族自治区'){
                        var provincial='640000';
                    }else if(result.geocodes[0].province=='新疆维吾尔自治区'){
                        var provincial='650000';               //5个自治区
                    }else if(result.geocodes[0].province=='香港特别行政区'){
                        var provincial='810000';
                    }else if(result.geocodes[0].province=='澳门特别行政区'){
                        var provincial='820000';              //特别行政区
                    }else if(result.geocodes[0].province=='河北省'){
                        var provincial='130000';
                    }else if(result.geocodes[0].province=='山西省'){
                        var provincial='140000';
                    }else if(result.geocodes[0].province=='辽宁省'){
                        var provincial='220000';
                    }else if(result.geocodes[0].province=='吉林省'){
                        var provincial='230000';
                    }else if(result.geocodes[0].province=='黑龙江省'){
                        var provincial='110000';
                    }else if(result.geocodes[0].province=='江苏省'){
                        var provincial='320000';
                    }else if(result.geocodes[0].province=='浙江省'){
                        var provincial='330000';
                    }else if(result.geocodes[0].province=='安徽省'){
                        var provincial='340000';
                    }else if(result.geocodes[0].province=='福建省'){
                        var provincial='350000';
                    }else if(result.geocodes[0].province=='江西省'){
                        var provincial='360000';
                    }else if(result.geocodes[0].province=='山东省'){
                        var provincial='370000';
                    }else if(result.geocodes[0].province=='河南省'){
                        var provincial='410000';
                    }else if(result.geocodes[0].province=='湖北省'){
                        var provincial='420000';
                    }else if(result.geocodes[0].province=='湖南省'){
                        var provincial='430000';
                    }else if(result.geocodes[0].province=='海南省'){
                        var provincial='460000';
                    }else if(result.geocodes[0].province=='四川省'){
                        var provincial='510000';
                    }else if(result.geocodes[0].province=='贵州省'){
                        var provincial='520000';
                    }else if(result.geocodes[0].province=='云南省'){
                        var provincial='530000';
                    }else if(result.geocodes[0].province=='陕西省'){
                        var provincial='610000';
                    }else if(result.geocodes[0].province=='甘肃省'){
                        var provincial='620000';
                    }else if(result.geocodes[0].province=='青海省'){
                        var provincial='630000';
                    }else if(result.geocodes[0].province=='台湾省'){
                        var provincial='710000';               //23个省
                    }
                    var citycode=result.geocodes[0].citycode;   //城市编号
                    var adcode=result.geocodes[0].adcode;   //区编号
                    console.log(provincial,citycode,adcode);
                    $('#provincial_num').val(provincial+','+citycode+','+adcode);
                }

            })
        }
        var province=$('#provincial_num').val().trim();    //省市编号
        if(projName.length==0){
            alert('请填项目名称');
        }else if(province.length==0){
            alert('请填地址完整地址');
        }else if(peo_num.length==0){
            alert('请添加防火员');
        }else if(res_num.length==0){
            alert('请添加责任人');
        }else{
            var str=sessionStorage.getItem('long_lat');
            var long_lat=str.split(",").reverse().join(",");
            $.ajax({
                type:'get',
                url:url+'/admin/project/check/addProject.action',
                data:'username='+username+'&projName='+projName+'&projLocation='+projLocation+'&fireGuardId='+fireGuardId+'&legalPersonId='+legalPersonId+'&projIntroduction='+projIntroduction+'&projRemark='+projRemark+'&province='+province+'&long_lat='+long_lat,
                error:function(error){console.log(error+'网络错误')},
                success:function(result){
                var res=JSON.parse(result);
                console.log(res);
                if(res.list[0].status=='true'){
                    alert(res.list[0].mess);
                    setTimeout(function(){
                        // window.top.CloseCurrWin();
                        // window.top.location.reload();  //最外层页面跳转
                        parent.location.reload();  //上一层页面跳转
                    },2000)
                }else{
                    alert(res.list[0].mess)
                }
                }
            })
        }
    })    
    function RefreshClick(){
        window.location.reload();
    }*/ 