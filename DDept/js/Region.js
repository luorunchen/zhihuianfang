$(function(){
  alert(2);
  var username=localStorage.getItem('userName');
  console.log(username)
  var pno= "1"  
  function edit(pno,pageSize){
    $.ajax({
      type:'get',
      data:'&username='+username+'&pno='+pno+'&pageSize='+pageSize,
      url:url+'/region/getRegionList.action',
      error:function(error){console.log(error)},
      success:function(res){
        var res=JSON.parse(res);
        console.log(res);
        var udata=res.mess
        var num=Math.ceil(res.recordCount/pageSize);
        sessionStorage.setItem('num',num);
        var html="";
        if(udata!=""||udata!=null){
          $.each(udata,function(i,v){
            //console.log(i);
            html+="<tr class=''><td  class='td_center' style='width:60px;' name="+v.name+" value="+v.pid+">"+(i+1)+"</td><td  class='td_center' style='width:100px;'>"+v.name+"</td><td  class='td_center' style='width:100px;'>"+v.location+"</td><td  class='td_center' style='width:100px;'>"+v.master+"</td><td  class='td_center' style='width:100px;'>"+v.fireman+"</td><td  class='td_center' style='width:100px;'>"+v.responsible+"</td><td  class='td_center' style='width:100px;'></td><td  class='td_center' style='width:150px;'><div class='btn-group btn-group-sm' role='group'><button type='button' aria-expanded='false'  class='btn btn-primary lookDetail' ><span class='glyphicon glyphicon-edit' aria-hidden='true'></span>查看 </button> </div><div class='btn-group btn-group-sm' role='group'><button type='button' aria-expanded='false' id='faca_delete'  class='btn btn-danger'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span>删除 </button></div> </td> </tr>";
          })
          $('#GridTables').html(html)
          $('.lookDetail').click(function(){
            var tpage="9";
            localStorage.setItem('tpage',tpage);
            var comid=$(this).parent().parent().parent().children().attr('value')
            var comName=$(this).parent().parent().parent().children().attr('name');
            sessionStorage.setItem('ComID',comid);  
            sessionStorage.setItem('comName',comName);
             window.top.OpenFrame("../All_ElecComDetail.html?ComID=" + comid + "&ComName=" + escape(comName), 930, 620, "SElect", comName, "", function (r) {
  
             });
          })
        }
        
        var html="";
            html="<div class='input-group' style='float:left;padding-left:10px;'><span>第</span><input type='text' value='"+pno+"' readonly='readonly'><span>/</span><input type='text' value='"+num+"' readonly='readonly'><span>页,每页</span><input type='text' value='"+pageSize+"' readonly='readonly'><span>行，共</span><input type='text' value='"+udata.length+"' readonly='readonly'><span>行</span></div>";
            $('.input_left').html(html);
                
            var num=parseInt(num);   //总页数
            var html="";
           
            if(pno-2>0){
                html="<li><a href='#' class='aPrev'>"+(pno-2)+"</a></li>";
            }
            if(pno-1>0){
                html=html+"<li><a href='#' class='aPrev'>"+(pno-1)+"</a></li>";
            }
            html=html+"<li class='active'><a href='#'>"+pno+"</a></li>";
            if(pno+1<=num){
                html=html+"<li><a href='#' class='aPrev'>"+(pno+1)+"</a></li>";
            }
            if(pno+2<=num){
                html=html+"<li><a href='#' class='aPrev'>"+(pno+2)+"</a></li>";
            }
            
            $("#pagination").html(html);
            $("#pagination").prepend("<a href='#' class='firstPage btn btn-default' style='float:left'>首页</button>");
            $("#pagination").append("<a href='#' class='endPage btn btn-default' >末页</button>")
            var aPrev=$('.firstPage');
            var aNext=$('.endPage');
            if(pno===1) aPrev.addClass('disabled');   
            if(pno===num)aNext.addClass('disabled'); 
      }
    })
  }
  edit(1,15)
  $("#pagination").on("click","a",function(e){
    console.log(1);
    e.preventDefault();
    // 2.获取当前页码
    var num=sessionStorage.getItem('num');
  //  console.log($(this).html());
    if($(this).html()=='首页'){
        edit(1,15);
    }else if($(this).html()=='末页'){
        edit(num,15);
    }else{
        var pno=parseInt($(this).html());
        console.log(pno);
        // 3.调用分页函数
        edit(pno,15);
    }

})
  var setting = {
    async: {
      enable: true,
      type:'get',
      url:url+"/region/getProvince.action",
      autoParam:["id=code"],   //异步加载时需要自动提交父节点属性的参数。
      otherParam:{"username":username,"otherParam":"zTreeAsyncTest"},   //Ajax 请求提交的静态参数键值对
       //dataFilter: filter  //用于对 Ajax 返回数据进行预处理的函数
    },
   callback: {
     onClick: onClick
   }
  };
  function onClick(event, treeId, treeNode, clickFlag) {
    console.log(treeNode)
    var pno='1';
    var pageSize='2';
    $.ajax({
      type:'get',
      data:'region='+treeNode.name+'&username='+username,
      url:url+'/region/getRegionList.action',
      error:function(error){console.log(error)},
      success:function(res){
        var res=JSON.parse(res);
        console.log(res);
        var udata=res.mess
        var num=Math.ceil(res.recordCount/pageSize);
        sessionStorage.setItem('num',num);
        var html="";
        if(udata!=""||udata!=null){
          $.each(udata,function(i,v){
            //console.log(i);
            html+="<tr class=''><td  class='td_center' style='width:60px;' name="+v.name+" value="+v.pid+">"+(i+1)+"</td><td  class='td_center' style='width:100px;'>"+v.name+"</td><td  class='td_center' style='width:100px;'>"+v.location+"</td><td  class='td_center' style='width:100px;'>"+v.master+"</td><td  class='td_center' style='width:100px;'>"+v.fireman+"</td><td  class='td_center' style='width:100px;'>"+v.responsible+"</td><td  class='td_center' style='width:100px;'></td><td  class='td_center' style='width:150px;'><div class='btn-group btn-group-sm' role='group'><button type='button' aria-expanded='false'  class='btn btn-primary lookDetail' ><span class='glyphicon glyphicon-edit' aria-hidden='true'></span>查看 </button> </div><div class='btn-group btn-group-sm' role='group'><button type='button' aria-expanded='false' id='faca_delete'  class='btn btn-danger'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span>删除 </button></div> </td> </tr>";
          })
          $('#GridTables').html(html)
          $('.lookDetail').click(function(){
            var tpage="9";
            localStorage.setItem('tpage',tpage);
            var comid=$(this).parent().parent().parent().children().attr('value')
            var comName=$(this).parent().parent().parent().children().attr('name');
            sessionStorage.setItem('ComID',comid);  
            sessionStorage.setItem('comName',comName);
             window.top.OpenFrame("../All_ElecComDetail.html?ComID=" + comid + "&ComName=" + escape(comName), 930, 620, "SElect", comName, "", function (r) {
  
             });
          })
          var html="";
            html="<div class='input-group' style='float:left;padding-left:10px;'><span>第</span><input type='text' value='"+pno+"' readonly='readonly'><span>/</span><input type='text' value='"+num+"' readonly='readonly'><span>页,每页</span><input type='text' value='"+pageSize+"' readonly='readonly'><span>行，共</span><input type='text' value='"+udata.length+"' readonly='readonly'><span>行</span></div>";
            $('.input_left').html(html);
        
            var aPrev=$('.aPrev');
            var aNext=$('.aNext');
            if(pno===1) aPrev.addClass('disabled');   
            if(pno===num)aNext.addClass('disabled');  
            
                   
            var num=parseInt(num);   //总页数
           // console.log(pno);
          //  console.log(num);
            var html="";
           
            if(pno-2>0){
                html="<li><a href='#' class='aPrev'>"+(pno-2)+"</a></li>";
            }
            if(pno-1>0){
                html=html+"<li><a href='#' class='aPrev'>"+(pno-1)+"</a></li>";
            }
            html=html+"<li class='active'><a href='#'>"+pno+"</a></li>";
            if(pno+1<=num){
                html=html+"<li><a href='#' class='aPrev'>"+(pno+1)+"</a></li>";
            }
            if(pno+2<=num){
                html=html+"<li><a href='#' class='aPrev'>"+(pno+2)+"</a></li>";
            }
            
            $("#pagination").html(html);
            $("#pagination").prepend("<a href='#' class='firstPage btn btn-default' style='float:left'>首页</button>");
            $("#pagination").append("<a href='#' class='endPage btn btn-default' >末页</button>")
        }
        
        
      }
    })
  }	

    

  $(document).ready(function(){
    $.fn.zTree.init($("#TREE_DCompany"), setting);
  });
})