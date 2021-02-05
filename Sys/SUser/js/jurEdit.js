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
  //获取权限信息
    function setCheckBoxStatus(elements, data) {
        $(elements).each(function () {
          let value = $(this).val();
          console.log(value)
          if (data.indexOf(value) >= 0) {
            $(this).prop("checked", true)
            $(this).parent().parent().siblings().children().find('input[name=subMenuIdList]').prop("checked", true)
          } else {
            $(this).prop("checked", false)
          }
        })
    }
    $("input[name='subMenuIdList']").click(function () {
        var that = $(this);
        // 
        var LefeCheck = that.parent().parent().siblings().children()
        if (that.is(':checked') == true) {
          that.prop("checked", true)
          for (var i = 0; i < LefeCheck.length; i++) {
            LefeCheck[i].firstChild.nextSibling.checked = true
          }
        } else {
          that.prop("checked", false)
          for (var i = 0; i < LefeCheck.length; i++) {
            LefeCheck[i].firstChild.nextSibling.checked = false
          }
        }
    
      })
      $("input[name='thirdMenuIdList']").click(function () {
        var that = $(this);
        that.parent().parent().children().find("input[name='thirdMenuIdList']").is(':checked')
        //判断点击子节点的checkbox 是否已经选中   
        if (that.is(':checked') == true) {
          //未选中就选中
          that.prop("checked", true)
          that.parent().parent().siblings().children().children().first().prop("checked", true)
        } else {
          //选中就取消选中
          that.prop("checked", false)
          if (that.parent().parent().children().find("input[name='thirdMenuIdList']").is(':checked') == false) {
            that.parent().parent().siblings().children().children().first().prop("checked", false)
          }
        }
      })
      //获取原有rid 选中
    function setCheckBoxStatus(elements, data) {
      console.log(data)
        $(elements).each(function () {
          console.log($(this))
            let value = $(this).val();
            console.log(value)
            if (data.indexOf(value) >= 0) {
                $(this).prop("checked", true)
                console.log($(this).parent().parent().siblings())
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
          console.log(res)
            // console.log(res.data);
            var checkboxs = $('input[name=thirdMenuIdList]')
            // console.log(checkboxs)
            setCheckBoxStatus(checkboxs, res.data)
        }
    })
    //该用户属于区域：
    $.ajax({
        type: 'get',
        url: url + '/power/getRoleByid.action',
        data: 'id=' + global.id  + '&region=' + global.region,
        error: function (error) {
            console.log(error + 'jur2.js')
        },
        success:function(result){
            var province=result.province  //省
            var pCode=result.provinceCode
            var city=result.city  //市
            var cCode=result.cityCode
            var area=result.area  //区
            var aCode=result.areaCode
            var street=result.street  //社区
            var sCode=result.streetCode
            var community=result.community  //街道
            var ccCode=result.communityCode
            var html="";
            var code="";
            if(pCode != "") {
              code=pCode;
            }
             if(cCode !=""){
              code=cCode
            }
            if(aCode !=""){
               code=aCode
            }
            if(sCode !=""){
              code=sCode
            }
            if(ccCode !=""){
               code=ccCode
            }
            // console.log(code);
            if(province=='全国'){
              var html = "<input id='nameQuYo' name='name' class='form-control' type='text' value='" + province+city+area+street+community+','+pCode + "' readonly>"
            }else if(province==''){
              var html = "<input id='nameQuYo' name='name' class='form-control' type='text' value='' readonly>"
            }else{
              var html = "<input id='nameQuYo' name='name' class='form-control' type='text' value='" + province+city+area+street+community+','+code + "' readonly>"
            }
            
            $('#onlyAddress').html(html);
            sessionStorage.setItem('ccCode',ccCode)
        }

    })

    function quYo(data, type) {
        $.ajax({
          type: 'get',
          url: url + "/power/getRegon.action",
          data: 'username=' + username + '&code=' + data + '&type=' + type,
          error: function (error) {
            console.log(error)
          },
          success: function (res) {
            console.log(res)
            if (res != "") {
              var html = "";
              
              if(type == "province"){
                html = "<option data-code='kong'></option><option data-code='qing'>清除区域,</option><option data-code='1'>全国,1</option>";
              }else{
                html = "<option></option>";
              }
              $.each(res, function (i, v) {
                html += "<option data-code=" + v.ad_Code + ">" + v.ad_Region + "," + v.ad_Code + "</option>"
              })
              
              if (type == "province") {
                $('#shengJi').html(html);
                $('#shiJi').show();
              } else if (type == "city") {
                $('#shiJi').html(html);
                $('#quJi').show();
              } else if (type == "area") {
                $('#quJi').html(html);
                $('#jieJi').show();
              } else if (type == "street") {
                $('#jieJi').html(html);
                $('#JuWei').show();
              } else if (type == "community") {
                $('#JuWei').html(html);
              }
            } else {
              alert('暂无此数据')
            }
    
    
    
          }
        })
    
      }
    
      quYo('', 'province')
      $('#shengJi').change(function () {
        var data = $(this).val().split(',')[1]
        quYo(data, 'city')
      })
      $('#shiJi').change(function () {
        var data = $(this).val().split(',')[1]
        quYo(data, 'area')
      })
      $('#quJi').change(function () {
        var data = $(this).val().split(',')[1]
        quYo(data, 'street')
      })
      $('#jieJi').change(function () {
        var data = $(this).val().split(',')[1]
        quYo(data, 'community')
      })
    //点击保存
    $('#btn_close').click(function(){
      var index = parent.layer.getFrameIndex(window.name);
      parent.layer.close(index);
    })

    $('#save-btn').click(function(){
        var name=document.getElementById('name').value;
        var obj = document.getElementsByName("thirdMenuIdList");
        var check_val = [];
        for (var k in obj) {
            if (obj[k].checked) {
                check_val.push(obj[k].value);
            }
        }
        var p_id = check_val.join(',');
        //var region=$('#JuWei').val() || "";
        var region1=$('#shengJi').val() ;
        var region2=$('#shiJi').val() ;
        var region3=$('#quJi').val() ;
        var region4=$('#jieJi').val() ;
        var region5=$('#JuWei').val() ;
        if(region1=="" || region1==null){
          var region=""
          // if(region==""){
          //   var region=$('#nameQuYo').val()
          // }else{
          //   var region=$('#nameQuYo').val().split(',')[1];
          // }
          
        }else if(region2 =="" || region2==null){
          var region=$('#shengJi').val()
        }else if(region3 =="" || region3==null){
          var region=$('#shiJi').val()
        }else if(region4 =="" || region4==null){
          var region=$('#quJi').val()
        }else if(region5 =="" || region5==null){
          var region=$('#jieJi').val()
        }else{
          var region=$('#JuWei').val()
        }
        console.log(region)
        if(name==""){
            alert('请添加角色名')
        }else{
          if(region==""){
            if($('#nameQuYo').val()==""){
              var region="";
            }else{
              var region=$('#nameQuYo').val().split(',')[1]
            }
          }else{
            var region=region.split(',')[1];
          }
          
          console.log(region)
            $.ajax({
                type:'get',
                url:url+'/power/editPower.action',
                data:'id='+global.id+'&role_name='+name+'&p_id='+p_id+'&username='+username+'&region='+region,
                error:function(error){console.log(error+'jur2.js')},
                success:function(res){
                    console.log(res)
                    if(res.code=='200'){
                        alert(res.mess);
                        var index = parent.layer.getFrameIndex(window.name);
                        setTimeout(() => {
                          parent.layer.close(index);
                          // parent.location.reload();  //父级刷新
                          parent.location.reload();  //父级刷新
                        }, 100);
                        // parent.location.reload();
                    }else{
                        alert(res.mess);
                    }
                    
                }
    
            })
        }
        
    })
})