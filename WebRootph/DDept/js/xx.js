$(function(){
  var username=localStorage.getItem('userName');
  function edit(pno,pageSize){
    console.log(pno);
    $.ajax({
      type:'get',
      data:'&username='+username+'&pno='+pno+'&pageSize='+pageSize,
      url: url+'/region/getRegionList.action',
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
            html+="<tr class=''><td  class='td_center' style='width:60px;' name="+v.name+" value="+v.pid+">"+(i+1)+"</td><td  class='td_center' style='width:100px;'>"+v.name+"</td><td  class='td_center' style='width:100px;'>"+v.location+"</td><td  class='td_center' style='width:100px;'>"+v.master+"</td><td  class='td_center' style='width:100px;'>"+v.fireman+"</td><td  class='td_center' style='width:100px;'>"+v.responsible+"</td><td  class='td_center' style='width:100px;'></td><td  class='td_center' style='width:150px;'><div class='btn-group btn-group-sm' role='group'><button type='button' aria-expanded='false'  class='btn btn-primary lookDetail' ><span class='glyphicon glyphicon-edit' aria-hidden='true'></span>查看 </button> </div> </td> </tr>";
          })
          $('#GridTables').html(html)
          $('.lookDetail').click(function(){
            var tpage="9";
            localStorage.setItem('tpage',tpage);
            var comid=$(this).parent().parent().parent().children().attr('value')
            var comName=$(this).parent().parent().parent().children().attr('name');
            sessionStorage.setItem('ComID',comid);  
            sessionStorage.setItem('comName',comName);
             window.top.OpenFrame("../MingAn/All_ElecComDetail .html?ComID=" + comid + "&ComName=" + escape(comName), 930, 620, "SElect", comName, "", function (r) {
  
             });
          })
        }

        var html="";
        html="<div class='input-group' style='float:left;padding-left:10px;'><span>第</span><input type='text' value='"+pno+"' readonly='readonly'><span>/</span><input type='text' value='"+num+"' readonly='readonly'><span>页,每页</span><input type='text' value='"+pageSize+"' readonly='readonly'><span>行，共</span><input type='text' value='"+res.recordCount+"' readonly='readonly'><span>行</span></div>";
        $('.input_left').html(html);

          var num=parseInt(num);   //总页数
          var html="";
           
          if(pno-2>0){
              html="<li><a href='#' class=' '>"+(pno-2)+"</a></li>";
          }
          if(pno-1>0){
              html=html+"<li><a href='#' class=' '>"+(pno-1)+"</a></li>";
          }
          html=html+"<li class='active'><a href='#'>"+pno+"</a></li>";
          if(pno+1<=num){
              html=html+"<li><a href='#' class=' '>"+(pno+1)+"</a></li>";
          }
          if(pno+2<=num){
              html=html+"<li><a href='#' class=' '>"+(pno+2)+"</a></li>";
          }
          $("#pagination").html(html);
          $("#pagination").prepend("<a href='#' class='firstPage btn btn-default' style='float:left'>首页</button>");
            $("#pagination").append("<a href='#' class='endPage btn btn-default' >末页</button>")
          var aPrev=$('.firstPage');
          var aNext=$('.endPage');
          if(pno==1) aPrev.addClass('disabled');   
          if(pno==num) aNext.addClass('disabled'); 
      }
    })
    
  }
  $("#pagination").on("click","a",function(e){
    //console.log(1);
    e.preventDefault();
    // 2.获取总当前页码
    var num=sessionStorage.getItem('num');
    //console.log(num)
  //  console.log($(this).html());
    if($(this).html()=='首页'){
        edit(1,15);
    }else if($(this).html()=='末页'){
        edit(num,15);
    }else{
        var pno=parseInt($(this).html());
       // console.log(pno);
       sessionStorage.setItem('pno',pno)
        // 3.调用分页函数
        edit(pno,15);
    }

  })
  edit(1,15)
  
  var setting = {
    async: {
      enable: true,
      type:'get',
      url: url+"/region/getProvince.action",
      autoParam:["id=code"],   //异步加载时需要自动提交父节点属性的参数。
      otherParam:{"username":username,"otherParam":"zTreeAsyncTest"},   //Ajax 请求提交的静态参数键值对
       //dataFilter: filter  //用于对 Ajax 返回数据进行预处理的函数
    },
   callback: {
     onClick: onClick
   }
  };
  console.log(setting)
  function onClick(event, treeId, treeNode, clickFlag){
    var regionName=treeNode.name;
    // sessionStorage.setItem('regionName',regionName)
    $('#pagination').hide()
    var pno=1;
    var pageSize='15';
    console.log(pno);
    $('#pageTion').on("click","a",function(e){
      e.preventDefault();
      var num2=sessionStorage.getItem('num2');
      var pno=1;
      if($(this).html()=='首页'){
        ShaBefore(1,15)
      }else if($(this).html()=='末页'){
        ShaBefore(num2,15)
      }else{
        var pno=parseInt($(this).html());
        console.log(pno);
        ShaBefore(pno,15)
      }
    })
    function ShaBefore(pno,pageSize){
      $.ajax({
        type:'get',
        data:'region='+regionName+'&username='+username+'&pno='+pno+'&pageSize='+pageSize,
        url: url+'/region/getRegionList.action',
        error:function(error){console.log(error)},
        success:function(res){
          console.log(res);
          var res=JSON.parse(res);
          console.log(res);
          var udata=res.mess
          var num2=Math.ceil(res.recordCount/pageSize);
          console.log(num2)
          sessionStorage.setItem('num2',num2);
          var html="";
          if(res.mess.length!=0){
            $.each(udata,function(i,v){
              //console.log(i);
              html+="<tr class=''><td  class='td_center' style='width:60px;' name="+v.name+" value="+v.pid+">"+(i+1)+"</td><td  class='td_center' style='width:100px;'>"+v.name+"</td><td  class='td_center' style='width:100px;'>"+v.location+"</td><td  class='td_center' style='width:100px;'>"+v.master+"</td><td  class='td_center' style='width:100px;'>"+v.fireman+"</td><td  class='td_center' style='width:100px;'>"+v.responsible+"</td><td  class='td_center' style='width:100px;'></td><td  class='td_center' style='width:150px;'><div class='btn-group btn-group-sm' role='group'><button type='button' aria-expanded='false'  class='btn btn-primary lookDetail' ><span class='glyphicon glyphicon-edit' aria-hidden='true'></span>查看 </button> </div> </td> </tr>";
            })
            $('#GridTables').html(html)
            $('.lookDetail').click(function(){
              var tpage="9";
              localStorage.setItem('tpage',tpage);
              var comid=$(this).parent().parent().parent().children().attr('value')
              var comName=$(this).parent().parent().parent().children().attr('name');
              sessionStorage.setItem('ComID',comid);  
              sessionStorage.setItem('comName',comName);
               window.top.OpenFrame("../MingAn/All_ElecComDetail .html?ComID=" + comid + "&ComName=" + escape(comName), 930, 620, "SElect", comName, "", function (r) {
    
               });
            })
          }else{
            console.log(1);
            html="<tr><td class='td_center' colspan='6'>无数据</td></tr>";
            $('#GridTables').html(html)
          }

          var html="";
          html="<div class='input-group' style='float:left;padding-left:10px;'><span>第</span><input type='text' value='"+pno+"' readonly='readonly'><span>/</span><input type='text' value='"+num2+"' readonly='readonly'><span>页,每页</span><input type='text' value='"+pageSize+"' readonly='readonly'><span>行，共</span><input type='text' value='"+res.recordCount+"' readonly='readonly'><span>行</span></div>";
          $('.input_left').html(html);
  
            var num2=parseInt(num2);   //总页数
            var html="";
             
            
          if(pno-2>0){
            html="<li><a href='#' class=' '>"+(pno-2)+"</a></li>";
          }
          if(pno-1>0){
              html=html+"<li><a href='#' class=' '>"+(pno-1)+"</a></li>";
          }
          html=html+"<li class='active'><a href='#'>"+pno+"</a></li>";
          if(pno+1<=num2){
              html=html+"<li><a href='#' class=' '>"+(pno+1)+"</a></li>";
          }
          if(pno+2<=num2){
              html=html+"<li><a href='#' class=' '>"+(pno+2)+"</a></li>";
          }

          $("#pageTion").html(html);
          $("#pageTion").prepend("<a href='#' class='firstPage btn btn-default' style='float:left'>首页</button>");
          $("#pageTion").append("<a href='#' class='endPage btn btn-default' >末页</button>")
          var aPrev=$('.firstPage');
          var aNext=$('.endPage');
          if(pno==1) aPrev.addClass('disabled');   
          if(pno==num2) aNext.addClass('disabled'); 
            
        }
      })
    }
    ShaBefore(1,15)

    search(regionName)   
  }
  function search(name){
    $('#BtnSearch').click(function(){
      $('#pagination').hide()
      var QueryMC=$('#QueryMC').val();
      console.log(QueryMC)
      console.log(name)
      $.ajax({
        type:'get',
        url:url+'/region/findRegion.action',
        data:'username='+username+'&region='+name+'&pname='+QueryMC,
        error:function(error){console.log(error)},
        success:function(res){
          var res=JSON.parse(res);
          console.log(res);
          var udata=res.mess
          var num2=Math.ceil(res.recordCount/15);
          console.log(num2)
          sessionStorage.setItem('num2',num2);
          var html="";
          console.log(udata)
          if(res.mess.length!=0){
            $.each(udata,function(i,v){
              //console.log(i);
              html+="<tr class=''><td  class='td_center' style='width:60px;' name="+v.name+" value="+v.pid+">"+(i+1)+"</td><td  class='td_center' style='width:100px;'>"+v.name+"</td><td  class='td_center' style='width:100px;'>"+v.location+"</td><td  class='td_center' style='width:100px;'>"+v.master+"</td><td  class='td_center' style='width:100px;'>"+v.fireman+"</td><td  class='td_center' style='width:100px;'>"+v.responsible+"</td><td  class='td_center' style='width:100px;'></td><td  class='td_center' style='width:150px;'><div class='btn-group btn-group-sm' role='group'><button type='button' aria-expanded='false'  class='btn btn-primary lookDetail' ><span class='glyphicon glyphicon-edit' aria-hidden='true'></span>查看 </button> </div> </td> </tr>";
            })
            $('#GridTables').html(html)
            $('.lookDetail').click(function(){
              var tpage="9";
              localStorage.setItem('tpage',tpage);
              var comid=$(this).parent().parent().parent().children().attr('value')
              var comName=$(this).parent().parent().parent().children().attr('name');
              sessionStorage.setItem('ComID',comid);  
              sessionStorage.setItem('comName',comName);
               window.top.OpenFrame("../MingAn/All_ElecComDetail .html?ComID=" + comid + "&ComName=" + escape(comName), 930, 620, "SElect", comName, "", function (r) {
    
               });
            })
          }else{
            console.log(1);
            html="<tr><td class='td_center' colspan='6'>无数据</td></tr>";
            $('#GridTables').html(html)
          }

          var html="";
          html="<div class='input-group' style='float:left;padding-left:10px;'><span>第</span><input type='text' value='"+res.pno+"' readonly='readonly'><span>/</span><input type='text' value='"+num2+"' readonly='readonly'><span>页,每页</span><input type='text' value='"+res.pageSize+"' readonly='readonly'><span>行，共</span><input type='text' value='"+res.recordCount+"' readonly='readonly'><span>行</span></div>";
          $('.input_left').html(html);
  
            var num2=parseInt(num2);   //总页数
            var html="";
             
            
          if(res.pno-2>0){
            html="<li><a href='#' class=' '>"+(res.pno-2)+"</a></li>";
          }
          if(res.pno-1>0){
              html=html+"<li><a href='#' class=' '>"+(res.pno-1)+"</a></li>";
          }
          html=html+"<li class='active'><a href='#'>"+res.pno+"</a></li>";
          if(res.pno+1<=num2){
              html=html+"<li><a href='#' class=' '>"+(res.pno+1)+"</a></li>";
          }
          if(res.pno+2<=num2){
              html=html+"<li><a href='#' class=' '>"+(res.pno+2)+"</a></li>";
          }

          $("#pageTion").html(html);
          $("#pageTion").prepend("<a href='#' class='firstPage btn btn-default' style='float:left'>首页</button>");
          $("#pageTion").append("<a href='#' class='endPage btn btn-default' >末页</button>")
          var aPrev=$('.firstPage');
          var aNext=$('.endPage');
          if(res.pno==1) aPrev.addClass('disabled');   
          if(res.pno==num2) aNext.addClass('disabled'); 
        }
      })
    })
  }
  search("")
  $(document).ready(function(){
    $.fn.zTree.init($("#TREE_DCompany"), setting);
  });
})