// 复杂的自定义覆盖物
function MyFocus(point, text) {
    this._point = point;
    this._text = text;
}
MyFocus.prototype = new BMap.Overlay();


MyFocus.prototype.initialize = function (map) {
    this._map = map;
    var div = this._div = document.createElement("div");
    div.style.position = "absolute";
    div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
    div.className = "focusBox";

    if (this._clickFun) {
        div.onclick = this._clickFun;
    }

    map.getPanes().labelPane.appendChild(div);

    return div;
}
MyFocus.prototype.draw = function () {
    var map = this._map;
    var tzoom = map.getZoom();
    var pixel = map.pointToOverlayPixel(this._point);
    this._div.style.left = pixel.x - 32 + "px";
    this._div.style.top = pixel.y - 32 + "px";
}

MyFocus.prototype.addEventListener = function (event, fun) {
    this._clickFun = fun;
}
MyFocus.prototype.getPosition = function () {
    return this._point;
}