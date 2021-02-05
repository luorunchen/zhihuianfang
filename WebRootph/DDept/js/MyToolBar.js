//�����ݱ༭����
function openWindow(Grid, keyValue,urlParam, Fun) {

    var gconfig  =  Grid.Config;
    var url = gconfig.editUrl;

    if (url == null || url == "") return;
    if (url.indexOf("?") < 0) {
        url += "?";
    }
    else {
        url += "&";
    }
    url += "keyValue=" + keyValue;

    if (urlParam && urlParam != "") {
        url += "&" + urlParam;
    }

    editWindow = window.top.OpenFrame(url, gconfig.editWidth, gconfig.editHeight, "win", gconfig.editTitle, "", Grid.LoadData);
}

//��Ӱ�ť����¼�������
function AddClick(Grid, urlParam) {
    openWindow(Grid, "",urlParam);
}

//�༭��ť����¼�������
function EditClick(Grid, urlParam) {
    var key = Grid.SelectKey();
    if (key == null) {
        alert("����ѡ��Ҫ�༭�ļ�¼��");
        return;
    };
    openWindow(Grid, key,urlParam);
}

function RefreshClick(Grid) {
    if (event && event.srcElement) {
        var treeID = $(event.srcElement).attr("treeID");
        if (treeID) {
            var treeObj = $.fn.zTree.getZTreeObj(treeID);
            treeObj.reAsyncChildNodes(null, "refresh");
        }
    }
    Grid.LoadData({ pageIndex: 1 });
}
function DeleteClick(Grid) {
    var key= Grid.SelectKey();
    if (key == null) {
        alert("����ѡ��Ҫɾ���ļ�¼��");
        return;
    };
    if (confirm("ȷ��Ҫɾ����ѡ��¼!") == false) {
        return;
    }
    Grid.LoadData(null,{deleteKey: key });
}

//����Excel
function ExportClick(Grid) {
    Grid.ExportData();
}