$(function(){
  var powerId=localStorage.getItem('new_role');
  var username=localStorage.getItem('userName')
  console.log(username)
  if(powerId == 1000 ) {
    SXiDay(); 
  }else{
      alert('用户无此权限,如需此权限请向上级申请')
  }
  function SXiDay(){
    $('#tableHeight').show()
    //http://p240647i77.qicp.vip/newEarlyWarn/WebProject/getSyslog
    $.ajax({
      type: 'get',
      url: url + '/WebProject/getSyslog',
      data: 'my_username=' + username,
      error: function (error) {
          console.log(error)
      },
      success: function (res) {
          console.log(res)
          var html="";
          $.each(res,function(i,v){
            html+="<tr><td class='tabLabel'>"+(i+1)+"</td><td>"+v.mess+"</td><td>"+v.status+"</td></tr>";
          })
          $('#weblist').html(html);
      }
    })
  }
})