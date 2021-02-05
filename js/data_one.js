$(function () {
  var userName = parseInt(localStorage.getItem('userName'));
  // console.log(userName);
  $.ajax({
    type: 'get',
    url: url+'/getIndexReport.action',
    data: 'username=' + userName,
    error: function (error) {
      console.log(error + '1.html')
    },
    success: function (res) {
      var res = JSON.parse(res);
      console.log(res);
      var huozai = res.lo;
      var yinhuo_sum = res.errsum; //报警总数
      var yinhuo_del = res.errdel; //已经整改数
      var yinhuo_wei = yinhuo_sum - yinhuo_del; //未整改数
      var res_zeng=parseFloat((huozai[7].num/huozai[6].num).toFixed(2));
      console.log(res_zeng);
      var yinhuan_pai=res.lt;
      var yinhuan_zheng=res.ls;
      //2018 年度火灾隐患趋势统计
      var dd2 = []
      $.each(huozai, function (i, v) {
        dd2.push([v.date, v.num]);
      })
      //console.log(dd2);
      $(document).ready(function () {
        //Highcharts.setOptions({
        //    colors: ['#2e358b']
        //});
        //单位类比统计
        $('#965cd6ffa7284a47995e1dac1361ef2b').highcharts({
          chart: {
            backgroundColor: 'rgba(0,0,0,0)'
          },
          title: {
            text: '2018 年度隐患趋势统计',
            style: {
              "fontSize": "18px;",
              "color": "#fff",
              fontFamily: "Microsoft YaHei"
            }
          },
          xAxis: {
            gridLineColor: "#ffffff",
            labels: {
              style: {
                color: '#ffffff'
              }
            },
            categories: []
          },
          yAxis: [{
            title: "",
            gridLineColor: "#ffffff",
            labels: {
              style: {
                color: '#ffffff'
              }
            },
            minTickInterval: 3
          }],
          legend: {
            enabled: false
          },
          credits: {
            enabled: true
          },
          series: [{
            name: '隐患',
            data: dd2
          }]
        });
      });
      //当年度隐患 
      var html = "";
      html = "当年度隐患" + yinhuo_sum + "个";
      $('#PieChartBox1').html(html);
      var dd1 = [];
      dd1.push([yinhuo_del, yinhuo_wei])
      //console.log(dd1[0][0]);
      $(document).ready(function () {
        //单位类比统计
        $('#c1a3205530ba4c4eaa83a670f2b04364').highcharts({
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            backgroundColor: 'rgba(0,0,0,0)'
          },
          title: {
            text: ""
          },
          tooltip: {
            pointFormat: '{name}{point.y}个' //官方只给了鼠标放上去的百分比，后来发现在图例中直接用 this.percentage 就行
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              showInLegend: false,
              dataLabels: {
                enabled: true,
                distance: 10,
                format: '{point.name}{point.percentage:.1f}%',
                style: {
                  "fontSize": "12px;",
                  "color": "#fff"
                }
              }
            }
          },
          credits: {
            enabled: false // 禁用版权信息
          },
          series: [{
            type: 'pie',
            name: '隐患数',
            data: [{
              name: '未整改',
              y: dd1[0][1],
              color: '#ff0000'
            }, {
              name: '已整改',
              y: dd1[0][0],
              color: '#94ba2d'
            }]
          }]
        });
      });
      //当月隐患
      var html="";
      console.log(res_zeng.toFixed(2)*100);
      if(res_zeng<1){
          html="<div class='chartTitle'>当月隐患 "+huozai[7].num+"个</div><div class='chartSumRow chartSumRow2'>上月隐患："+huozai[6].num+"&nbsp; &nbsp; &nbsp; &nbsp;同比上涨"+(res_zeng.toFixed(2)*100)+"%</div></div>";
      }else{
        html="<div class='chartTitle'>当月隐患 "+huozai[7].num+"个</div><div class='chartSumRow chartSumRow2'>上月隐患："+huozai[6].num+"&nbsp; &nbsp; &nbsp; &nbsp;同比下降"+(res_zeng.toFixed(4)*100)+"%</div></div>";
      }
      
      $('#PieChartBox2').html(html);

      //发现隐患排行榜
      var html="";
      var html="<div class='chartTitle'>发现隐患排行榜</div>";
      $.each(yinhuan_pai,function(i,v){
        //console.log(v)
        html=html+"<div class='CompanyItem1'>"+(i+1)+"、"+v.date+"("+v.num+")</div>"
      })
      $('#CompanyList1').html(html);
      //隐患整改排行榜
      var html="";
      var html="<div class='chartTitle'>隐患整改排行榜</div>";
      $.each(yinhuan_zheng,function(i,v){
        html=html+"<div class='CompanyItem2'>"+(i+1)+"、"+v.date+"("+v.num+")</div>"
      })
      $('#CompanyList2').html(html);
    }
  })

})