function setOpacity(ele, opacity) {
    if (ele.style.opacity != undefined) {
        ele.style.opacity = opacity / 100;
    } else {
        ele.style.filter = "alpha(opacity=" + opacity + ")";
    }
}

//隐藏
function fadein(ele, opacity, speed) {
    if (ele) {
        var v = ele.style.filter.replace("alpha(opacity=", "").replace(")", "") || ele.style.opacity;
        v < 1 && (v = v * 100);
        var count = speed / 1000;
        var avg = count < 2 ? (opacity / count) : (opacity / count - 1);
        var timer = null;
        timer = setInterval(function() {
            if (v < opacity) {
                v += avg;
                setOpacity(ele, v);
            } else {
                clearInterval(timer);
            }
        }, 500);
    }
}


//显示
function fadeout(ele, opacity, speed) {
    if (ele) {
        var v = ele.style.filter.replace("alpha(opacity=", "").replace(")", "") || ele.style.opacity || 100;
        v < 1 && (v = v * 100);
        var count = speed / 1000;
        var avg = (100 - opacity) / count;
        var timer = null;
        timer = setInterval(function() {
            if (v - avg > opacity) {
                v -= avg;
                setOpacity(ele, v);
            } else {
                clearInterval(timer);
            }
        }, 500);
    }
}

//自定义动画  
//obj : dom元素
//json : 改变dom元素的css
//interval : 每执行一次改变的间隔
//sp : 执行速度  秒为单位
//fn : 执行完成后调用方法
function animate(obj, json, interval, sp, fn) {
    clearInterval(obj.timer);
    function getStyle(obj, arr) {
        if(obj.currentStyle){
            return obj.currentStyle[arr]; 
        } else {
            return document.defaultView.getComputedStyle(obj, null)[arr]; 
        }
    }
    obj.timer = setInterval(function(){
        var flag = true;
        for(var arr in json) {
            var icur = 0;
            if(arr == "opacity") {
                icur = Math.round(parseFloat(getStyle(obj, arr))*100);
            } else {
                icur = parseInt(getStyle(obj, arr));
            }
            var speed = (json[arr] - icur) * sp;
            speed = speed > 0 ? Math.ceil(speed): Math.floor(speed);
            if(icur != json[arr]){
                flag = false;
            } 
            if(arr == "opacity"){
                obj.style.filter = "alpha(opacity : '+(icur + speed)+' )";
                obj.style.opacity = (icur + speed)/100;
            }else {
                obj.style[arr] = icur + speed + "px";
            }
        }

        if(flag){
            clearInterval(obj.timer);
            if(fn){
                fn();
            }
        }
    },interval);
}



var USER_DEFINE_TAG = "jy";
var asd ='';
var isIE = navigator.userAgent.toLowerCase().indexOf("msie") != -1;

var isGecko = navigator.userAgent.toLowerCase().indexOf("gecko") != -1;

/*导入自定义标签命名空间*/
if(isIE){document.namespaces.add(USER_DEFINE_TAG)}     

/*获得自定义标签*/
var GetUDF = function(fullTagName){
    var tName = null;
    if(isIE){
        tName = fullTagName.replace(USER_DEFINE_TAG + ":" , "");
    }
    if(isGecko){
        tName = fullTagName
    }
    return document.getElementsByTagName(tName)
}
/*获得自定义标签TagName*/
var GetUDFTagName = function (d){
    return isIE ? USER_DEFINE_TAG + ":" +d.tagName : d.tagName;
}

var extend = function(d,c){
    for(var p in c){ d[p] = c[p]}
    return d;
}
/*var getData = function(url, data, callback, error) {
        var encodeUrl = encodeURI(url);
        // 如果data 是对象 则序列化之
        if (typeof data === 'object') {
            data = JSON.stringify(data);
        }
        // 对 data 在进行一次编码
        data = encodeURI(data);
        $.ajax({
            type: "GET",
            data: data,
            url: encodeUrl,
            dataType: "json",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function(rep) {
                if (!rep) {
                    return;
                }
                // 代理，当 status 为 2 的时候，跳转到登录页面，所有异步请求都如此
                if (rep.status === 2 || rep.status === 3) {
                    Utils.alert(rep.message, function() {
                        window.location = '/';
                    });
                    return;
                }
                callback.apply(this, arguments);
            },
            error: function(rep) {
                if (typeof error === 'function') {
                    error.apply(this, arguments);
                } else {
                    Utils.alert("操作失败，请稍后再试或联系管理员");
                }
            }
        });
    };*/