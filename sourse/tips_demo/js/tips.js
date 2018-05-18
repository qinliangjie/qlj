//textarea自定义标签
var myjytips = [];
function JyTips(options,num){
    if(options.object){
        if(typeof options.object  == "string"){
            options.object = document.getElementById(options.object);
        }
        var replaceTag = GetUDFTagName(options.object).toLowerCase();   
        if(options.object && (replaceTag == "jy:tips")){
            this.init(options,num);//初始化对象
        }
    }
}
//默认项配置 
JyTips.InputOption = {
    positions:'top',
    nomalClass:'nomalTips'
}

JyTips.prototype.init = function(options,num){
    var initOptionType = JyTips.InputOption;
    var newOption = extend(initOptionType,options);
    for(var p in newOption){
        this[p]= newOption[p];
    }
    var a = document.createElement("div");
    var b = document.createElement("div");
    b.className = 'jypopper__arrow jytriangle-down';
    var a_positoin = this.object.getAttribute("placement");
    var a_content = this.object.getAttribute("content");
    a.className = this.nomalClass;
    a.innerHTML = a_content;
    a.appendChild(b);
    document.body.appendChild(a);
    var childrenobject = this.object.children[0];
    this.object.parentNode.replaceChild(childrenobject,this.object); 
     childrenobject.onmouseenter = function(){
             a.style.display = "block";
             if(a_positoin=='top'){
                var divsTop = a.offsetHeight;
               a.style.top = childrenobject.offsetTop-divsTop-5+'px';
               a.style.left = childrenobject.offsetLeft+5+'px';
               b.className = 'jypopper__arrow jytriangle-down';
            }else if(a_positoin=='bottom'){
                var divsheight = childrenobject.offsetHeight;
                a.style.top = childrenobject.offsetTop+divsheight+5+'px';
                a.style.left = childrenobject.offsetLeft+5+'px';
                b.className = 'jypopper__arrow jytriangle-up';
            }else if(a_positoin=='left'){
                var divsLeft = a.offsetWidth
                a.style.top = childrenobject.offsetTop-5+'px';
                a.style.left = childrenobject.offsetLeft-divsLeft-5+'px';
                b.className = 'jypopper__arrow jytriangle-left';
            }else if(a_positoin=='right'){
                var divsRight = childrenobject.offsetWidth;
                a.style.top = childrenobject.offsetTop-5+'px';
                a.style.left = childrenobject.offsetLeft+divsRight+3+'px';
                b.className = 'jypopper__arrow jytriangle-right'
            }
     };
     childrenobject.onmouseleave = function(){
         a.style.display = "none";
     };

}
var jyTipsOj = GetUDF("jy:tips");
while(jyTipsOj.length>0){ 
    new JyTips({object:jyTipsOj[0]});
}
// if(jyTipsOj.length>0){
//     for(var tipslengths =0;tipslengths<jyTipsOj.length;tipslengths++){
//         new JyTips({object:jyTipsOj[tipslengths]},tipslengths);
//     }
// }
