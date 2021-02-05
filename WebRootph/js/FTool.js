var gFormPostFun = [];

function SubmitForm(but, config) {
    if (config["preprocessForm"]) {
        config["preprocessForm"]();
    }

    var f = $(but.form);
    var d = f.serialize();
   // var d = f.formSerialize();
    if (config["data"]) {
        for (var k in config["data"]) {
            d += "&" + k + "=" + config["data"][k];
        }
    }
    gFormPostFun.forEach(function (f) {
        var vd = f();
        d += "&" + vd;
    });

    if (config["formatFun"]) {
        if (config["formatFun"](d) == false) return;
    }

    var fMethod = f.attr("method");
    if (config["method"]) {
        fMethod = config["method"];
    }
    var fUrl = f.attr("action");
    if (config["action"]) {
        fUrl = config["action"];
    }


   // if (config["isValid"] == false || f.validationEngine('validate')) {




        //f.ajaxSubmit({
        //    data: d,
        //    dataType: "json",
        //    beforeSubmit: function (formData, jqForm, options) {
        //                $(but).attr("disabled", "disabled");
        //                if(config["beforeFun"]){
        //                    config["beforeFun"](config);
        //                }
        //                return true;
        //            },  // pre-submit callback
        //    success: function (result) {
        //                if (config["succFun"]) {
        //                    if (config["succFun"](result, f, config) == false) return;
        //                }
        //                if(result.Success==false){
        //                    alert(result.Msg);
        //                }else{
        //                    alert(result.Msg);

        //                    if($("#isAdd").prop("checked") && config["continueFun"]){
        //                        config["continueFun"](f, config);
        //                    } else {
        //                        window.top.CloseCurrWin(true);
        //                    }
        //                }
        //    },
        //    error: function (error,abc) {
        //            if (config["errFun"]) {
        //                if (config["errFun"](error, config) == false) return;
        //            }
        //            alert("保存失败！");
        //        },
        //        complete: function () {
        //            $(but).removeAttr("disabled");
        //            if (config["compFun"]) {
        //                config["compFun"](config);
        //            }
        //        }
        //});


        $.ajax({
            type: fMethod,
            url: fUrl,
            data: d,
            dataType: "json",
            beforeSend: function () {
                $(but).attr("disabled", "disabled");

                if(config["beforeFun"]){
                    config["beforeFun"](config);
                  }
            },
            success: function (result) {
                if (config["succFun"]) {
                    if (config["succFun"](result, f, config) == false) return;
                }
                if(result.Success==false){
                    alert(result.Msg);
                }else{
                    alert(result.Msg);

                    if($("#isAdd").prop("checked") && config["continueFun"]){
                        config["continueFun"](f, config);
                    } else {
                        window.top.CloseCurrWin(true);
                    }
                }
            },
            error: function (error,abc) {
                if (config["errFun"]) {
                    if (config["errFun"](error, config) == false) return;
                }
                alert("保存失败！");
            },
            complete: function () {
                $(but).removeAttr("disabled");
                if (config["compFun"]) {
                    config["compFun"](config);
                }
            }
        });
    }
//};

function ClearForm(f) {
    $("input:text[readonly!='readonly'][disabled!='disabled']", f).val('');
    $("textarea[readonly!='readonly'][disabled!='disabled']", f).val('');
}
