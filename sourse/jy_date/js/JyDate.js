/*
时间日期类js控件
初始参数
*/
var month_en_array = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
var time_array = ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'];
var min_array = ['00','05','10','15','20','25','30','35','40','45','50','55'];
var ch_day_array = ['日','一','二','三','四','五','六'];
var en_day_array = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
/*
时间日期类js控件
初始化方法 参数说明
id : 所绑定的div的id 初始化后回绑定在input上 input's value 为时间戳
language : 日期插件的语言格式 目前只支持 ch:中文  en:英文
fmt : 日期显示格式化fmt 目前只支持 'yyyy-MM-dd hh:mm:ss' 'yyyy-MM-dd'  'hh:mm:ss'
*/
function date_init(id,language,fmt){
  var obj = document.getElementById(id);
  var inputs = document.createElement("input");
  inputs.setAttribute("type","hidden");
  inputs.setAttribute("id",id);
  obj.appendChild(inputs);
  obj.setAttribute("tabIndex","0");
  obj.style.outline = "none";
  obj.removeAttribute("id");
  inputs.setAttribute("data-fmt",fmt)

  var innerBox = document.createElement("div");
  if(language == 'ch'){
    innerBox.innerHTML = '请选择日期时间';
  }else{
    innerBox.innerHTML = 'Please choose the time';
  }

  innerBox.className = "innerBox";
  innerBox.style.width = obj.clientWidth + "px";
  innerBox.style.height = obj.clientHeight + "px";
  innerBox.style.position = "absolute";

  innerBox.style.left = "0px";
  innerBox.style.top = "0px";
  obj.appendChild(innerBox);

  obj.style.cursor = 'pointer';
  obj.style.position = 'relative';
  assemble_init(obj,null,language);

}

//组装初始化页面
function assemble_init(obj,date,language){
  //当前时间对象
  if(!date){
    date = new Date();
  }

  //总体框架
  var jy_date = document.createElement("div");
  jy_date.className = "jy_date";
  jy_date.style.position = "absolute";
  jy_date.style.display = "none";
  jy_date.style.left = "0px";
  jy_date.style.top = (obj.clientHeight + 10) + "px";

  //头部总框架  包含 年和月
  var top_part = document.createElement("div");
  top_part.className = "clearfix jy_date_top";

  //头部左半部分 年
  var top_part_left = document.createElement("div");
  top_part_left.className = "fl top_left ac";
  if(language == 'ch'){
    top_part_left.innerHTML = date.getFullYear()+'年';
  }else{
    top_part_left.innerHTML = date.getFullYear();
  }



  //头部右半部分 月
  var top_part_right = document.createElement("div");
  top_part_right.className = "fl top_right ac";
  if(language == 'ch'){
    top_part_right.innerHTML = (date.getMonth() + 1)+'月';
  }else{
    top_part_right.innerHTML = month_en_array[date.getMonth()];
  }


  //将头部左右部分放入头部框架中
  top_part.appendChild(top_part_left);
  top_part.appendChild(top_part_right);

  //日期部分
  var dates_part = document.createElement("div");
  dates_part.className = 'jy_date_days';
  dates_part.innerHTML = assemble_days(date,language);

  //将头部和日期放入整体框架中
  jy_date.appendChild(top_part);
  jy_date.appendChild(dates_part);

  //将整体框架放入容器
  var has_date = obj.getElementsByClassName("jy_date");
  if(has_date.length > 0){
    has_date[0].innerHTML = jy_date.innerHTML;
  }else{
    obj.appendChild(jy_date);
  }
  //绑定对象焦点进入事件

  var innerBox = obj.getElementsByClassName('innerBox')[0];
  var top_part_lefts = obj.getElementsByClassName('fl top_left ac')[0];
  var top_part_rights = obj.getElementsByClassName('fl top_right ac')[0];

  innerBox.onclick = function(e){
    jy_show_date(obj,language);
    e.stopPropagation();
  }

  top_part_lefts.onclick = function(){assemble_year(date,obj,language)}
  top_part_rights.onclick = function(){assemble_month(date,obj,language)};
  obj.onblur = function(){jy_hide_date(obj,language,date);}

  var list_items = obj.getElementsByClassName("fl jy_date_days_items");
  for(var x in list_items){
    list_items[x].onclick = function(){
      var dates = parseInt(this.innerHTML);
      date.setDate(dates);
      assemble_time(obj,date);
    }
  }
}

//弹出或关闭时间选择框
function jy_show_date(obj,language){
    obj.getElementsByClassName("jy_date")[0].style.display = "block";
    assemble_init(obj,new Date(),language);
}
function jy_hide_date(obj,language,date){
    obj.getElementsByClassName("jy_date")[0].style.display = "none";
    var inputs = obj.getElementsByTagName("input")[0];
    var fmt = inputs.getAttribute("data-fmt");
    var innerDate = date.format(fmt);
    obj.getElementsByClassName("innerBox")[0].innerHTML = innerDate;
    inputs.setAttribute("value",date.getTime());
}


//组装年
function assemble_year(date,obj,language){
  var year = new Date().getFullYear();
  var year_start = year - 8;
  var year_active = date.getFullYear();
  var jy_date_year = document.createElement("div");
  jy_date_year.className = "jy_date_year clearfix";
  for(var i = 0;i < 19;i++){
    var jy_date_year_items = document.createElement("div");
    jy_date_year_items.className = "jy_date_year_items fl";
    if(year_active == year_start){
      jy_date_year_items.className += " active";
    }
    jy_date_year_items.innerHTML = year_start++;
    jy_date_year.appendChild(jy_date_year_items);

  }

  var go_back = document.createElement("div");
  go_back.className = "jy_date_year_back fl";
  if(language == 'ch'){
    go_back.innerHTML = "返回";
  }else{
    go_back.innerHTML = "back";
  }

  jy_date_year.appendChild(go_back);

  obj.getElementsByClassName("jy_date")[0].innerHTML = jy_date_year.outerHTML;
  //绑定事件
  var list_items = obj.getElementsByClassName("jy_date_year_items");
  for(var x in list_items){
    list_items[x].onclick = function(){
      var year_items = parseInt(this.innerHTML);
      date.setFullYear(year_items);
      assemble_init(obj,date,language);
    }
  }
  obj.getElementsByClassName("jy_date_year_back")[0].onclick = function(){
    assemble_init(obj,date,language);
  }


}

//组装月
function assemble_month(date,obj,language){
  var month_active = date.getMonth() + 1;

  var jy_date_month = document.createElement("div");
  jy_date_month.className = "jy_date_month clearfix";

  for(var x = 1;x < 13;x++){
    var jy_date_month_items = document.createElement("div");
    jy_date_month_items.className = "jy_date_month_items fl";

    if(language == 'ch'){
      jy_date_month_items.innerHTML = x+"月";
    }else{
      jy_date_month_items.innerHTML = month_en_array[(x-1)];
    }
    if(month_active == x){
      jy_date_month_items.className += " active";
    }
    jy_date_month_items.setAttribute("data-mon",(x-1));
    jy_date_month.appendChild(jy_date_month_items);
  }

  var go_back = document.createElement("div");
  go_back.className = "jy_date_month_back fl";
  if(language == 'ch'){
    go_back.innerHTML = "返回";
  }else{
    go_back.innerHTML = "back";
  }

  jy_date_month.appendChild(go_back);

  obj.getElementsByClassName("jy_date")[0].innerHTML = jy_date_month.outerHTML;
  //绑定事件
  var list_items = obj.getElementsByClassName("jy_date_month_items");
  for(var x in list_items){
    list_items[x].onclick = function(){
      var month_items = parseInt(this.getAttribute("data-mon"));
      date.setMonth(month_items);
      assemble_init(obj,date,language);
    }
  }
  obj.getElementsByClassName("jy_date_month_back")[0].onclick = function(){
    assemble_init(obj,date,language);
  }

}

//组装时间
function assemble_time(obj,date){
  var jy_date_time_hours = document.createElement("div");
  jy_date_time_hours.className = "jy_date_time clearfix";

  for(var x = 0;x < 24;x++){
    var jy_date_time_items = document.createElement("div");
    jy_date_time_items.className = "jy_date_time_items fl";
    jy_date_time_items.innerHTML = time_array[x] + ":00"
    jy_date_time_items.setAttribute("data-hours",time_array[x]);
    jy_date_time_hours.appendChild(jy_date_time_items);
  }

  obj.getElementsByClassName("jy_date")[0].innerHTML = jy_date_time_hours.outerHTML;
  //绑定事件
  var list_items = obj.getElementsByClassName("jy_date_time_items");
  for(var x in list_items){
    list_items[x].onclick = function(){
      var hours = this.getAttribute("data-hours")
      var hours_items = parseInt(hours);
      date.setHours(hours_items);
      assemble_min(obj,date,hours);
    }
  }
}

//组装分钟
function assemble_min(obj,date,hours){
  var jy_date_time_mins = document.createElement("div");
  jy_date_time_mins.className = "jy_date_time clearfix";

  for(var x = 0;x < 12;x++){
    var jy_date_time_items = document.createElement("div");
    jy_date_time_items.className = "jy_date_mins_items fl";
    jy_date_time_items.innerHTML = hours + ":" +min_array[x]
    jy_date_time_items.setAttribute("data-min",min_array[x]);
    jy_date_time_mins.appendChild(jy_date_time_items);
  }

  obj.getElementsByClassName("jy_date")[0].innerHTML = jy_date_time_mins.outerHTML;
  //绑定事件
  var list_items = obj.getElementsByClassName("jy_date_mins_items");
  for(var x in list_items){
    list_items[x].onclick = function(){
      var mins_items = parseInt(this.getAttribute("data-min"));
      date.setMinutes(mins_items);
      date.setSeconds(0);
      obj.onblur();
    }
  }
}

//组装日期
function assemble_days(date,language){
  var date_init_arry = [];
  if(language == 'ch'){
    date_init_arry = ch_day_array;
  }else{
    date_init_arry = en_day_array;
  }

  //
  var jy_date_days = document.createElement("div");

  //拼装日历头部
  var days_top = document.createElement("div");
  days_top.className = 'clearfix jy_days_top';
  for(var x in date_init_arry){
    var days_top_item = document.createElement("div");
    days_top_item.className = "days_top_item fl";
    days_top_item.innerHTML = date_init_arry[x];
    days_top.appendChild(days_top_item);
  }
  jy_date_days.appendChild(days_top);

  //拼装日历日期部分

  var dates = date.getDate();
  date.setDate(1);
  var week_offset = date.getDay();
  var month_days = getLastDate(date);
  var last_day_this = parseInt(month_days[0]) + week_offset;
  var last_day_before = parseInt(month_days[1]);
  var next_day = 1;
  var for_int = 35;
  if(week_offset > 4){
    for_int = 42;
  }
  for(var i = 0;i < for_int;i++){
    var days_items_num = 0;
    var boolean_func = true;
    var className_items = "fl jy_date_days_items"
    if(week_offset > 0){
      days_items_num = last_day_before - week_offset;
      week_offset--;
      boolean_func = false;
      className_items += " forbid";
    }else{
      if(i < last_day_this){
        days_items_num = i + 1 - date.getDay();
        if(days_items_num == dates){
          className_items += " active";
        }
      }else{
        days_items_num = next_day++;
        boolean_func = false;
        className_items += " forbid";
      }
    }

    var jy_date_days_items = document.createElement("div");
    jy_date_days_items.className = className_items;
    jy_date_days_items.innerHTML = days_items_num;
    if(boolean_func){
      jy_date_days_items.onclick = function(){

      }
    }
    jy_date_days.appendChild(jy_date_days_items);
  }
  date.setDate(dates);
  return jy_date_days.innerHTML;
}



//获取最后一天
function getLastDate(date){
  var last_day_this = 0;
  var last_day_before = 0;
  var dates = new Date(date);
  dates.setMonth(date.getMonth() + 1);
  dates.setDate(1);
  var one_day = 1000 * 60 * 60 * 24;
  dates = new Date(dates.getTime() - one_day);
  last_day_this = dates.getDate();
  dates.setDate(1);
  dates = new Date(dates.getTime() - one_day);
  last_day_before = dates.getDate();
  return [last_day_this,last_day_before];
}

Date.prototype.format = function(fmt) {
     var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt)) {
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
     for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
         }
     }
    return fmt;
}
