$(document).ready(function() {

    var arr = [];
    
    //把数据提交
    $(".s_send").click(function() {
        var text = $(".s_text").val();
        arr.push(text);
	    var textObj = $("<div class=\"dm_message\"></div>");
	    textObj.text(text);
	    $(".dm_word").append(textObj);
	    moveObj(textObj);
        $(".s_text").val("");
    });
    //响应键盘
    $(".s_text").keypress(function(event) {
        if (event.keyCode == '13' || event.keyCode == '108') {
            $("s_send").trigger("click");
        }
    });
    //清空弹幕
    $(".s_clear").click(function() {
        arr = [];
        $("dm_word").empty();
    });

    //显示弹幕
    var topMin = $(".dm_vedio").offset().top;
    var topMax = topMin + $(".dm_vedio").height();
    var _top = topMin;

    var moveObj = function(obj) {
        var _left = $(".dm_vedio").width() - obj.width();
        _top = _top + 50;
        if(_top > (topMax - 50)){
            _top = topMin;
        }
        obj.css({
            left: _left,
            top: _top,
            color: getRandomColor()
        });
        var time = 20000 + 10000 * Math.random();
        var leftMin = $(".dm_vedio").offset().left;
        obj.animate({
            left: leftMin + "px"
        }, time, function() {
            obj.remove();
        });
    }
    //随机颜色
    var getRandomColor = function() {
	    return '#' + (function(h) {
	      return new Array(7 - h.length).join("0") + h
	    })((Math.random() * 0x1000000 << 0).toString(16))
    }
    //随机输出弹幕
    var getAndRun = function() {
	    if (arr.length > 0) {
	      var n = Math.floor(Math.random() * arr.length + 1) - 1;
	      var textObj = $("<div>" + arr[n] + "</div>");
	      $(".dm_word").append(textObj);
	      moveObj(textObj);
	    }
	    setTimeout(getAndRun, 3000);
    }
    //动画运行速率，默认13，数值越低越快
    jQuery.fx.interval = 50;
    //调用
	getAndRun();
});