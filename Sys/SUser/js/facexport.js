$(function () {
    // var global = (function () {
    //   var search = $('#ediModelIfm').context.URL;
    //   var search = decodeURI(search);
    //   var global = {};
    //   if (search != "") {
    //     search.slice(1).split('?')[1].split('&').forEach(
    //       function (val) {
    //         var arr = val.split("=");
    //         global[arr[0]] = arr[1];
    //       }
    //     );
    //   }
    //   return global;
    // })();
    // console.log(global)
    var username=localStorage.getItem('userName');
    $('#save-btn').click(function(){
      var online=$("input[name='thirdMenuIdList']:checked").val()
      var s_date=$('#s_date').val();
      var e_date=$('#e_date').val();
      console.log(s_date)
      console.log(e_date)
      if(online==undefined){
        var online='';
      }else{
        var online=online
      }
      var alarm=$("input[name='alarm']:checked").is(':checked')
      if(alarm==true){
        var alarm='1'
      }else{
        var alarm=''
      }
      var type=$("input[name='menuFac']:checked")
      if(type.is(':checked')==false){
        var strType=''
      }else{
        var arrType=[];
        for(var i=0;i<type.length;i++){
          arrType.push(type[i].value)
        }
        var strType=arrType.toString()
      }
      if(online==4){
        var online ='';
        var alarm ='';
        window.open(url+"/newdevice/PoiRegionDevice.action?username="+username+"&online="+online+'&alarm='+alarm+'&region=1&reName=&type='+strType+'&s_date='+s_date+'&e_date='+e_date);
      }else{
        window.open(url+"/newdevice/PoiRegionDevice.action?username="+username+"&online="+online+'&alarm='+alarm+'&region=1&reName=&type='+strType+'&s_date='+s_date+'&e_date='+e_date);
      }

    })
  })