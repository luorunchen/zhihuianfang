function aguoGrid(gridConfig) {
  //  console.log(gridConfig);
    var gridId = gridConfig["ID"];   //"GRID_SUser"
    if (gridId == undefined) {
        gridId = "tableGrid" + new Date().getTime();
    }
    var htmlConfig = {
        targetID: '',
        ID: gridId,   //"GRID_SUser"
        style: '',
        dataKey:'ID',
        defaultLoad: false,
        dbClick: null,
        loadBack: null,
        isIndex:true,
        cols:[],         //grid列
        serviceUrl: '',  //加载数据地址
        pageSize: 15,    //每页行数
        defaultParam: {},  //默认加载参数,
        renderData:{}
    };

    htmlConfig = $.extend(true, {}, htmlConfig, gridConfig);  //将htmlConfig中的ID改为GRID_SUser
    console.log(htmlConfig);
    if (htmlConfig["targetID"] == '') {
        document.write("<div id=\"" + htmlConfig["ID"] + "\"  class=\"Grid\"  style=\"" + htmlConfig["style"] + "\"></div>");
    } else {
        $(htmlConfig["targetID"]).append("<div id=\"" + htmlConfig["ID"] + "\" class=\"Grid\"  style=\"" + htmlConfig["style"] + "\"></div>");
    }
    var htmlGrid = $("#" + htmlConfig["ID"]);
    
    var htmlGridWidth = 0;
    var htmlHead = null;   //表头
    var htmlBody = null;   //表体
    var htmlFoot = null;   //表尾
    var htmlTable = null;  //数据表
    var lastParam = {};   //末次请求参数
    var lastData = null;     //末次获取数据
    var currRowIndex = -1;
    var currRow = null;
    var currPageIndex = 1;

    var txtPageIndex = null;
    var txtAllPage = null;
    var txtPageSize = null;
    var txtAllCount = null;

    var grid = this;


    //重置选中
    var reset = function () {
        currRowIndex = -1;
        currRow = null;
        htmlTable.find("tbody>tr").remove();
    }

    //========================渲染表头========================
    var renderHead = function () {

        var headHtml = new Array();
        headHtml.push("<div  class=\"scrollHead\" >");

        var temHTML = "";
        htmlGridWidth = 0;
        if (htmlConfig.isIndex) {
            temHTML += "<td style=\"width:60px;\"></td>";
            htmlGridWidth = 60;
        }

        if (htmlConfig.cols) {
           // console.log(htmlConfig.cols);  //遍历表头有多少列
            for (var i = 0; i < htmlConfig.cols.length; i++) {
                var t = htmlConfig.cols[i];
               // console.log(t);
                if (t.colVisible == false) continue;
                htmlGridWidth += parseInt(t.colWidth);
                if (i == htmlConfig.cols.length - 1) {
                    temHTML += "<td class='NoRightBorder'";
                } else {
                    temHTML += "<td ";
                }
              
                    //4 角色
                if (i == htmlConfig.cols.length - 1 && htmlConfig["fill"] == true) {
                    temHTML += ">" + t.colHead + "</td>";
                } else {
                    temHTML += "style=\"width:" + t.colWidth + "px;\">" + t.colHead + "</td>";
                }
            }
          //  console.log(temHTML);
        }
        //if (htmlConfig["fill"] == true) {
        headHtml.push("<table class=\"GridTable\"  id=\"GridTable\" style=\"width:100%;height:100%;min-width:" + htmlGridWidth + "px;\">");
        //    } else {
        //        headHtml.push("<table class=\"GridTable\" style=\"width:" + htmlGridWidth + "px;height:100%;\">");
        //    }

        headHtml.push("<tbody>");
        headHtml.push(" <tr>");
        headHtml.push(temHTML);
        headHtml.push(" </tr>");
        headHtml.push("</tbody>");
        headHtml.push("</table>");
        headHtml.push("</div>");
        htmlHead.append(headHtml.join(""));
    };

    //渲染函数
   
    var renderFun = function (cellValue, renderObj) {
        //log(cellValue);
      //  log(renderObj);
        if (renderObj == null) return cellValue;
        if (renderObj.dataSource == null || renderObj.dataSource == undefined) return cellValue;
        for (var idx = 0; idx < renderObj.dataSource.length; idx++) {
            if (renderObj.dataSource[idx][renderObj.valueName] == cellValue) {
                return renderObj.dataSource[idx][renderObj.labelName];
            }
        }
        return cellValue;
    }


    //创建行      rowIndex  下标    rowData  值
    var renderRow = function (rowIndex, rowData) {
        var rowHtml = new Array();

        if (rowIndex % 2 == 0) {
            rowHtml.push("<tr>");
        }else{
            rowHtml.push("<tr class=\"alterTr\">");
        }

        if (htmlConfig.isIndex) {
            var pz = parseInt(lastParam["pageSize"]);
            var pidx = parseInt(lastParam["pageIndex"]);
            rowHtml.push("<td class='td_center' style=\"width:60px;\">" + ((pidx - 1) * pz + rowIndex+1 )+ "</td>");
        }

        for (var j = 0; j < htmlConfig.cols.length; j++) {
            var t = htmlConfig.cols[j];
            //console.log(t);
            if (t.colVisible == false) continue;
            var tv = rowData[t.colName];

            var renderData = null;
            if (t.renderCode) {
                renderData = htmlConfig.renderData[t.renderCode];
            }
           // alert(tv);
            var tt =tv;
            if (t.colRender) {
                tt = t.colRender(tt, renderData, rowData);
            }else{
                tt = renderFun(tt, renderData);
            }

            if (j == htmlConfig.cols.length - 1) {
                rowHtml.push("<td class='NoRightBorder ");
            } else {
                rowHtml.push("<td class='");
            }
            rowHtml.push("td_" + t.colAlign + "' ");

            if (rowIndex > 0 || (j == htmlConfig.cols.length - 1 && htmlConfig["fill"] == true)) {
                rowHtml.push(" value='" + tv + "' >" + tt + "</td>");
            } else {
                rowHtml.push("  style=\"width:" + t.colWidth + "px;\" value='" + tv + "'>" + tt + "</td>");
            }
        }
        rowHtml.push("</tr>");
        return rowHtml.join("");
    }

    //创建无数据空行
    var renderBlankRow = function () {

        var rowHtml = new Array();
        rowHtml.push("<tr>");
        var colNum = 0;
        for (var j = 0; j < htmlConfig.cols.length; j++) {
            var t = htmlConfig.cols[j];
            if (t.colVisible == false) continue;
            colNum++;
         }
        rowHtml.push("<td class='td_center' colspan='"+ colNum +"' >无数据</td>");
        rowHtml.push("</tr>");
        return rowHtml.join("");
    }

    //渲染所有行
    var renderRows = function (tabData) {
        reset();
       // log(tabData);
        if (tabData && tabData.length > 0) {
            for (var i = 0; i < tabData.length; i++) {
              //  console.log(i);
              //  console.log(tabData[i]);
                var oneTR = $(renderRow(i, tabData[i]));
               // console.log(oneTR);
            //    oneTR.hover(function () {
            //         $(this).addClass("hoverTr");
            //     }, function () {
            //         $(this).removeClass("hoverTr");
            //     });
                $('.Grid_bd').on('mouseenter','tr',function(){ 
                    $(this).addClass('hoverTr');
                });
                $('.Grid_bd').on('mouseleave','tr',function(){ 
                    $(this).removeClass('hoverTr');
                })
              // oneTR.click(i, function (event) {
               $('.Grid_bd').on('click','tr',function(event){   
                    currRowIndex = event.data;
                    
                    if (currRow != null) {
                        console.log(1);
                        $(currRow).removeClass("selectTr");
                    }
                    $(this).addClass("selectTr");
                    currRow = this;
                    console.log(currRow);
                });

                
                if (htmlConfig.dbClick) {
                    console.log(htmlConfig.dbClick);
                    oneTR.bind("dblclick", function () {
                        htmlConfig.dbClick(grid);
                        console.log(grid);
                    });
                }
                htmlTable.append(oneTR);
            }
        } else {
            htmlTable.append(renderBlankRow());
        }
    }

    //渲染所有主体
    var renderBody = function () {
        var ScrollBody = $("<div  class=\"scrollBody\"></div>");
          //  console.log(ScrollBody);

       // if (htmlConfig["fill"] == true) {
        htmlTable = $("<table  id=\"GridTable\"  style=\"width:100%;min-width:" + htmlGridWidth + "px;\" class=\"GridTable\"><tbody></tbody></table> ");
      //  } else {
       //     htmlTable = $("<table style=\"width:" + htmlGridWidth + "px;\" class=\"GridTable\"><tbody></tbody></table> ");
     //   }
        //console.log(htmlConfig.data);
        renderRows(htmlConfig.data);

        ScrollBody.append(htmlTable);
       // console.log(htmlTable);
        htmlBody.append(ScrollBody);

        ScrollBody.scroll(function () {

            //htmlTable

          //  var tw = ScrollBody[0].offsetWidth;
           // htmlHead.children().first().find(".GridTable").css("min-width", tw);

           // var scrollbarWidth = ScrollBody[0].offsetWidth - ScrollBody[0].scrollWidth;
          //  $("#QueryMC").val(ScrollBody[0].offsetWidth +"||"+ ScrollBody[0].scrollWidth);

            htmlHead.children().first().css('left', (-ScrollBody.scrollLeft()) + "px");
            // alert(htmlTable[0].offsetLeft);

            //offset
           // htmlHead.children().first().css('left', (htmlTable.position().left) + "px");
        });

    };
    //渲染所有底部
    var renderFoot = function () {


        //生成页码
        var textGroup = $("<div  class=\"input-group\" style=\"float:left;padding-left:10px;\"></div>");
        htmlFoot.append(textGroup);

        textGroup.append("<span>第</span>");
        txtPageIndex = $("<input  type=\"text\" value=\"1\" readonly=\"readonly\" />");
        // txtPageIndex.click(function () {
        // this.LoadData({ pageIndex: 0 });
        // });
        textGroup.append(txtPageIndex);

        textGroup.append("<span>/</span>");

        txtAllPage = $("<input   type=\"text\"  value=\"1\" readonly=\"readonly\" />");
        textGroup.append(txtAllPage);

        textGroup.append("<span>页,每页</span>");

        txtPageSize = $("<input   type=\"text\"  value=\"" + htmlConfig["pageSize"] + "\" readonly=\"readonly\"  />");
        //  txtPageSize.click(function () {
        //     this.LoadData({ pageIndex: 1 });
        //  });
        textGroup.append(txtPageSize);


        textGroup.append("<span>行，共</span>");

        txtAllCount = $("<input   type=\"text\"  value=\"0\"  readonly=\"readonly\" />");
        textGroup.append(txtAllCount);
        textGroup.append("<span>行</span>");



        //生成翻页按钮
       var butGroup = $("<div class=\"btn-group\"></div>");
       htmlFoot.append(butGroup);


       var butFirst = $("<input type=\"button\" class=\"btn btn-default btn-sm\" value=\"首页\" style=\"padding-left:7px;padding-right:7px;\" />");
        butFirst.click(function () {
            grid.LoadData({ pageIndex: 1 });
        });
        butGroup.append(butFirst);

        var butPre = $("<input type=\"button\" class=\"btn btn-default btn-sm\" value=\"上一页\" style=\"padding-left:7px;padding-right:7px;\" />");
        butPre.click(function () {
            var tIdx = parseInt(txtPageIndex.val());
            if (tIdx > 1) {
                tIdx = tIdx - 1;
            }
            grid.LoadData({ pageIndex: tIdx });
        });
        butGroup.append(butPre);


        var butNext = $("<input type=\"button\" class=\"btn btn-default btn-sm\" value=\"下一页\" style=\"padding-left:7px;padding-right:7px;\"  />");
        butNext.click(function () {
            var tIdx = parseInt(txtPageIndex.val());
            var cnt = parseInt(txtAllPage.val());
            if (tIdx < cnt) {
                tIdx = tIdx + 1;
            }
            grid.LoadData({ pageIndex: tIdx });
        });

        butGroup.append(butNext);

        var butLast = $("<input type=\"button\" class=\"btn btn-default btn-sm\" value=\"末页\" style=\"padding-left:7px;padding-right:7px;\"  />");
        butLast.click(function () {
            var cnt = parseInt(txtAllPage.val());
            grid.LoadData({ pageIndex: cnt });
        });
        butGroup.append(butLast);

        //var butFull = $("<input type=\"button\" class=\"btn btn-default btn-sm btn-full\" value=\"全屏\" style=\"padding-left:7px;padding-right:7px;\"  />");
        //butFull.click(function () {
        //    window.top.FullFrame();
        //});
        //butGroup.append(butFull);



    };

    //初始化参数
    var initParam = function () {
        lastParam = $.extend(true, {}, htmlConfig["defaultParam"]);
        lastParam["pageSize"] = txtPageSize.val();
        lastParam["pageIndex"] = txtPageIndex.val();
    }

    //========================公开方法========================

    this.Grid = htmlGrid;
    this.Config = htmlConfig;
    


    //获取选中行
    this.SelectRow = function () {
        if (currRowIndex == -1) {
            return null;
        } else {
            if (currRowIndex < lastData.data.length) {
                return lastData.data[currRowIndex];
            }
            return null;
        }
    }

    this.SelectKey = function () {
        var row = this.SelectRow();
        if (row == null) {
            return null;
        } else {
            return row[htmlConfig["dataKey"]];
        }
    }

    // 渲染选择
    this.render = function () {

        htmlHead = $("<div class=\"Grid_hd\"></div>");
        htmlGrid.append(htmlHead);

        htmlBody = $("<div class=\"Grid_bd\"></div>");
        htmlGrid.append(htmlBody);


        htmlFoot = $("<div class=\"Grid_fd\"></div>");
        htmlGrid.append(htmlFoot);


        if (htmlConfig["headFun"]) {
            htmlConfig["headFun"](this);
        } else {
            renderHead();
        }
        
        if (htmlConfig["bodyFun"]) {
            htmlConfig["bodyFun"](this);
        } else {
            console.log('403 --> body');
            renderBody();
            
        }
        if (htmlConfig["footFun"]) {
            htmlConfig["footFun"](this);
        } else {
            renderFoot();
        }
        
        initParam();

        if (htmlConfig["defaultLoad"] == true) {
            this.LoadData({});
        }
    };

    //========================加载数据========================
    this.ExportData = function () {
        this.LoadData(null, { DateType: 1 });
    }
    this.LoadData = function (loadParam,temParam) {

        if (loadParam) {
            if (loadParam["pageSize"] != null) {
                txtPageSize.val(loadParam["pageSize"])
            }

            if (loadParam["pageIndex"] != null) {
                txtPageIndex.val(loadParam["pageIndex"])
            }
            //附加永久保存
            lastParam = $.extend(true, {}, lastParam, loadParam);
        }

        //附加临时参数
        var ajaxParam = temParam ? $.extend(true, {}, lastParam, temParam) : lastParam;
        //分页
     $.ajax({
            type: "get",
            dataType: "json",
            url:'../Sys/json/GridSource.json',// htmlConfig["serviceUrl"],
            data: ajaxParam,
            beforeSend: function () {
                //self.GridShowMask(gridId, "数据加载中...");
            },
            complete: function () {
                //self.GridCloseMask(gridId);
            },
            success: function (dataResult) {
              //  console.log(dataResult);
                if (dataResult["error"]) {
                   // console.log(1);
                    alert(dataResult["error"]);
                    return;
                }else if (dataResult["ExpFile"]) { //导出操作
                   // console.log(2);
                    if (typeof (this.iframe) == "undefined") {
                        var iframe = document.createElement("iframe");
                        this.iframe = iframe;
                        document.body.appendChild(this.iframe);
                    }
                    this.iframe.src = dataResult["ExpFile"];
                    this.iframe.style.display = "none";


                } else {
                  //  console.log(3);
                    lastData = dataResult;
                    //页数计算
                    if (lastData["rowCount"]) {
                        var rowCount = parseInt(lastData["rowCount"])
                        var eachCnt = parseInt(txtPageSize.val());
                        txtAllCount.val(rowCount);
                        if (rowCount % eachCnt == 0) {
                            txtAllPage.val(Math.floor(rowCount / eachCnt));
                        } else {
                            txtAllPage.val(Math.floor(rowCount / eachCnt) + 1);
                        }
                    }
                    renderRows(lastData.data);
                    if (htmlConfig["loadBack"]) {
                        htmlConfig["loadBack"]();
                    }
                }
            },

            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown+'Sys/js/MyGrid');
            }
        });


    }


}