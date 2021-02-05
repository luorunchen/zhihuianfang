$(function(){
  var username=localStorage.getItem('userName')
    $('#save-btn').click(function(){
        var name=document.getElementById('name').value;
        console.log(name);
        var obj = document.getElementsByName("thirdMenuIdList");
        var check_val = [];
        for (var k in obj) {
        if (obj[k].checked) {
            check_val.push(obj[k].value);
        }

        }
        var p_id = check_val.join(',');
        console.log(p_id)
        var role="admin"
        $.ajax({
            type: 'get',
            url: url+'/power/givePowerRole.action',
            data: 'role_name=' + name + '&username=' + username + '&p_id=' + p_id,
            error: function (error) {console.log(error)},
            success: function (res) {
              console.log(res);
              if(name==""){
                  alert('请填写角色名')
              }else{
                if(res.code=='200'){
                    alert(res.mess);
                    parent.location.reload();
                }else{
                     alert(res.mess);
                }
              }
            }
          })
    })
    
   
})