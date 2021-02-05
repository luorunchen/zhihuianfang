$(function () {
  var devId = sessionStorage.getItem("DevBH");
  $.ajax({
    type: 'get',
    data: 'devId=' + devId + '&lstDate=' + day,
    url: 'http://112.74.126.51/earlyWarn/earlyWarn/admin/device/ElecData.action',
    //  url:'http://zlh18122711575.55555.io:16799/earlyWarn/admin/device/ElecData.action',
    dataType: 'json',
    error: function (err) {
      console.log('photo.js' + err);
    },
    success: function (result) {
      console.log(result);
      var img = result.DevData[0].image.split(',');
      console.log(img);
      var img_html = "";
      if (img != "") {

      } else {
        img_html = "<div class='InforBox' style='width:97%;height:200px;    display: flex;justify-content: center;align-items: center;'><div class='tab2_photo_chuan_img'><form   enctype='multipart/form-data'  method='post' class='btn_form'><label for='file_head'  style='position: absolute;width: 30%; height: 29%;' ><img src='./images/img_bg.png' alt=''   ><input type='text'  name='productNumber' value='" + ElecDetail.productNumber + "'  style='display:none;' /><input type='file' accept='image/*'  value='' index='2' style='display:none;' name='file' /><canvas id='canvas' hidden='hidden' id='canvas'></canvas></label></form></div><div class='tab2_photo_chuan_img'><form   enctype='multipart/form-data'  method='post' class='btn_form'><label for='file_head'  style='position: absolute;width: 30%; height: 29%;' ><img src='./images/img_bg.png' alt=''   ><input type='text'  name='productNumber' value='" + ElecDetail.productNumber + "'  style='display:none;' /><input type='file' accept='image/*'  value='' index='2' style='display:none;' name='file' /><canvas id='canvas' hidden='hidden' id='canvas'></canvas></label></form></div><div class='tab2_photo_chuan_img'><form   enctype='multipart/form-data'  method='post' class='btn_form'><label for='file_head'  style='position: absolute;width: 30%; height: 29%;' ><img src='./images/img_bg.png' alt=''   ><input type='text'  name='productNumber' value='" + ElecDetail.productNumber + "'  style='display:none;' /><input type='file' accept='image/*'  value='' index='2' style='display:none;' name='file' /><canvas id='canvas' hidden='hidden' id='canvas'></canvas></label></form></div></div>";
      }
      $('#inforN').html(img_html)
    }
  })
})