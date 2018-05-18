function JYtrees(){
    var trees=document.getElementsByTagName("jy:tree");
    var treenumber=trees.length;
    var idName=[];
    var className=[];
    var nameName=[];
    for(var i=0;i<treenumber;i++){
        var LonlyOne=trees[i].getAttribute('jy-onlyOne');
        var LrowClick=trees[i].getAttribute('row-click');
        var LrowCode=trees[i].getAttribute('row-code');
        var LtreeDate=trees[i].getAttribute('tree-data');
        var date=eval('('+LtreeDate+')');
        var Lid=trees[i].getAttribute('id');
        idName.push(Lid);
        var Lclass=trees[i].getAttribute('class');
        className.push(Lclass);
        var Lname=trees[i].getAttribute('name');
        nameName.push(Lname);
        
        var main=document.createElement('div');
        main.setAttribute("class","jy-tree");
        if(className[i]){
            main.setAttribute("class","jy-tree"+" "+className[i]);
        }
        if(idName[i]){
            main.setAttribute("id",idName[i]);
        }
        if(nameName[i]){
            main.setAttribute("name",nameName[i]);
        }
        if(LonlyOne=="true"){
            main.setAttribute("data-onlyOne",true);
        }
        this.forEach(date,main,"",LrowClick,LrowCode); //递归
        trees[0].outerHTML=main.outerHTML;
    }
}
JYtrees.prototype={
    forEach:function (menus,obj,children,row,eve){   //递归遍历树的结构
        var eveFuntion=eve;
        if(typeof window[eveFuntion]=="function"){
            var a = window[eveFuntion]();
            parser=new DOMParser();
            xmlDoc=parser.parseFromString(a,"text/xml");
            var b=xmlDoc.documentElement;
        }

        for(var i=0;i<menus.length;i++){
            if(menus[i].label){
                var conment=document.createElement('div');
                conment.setAttribute("class","jy-tree-node");
                conment.setAttribute("data-id",menus[i].id);
                conment.setAttribute("style","margin-left:"+20+"px");
                if(children){
                    conment.className+=" jy-tree-node__out";
                }
                var span = document.createElement('span');
                span.setAttribute("class","jy-tree-node__span1");
                conment.appendChild(span);
                var conmentS=document.createElement('div');
                conmentS.setAttribute("class","jy-tree-node__conment");
                conmentS.setAttribute("data-id",menus[i].id);
                conmentS.setAttribute("onclick","treeOpenS("+'this'+","+row+")");
                var conmentP=document.createElement('p');
                conmentP.innerHTML=menus[i].label;
                var conmentSS=document.createElement('div');
                conmentSS.setAttribute("class","jy-tree__more")
                if(typeof window[eveFuntion]=="function"){
                    conmentSS.innerHTML=b.outerHTML;
                }
                conmentS.appendChild(conmentP);
                conmentS.appendChild(conmentSS);
                conment.appendChild(conmentS);
                obj.appendChild(conment);
                if(menus[i].children){
                    var conmentI=document.createElement('i');
                    conmentI.setAttribute("class","ion-arrow-right-b");
                    span.appendChild(conmentI);
                    this.forEach(menus[i].children,conment,"children",row,eve);
                }
            }
        }
    }
}
function treeOpenS(obj,row){   //tree的打开方法
    if(obj.parentNode.getElementsByTagName("span")[0].className=="jy-tree-node__span1"){
        var a = obj.parentNode.childNodes.length-2;
        if(document.getElementsByClassName("jy-tree-node")[0].parentNode.getAttribute("data-onlyOne")=="true"){
            var judge=obj.parentNode.parentNode.className.slice(0,8);
            if(judge=="jy-tree "){
                for(var q=0;q<obj.parentNode.parentNode.childNodes.length;q++){
                    obj.parentNode.parentNode.childNodes[q].childNodes[0].className="jy-tree-node__span1";
                    for(var qq=0;qq<obj.parentNode.parentNode.childNodes[q].childNodes.length-2;qq++){
                        obj.parentNode.parentNode.childNodes[q].childNodes[qq+2].className="jy-tree-node jy-tree-node__out";
                        for(var num=0;num<obj.parentNode.parentNode.childNodes[q].childNodes[qq+2].getElementsByClassName("jy-tree-node__out1").length;num++){
                            if(obj.parentNode.parentNode.childNodes[q].childNodes[qq+2].getElementsByClassName("jy-tree-node__out1")[num]){
                                obj.parentNode.parentNode.childNodes[q].childNodes[qq+2].getElementsByClassName("jy-tree-node__out1")[num].className="jy-tree-node jy-tree-node__out";
                            }
                            if(obj.parentNode.parentNode.childNodes[q].childNodes[qq+2].getElementsByClassName("jy-tree-node__span")){
                                obj.parentNode.parentNode.childNodes[q].childNodes[qq+2].getElementsByClassName("jy-tree-node__span")[num].className="jy-tree-node__span1";
                            }
                        }
                    }
                }
            }else{
                for(var q=0;q<obj.parentNode.parentNode.childNodes.length-2;q++){
                    obj.parentNode.parentNode.childNodes[q+2].childNodes[0].className="jy-tree-node__span1";
                    for(var qq=0;qq<obj.parentNode.parentNode.childNodes[q+2].childNodes.length-2;qq++){
                        obj.parentNode.parentNode.childNodes[q+2].childNodes[qq+2].className="jy-tree-node jy-tree-node__out";
                        for(var num=0;num<obj.parentNode.parentNode.childNodes[q+2].childNodes[qq+2].getElementsByClassName("jy-tree-node__out1").length;num++){
                            if(obj.parentNode.parentNode.childNodes[q+2].childNodes[qq+2].getElementsByClassName("jy-tree-node__out1")[num]){
                                obj.parentNode.parentNode.childNodes[q+2].childNodes[qq+2].getElementsByClassName("jy-tree-node__out1")[num].className="jy-tree-node jy-tree-node__out";
                            }
                            if(obj.parentNode.parentNode.childNodes[q+2].childNodes[qq+2].getElementsByClassName("jy-tree-node__span")){
                                obj.parentNode.parentNode.childNodes[q+2].childNodes[qq+2].getElementsByClassName("jy-tree-node__span")[num].className="jy-tree-node__span1";
                            }
                        }
                    }
                }
            }
        }
        for(var i=0;i<a;i++){
            if(obj.parentNode.getElementsByTagName("span")[i].className=="jy-tree-node__span1"){
                obj.parentNode.getElementsByTagName("span")[0].className="jy-tree-node__span";
                if(obj.parentNode.childNodes[i+2]){
                    obj.parentNode.childNodes[i+2].className="jy-tree-node__out1";
                }
            }
        }
    }else{
        obj.parentNode.getElementsByTagName("span")[0].className="jy-tree-node__span1";
        var a=obj.parentNode.getElementsByClassName("jy-tree-node__out1").length;
        for(var j=0;j<a;j++){
            if(obj.parentNode.getElementsByClassName("jy-tree-node__out1")[0]){
                obj.parentNode.getElementsByClassName("jy-tree-node__out1")[0].getElementsByTagName("span")[0].className="jy-tree-node__span1";
                obj.parentNode.getElementsByClassName("jy-tree-node__out1")[0].className="jy-tree-node__out";
            }
        }
    }
    var b = obj.parentNode.childNodes.length-2;
    var id= obj.getAttribute('data-id');
    var text=obj.getElementsByTagName("p")[0].innerHTML;
    var children=[];
    for(var l=0;l<b;l++){
        children[l]=obj.parentNode.childNodes[l+2].innerHTML;
    }
    if(typeof row=="function"){
        row(id,text,children);
    }
}