$(function () {
  var global = (function () {
    var search = $('#ediModelIfm').context.URL;
    var search = decodeURI(search);
    var global = {};
    if (search != "") {
      search.slice(1).split('?')[1].split('&').forEach(
        function (val) {
          var arr = val.split("=");
          global[arr[0]] = arr[1];
        }
      );
    }
    return global;
  })();
  console.log(global);
  //http://p240647i77.qicp.vip/newEarlyWarn/WebProject/getOrderDeviceBydataid.action?dataid=7240e777-b04f-4d68-b472-866b4e1bbb7c
  $.ajax({
    type:'get',
    url:url+'/WebProject/getOrderDeviceBydataid.action',
    data:'dataid='+global.cid,
    error:function(error){console.log(error)},
    success:function(res){
      console.log(res);
       /*数据id  0
        订单编号  1
        设备型号   2
        电工姓名,  3
        电工手机号  4
        所属公司   5
        接单时间   6
        安装回执单号  7
        发货人姓名  8
        设备IMSI号  9
        设备属性（初装、换货、拆除）  10
        安装状态（待装、已装、异常）   11
        异常原因   12
        保险单号是否下发  13
        安装图片是否上传  14
      */
      $('#orderid').val(res.orderid) //订单编号
      $('#deviceNo').val(res.deviceNo) //订单编号
      $('#dhxm').val(res.dhxm) //电工姓名
      $('#dgsjhm').val(res.dgsjhm) //电工手机号
      $('#ssgs').val(res.ssgs) //所属公司
      $('#jdsj').val(res.jdsj) //接单时间
      $('#azhzdh').val(res.azhzdh) //安装回执单号
      $('#fhrxm').val(res.fhrxm) //发货人姓名 
      $('#imsi').val(res.imsi) //设备IMSI号  

      if(res.azzt=='异常'){
        $('#yichang').show();
        $('#ycyy').val(res.ycyy)
      } else {
        $('#yichang').hide();
      }
    function setCheckBoxStatus(elements, data) {
      $(elements).each(function () {
          let value = $(this).val();
          if (data.indexOf(value) >= 0) {
              $(this).prop("checked", true)
          } else {
              $(this).prop("checked", false)
          }
      })
    }
    var facShu=$("input[name='facShu']")
    setCheckBoxStatus(facShu,res.sbsx)     //设备属性（初装、换货、拆除）
    var anZhuang=$("input[name='anZhuang']")  
    setCheckBoxStatus(anZhuang,res.azzt)    //安装状态（待装、已装、异常） 
    var bxdsfxf=$("input[name='baoxian']")
    setCheckBoxStatus(bxdsfxf,res.bxdsfxf)  //保险单号是否下发 
    var anzhuangPhoto=$("input[name='anzhuangPhoto']")
    setCheckBoxStatus(anzhuangPhoto,res.aztpsjsc)  //安装图片是否上传  

    }
  })
  $('#btn_close').click(function () {
    var index = parent.layer.getFrameIndex(window.name);
    parent.layer.close(index);
  })

  
  $("input[name='anZhuang']").click(function () {
    if ($(this).val() == '异常') {
      $('#yichang').show();
    } else {
      $('#yichang').hide();
    }
  })


  $('#Edit_save').click(function () {
    var orderid=$('#orderid').val() //订单编号
    var deviceNo=$('#deviceNo').val() //设备型号
    var dhxm=$('#dhxm').val() //电工姓名
    var dgsjhm=$('#dgsjhm').val() //电工手机号
    var ssgs=$('#ssgs').val() //所属公司
    var jdsj=$('#jdsj').val() //接单时间
    var azhzdh=$('#azhzdh').val() //安装回执单号
    var fhrxm=$('#fhrxm').val() //发货人姓名 
    var imsi=$('#imsi').val() //设备IMSI号  
    var sbsx=$("input[name='facShu']:checked").val();   //设备属性（初装、换货、拆除） 
    var azzt=$("input[name='anZhuang']:checked").val(); //安装状态（待装、已装、异常）
    var bxdsfxf=$("input[name='baoxian']:checked").val(); //保险单号是否下发 
    var aztpsjsc=$("input[name='anzhuangPhoto']:checked").val(); //安装图片是否上传 
    if(orderid==""){
      layer.open({
        content:'请填写订单编号'
      })
    }else if(deviceNo==""){
      layer.open({
        content:'请填写设备型号'
      })
    }else if(dhxm==""){
      layer.open({
        content:'请填写电工姓名'
      })
    }else if(dgsjhm==""){
      layer.open({
        content:'请填写电工手机号'
      })
    }else if(ssgs==""){
      layer.open({
        content:'请填写所属公司'
      })
    }else if(jdsj==""){
      layer.open({
        content:'请填写接单时间'
      })
    }else if(azhzdh==""){
      layer.open({
        content:'请填写安装回执单号'
      })
    }else if(fhrxm==""){
      layer.open({
        content:'请填写发货人姓名'
      })
    }else if(imsi==""){
      layer.open({
        content:'请填写设备IMSI号'
      })
    }else if(sbsx==undefined){
      layer.open({
        content:'请选择设备属性（初装、换货、拆除）'
      })
    }else if(azzt==undefined){
      layer.open({
        content:'请选择安装状态（待装、已装、异常））'
      })
    }else if(bxdsfxf==undefined){
      layer.open({
        content:'请选择保险单号是否下发'
      })
    }else if(aztpsjsc==undefined){
      layer.open({
        content:'请选择安装图片是否上传'
      })
    }else{
      var yichang=$("input[name='anZhuang']:checked").val();
      if (yichang == '异常') {
        var ycyy=$('#ycyy').val()
        if(ycyy==""){
          layer.open({
            content:'请填写异常原因'
          })
        }
      } else {
        var ycyy=''
      }
      var status='1';
      $.ajax({
        type:'get',
        url:url+'/WebProject/updateOrderDecive.action',
        data:'dataid='+global.cid+'&orderid='+orderid+'&deviceNo='+deviceNo+'&dhxm='+dhxm+'&dgsjhm='+dgsjhm+'&ssgs='+ssgs+'&jdsj='+jdsj+'&azhzdh='+azhzdh+'&fhrxm='+fhrxm+'&imsi='+imsi+'&sbsx='+sbsx+'&azzt='+azzt+'&ycyy='+ycyy+'&bxdsfxf='+bxdsfxf+'&aztpsjsc='+aztpsjsc+'&status='+status,
        error:function(error){console.log(error)},
        success:function(res){
          console.log(res);
          if(res.status=true){
            layer.open({
              content:res.mess
            })
            var index = parent.layer.getFrameIndex(window.name);
            setTimeout(() => {
              parent.layer.close(index);
              // parent.location.reload();  //父级刷新
              parent.location.reload();  //父级刷新
            }, 1000);
          }
        }
      })
    }
  })

})