function JYnavs(){   //nav的初始化数据
    var navs=document.getElementsByTagName("jy:nav");
    var navnumber=navs.length;
    var className=[];
    var idName=[];
    var chilrenNumber="";
    for(var i=0;i<navnumber;i++){
        var Lclass=navs[i].getAttribute('class');
        className.push(Lclass);
        var Lid=navs[i].getAttribute('id');
        idName.push(Lid);
        var navTitleNumber=navs[i].getElementsByTagName("jy:nav-title").length;

        var main=document.createElement('div');
        if(idName[i]){
            main.setAttribute("id",idName[i]);
        }
        if(Lclass){
            main.setAttribute("class","jy-nav"+" "+Lclass);
        }else{
            main.setAttribute("class","jy-nav");
        }
        var headerTitle=document.createElement('ul');
        headerTitle.setAttribute("id","jy-childNav");
        headerTitle.setAttribute("class","jy-mainNav");
        for(var l=0;l<navTitleNumber;l++){
            var headerTitleLi=document.createElement('li');
            if(l==0){
                headerTitleLi.setAttribute("class","jy-nav-headerTitle jy-nav-now");
            }else{
                headerTitleLi.setAttribute("class","jy-nav-headerTitle");	
            }
            var headerTitleContment=document.createElement('span');
            if(navs[i].getElementsByTagName("jy:nav-title")[l].getAttribute("data-to")){
                headerTitleContment.setAttribute("data-to",navs[i].getElementsByTagName("jy:nav-title")[l].getAttribute("data-to"));
            }
            headerTitleContment.innerHTML=navs[i].getElementsByTagName("jy:nav-title")[l].childNodes[0].innerHTML;
            headerTitleLi.appendChild(headerTitleContment);
            headerTitle.appendChild(headerTitleLi);
            if(navs[i].getElementsByTagName("jy:nav-title")[l].lastElementChild.outerHTML.slice(1,18)=="jy:nav-title-item"){
                var childrenDom=document.createElement('div');
                childrenDom.setAttribute("class","jy-nav-child");
                headerTitleLi.appendChild(childrenDom);
                for(var q=1;q<navs[i].getElementsByTagName("jy:nav-title")[l].childNodes.length;q++){
                    var childrenDoms=document.createElement('div');
                    childrenDoms.setAttribute("class","jy-navChild-bit");
                    var childrenContent=document.createElement('p');
                    if(navs[i].getElementsByTagName("jy:nav-title")[l].getElementsByTagName("jy:nav-title-item")[q-1].getAttribute("data-to")){
                        childrenContent.setAttribute("data-to",navs[i].getElementsByTagName("jy:nav-title")[l].getElementsByTagName("jy:nav-title-item")[q-1].getAttribute("data-to"))
                    }
                    childrenContent.innerHTML=navs[i].getElementsByTagName("jy:nav-title")[l].childNodes[q].innerHTML;
                    childrenDoms.appendChild(childrenContent);
                    childrenDom.appendChild(childrenDoms);
                }
            }
        }
        main.appendChild(headerTitle);
        navs[0].outerHTML=main.outerHTML;
    }
    this.init();
}
JYnavs.prototype={
    init:function(){
        var lis =document.querySelector("#jy-childNav");
        lis.addEventListener('click',function(e){
            var target = e.target || e.srcElement;
            if(target.parentNode.className=="jy-mainNav"){
                for(var i=0;i<target.parentNode.getElementsByClassName("jy-nav-headerTitle").length;i++){
                    target.parentNode.getElementsByClassName("jy-nav-headerTitle")[i].className="jy-nav-headerTitle";
                    if(target.parentNode.getElementsByClassName("jy-nav-headerTitle")[i].getElementsByClassName("jy-nav-child")[0]){
                        target.parentNode.getElementsByClassName("jy-nav-headerTitle")[i].getElementsByClassName("jy-nav-child")[0].style.display="none";
                    }
                }
                target.className="jy-nav-headerTitle jy-nav-now";
                if(target.getElementsByClassName("jy-nav-child")[0]){
                    target.getElementsByClassName("jy-nav-child")[0].style.display="block";
                }
                if(target.childNodes[0].getAttribute("data-to")){
                    navOut(target.childNodes[0].getAttribute("data-to"))
                }
            }
            if(target.parentNode.className=="jy-nav-headerTitle jy-nav-now" || target.parentNode.className=="jy-nav-headerTitle"){
                for(var i=0;i<target.parentNode.parentNode.getElementsByClassName("jy-nav-headerTitle").length;i++){
                    target.parentNode.parentNode.getElementsByClassName("jy-nav-headerTitle")[i].className="jy-nav-headerTitle";
                    if(target.parentNode.parentNode.getElementsByClassName("jy-nav-headerTitle")[i].getElementsByClassName("jy-nav-child")[0]){
                        target.parentNode.parentNode.getElementsByClassName("jy-nav-headerTitle")[i].getElementsByClassName("jy-nav-child")[0].style.display="none";
                    }
                }
                target.parentNode.className="jy-nav-headerTitle jy-nav-now";
                if(target.parentNode.getElementsByClassName("jy-nav-child")[0]){
                    target.parentNode.getElementsByClassName("jy-nav-child")[0].style.display="block";
                }
                if(target.getAttribute("data-to")){
                    navOut(target.getAttribute("data-to"))
                }
            }
            if(target.parentNode.className=="jy-navChild-bit"){
                if(target.getAttribute("data-to")){
                    navOut(target.getAttribute("data-to"))
                }
                target.parentNode.parentNode.style.display="none";
            }
        })
    }
}