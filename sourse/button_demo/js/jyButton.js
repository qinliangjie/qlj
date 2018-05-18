
// var inputButtons = [];
// function Button(options){
//     if(options.object){
//         if(typeof options.object  == "string"){
//             options.object = document.getElementById(options.object);
//         }
//         var replaceTag = GetUDFTagName(options.object).toLowerCase();   
//         if(options.object && (replaceTag == "jy:button")){
//             // options.type = replaceTag == "xz:inputbutton" ? "input" : "image"; 获取type 当tag=input时为input 非则为image 现只有input 
//             options.type = "button";
//             this.init(options);//初始化对象
//         }
//     }
// }
// Button.InputOption ={
//     object:null,
//     ensembleWrapper:"input",
//     className:"jy-button jy-button--medium",//默认样式，大小
// }

// Button.prototype.init = function(options){
//     var initOptionType = Button.InputOption;
//     var newOption = extend(initOptionType,options);
//     for(var p in newOption){
//         this[p]= newOption[p];
//     }   
//     var e_wrapper = document.createElement(this.ensembleWrapper);
//         e_wrapper.setAttribute("type","button");
//     var e_wrapperClassName = this.object.className; 
//     var e_wrapperId = this.object.getAttribute("id");  
//     var e_onclick = this.object.getAttribute("onclick");    
//     var e_value = this.object.getAttribute("value");
//     var e_type = this.object.getAttribute("button-size");
//     var e_color = this.object.getAttribute("button-type");
//     if(e_color){
//         if(e_color=='primary'){
//             this.className += ' btnprimary';
//         }
//         if(e_color=='warning'){
//             this.className += ' btnwarning';  
//         }
//         if(e_color=='danger'){
//             this.className += ' btndanger';
//         }
//         if(e_color=='success'){
//             this.className += ' btnsuccess';
//         }
//         }
//     if(e_wrapperId){
//         e_wrapper.id = e_wrapperId;
//     }
//     if(e_type){
//         if(e_type=='small'){
//             if(e_color){
//                 if(e_color=='primary'){

//                  this.className = 'jy-button jy-button--small btnprimary';
//                 }
//                 if(e_color=='warning'){
//                   this.className = 'jy-button jy-button--small btnwarning';  
//                 }
//                 if(e_color=='danger'){
//                   this.className = 'jy-button jy-button--small btndanger';
//                 }
//                 if(e_color=='success'){
//                   this.className = 'jy-button jy-button--small btnsuccess';
//                 }
//             }
//         }else if(e_type=='large'){
//             if(e_color){
//                 if(e_color=='primary'){

//                  this.className = 'jy-button jy-button--large btnprimary';
//                 }
//                 if(e_color=='warning'){
//                   this.className = 'jy-button jy-button--large btnwarning';  
//                 }
//                 if(e_color=='danger'){
//                   this.className = 'jy-button jy-button--large btndanger';
//                 }
//                 if(e_color=='success'){
//                   this.className = 'jy-button jy-button--large btnsuccess';
//                 }
//             }
//         }
//     }
//     if(e_wrapperClassName){
//         e_wrapper.className = this.className+' '+e_wrapperClassName;
//     }
//     if(e_onclick){
//         e_wrapper.setAttribute("onclick",e_onclick);
//     }
//     if(e_value){
//         e_wrapper.setAttribute("value",e_value);
//     }
//     //将处理过的新按钮替换掉原生按钮 
//     this.object.parentNode.replaceChild(e_wrapper,this.object); 
//     this.object = e_wrapper;
//     //将相应的按钮类型放入到相应的集合，以便后续操作（待扩展，如禁用、隐藏等）
//     inputButtons.push(e_wrapper);
    
// }
// Button.prototype.innerText = function(dom){
//     return dom.innerText || dom.textContent;
// }


// var iptBtns = GetUDF("jy:button");
//     while(iptBtns.length>0){ 
//         new Button({object:iptBtns[0]});
//     }

var inputButtons = [];
function Button(options){
    if(options.object){
        if(typeof options.object  == "string"){
            options.object = document.getElementById(options.object);
        }
        var replaceTag = GetUDFTagName(options.object).toLowerCase();   
        if(options.object && (replaceTag == "jy:button")){
            // options.type = replaceTag == "xz:inputbutton" ? "input" : "image"; 获取type 当tag=input时为input 非则为image 现只有input 
            options.type = "button";
            this.init(options);//初始化对象
        }
    }
}
Button.InputOption ={
    object:null,
    ensembleWrapper:"input",
    className:"jy-button jy-button--medium",//默认样式，大小
}

Button.prototype.init = function(options){
    var initOptionType = Button.InputOption;
    var newOption = extend(initOptionType,options);
    for(var p in newOption){
        this[p]= newOption[p];
    }   
    var e_wrapper = document.createElement(this.ensembleWrapper);
        e_wrapper.setAttribute("type","button");
    var e_wrapperClassName = this.object.className; 
    var e_style = this.object.getAttribute("style");
    var e_type = this.object.getAttribute("button-type");
    var e_model = this.object.getAttribute("jy-modal");
    var e_wrapperId = this.object.getAttribute("id");  
    var e_onclick = this.object.getAttribute("onclick");    
    var e_value = this.object.getAttribute("value");
    var e_size = this.object.getAttribute("button-size");
    if(e_style){
        e_wrapper.setAttribute("style", e_style);
    }
    if(e_model){
        e_wrapper.setAttribute("jy-modal", e_model);
    }
    if(e_wrapperId){
        e_wrapper.id = e_wrapperId;
    }
    if(e_size){
        if(e_size=='small'){
            this.className = 'jy-button jy-button--small'
        }else if(e_size=='large'){
            this.className = 'jy-button jy-button--large'
        }
    }
    e_wrapper.className = this.className+' '+e_wrapperClassName;
    
    if(e_onclick){
        e_wrapper.setAttribute("onclick",e_onclick);
    }
    if(e_value){
        e_wrapper.setAttribute("value",e_value);
    }
    if(e_type){
        if(e_type=='warning'){
            e_wrapper.className += ' btnwarning'
        }
        if(e_type=='primary'){
            e_wrapper.className += ' btnprimary'
        }
        if(e_type=='success'){
            e_wrapper.className += ' btnsuccess'
        }
        if(e_type=='danger'){
            e_wrapper.className += ' btndanger'
        }
    }
    //将处理过的新按钮替换掉原生按钮 
    this.object.parentNode.replaceChild(e_wrapper,this.object); 
    this.object = e_wrapper;
    //将相应的按钮类型放入到相应的集合，以便后续操作（待扩展，如禁用、隐藏等）
    inputButtons.push(e_wrapper);
    
}
Button.prototype.innerText = function(dom){
    return dom.innerText || dom.textContent;
}
var iptBtns = GetUDF("jy:button");
    while(iptBtns.length>0){ 
        new Button({object:iptBtns[0]});
}