$(function(){
    var global=(function(){
      	var search=$('#ediModelIfm').context.URL;
        var search=decodeURI(search);
  		var global={};		
 		if(search!=""){	
      		search.slice(1).split('?')[1].split('&').forEach(	
      			function(val){
        			var arr=val.split("=");		
          			global[arr[0]]=arr[1];		
      			}
      		);
       	}
    	return global;		
 	})();
    var username=localStorage.getItem('userName');
    console.log(global);
    var html="<input id='name' name='name' class='form-control' type='text' value='"+global.name+"'>"
    $('#jue_name').html(html);
    function setCheckBoxStatus(elements, data) {
        $(elements).each(function () {
          let value = $(this).val();
          if (data.indexOf(value) >= 0) {
            $(this).prop("checked", true)
            $(this).parent().parent().siblings().children().find('input[name=subMenuIdList]').prop("checked", true)
          } else {
            $(this).prop("checked", false)
          }
        })
    }
    $.ajax({
        type:'get',
        url:url+'/power/getRoleByid.action',
        data:'r_id='+global.id,
        error:function(error){console.log(error+'jur.js')},
        success:function(res){
            console.log(res.data);
            var checkboxs = $('input[name=thirdMenuIdList]')
            console.log(checkboxs)
            setCheckBoxStatus(checkboxs, res.data)
        }
    })

    $('#save-btn').click(function(){
        var name=document.getElementById('name').value;
        console.log(name);
        var obj = document.getElementsByName("thirdMenuIdList");
        console.log(obj)
        var check_val = [];
        for (var k in obj) {
            if (obj[k].checked) {
                check_val.push(obj[k].value);
            }
        }
        var p_id = check_val.join(',');
        
        console.log(p_id);
        $.ajax({
            type:'get',
            url:url+'/power/editPower.action',
            data:'id='+global.id+'&role_name='+name+'&p_id='+p_id+'&username='+username,
            error:function(error){console.log(error+'jur2.js')},
            success:function(res){
                console.log(res)
               if(name==""){
                   alert('请添加角色名')
               }else {
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