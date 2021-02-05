//var player = $("#player")[0];
//var playerWarn = $("#playerW")[0];
function reloadDevSysModal(T_deviceId) {
    if ($("#twoModal").hasClass("in")) {
        var devList = $("#twoModelIfm")[0].contentWindow.tNodes;
        for (var i = 0; i < devList.length; i++) {
            if (devList[i].devIdpk == T_deviceId) {
                var contents = $("#twoModelIfm").contents();                
                contents.find("#myTab").html("");
                contents.find("#realWlist").html("");
                contents.find("#realFlist").html("");
                contents.find("#warn").removeClass("in");
                contents.find("#fault").removeClass("in");
                $("#twoModelIfm")[0].contentWindow.getTab();                
                break;
            }
        }
    }
}
function reloadRealDetailModal(T_deviceId) {
    if ($("#realModal").hasClass("in")) {
        if (document.getElementById("realModalIfm").contentWindow.devIdpk == T_deviceId) {
            document.getElementById("realModalIfm").contentWindow.location.reload(true);
        }
    }
}
function reloadProjDetailModal(T_projId) {
    if ($("#editModal").hasClass("in")) {
        if (document.getElementById("editModelIfm").contentWindow._list["projId"] == T_projId) {
            document.getElementById("editModelIfm").contentWindow.location.reload(true);
        }
    }
}
var goEasy = new GoEasy({
    appkey: 'BC-d8c4d6e74c154bc2832cb3b7bff2e40c'
});
goEasy.subscribe({
    channel: localStorage.userID,
    onMessage: function (data) {
        var mapflag, icon, sound;
        var obj = eval('(' + data.content + ')');      
        if (obj.isCreate == "1") {
            var t = "<tr id='" + obj.devIdpk + "-" + obj.node1 + "' name='" + obj.projId + "'><td><a href='#'>" + obj.projName + "," + obj.installLocation + "，" + obj.devNode1Desc + "，" + obj.Time.replace('T', ' ') + " 发生" + obj.TyDesc + "</a></td></tr>";
            var trItem = $(t);
            trClick(trItem, obj);
            
            if (obj.TyNum == '0') {
                faultCount++;
                $(".yellowSpan").html("故障" + faultCount);//标题中故障个数
                $(".trF").prepend(trItem);
                mapflag = 1;              
                sound = player;              
            } else {
                warnCount++;
                $(".redSpan").html("报警" + warnCount);//标题中报警个数
                $(".trW").prepend(trItem);
                mapflag = 2;               
                sound = playerWarn;
            }
            if (sessionStorage.currentUrl.indexOf("Map") >= 0) {
                reloadDevSysModal(obj.devIdpk);
                reloadProjDetailModal(obj.projId);
                obj.flag = mapflag;
                icon = mapflag == 1 ? fIcon : wIcon
                ChangePoint(obj, icon);
            }
            reloadRealDetailModal(obj.devIdpk);
            if (localStorage.getItem("q") == undefined || localStorage.getItem("q") == 0) {
                $("#alarmSound").find("i").addClass("fa-volume-up");
                $("#alarmSound").find("i").removeClass("fa-volume-off");
                sound.play();
            }
            //如果报警框隐藏，则弹出
            $("#demo").collapse("show");
        } else {
            //删除某条故障
            var deleTable = obj.TyNum == "0" ? $(".trF") : $(".trW");
            var deleList = deleTable.find("tr[id='" + obj.devIdpk + "-" + obj.node1 + "']");
            if (deleList.length > 0) {
                for (var i = 0; i < deleList.length; i++) {
                    //如果deleList中有不同故障类型的数据，则需要判断找出要删除的那条类型再删除
                    if (deleList[i].innerText.indexOf(obj.TyDesc) >= 0) {
                        $(deleList[i]).remove();
                        //地图中变绿 
                        if (sessionStorage.currentUrl.indexOf("Map")>=0) {
                            var tr = deleTable.find("tr[name='" + obj.projId + "']");
                            if (tr.length == 0) {
                                obj.flag = 0;
                                ChangePoint(obj, nIcon);
                            }                            
                            reloadDevSysModal(obj.devIdpk);
                            reloadProjDetailModal(obj.projId);
                        }
                        reloadRealDetailModal(obj.devIdpk);
                        if (obj.TyNum == "0") {
                            faultCount--; $(".yellowSpan").html("故障" + faultCount);//标题中故障个数
                            if (faultCount == 0) {
                                player.pause();
                            }
                        } else {
                            warnCount--; $(".redSpan").html("报警" + warnCount);//标题中报警个数
                            if (warnCount == 0) {
                                playerWarn.pause();
                            }
                        }
                    }
                }
            }
        }
    }
});