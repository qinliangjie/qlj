function JYmenus(){   //侧滑栏的初使数据
    var menus=document.getElementsByTagName("jy:menu");
    var menunumber=menus.length;
    var className=[];
    var idName=[];
    for(var i=0;i<menunumber;i++){
        var LmenuDate=menus[i].getAttribute('menu-data');
        var data=eval('('+LmenuDate+')');
        var num=menus[i].getAttribute('menu-open');

        var Lclass=menus[i].getAttribute('class');
        className.push(Lclass);
        var Lid=menus[i].getAttribute('id');
        idName.push(Lid);

        var main=document.createElement('div');
        main.setAttribute("class","jy-menu");
        if(className[i]){
            main.setAttribute("class","jy-menu"+" "+className[i]);
        }
        if(idName[i]){
            main.setAttribute("id",idName[i]);
        }
        this.forMenu(data,main,"",num);  //遍历

        menus[0].outerHTML=main.outerHTML;
    }
}
JYmenus.prototype={
forMenu:function (data,obj,children,num){  //递归遍历侧滑栏结构
    for(var i=0;i<data.length;i++){
        if(data[i].label){
            if(children=="children"){
                var conment=document.createElement('div');
                conment.setAttribute("class","jy-menu-nodeChildHides");
                var conmentS=document.createElement('div');
                conmentS.setAttribute("class","jy-menu-conmentChild");
                conmentS.setAttribute("onclick","menuOpenS("+'this'+','+num+")");
                conmentS.setAttribute("data-click",data[i].keyClick);
                var conmentP=document.createElement('p');
                var conmentPIcon=document.createElement('i');
                conmentPIcon.setAttribute("class","IconFirst "+data[i].labelIcon);
                conmentP.innerHTML=data[i].label;

                conmentP.appendChild(conmentPIcon);
                conmentS.appendChild(conmentP);
                conment.appendChild(conmentS);
                obj.appendChild(conment);
                if(conmentP.parentNode.parentNode.parentNode.firstChild.firstChild.getAttribute("style")){
                    var number=parseInt(conmentP.parentNode.parentNode.parentNode.firstChild.firstChild.getAttribute("style").slice(13))+20;
                    conmentP.setAttribute("style","padding-left:"+number+"px");
                }
            }else{
                var conment=document.createElement('div');
                conment.setAttribute("class","jy-menu-node");
                var conmentS=document.createElement('div');
                conmentS.setAttribute("class","jy-menu-conment");
                conmentS.setAttribute("onclick","menuOpenS("+'this'+','+num+")");
                conmentS.setAttribute("data-click",data[i].keyClick);
                var conmentP=document.createElement('p');
                conmentP.setAttribute("style","padding-left:"+20+"px");
                var conmentPIcon=document.createElement('i');
                conmentPIcon.setAttribute("class","IconFirst "+data[i].labelIcon);
                conmentP.innerHTML=data[i].label;

                conmentP.appendChild(conmentPIcon);
                conmentS.appendChild(conmentP);
                conment.appendChild(conmentS);
                obj.appendChild(conment);
            }
            if(data[i].children){
                var conmentI=document.createElement('i');
                conmentI.setAttribute("class","IconLast ion-chevron-down jy-menu-conmentIRotate");
                conmentS.appendChild(conmentI);
                this.forMenu(data[i].children,conment,"children",num);
            }
        }
    }
}
}
function menuOpenS(obj,num){  //menu打开的方法
if(obj.parentNode.childNodes[1]){
    if(obj.parentNode.childNodes[1].className=="jy-menu-nodeChild"){
        obj.parentNode.childNodes[0].childNodes[1].className+=" jy-menu-conmentIRotate";
        for(var i=0;i<obj.parentNode.childNodes.length-1;i++){
            var l=i+1;
            obj.parentNode.childNodes[l].className="jy-menu-nodeChildHides";
        }
    }else{
        obj.parentNode.childNodes[0].childNodes[1].className="IconLast ion-chevron-down";
        for(var i=0;i<obj.parentNode.childNodes.length-1;i++){
            var l=i+1;
            obj.parentNode.childNodes[l].className="jy-menu-nodeChild";
        }
    }
    var key=obj.getAttribute("data-click");
    menuClik(key,num);
}else{
    var key=obj.getAttribute("data-click");
    menuClik(key,num);		
}
for(var l=0;l<document.getElementsByClassName("jy-menu")[0].getElementsByTagName("p").length;l++){
    document.getElementsByClassName("jy-menu")[0].getElementsByTagName("p")[l].style.color="#fff";
}
obj.childNodes[0].style.color="#FFD04B";
}
function menuClik(obj,num){ //传递用户自定义menu-open的方法
var dom=num;
if(typeof dom=="function"){
    dom(obj);
}else{
    console.error("keyClick is undefined")
}
}