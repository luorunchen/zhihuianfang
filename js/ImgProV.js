function selectFileImage(fileObj,callBack) {
    var file = fileObj;
    //图片方向角 added by lzk  
    var Orientation = null;

    if (file) {
        console.log("正在上传,请稍后...");
        var rFilter = /^(image\/jpeg|image\/png)$/i; // 检查图片格式  
        if (!rFilter.test(file.type)) {
            //showMyTips("请选择jpeg、png格式的图片", false);  
            return;
        }
        // var URL = URL || webkitURL;  
        //获取照片方向角属性，用户旋转控制  
        EXIF.getData(file, function () {
            // alert(EXIF.pretty(this));  
            EXIF.getAllTags(this);
            //alert(EXIF.getTag(this, 'Orientation'));   
            Orientation = EXIF.getTag(this, 'Orientation');
            //return;  
        });

        var oReader = new FileReader();
       // console.log(oReader);
      //  console.log(oReader.onload);
        oReader.onload = function (e) {
            //var blob = URL.createObjectURL(file);  
            //_compress(blob, file, basePath);  
            var image = new Image();
            image.src = e.target.result;
            image.onload = function () {
                var canvas = document.createElement("canvas");
				//console.log(canvas);
                ProcessImg(this,canvas);
                var base64 = null;

                //修复ios  
              // Orientation = 6;
                if (navigator.userAgent.toLowerCase().indexOf("iphone") > 0) {
                    //如果方向角不为1，都需要进行旋转 added by lzk  
                    //alert(Orientation);
                    if (Orientation != "" && Orientation != 1) {
                      //  alert('旋转处理');
                        switch (Orientation) {
                            case 6://需要顺时针（向左）90度旋转  
                                rotateImg(this, 'left', canvas);
                                break;
                            case 8://需要逆时针（向右）90度旋转  
                              //  alert('需要顺时针（向右）90度旋转');
                                rotateImg(this, 'right', canvas);
                                break;
                            case 3://需要180度旋转  
                               // alert('需要180度旋转');
                                rotateImg(this, 'right', canvas);//转两次  
                                rotateImg(this, 'right', canvas);
                                break;
                        }
                    }
                    base64 = canvas.toDataURL("image/jpeg", 0.8);

                } else if (navigator.userAgent.toLowerCase().indexOf("android")>0) {// 修复android  
                    base64 = AProcessImg(image, canvas);
                } else {
                   // aler("不是苹果和安卓");
                    //alert(Orientation);  
                    if (Orientation != "" && Orientation != 1) {
                        //alert('旋转处理');  
                        switch (Orientation) {
                            case 6://需要顺时针（向左）90度旋转  
                               // alert('需要顺时针（向左）90度旋转');
                                rotateImg(this, 'left', canvas);
                                break;
                            case 8://需要逆时针（向右）90度旋转  
                               // alert('需要顺时针（向右）90度旋转');
                                rotateImg(this, 'right', canvas);
                                break;
                            case 3://需要180度旋转  
                               // alert('需要180度旋转');
                                rotateImg(this, 'right', canvas);//转两次  
                                rotateImg(this, 'right', canvas);
                                break;
                        }
                    }

                    base64 = canvas.toDataURL("image/jpeg", 0.8);
                }
              
                callBack(base64);
            };
        };
        oReader.readAsDataURL(file);
    }
}

function AProcessImg(img, canvas) {
    var expectWidth = img.naturalWidth;
    var expectHeight = img.naturalHeight;

    if (img.naturalWidth > img.naturalHeight && img.naturalWidth > 500) {
        expectWidth = 500;
        expectHeight = expectWidth * img.naturalHeight / img.naturalWidth;
    } else if (img.naturalHeight > img.naturalWidth && img.naturalHeight > 500) {
        expectHeight = 500;
        expectWidth = expectHeight * img.naturalWidth / img.naturalHeight;
    }
    var ctx = canvas.getContext("2d");
    var encoder = new JPEGEncoder();

    return encoder.encode(ctx.getImageData(0, 0, expectWidth, expectHeight), 80);
}

function ProcessImg(img,canvas) {
    var expectWidth = img.naturalWidth;  //获取照片的宽度
    var expectHeight = img.naturalHeight;  //获取照片的长度

    if (img.naturalWidth > img.naturalHeight && img.naturalWidth > 500) {
        expectWidth = 500;
        expectHeight = expectWidth * img.naturalHeight / img.naturalWidth;
    } else if (img.naturalHeight > img.naturalWidth && img.naturalHeight > 500) {
        expectHeight = 500;
        expectWidth = expectHeight * img.naturalWidth / img.naturalHeight;
    }
   
    var ctx = canvas.getContext("2d");
    canvas.width = expectWidth;
    canvas.height = expectHeight;
    ctx.drawImage(img, 0, 0, expectWidth, expectHeight);
}

//对图片旋转处理 added by lzk  
function rotateImg(img, direction, canvas) { 
    var min_step = 0;
    var max_step = 3;   
    if (img == null) return;
    //img的高度和宽度不能在img元素隐藏后获取，否则会出错    
    var height = canvas.height;
    var width = canvas.width; 
    var step = 2;
    if (step == null) {
        step = min_step;
    }
    if (direction == 'right') {
        step++;
        //旋转到原位置，即超过最大值    
        step > max_step && (step = min_step);
    } else {
        step--;
        step < min_step && (step = max_step);

    }
    //旋转角度以弧度值为参数    
    var degree = step * 90 * Math.PI / 180;
    var ctx = canvas.getContext('2d');
    var acwidth = 0;
    var acheigth = 0;
    switch (step) {
        case 0:
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
            break;
        case 1:
            canvas.width = height;
            canvas.height = width;
            ctx.rotate(degree);
            ctx.drawImage(img, 0, -height, width, height);
            break;
        case 2:
            canvas.width = width;
            canvas.height = height;
            ctx.rotate(degree);
            ctx.drawImage(img, -width, -height, width, height);
            break;
        case 3:
            canvas.width = height;
            canvas.height = width;
            ctx.rotate(degree);
             ctx.drawImage(img, -width, 0);
            break;
    }
}