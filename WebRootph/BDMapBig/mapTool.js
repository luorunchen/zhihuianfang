function MapTool(box, map,mData) {


    var htmlBox = box;  //地图控件

    var mapObj = map;  //地图对象
   
    var mapData = mData;  //数据对象

    var loadEvent = function () {
        $(".queryBut").click(function () {

            var pResult = $(".queryResult");
            pResult.empty();

            var txt = $(".queryText").val();
            if (txt == "") {
                alert("请输入查询条件");
                return;
            }

            //单位列表
            var lstCompany = mapData.GetResult().Company;

            $.each(lstCompany, function (i, v) {

                if (v.MC.indexOf(txt) >= 0 || v.areaMC.indexOf(txt) >= 0 || v.address.indexOf(txt) >= 0) {
                    var thtml = "<div class=\"resultItem\">";
                    thtml += "<div class=\"resultTitle\">" + v.MC + "</div>";
                    thtml += "<div class=\"resultText\">地址：" + v.address + "</div>";
                    if (v.fireManagerTel && v.fireManagerTel != "") {
                        thtml += "<div class=\"resultText\">电话：" + v.fireManagerTel + "</div>";
                    }
                    thtml += "</div>";

                    var pItem = $(thtml);
                    CompanyClick(pItem, v);
                    pItem.appendTo(pResult);
                }
            });

        });

        $(".chartLabel").click(function () {
            $(".chartBox").addClass("chartBoxShow");
            loadChart();
        });

        $(".chartBut").click(function () {
            $(".chartBox").removeClass("chartBoxShow");
            $('.chartBody').empty();
        });


        //报警明细   //今日报警 
        $("#ElecAlarmSum").on('click','.numItem',function(){
        //$("#ElecAlarmSum").find(".numItem").click(function () {
            var tt = $(this).attr("data-sign");
          //  console.log(tt);
            var LstAlarm = mapData.GetResult().LstAlarm;
           // console.log(LstAlarm);
            var BH=[];
            $.each(LstAlarm,function(i,d){
                BH.push(d.BH);
            })
         //  console.log(BH);
               if(tt=="01"){
                   var BH=BH[0];
               }else if(tt=="02"){
                   var BH=BH[2];
               }else if(tt=="03"){
                   var BH=BH[4];
               }else if(tt=="04"){
                   var BH=BH[6];
               }else{
                   var BH=BH[8];
               }

                //json/SElec_DetailElecAlarm.json
            doAction(url+"/admin/project/SElec_DetailElecDevice.action?pid="+BH, "GET", { Status: tt }, function (result) {
                var pResult = $(".queryResult");
                pResult.empty();
                  //  console.log(result);
                //单位列表
                var lstCompany = mapData.GetResult().Company;
                // console.log(lstCompany);
                 //  报警数BH 中可能包含 （Z） 需加一个 c.ID == 'z'+v.BH 判断
                $.each(result, function (i, v) {
                  //  console.log('z'+v.BH);
                    var comObj = null;
                    $.each(lstCompany, function (t, c) {
                       // console.log(c.ID);  
                        if (c.ID == v.BH ||c.ID == 'z'+v.BH) {
                            
                            comObj = c;
                           // console.log(comObj);
                            return false;
                        }
                    });

                    var thtml = "<div class=\"resultItem\">";

                    if (comObj) {
                        thtml += "<div class=\"resultTitle\">" +  (i+1) + "、" + comObj.MC + "</div>";
                        thtml += "<div class=\"resultText\">地址：" + comObj.address + "</div>";
                        if (comObj.fireManagerTel && comObj.fireManagerTel != "") {
                            thtml += "<div class=\"resultText\">电话：" + comObj.fireManagerTel + "</div>";
                        }
                    } else {
                        thtml += "<div class=\"resultText\">公司：" + v.BH + "</div>";
                    }
                    thtml += "<div class=\"resultText\">报警：" + v.value + "次</div>";
                    thtml += "</div>";

                    var pItem = $(thtml);
                    CompanyClick(pItem, comObj);
                    pItem.appendTo(pResult);
                   
                });

            });
        });


        //设备明细
        $("#ElecDeviceSum").on('click','.numItem',function(){
        //$("#ElecDeviceSum").find(".numItem").click(function () {
            var tt = $(this).attr("data-sign");
             //   console.log(tt);
            //json/SElec_DetailElecDevice.json
             var LstAlarm = mapData.GetResult().LstDevice;
          //  console.log(LstAlarm);
            var BH=[];
            $.each(LstAlarm,function(i,d){
                BH.push(d.BH);
            })
           // console.log(BH);
               if(tt=="01"){
                   var BH=BH[0];
               }else if(tt=="02"){
                   var BH=BH[1];
               }else if(tt=="03"){
                   var BH=BH[2];
               }
                // 如果无报警数 BH 
               
            //   console.log(BH);

            if(BH!=""){
                doAction(url+"/admin/project/SElec_DetailElecDevice.action?pid="+BH, "GET", { Status: tt }, function (result) {
       //     doAction("http://zlh18122711575.55555.io:16799/earlyPlatform/admin/project/FindArea.action?username="+userName, "GET", { Status: tt }, function (result) {
                var pResult = $(".queryResult");
                pResult.empty();
               // console.log(result);
                //单位列表
                var lstCompany = mapData.GetResult().Company;

                $.each(result, function (i, v) {

                    var comObj = null;
                    $.each(lstCompany, function (t, c) {
                        if (c.ID == v.BH ||c.ID == 'z'+v.BH) {
                            comObj = c;
                            return false;
                        }
                    });

                    var thtml = "<div class=\"resultItem\">";
                    
                        if (comObj) {
                            thtml += "<div class=\"resultTitle\">" + (i + 1) + "、" + comObj.MC + "</div>";
                            thtml += "<div class=\"resultText\">地址：" + comObj.address + "</div>";
                            if (comObj.fireManagerTel && comObj.fireManagerTel != "") {
                                thtml += "<div class=\"resultText\">电话：" + comObj.f
                                ireManagerTel + "</div>";
                            }
                        }
                        
                        thtml += "<div class=\"resultText\">编号：" + v.BH + "</div>";
                        thtml += "<div class=\"resultText\">位置：" + v.text + "</div>";
                        thtml += "</div>";
                    
                    var pItem = $(thtml);
                    CompanyClick(pItem, comObj);
                    pItem.appendTo(pResult);
                    
                });

            });
               }
        });
        

    }


    //点击单位查询结果
    var CompanyClick = function (pobj, data) {

        pobj.click(function () {
            if (data){
                var point = new BMap.Point(data.MLng, data.MLat);
                mapObj.centerAndZoom(point, 14);
                mapData.OpenDetail(data);
            }
        });
    }
    //点击单位查询结果
    // var DeviceClick = function (pobj, comObj, data) {

    //     pobj.click(function () {
    //         if (comObj){
    //             var point = new BMap.Point(comObj.MLng, comObj.MLat);
    //             mapObj.centerAndZoom(point, 14);
    //         }
    //         window.top.OpenThirdFrame("./ExtApp_SElectric_ElecDetail.html?devBH=" + data.BH, 800, 600, "win", comObj.MC + "(" + data.Text + ")");
    //     });
    // }

    //加载报警趋势图表
    var loadChart = function () {
        //json/SElec_SumElecByTime.json
        var userName=parseInt(localStorage.getItem('userName'));
        var type=parseInt(localStorage.getItem('tpage'));
       doAction(url+"/admin/project/SumElecByTime.action?username="+userName, "GET", {type:type}, function (result) {
       // doAction("http://zlh18122711575.55555.io:16799/earlyPlatform/admin/project/SumElecByTime.action?username="+userName, "GET", {}, function (result) {
            var sum=result.Diagram;
            var dd1 = [];

            $.each(sum, function (i, v) {
                dd1.push([v.date , v.num]);
            });

            Highcharts.setOptions({
                colors: ['#5dacd3', '#50B432']
            });

            //隐患趋势图
            $('.chartBody').highcharts({
                chart: {
                    backgroundColor: 'rgba(0,0,0,0)'
                },
                title: {
                    text: '隐患趋势图',
                    style: { color: '#ffffff' }
                },
                xAxis: {
                    gridLineColor: "#73c4f1",
                    labels: { style: { color: '#ffffff' } },
                    categories: []
                },
                yAxis: [{
                    title: {
                        text: ''
                    },
                    gridLineColor: "#73c4f1",
                    labels: {
                        style: { color: '#ffffff' }
                    },
                    min: 0,
                    allowDecimals: false,
                    minTickInterval: 1

                }],
                legend: {
                    borderWidth: 0,
                    enabled: true,
                    itemStyle: { color: '#ffffff', fontWeight: 'bold' }
                },
                plotOptions: {
                    line: {
                        dataLabels: {
                            enabled: true,
                            style: {color:"#ffffff" }
                        },
                        enableMouseTracking: false
                    }
                },
                series: [{ name: '今日报警', yAxis: 0, data: dd1 }]
            });
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