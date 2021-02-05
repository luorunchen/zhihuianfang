$(function () {
    var user_name = localStorage.getItem('userName');
    //console.log(user_name)
    //地图
    // var map = new BMap.Map("container");
    // var point = new BMap.Point(116.404, 39.915);
    // map.centerAndZoom(point, 5);
    // window.setTimeout(function () {
    //     map.panTo(new BMap.Point(116.409, 39.918));
    // }, 2000);
    // map.setMapStyle({
    //     style: "midnight"
    // });
    //地图 end
    function AutoScroll() {
        $(".user ul").animate({
            top: "81.72px"
        }, 500, function () {
            // $(this).append($(".user ul li:first"));
            $(this).prepend($(".user ul li:last"));
            $(this).css("top", 0);
        });
    }
    var timer = null;

    function autoMove() {
        timer = setInterval(function () {
            AutoScroll();
        }, 4000);
    }
    autoMove()

    $('#inforUl').on('click', 'li', function () {

        var did = $(this).attr('data-did')
        var type = $(this).attr('data-type')
        var name = $(this).attr('data-name')
        var typeName = $(this).attr('data-typeName')
        //data-deviceid=" + v.deviceid + "
        var deviceid = $(this).attr('data-deviceid')
        openCom(did, name, type, typeName,deviceid)



    })
    var zan = '1';
    $('#moreInfo').click(function () {
        zan++;
        var page = $('.arightboxtop').attr('data-pno')
        var day = $('li.bg.active').attr('data-day');
        console.log(page)
        console.log(day);
        if (zan <= page) {
            AlarmInforMore(day, zan, 10)
        } else {
            console.log(zan)
            console.log('到底了')
        }
    })
    $('.user').hover(function () {
        clearInterval(timer);
        timer = null;
    }, function () {
        autoMove()
    })

    $('.lefttime_text').on('click', 'li', function () {
        var day = $(this).attr('data-day');
        console.log(day);
        if (day != undefined) {
            $(this).addClass('active').siblings().removeClass('active');
            AlarmAllInfo(day)
            AlarmInfor(day)
        }

    })
    // 今日报警信息
    function AlarmAllInfo(day) {
        $.ajax({
            type: 'get',
            url: url + '/admin/bigdata/push_AlarmData',
            data: 'username=' + user_name + '&time_zone=' + day,
            error: function (error) {
                console.log(error)
            },
            success: function (res) {
                var html = "";
                html = "<div class='widget-inline-box text-center fl' ><p>未处理报警数</p><h3 class='ceeb1fd'>" + res.AlarmNo + "</h3></div><div class='widget-inline-box text-center fl'><p>已处理报警数</p><h3 class='c24c9ff'>" + res.AlarmYes + "</h3></div><div class='widget-inline-box text-center fl'><p>未处理故障数</p><h3 class='cffff00'>" + res.FaultNo + "</h3></div><div class='widget-inline-box text-center fl'><p>已处理故障数</p><h3 class='c11e2dd'>" + res.FaultYes + "</h3></div>";
                $('.lefttoday_number').html(html)
            }

        })
    }
    AlarmAllInfo(' ')
    // 今日报警信息end
    //设备概况
    function facinfor(day) {
        $.ajax({
            type: 'get',
            url: url + '/admin/bigdata/push_DeviceData.action',
            data: 'username=' + user_name + '&time_zone=' + '',
            error: function (error) {
                console.log(error)
            },
            success: function (res) {
                // console.log(res);
                if (res.length != 0) {
                    var myChart = echarts.init(document.getElementById('pleftbox2top'));
                    option = {
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b}: {c} ({d}%)"
                        },
                        backgroundColor: 'rgba(1,202,217,.2)',
                        legend: {
                            type: 'scroll',
                            orient: 'horizontal',
                            x: 'left',
                            textStyle: {
                                color: '#3cf'
                            },
                            pageIconColor: '#3cf',
                            pageTextStyle: {
                                color: '#3cf'
                            },
                            data: ['报警', '故障', '离线', '正常', '设备总数', '项目总数']
                        },
                        tooltip: {
                            show: true,
                            showContent: true
                        },
                        series: [{
                                name: '',
                                type: 'pie',
                                selectedMode: 'single',
                                radius: [0, '30%'],

                                label: {
                                    normal: {
                                        position: 'inner'
                                    }
                                },
                                labelLine: {
                                    normal: {
                                        show: false
                                    }
                                },
                                data: [{
                                        value: res.DeciveNumAlarm,
                                        name: '报警',
                                        selected: true
                                    },
                                    {
                                        value: res.DeciveNumFault,
                                        name: '故障'
                                    },
                                    {
                                        value: res.DeciveNumOff,
                                        name: '离线'
                                    },
                                    {
                                        value: res.DeciveNumOn,
                                        name: '正常'
                                    },
                                ]
                            },
                            {
                                name: '',
                                type: 'pie',
                                radius: ['40%', '55%'],

                                data: [{
                                        value: res.DeciveNumAll,
                                        name: '设备总数'
                                    },
                                    {
                                        value: res.ProjectNumAll,
                                        name: '项目总数'
                                    },
                                ]
                            }
                        ]
                    };
                    myChart.setOption(option);
                } else {
                    var html = '';
                    html = "<div style='color:gray'>暂无数据</div>"
                    $('#pleftbox2top').html(html)
                }

            }

        })
    }
    facinfor()
    //设备概况 end

    //设备类型数量统计
    function facTypeNum() {
        $.ajax({
            type: 'get',
            url: url + '/check_device_type.action',
            data: 'user_name=' + user_name,
            error: function (error) {
                console.log(error)
            },
            success: function (res) {
                var res = JSON.parse(res);
                console.log(res);
                if (res.length != 0) {
                    var data = res.list[0];
                    //gateway  isTraffic  name  values
                    var gateway = data.gateway.split(',')
                    var isTraffic = data.isTraffic.split(',')
                    var name = data.name.split(',')
                    var myChart = echarts.init(document.getElementById('pleftbox2midd'));
                    option = {
                        color: ['#d2d17c', '#00b7ee', '#5578cf', '#5ebbeb', '#d16ad8', '#f8e19a', '#00b7ee', '#81dabe', '#5fc5ce'],
                        backgroundColor: 'rgba(1,202,217,.2)',
                        grid: {
                            left: 20,
                            right: 20,
                            top: 0,
                            bottom: 20
                        },
                        legend: {
                            type: 'scroll',
                            pageIconColor: '#3cf',
                            pageTextStyle: {
                                color: '#3cf'
                            },
                            top: 10,
                            textStyle: {
                                color: '#3cf'
                            },
                            data: name
                        },
                        tooltip: {
                            show: true,
                            showContent: true
                        },
                        series: [{
                            name: '',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '65%'],
                            data: [{
                                    value: gateway[0],
                                    name: name[0]
                                },
                                {
                                    value: gateway[1],
                                    name: name[1]
                                },
                                {
                                    value: gateway[2],
                                    name: name[2]
                                },
                                {
                                    value: gateway[3],
                                    name: name[3]
                                },
                                {
                                    value: gateway[4],
                                    name: name[4]
                                },
                                {
                                    value: gateway[5],
                                    name: name[5]
                                },
                                {
                                    value: gateway[6],
                                    name: name[6]
                                },
                                {
                                    value: gateway[7],
                                    name: name[7]
                                },
                                {
                                    value: gateway[8],
                                    name: name[8]
                                },
                                {
                                    value: gateway[9],
                                    name: name[9]
                                },
                                {
                                    value: gateway[10],
                                    name: name[10]
                                },
                                {
                                    value: gateway[11],
                                    name: name[11]
                                }

                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }]
                    };
                    myChart.setOption(option);
                } else {
                    var html = '';
                    html = "<div style='color:gray'>暂无数据</div>"
                    $('#pleftbox2midd').html(html)
                }

            }

        })
    }
    facTypeNum()
    //设备类型数量统计 end

    //报警类型统计
    function TypeAlarm(day) {
        $.ajax({
            type: 'get',
            url: url + '/admin/bigdata/push_AlarmTypeData.action',
            data: 'username=' + user_name + '&time_zone=' + '',
            error: function (error) {
                console.log(error)
            },
            success: function (res) {
                console.log(res);
                if (res.length != 0) {
                    console.log(1)
                    var d1 = [];
                    var d2 = [];
                    $.each(res, function (i, v) {
                        d1.push(v.typeName)
                        d2.push(v.num)
                    })
                    var myChart = echarts.init(document.getElementById('lpeftbot'));
                    option = {
                        color: ['#3398DB', '#00b7ee', '#5578cf', '	#5ebbeb'],
                        backgroundColor: 'rgba(1,202,217,.2)',
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        legend: {
                            type: 'scroll',
                            pageIconColor: '#3cf',
                            pageTextStyle: {
                                color: '#3cf'
                            },
                            top: 10,
                            textStyle: {
                                color: '#3cf'
                            },
                            data: ['1234', '1234', '1234', '34']
                        },
                        xAxis: [{
                            type: 'category',
                            data: d1,
                            axisTick: {
                                alignWithLabel: true
                            },
                            nameTextStyle: {
                                color: '#3cf',
                                fontSize: '9px'
                            },
                            axisLine: {
                                lineStyle: {
                                    color: 'rgba(255,255,255,.2)'
                                }
                            },
                            splitLine: {
                                lineStyle: {
                                    color: 'rgba(255,255,255,.1)'
                                }
                            },
                            axisLabel: {
                                color: "rgba(255,255,255,.7)"
                            },
                        }],
                        yAxis: [{
                            type: 'value',
                            nameTextStyle: {
                                color: '#3cf'
                            },
                            axisLine: {
                                lineStyle: {
                                    color: 'rgba(255,255,255,.2)'
                                }
                            },
                            splitLine: {
                                lineStyle: {
                                    color: 'rgba(255,255,255,.1)'
                                }
                            },
                            axisLabel: {
                                color: "rgba(255,255,255,.7)"
                            },
                        }],
                        series: [{
                            type: 'bar',
                            barWidth: '60%',
                            data: d2,
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [{
                                                offset: 0,
                                                color: '#00f0ff'
                                            },
                                            {
                                                offset: 1,
                                                color: '#032a72'
                                            }
                                        ]
                                    )
                                }
                            },
                        }]
                    };
                    myChart.setOption(option);
                } else {
                    var html = '';
                    html = "<div style='color:gray'>暂无数据</div>"
                    $('#lpeftbot').html(html)
                }

            }
        })
    }
    TypeAlarm()
    //报警类型统计 end

    //报警数量统计
    function NumAalarm(day) {
        $.ajax({
            type: 'get',
            data: 'username=' + user_name + '&time_zone=' + '',
            url: url + '/admin/bigdata/push_AlarmNumData.action',
            error: function (error) {
                console.log(error)
            },
            success: function (res) {
                // console.log(res);
                //pleftbox2bott_cont
                if (res.length != 0) {
                    var d1 = [];
                    var d2 = [];
                    var num = []
                    $.each(res, function (i, v) {
                        //console.log(v)
                        d1.push(v.typeName)
                        d2.push(v.num)
                        num.push(i)
                    })
                    // console.log(d1)
                    // console.log(d2)
                    var myChart = echarts.init(document.getElementById('pleftbox2bott_cont'));
                    option = {
                        color: ['#3398DB', '#00b7ee', '#5578cf', '	#5ebbeb'],
                        backgroundColor: 'rgba(1,202,217,.2)',
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        legend: {
                            type: 'scroll',
                            pageIconColor: '#3cf',
                            pageTextStyle: {
                                color: '#3cf'
                            },
                            top: 10,
                            textStyle: {
                                color: '#3cf'
                            },
                            data: num
                        },
                        xAxis: [{

                            type: 'category',
                            data: d1,
                            axisTick: {
                                alignWithLabel: true
                            },
                            nameTextStyle: {
                                color: '#3cf',
                                fontSize: '9px'
                            },
                            axisLine: {
                                lineStyle: {
                                    color: 'rgba(255,255,255,.2)'
                                }
                            },
                            splitLine: {
                                lineStyle: {
                                    color: 'rgba(255,255,255,.1)'
                                }
                            },
                            axisLabel: {
                                color: "rgba(255,255,255,.7)"
                            },
                        }],
                        yAxis: [{
                            type: 'value',
                            nameTextStyle: {
                                color: '#3cf'
                            },
                            axisLine: {
                                lineStyle: {
                                    color: 'rgba(255,255,255,.2)'
                                }
                            },
                            splitLine: {
                                lineStyle: {
                                    color: 'rgba(255,255,255,.1)'
                                }
                            },
                            axisLabel: {
                                color: "rgba(255,255,255,.7)"
                            },
                        }],
                        series: [{
                            type: 'bar',
                            barWidth: '60%',
                            data: d2,
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [{
                                                offset: 0,
                                                color: '#00f0ff'
                                            },
                                            {
                                                offset: 1,
                                                color: '#032a72'
                                            }
                                        ]
                                    )
                                }
                            },
                        }]
                    };
                    myChart.setOption(option);
                } else {
                    var html = '';
                    html = "<div style='color:gray'>暂无数据</div>"
                    $('#pleftbox2bott_cont').html(html)
                }

            }
        })
    }
    NumAalarm()
    //报警数量统计 end

    //报警地区统计
    function AlarmRegion(day) {
        $.ajax({
            type: 'get',
            url: url + '/admin/bigdata/push_AlarmRegion.action',
            data: 'username=' + user_name + '&time_zone=' + '',
            error: function (error) {
                console.log(error)
            },
            success: function (res) {
                //console.log(res)
                //lpeftmidbot
                if (res.length != 0) {
                    var d1 = [];
                    var d2 = [];
                    var num = []
                    $.each(res, function (i, v) {
                        //console.log(v)
                        d1.push(v.address)
                        d2.push(v.num)
                        num.push(i)
                    })
                    var myChart = echarts.init(document.getElementById('lpeftmidbot'));
                    option = {
                        color: ['#3398DB', '#00b7ee', '#5578cf', '	#5ebbeb'],
                        backgroundColor: 'rgba(1,202,217,.2)',
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        legend: {
                            type: 'scroll',
                            pageIconColor: '#3cf',
                            pageTextStyle: {
                                color: '#3cf'
                            },
                            top: 10,
                            textStyle: {
                                color: '#3cf'
                            },
                            data: num
                        },
                        xAxis: [{

                            type: 'category',
                            data: d1,
                            axisTick: {
                                alignWithLabel: true
                            },
                            nameTextStyle: {
                                color: '#3cf',
                                fontSize: '9px'
                            },
                            axisLine: {
                                lineStyle: {
                                    color: 'rgba(255,255,255,.2)'
                                }
                            },
                            splitLine: {
                                lineStyle: {
                                    color: 'rgba(255,255,255,.1)'
                                }
                            },
                            axisLabel: {
                                color: "rgba(255,255,255,.7)"
                            },
                        }],
                        yAxis: [{
                            type: 'value',
                            nameTextStyle: {
                                color: '#3cf'
                            },
                            axisLine: {
                                lineStyle: {
                                    color: 'rgba(255,255,255,.2)'
                                }
                            },
                            splitLine: {
                                lineStyle: {
                                    color: 'rgba(255,255,255,.1)'
                                }
                            },
                            axisLabel: {
                                color: "rgba(255,255,255,.7)"
                            },
                        }],
                        series: [{
                            type: 'bar',
                            barWidth: '60%',
                            data: d2,
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [{
                                                offset: 0,
                                                color: '#00f0ff'
                                            },
                                            {
                                                offset: 1,
                                                color: '#032a72'
                                            }
                                        ]
                                    )
                                }
                            },
                        }]
                    };
                    myChart.setOption(option);
                } else {
                    var html = '';
                    html = "<div style='color:gray'>暂无数据</div>"
                    $('#lpeftmidbot').html(html)
                }

            }
        })
    }
    AlarmRegion()
    //报警地区统计 end

    //本周故障数与报警数
    function ThisFaultAlarm(date) {
        $.ajax({
            type: 'get',
            url: url + '/admin/bigdata/push_AlarmAndFault.action',
            data: 'username=' + user_name + '&date=' + date,
            error: function (error) {
                console.log(error)
            },
            success: function (res) {
                // console.log(res)
                var Alarm = res.Alarm
                var Fault = res.Fault
                if (Alarm.length != 0 && Fault.length != 0) {

                    var ad1 = [];
                    var ad2 = []
                    $.each(Alarm, function (i, v) {
                        ad1.push(v.num)
                        ad2.push(v.date)
                    })
                    var fd1 = [];
                    var fd2 = []
                    $.each(Fault, function (t, c) {
                        fd1.push(c.num)
                        fd2.push(c.date)
                    })
                    // console.log(ad1)
                    // console.log(ad2)
                    // console.log(fd1)
                    var myChart = echarts.init(document.getElementById('prbottom_box1'));
                    option = {
                        color: ['#d2d17c', '#7fd7b1', '#5578cf', '#5ebbeb', '#d16ad8', '#f8e19a', '#00b7ee', '#81dabe', '#5fc5ce'],
                        backgroundColor: 'rgba(1,202,217,.2)',
                        grid: {
                            left: 20,
                            right: 30,
                            top: 0,
                            bottom: 20
                        },
                        legend: {
                            top: 5,
                            textStyle: {
                                fontSize: 10,
                                color: '#3cf'
                            },
                            data: ['报警数', '故障数']
                        },
                        tooltip: {
                            show: true,
                            showContent: true
                        },
                        grid: {
                            left: 20,
                            right: 30,
                            top: 40,
                            bottom: 10,
                            containLabel: true
                        },
                        toolbox: {
                            feature: {
                                saveAsImage: {}
                            }
                        },
                        xAxis: {
                            type: 'category',
                            boundaryGap: false,
                            axisLine: {
                                lineStyle: {
                                    color: 'rgba(255,255,255,.2)'
                                }
                            },
                            splitLine: {
                                lineStyle: {
                                    color: 'rgba(255,255,255,.1)'
                                }
                            },
                            axisLabel: {
                                color: "rgba(255,255,255,.7)"
                            },
                            data: ad2
                        },
                        yAxis: {
                            type: 'value',
                            axisLine: {
                                lineStyle: {
                                    color: 'rgba(255,255,255,.2)'
                                }
                            },
                            splitLine: {
                                lineStyle: {
                                    color: 'rgba(255,255,255,.1)'
                                }
                            },
                            axisLabel: {
                                color: "rgba(255,255,255,.7)"
                            },
                        },
                        series: [{
                                name: '报警数',
                                type: 'line',
                                //stack: '总量',
                                data: ad1
                            },
                            {
                                name: '故障数',
                                type: 'line',
                                //stack: '总量',
                                data: fd1
                            }
                        ]
                    };
                    myChart.setOption(option);
                } else {
                    var html = '';
                    html = "<div style='color:gray'>暂无数据</div>"
                    $('#prbottom_box1').html(html)
                }

            }
        })
    }
    ThisFaultAlarm(0)
    //本周故障数与报警数 end

    //上周故障数与报警数
    function LastFaultAlarm(date) {
        $.ajax({
            type: 'get',
            url: url + '/admin/bigdata/push_AlarmAndFault.action',
            data: 'username=' + user_name + '&date=' + date,
            error: function (error) {
                console.log(error)
            },
            success: function (res) {
                console.log(res)
                var Alarm = res.Alarm
                var Fault = res.Fault
                if (Alarm.length != 0 && Fault.length != 0) {
                    var ad1 = [];
                    var ad2 = []
                    $.each(Alarm, function (i, v) {
                        ad1.push(v.num)
                        ad2.push(v.date)
                    })
                    var fd1 = [];
                    var fd2 = []
                    $.each(Fault, function (t, c) {
                        fd1.push(c.num)
                        fd2.push(c.date)
                    })
                    // console.log(ad1)
                    // console.log(ad2)
                    // console.log(fd1)
                    var myChart = echarts.init(document.getElementById('prbottom_box2'));
                    option = {
                        color: ['#d2d17c', '#7fd7b1', '#5578cf', '#5ebbeb', '#d16ad8', '#f8e19a', '#00b7ee', '#81dabe', '#5fc5ce'],
                        backgroundColor: 'rgba(1,202,217,.2)',
                        grid: {
                            left: 20,
                            right: 30,
                            top: 0,
                            bottom: 20
                        },
                        legend: {
                            top: 5,
                            textStyle: {
                                fontSize: 10,
                                color: '#3cf'
                            },
                            data: ['报警数', '故障数']
                        },
                        tooltip: {
                            show: true,
                            showContent: true
                        },
                        grid: {
                            left: 20,
                            right: 30,
                            top: 40,
                            bottom: 10,
                            containLabel: true
                        },
                        toolbox: {
                            feature: {
                                saveAsImage: {}
                            }
                        },
                        xAxis: {
                            type: 'category',
                            boundaryGap: false,
                            axisLine: {
                                lineStyle: {
                                    color: 'rgba(255,255,255,.2)'
                                }
                            },
                            splitLine: {
                                lineStyle: {
                                    color: 'rgba(255,255,255,.1)'
                                }
                            },
                            axisLabel: {
                                color: "rgba(255,255,255,.7)"
                            },
                            data: ad2
                        },
                        yAxis: {
                            type: 'value',
                            axisLine: {
                                lineStyle: {
                                    color: 'rgba(255,255,255,.2)'
                                }
                            },
                            splitLine: {
                                lineStyle: {
                                    color: 'rgba(255,255,255,.1)'
                                }
                            },
                            axisLabel: {
                                color: "rgba(255,255,255,.7)"
                            },
                        },
                        series: [{
                                name: '报警数',
                                type: 'line',
                                //stack: '总量',
                                data: ad1
                            },
                            {
                                name: '故障数',
                                type: 'line',
                                //stack: '总量',
                                data: fd1
                            }
                        ]
                    };
                    myChart.setOption(option);
                } else {
                    var html = '';
                    html = "<div style='color:gray'>暂无数据</div>"
                    $('#prbottom_box2').html(html)
                }

            }
        })
    }
    LastFaultAlarm(1)
    //本周故障数与报警数 end

    //报警信息
    function AlarmInfor(day) {
        $.ajax({
            type: 'get',
            url: url + '/admin/bigdata/push_AlarmInfo.action',
            data: 'username=' + user_name + '&time_zone=' + day,
            error: function (error) {
                console.log(error)
            },
            success: function (res) {
                console.log(res);
                var html = "";
                var morehtml = "";
                var data = res.data;
                var pno = res.pageCount;
                $('.arightboxtop').attr('data-pno', pno)
                $.each(data, function (i, v) {
                    // console.log(v);
                    html += "<li class='' data-did=" + v.did + " data-type=" + v.type + " data-name=" + v.name + " data-deviceid=" + v.deviceid + " data-typeName=" + v.isTrafficname + "><p class='fl'><b style='color:#fff'><span class='status-point'></span>" + v.isTrafficname + "</b><br><span style='float:right'>" + v.creationtime + "</span><br><span style='color:#3cf'>" + v.name + "</span>项目下设备号为<span style='color:#3cf'>" + v.deviceid + "</span>的设备因" + v.isTrafficname + "而产生报警<br></p><p class='fr pt17'></p></li>"

                })
                $('#inforUl').html(html);
            }
        })
    }
    AlarmInfor('d')

    //加载更多报警
    function AlarmInforMore(day, pno, pageSize) {
        $.ajax({
            type: 'get',
            url: url + '/admin/bigdata/push_AlarmInfo.action',
            data: 'username=' + user_name + '&time_zone=' + day + '&pno=' + pno + '&pageSize=' + pageSize,
            error: function (error) {
                console.log(error)
            },
            success: function (res) {
                console.log(res);
                var html = "";
                var morehtml = "";
                var data = res.data;
                $.each(data, function (i, v) {
                    // console.log(v);
                    html += "<li class='' data-did=" + v.did + " data-type=" + v.type + " data-name=" + v.name + " data-deviceid=" + v.deviceid + "  data-typeName=" + v.isTrafficname + "><p class='fl'><b style='color:#fff'><span class='status-point'></span>" + v.isTrafficname + "</b><br><span style='float:right'>" + v.creationtime + "</span><br><span style='color:#3cf'>" + v.name + "</span>项目下设备号为<span style='color:#3cf'>" + v.deviceid + "</span>的设备因" + v.isTrafficname + "而产生报警<br></p><p class='fr pt17'></p></li>"
                })
                $('#inforUl').append(html);
                console.log($('#inforUl'))

            }
        })
    }
    //报警信息 end
    //项目分布
    function projectQu(day) {
        $.ajax({
            type: 'get',
            url: url + '/admin/bigdata/push_ProjectRegion.action',
            data: 'username=' + user_name + '&time_zone=' + '',
            error: function (error) {
                console.log(error)
            },
            success: function (res) {
                console.log(res);
                if (res.length != 0) {
                    var d1 = [];
                    var d2 = [];
                    var num = []
                    $.each(res, function (i, v) {
                        //console.log(v)
                        d1.push(v.address)
                        d2.push(v.num)
                        num.push(i)
                    })
                    // console.log(d1)
                    // console.log(d2)
                    var myChart = echarts.init(document.getElementById('prbottom_box3'));
                    option = {
                        color: ['#3398DB', '#00b7ee', '#5578cf', '	#5ebbeb'],
                        backgroundColor: 'rgba(1,202,217,.2)',
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        legend: {
                            type: 'scroll',
                            pageIconColor: '#3cf',
                            pageTextStyle: {
                                color: '#3cf'
                            },
                            top: 10,
                            textStyle: {
                                color: '#3cf'
                            },
                            data: num
                        },
                        xAxis: [{

                            type: 'category',
                            data: d1,
                            axisTick: {
                                alignWithLabel: true
                            },
                            nameTextStyle: {
                                color: '#3cf',
                                fontSize: '9px'
                            },
                            axisLine: {
                                lineStyle: {
                                    color: 'rgba(255,255,255,.2)'
                                }
                            },
                            splitLine: {
                                lineStyle: {
                                    color: 'rgba(255,255,255,.1)'
                                }
                            },
                            axisLabel: {
                                color: "rgba(255,255,255,.7)"
                            },
                        }],
                        yAxis: [{
                            type: 'value',
                            nameTextStyle: {
                                color: '#3cf'
                            },
                            axisLine: {
                                lineStyle: {
                                    color: 'rgba(255,255,255,.2)'
                                }
                            },
                            splitLine: {
                                lineStyle: {
                                    color: 'rgba(255,255,255,.1)'
                                }
                            },
                            axisLabel: {
                                color: "rgba(255,255,255,.7)"
                            },
                        }],
                        series: [{
                            type: 'bar',
                            barWidth: '60%',
                            data: d2,
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [{
                                                offset: 0,
                                                color: '#00f0ff'
                                            },
                                            {
                                                offset: 1,
                                                color: '#032a72'
                                            }
                                        ]
                                    )
                                }
                            },
                        }]
                    };
                    myChart.setOption(option);
                } else {
                    var html = '';
                    html = "<div style='color:gray'>暂无数据</div>"
                    $('#prbottom_box3').html(html)
                }

            }
        })
    }
    projectQu()
    //项目分布 end

    var openCom = function (comid, comName, type, typeName,deviceid) {
        console.log(comid)
        console.log(comName)
        console.log(type)
        sessionStorage.setItem('DevBH', comid); //devId 
        sessionStorage.setItem('devMC', comName); //v.installLocation
        sessionStorage.setItem('devId', comid); //devId 
        if (type == 0) { //网关
            localStorage.setItem('tpage', '4')
            window.top.OpenThirdFrame("./ExtApp_SFASAlarm_SFASDetail.html?devBH=" + comid, 600, 600, "win", comName);
        } else if (type == 2) {
            localStorage.setItem('tpage', '6')
            sessionStorage.setItem('devId', comid); //devId 
            window.top.OpenThirdFrame("./SSmoke_SmokeDetail.html?devId=" + comid, 800, 600, "win", comName);
        } else if (type == 3) {
            window.top.OpenThirdFrame("./ExtApp_SElectric_ElecDetail.html?devBH=" + comid + '&typeName=' + typeName, 1100, 600, "win", comName);
        } else if (type == 4) {
            window.top.OpenThirdFrame("./ExtApp_Water_WaterDetail.html?devBH=" + comid, 800, 600, "win", comName);
        } else if (type == 5) {
            localStorage.setItem('tpage', '4')
            window.top.OpenThirdFrame("./ExtApp_SFASAlarm_SFASDetail.html?devBH=" + comid+'&pro='+deviceid, 600, 600, "win", comName);
        } else if (type == 6) {
            localStorage.setItem('tpage', '7')
            window.top.OpenThirdFrame("./SGasAlarm_GasAlarm.html?devId=" + comid, 800, 600, "win", "历史报警");
        } else if (type == 8) {
            window.top.OpenThirdFrame("./ExtApp_Water_WaterDetailwatch.html?devBH=" + comid, 800, 600, "win", comName);
        } else if (type == 9) {
            alert('暂无此功能')
            // window.top.OpenThirdFrame("./ExtApp_SElectric_ElecDetail.html?devBH=" + comid, 1100, 600, "win", comName);
        } else if (type == 20) {
            alert('暂无此功能')
            // window.top.OpenThirdFrame("./ExtApp_SElectric_ElecDetail.html?devBH=" + comid, 1100, 600, "win", comName);
        }

    }
})