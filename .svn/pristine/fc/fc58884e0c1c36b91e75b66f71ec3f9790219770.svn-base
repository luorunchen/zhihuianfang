function addTabs(obj) {
  //  console.log(obj)
    id = "tab_" + obj.id;

    $(".active").removeClass("active");

    //如果TAB不存在，创建一个新的TAB
    if (!$("#" + id)[0]) {
        //创建新TAB的title  
        title = '<li role="presentation" id="tab_' + id + '"><a href="#' + id + '" aria-controls="' + id + '" role="tab" data-toggle="tab">' + obj.title;
        //是否允许关闭
        if (obj.close) {
            title += ' <i class="glyphicon glyphicon-remove" onclick="closeTab(\'' + id + '\');"></i>';
        }
        title += '</a></li>';
        //是否指定TAB内容
        if (obj.content) {
            content = '<div role="tabpanel" class="tab-pane" id="' + id + '">' + obj.content + '</div>';
        } else {//没有内容，使用IFRAME打开链接
            content = '<div role="tabpanel" class="tab-pane" id="' + id + '"><iframe id="Ifrm_' + id + '" src="' + obj.url + '" width="100%" height="100%" style=" position:absolute;top:0px;left:0px;right:0px;bottom:0px;" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="yes" allowtransparency="yes"></iframe></div>';
        }
        //加入TABS
        $("#mainTabNav").append(title);
        $("#mainTabContent").append(content);
    } else if (obj.reload) {
        $("#Ifrm_" + id).attr("src", obj.url);
    }

    //激活TAB
    $("#tab_" + id).addClass('active');
    $("#" + id).addClass("active");
}
var IsFull = false;

function FullFrame() {

    
    if($(".sumMap").length<=0){
        if (!IsFull) {
            $(".navBox").width(0);
            $(".contentHeadBox").height(0);
            $(".footBox").height(0);

            $(".contentBox").css("left", "0px");
            $(".contentBox").css("bottom", "0px");
            $(".contentBodyBox").css("top", "0px");

            //left:220px;
            //top:0px;
            //bottom:31px;


            IsFull = true;
        } else {
            $(".navBox").width(220);
            $(".contentHeadBox").height(70);
            $(".footBox").height(30);

            $(".contentBox").css("left", "220px");
            $(".contentBox").css("bottom", "31px");
            $(".contentBodyBox").css("top", "71px");

            IsFull = false;
        }
    } else {
        if (IsFull) {
            goMain();
        }
    }
}

function closeTab(id) {
    //如果关闭的是当前激活的TAB，激活他的前一个TAB
    if ($(".sysNav .nav-tabs .active").attr('id') == "tab_" + id) {
        $("#tab_" + id).prev().addClass('active');
        $("#" + id).prev().addClass('active');
    }
  //  console.log(id);
  //  console.log("tab_"+id);
    //关闭TAB
    $("#tab_" + id).remove();
    $("#" + id).remove();
}

/*编辑窗体*/
var modelBackFun = null;
var modelGridID = null;

function OpenFrame(url, editWidth, editHeight, winID, editTitle, gridID, backFun,modelcss) {
    //$('#exampleModal').modal({
    //    keyboard: false
    //});
    modelBackFun = backFun;
    modelGridID = gridID;

    var tModel = $('#editModal');

    tModel.removeClass();
    tModel.addClass("modal fade");

    if (modelcss) {
        tModel.addClass(modelcss);
    }

    $('#editModalLabel').text(editTitle);

    var tDialog = $('#editModalDialog');
    tDialog.width(editWidth);

    var tIfm = $('#editModelIfm');
    tIfm.attr("src", url);
    tIfm.attr("width", editWidth);
    tIfm.attr("height", editHeight);
    tModel.modal('show')
}
function CloseCurrWin(v) {
    var tModel = $('#editModal');
    tModel.modal('hide');

    if (modelBackFun) {
        modelBackFun(v, modelGridID);
    }
    modelBackFun = null;
    $('#editModelIfm').attr("src", "about:blank");
}

/*编辑窗体*/

/*选择窗体*/
var selBackFun = null;
var selGridID = null;
function OpenSelFrame(url, editWidth, editHeight, winID, editTitle, gridID, backFun, isHead, modelcss) {
    //$('#exampleModal').modal({
    //    keyboard: false
    //});
    selBackFun = backFun;
    selGridID = gridID;

    var tModel = $('#selModal');

    tModel.removeClass();
    tModel.addClass("modal fade");

    if (modelcss) {
        tModel.addClass(modelcss);
    }

    $('#selModalLabel').text(editTitle);
    if (isHead) {
        tModel.find(".modal-header").show();
    } else {
        tModel.find(".modal-header").hide();
    }

    var tDialog = $('#selModalDialog');
    tDialog.width(editWidth);

    var tIfm = $('#selModelIfm');
    tIfm.attr("src", url);
    tIfm.attr("width", editWidth);
    tIfm.attr("height", editHeight);
    tModel.modal('show')
}
function CloseSelWin(v) {
    var tModel = $('#selModal');
    tModel.modal('hide');

    if (selBackFun) {
        selBackFun(v, selGridID);
    }
    selBackFun = null;
    $('#selModelIfm').attr("src", "about:blank");
}
/*选择窗体*/



/*选择窗体*/
var thirdBackFun = null;
var thirdGridID = null;
function OpenThirdFrame(url, editWidth, editHeight, winID, editTitle, gridID, backFun, modelcss) {
    //$('#exampleModal').modal({
    //    keyboard: false
    //});
    thirdBackFun = backFun;
    thirdGridID = gridID;

    var tModel = $('#thirdModal');

    tModel.removeClass();
    tModel.addClass("modal fade");

    if (modelcss) {
        tModel.addClass(modelcss);
    }

    $('#thirdModalLabel').text(editTitle);

    var tDialog = $('#thirdModalDialog');
    tDialog.width(editWidth);

    var tIfm = $('#thirdModelIfm');
    tIfm.attr("src", url);

    tIfm.attr("width", editWidth);
    tIfm.attr("height", editHeight);
   
    tModel.modal('show')
}
function CloseThirdWin(v) {
    var tModel = $('#thirdModal');
    tModel.modal('hide');

    if (thirdBackFun) {
        thirdBackFun(v, thirdGridID);
    }
    thirdBackFun = null;
    $('#thirdModelIfm').attr("src", "about:blank");
}
/*选择窗体*/

/*选择窗体*/
var fourBackFun = null;
var fourGridID = null;
function OpenFourFrame(url, editWidth, editHeight, winID, editTitle, gridID, backFun, modelcss) {
    //$('#exampleModal').modal({
    //    keyboard: false
    //});
    fourBackFun = backFun;
    fourGridID = gridID;

    var tModel = $('#fourModal');

    tModel.removeClass();
    tModel.addClass("modal fade");

    if (modelcss) {
        tModel.addClass(modelcss);
    }

    $('#fourModalLabel').text(editTitle);

    var tDialog = $('#fourModalDialog');
    tDialog.width(editWidth);

    var tIfm = $('#fourModelIfm');
    tIfm.attr("src", url);
    tIfm.attr("width", editWidth);
    tIfm.attr("height", editHeight);
    tModel.modal('show')
}
function CloseFourWin(v) {
    var tModel = $('#fourModal');
    tModel.modal('hide');

    if (fourBackFun) {
        fourBackFun(v, fourGridID);
    }
    thirdBackFun = null;
    $('#fourModelIfm').attr("src", "about:blank");
}
/*选择窗体*/



function changPwd() {
    OpenFrame("ChangPass.html", 500, 240, "CPass", "修改密码");
}
function newFang() {
    OpenFrame("newFanghuo.html", 500, 240, "CPass", "新增防火员");
}
function forPwd() {
    
}

function showNotice(keyID, nTitle) {
    OpenFrame("/Home/ShowNotice?KeyValue=" + keyID, 600, 400, "win", nTitle, "");

}


$(function () {
   
});





function openMenu(mID) {
    $("#Menu_" + mID).click();
}

var isElectric = false;
function openElectric(opt) {
    if (isElectric == false) {
        if (window.CallCSharpMethod) {

            $.getJSON("/Home/GetElectric", {}, function (result) {
              
                if (result && result.UserID) {
                    var a = window.CallCSharpMethod("ShowElectric", result.UserID + "|" + result.UserPass + "|" + opt.url);
                    if (a != "OK") {
                        alert("发生异常!" + a);
                        return;
                    }
                    addTabs(opt);
                    isElectric = true;
                } else {
                    alert("智慧用电尚未开通!");
                    return;
                }
            });

        } else {
            
            opt.url = "/Home/GoElectric";
            addTabs(opt);
            isElectric = true;
        }
    } else {
        addTabs(opt);
    }
   
}

function openElectricWin(ComID) {
    window.open("/Home/GoElectric?ComID=" + ComID);
}
function showMenuCode(tCode) {

    var tItem = $(".naveMenuItem[data-code='" + tCode + "']");
    var tBH = tItem.attr("data-item");
    showMenu(tBH);
}


function showMenu(obj) {
    if ($(".contentShow").hasClass("contentActive") == false) {
        $(".contentBox").removeClass("contentActive");
        $(".contentShow").addClass("contentActive");
        pageArr.push("SHOW");
    }

    if (obj){

        var tbh = "";
        if (obj.bh){
            tbh = obj.bh;
        } else {
            tbh = obj;
        }

        $(".naveMenuHeadItem").hide();
        $(".naveMenuItem").hide();
  

        var tbh2 = tbh;
        if (tbh2.length == 4) {
            tbh2 = tbh2.substr(0, 2);
        }
        $(".naveMenuHeadItem[data-item^='" + tbh2 + "']").show();
        $(".naveMenuItem[data-item^='" + tbh2 + "']").show();

        //if (tbh.length == 4) {
        //    $(".naveMenuItem[data-item='" + tbh + "']")[0].click();
        //}else{
        //    $(".naveMenuItem[data-item^='" + tbh2 + "']")[0].click();
        //}
    }

  
}

function ShowFull(obj) {
   
    if (obj) {
        $('.contentModel', window.parent.document).find(".webTitle").html(obj.title)
        var tpage = obj.url;// + "?MenuCode=" + obj.MenuCode + "&MenuMC=" + escape(obj.MenuMC);
        //console.log(tpage)
        localStorage.setItem('tpage',tpage);
        
        // $("#reportFrm").attr("src", tpage);
        $('#reportFrm', window.parent.document).attr("src", tpage);
    }

    $('.contentBox', window.parent.document).removeClass("contentActive");
    $('.contentReport', window.parent.document).addClass("contentActive");
    pageArr.push("FULL");
    
}

function ShowModel(obj) {
   // console.log(obj);
   // console.log(this);
    if (obj) {
        
        $('.contentModel', window.parent.document).find(".webTitle").html(obj.title)
        var tpage = obj.url;// + "?MenuCode=" + obj.id + "&MenuMC=" + escape(obj.title);
        localStorage.setItem('tpage',tpage);
        
        $('#modelFrm', window.parent.document).attr("src", tpage);
    }

    $('.contentBox', window.parent.document).removeClass("contentActive");
    $('.contentModel', window.parent.document).addClass("contentActive");
    pageArr.push("MODEL");

}

function ShowWeb(obj) {
    window.open(obj.url);
}

var pageArr = [];
function goBack() {

    pageArr.pop();
    if (pageArr.length >= 1) {
        tPage =  pageArr.pop();
    } else {
        tPage = "MAIN";
    }
  
    switch(tPage)
    {
        case "MAIN":
            goMain();
            break;
        case "SHOW":
            showMenu();
            break;
        case "FULL":
            ShowFull();
            break;
        case "MODEL":
            ShowModel();
            break;
        case "SUM":
            goSum();
            break;
        case "MAP":
            goMap();
            break;
        case "DEVICE":
            goDeviceShow();
            break;
        case "ALARMMAP":
            goAlarmMap();
            break;
        default:
            break;
    }
}

function goMain() {

    var parentDiv = document.getElementById("mainTabContent");
   // console.log(parentDiv);
    var childs = parentDiv.getElementsByTagName('div');
   // console.log(childs);
    var div = null;
    for (var i = 0; i < childs.length; i++) {
     //   console.log(childs[i]);
        var id = $(childs[i]).attr("id");
      //  console.log(id);
        if (id) {
            $("#tab_" + id).remove();
            $("#" + id).remove();
            i--;
        }

    }
    pageArr.push("MAIN");
    $(".contentBox").removeClass("contentActive");
    $(".contentMain").addClass("contentActive");
    $("#reportFrm").attr("src", "about:blank");
    $("#modelFrm").attr("src", "about:blank");
   
}

//用电安全
function goContent(url) {
    pageArr.push("CONTENT");
    $(".contentMain").removeClass("contentActive");
    $(".contentShow").addClass("contentActive");
    if (url) {
        $("#mainIframe").attr("src", url);
    }
}
function goSum() {
    pageArr.push("SUM");
    $(".contentBox").removeClass("contentActive");
    $(".sumShow").addClass("contentActive");
    var tsrc = $(".sumShow").find('iframe').attr("src");
    if (tsrc == "") {
        $(".sumShow").find('iframe').attr("src", showPage);
    }
}
function goMap()
{
    pageArr.push("MAP");
    $(".contentBox").removeClass("contentActive");
    $(".sumMap").addClass("contentActive");
    var tsrc = $(".sumMap").find('iframe').attr("src");
    if (tsrc==""){
        $(".sumMap").find('iframe').attr("src", "/BDMap");
    }
    IsFull = true;
}
function goAlarmMap() {
    pageArr.push("ALARMMAP");
    $(".contentBox").removeClass("contentActive");
    $(".sumAlarmMap").addClass("contentActive");
    var tsrc = $(".sumAlarmMap").find('iframe').attr("src");
    if (tsrc == "") {
        $(".sumAlarmMap").find('iframe').attr("src", "/BDMap?MenuCode=AlarmCenter&MenuMC=报警值守");
    }
    IsFull = true;
}
function goDeviceShow() {
    pageArr.push("DEVICE");
    $(".contentBox").removeClass("contentActive");
    $(".deviceShow").addClass("contentActive");
    var tsrc = $(".deviceShow").find('iframe').attr("src");
    if (tsrc == ""){
        $(".deviceShow").find('iframe').attr("src", "/Home/SumDeviceContent");
    }
    IsFull = true;
}

function showNews(nid,ntitle)
{

    window.top.OpenFrame("/Home/ShowNews?keyValue=" + nid, 1000, 600, "win", ntitle, "");


}
function ShowPolice() {
    OpenFrame("/CCheck/ChkPolice", 1000, 600, "ChkPolice", "智慧警务");
}

//showMenuInfo({ bh: '43', id: 'ChkRecPoint', title: '消防器材检查记录', close: true, url: '/CCheck/CRecPoint?MenuCode=ChkRecPoint&MenuMC=检查痕迹' })
function showMenuInfo(obj) {//点击进入二级菜单
    if ($(".contentShow").hasClass("contentActive") == false) {
        $(".contentBox").removeClass("contentActive");
        $(".contentShow").addClass("contentActive");
        pageArr.push("SHOW");
    }

    if (obj) {

        var tbh = "";
        if (obj.bh) {
            tbh = obj.bh;
        } else {
            tbh = obj;
        }

        $(".naveMenuHeadItem").hide();
        $(".naveMenuItem").hide();


        var tbh2 = tbh;
        if (tbh2.length == 4) {
            tbh2 = tbh2.substr(0, 2);
        }
        $(".naveMenuHeadItem[data-item^='" + tbh2 + "']").show();
        $(".naveMenuItem[data-item^='" + tbh2 + "']").show();


        id = "tab_" + obj.id;
        $(".active").removeClass("active");

        //如果TAB不存在，创建一个新的TAB
        if (!$("#" + id)[0]) {
            //创建新TAB的title
            title = '<li role="presentation" id="tab_' + id + '"><a href="#' + id + '" aria-controls="' + id + '" role="tab" data-toggle="tab">' + obj.title;
            //是否允许关闭
            if (obj.close) {
                title += ' <i class="glyphicon glyphicon-remove" onclick="closeTab(\'' + id + '\');"></i>';
            }
            title += '</a></li>';
            //是否指定TAB内容
            if (obj.content) {
                content = '<div role="tabpanel" class="tab-pane" id="' + id + '">' + obj.content + '</div>';
            } else {//没有内容，使用IFRAME打开链接
                content = '<div role="tabpanel" class="tab-pane" id="' + id + '"><iframe id="Ifrm_' + id + '" src="' + obj.url + '" width="100%" height="100%" style=" position:absolute;top:0px;left:0px;right:0px;bottom:0px;" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="yes" allowtransparency="yes"></iframe></div>';
            }
            //加入TABS
            $("#mainTabNav").append(title);
            $("#mainTabContent").append(content);
        } else if (obj.reload) {
            $("#Ifrm_" + id).attr("src", obj.url);
        }

        //激活TAB
        $("#tab_" + id).addClass('active');
        $("#" + id).addClass("active");

    }

}
