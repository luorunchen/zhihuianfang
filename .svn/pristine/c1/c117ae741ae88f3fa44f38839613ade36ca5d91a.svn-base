$(function () {
    var powerId = localStorage.getItem('new_role');
    var username = localStorage.getItem('userName');
    //http://p240647i77.qicp.vip/newEarlyWarn/WebProject/RegisterOnline.action?my_username=18975958581
    function online(){
        $('#tableHeight').show()
        $.ajax({
            type: 'get',
            url: url + '/WebProject/RegisterOnline.action',
            data: 'my_username=' + username,
            error: function (error) {
                console.log(error)
            },
            success: function (res) {
                console.log(res)
                var offine = res.offine;
                var online = res.online;
                var webOnline = res.webOnline;
                var appOnline  = res.appOnline ;
                var num = res.num;
                var weblist=res.webList
                var applist=res.appList
                var webhtml="";
                if(weblist.length!=0){
                    $.each(weblist,function(i,v){
                        webhtml+="<tr><td class='tabLabel'>"+(i+1)+"</td><td>"+v.user_name+"</td><td>"+v.status+"</td><td>"+v.webLoginTime+"</td></tr>";
                    })
                }else{
                    webhtml="<tr><td colspan='4'>暂无web端用户在线</td></tr>";
                }
                
                $('#weblist').html(webhtml);
                var apphtml="";
                if(applist.length!=0){
                    $.each(applist,function(i,v){
                        apphtml+="<tr><td class='tabLabel'>"+(i+1)+"</td><td>"+v.user_name+"</td><td>"+v.status+"</td><td>"+v.logintime+"</td></tr>";
                    })
                }else{
                    apphtml="<tr><td colspan='4'>暂无app端用户在线</td></tr>";
                }
                
                $('#applist').html(apphtml);
                var myChart = echarts.init(document.getElementById('onli'));
                option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data: ['app在线', 'web在线', '离线']
                    },
                    series: [{
                            name: '访问来源',
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
                                    value: appOnline,
                                    name: 'app在线',
                                    selected: true
                                },
                                {
                                    value: webOnline,
                                    name: 'web在线',
                                    selected: true
                                },
                                {
                                    value: offine,
                                    name: '离线'
                                },
                            ]
                        },
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: ['40%', '55%'],
                            label: {
                                normal: {
                                    formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                                    backgroundColor: '#eee',
                                    borderColor: '#aaa',
                                    borderWidth: 1,
                                    borderRadius: 4,
                                    rich: {
                                        a: {
                                            color: '#999',
                                            lineHeight: 22,
                                            align: 'center'
                                        },
                                        hr: {
                                            borderColor: '#aaa',
                                            width: '100%',
                                            borderWidth: 0.5,
                                            height: 0
                                        },
                                        b: {
                                            fontSize: 16,
                                            lineHeight: 33
                                        },
                                        per: {
                                            color: '#eee',
                                            backgroundColor: '#334455',
                                            padding: [2, 4],
                                            borderRadius: 2
                                        }
                                    }
                                }
                            },
                            data: [{
                                value: num,
                                name: '用户总数'
                            }, ]
                        }
                    ]
                };
                myChart.setOption(option);
            }
        })
    }
    var powerId=localStorage.getItem('new_role');
    if(powerId == 1000 ) {
        online();
        
    }else{
        
        alert('用户无此权限,如需此权限请向上级申请')
        
    }
    
})