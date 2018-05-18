//textarea自定义标签
var textArea = [];
function Textarea(options){
    if(options.object){
        if(typeof options.object  == "string"){
            options.object = document.getElementById(options.object);
        }
        var replaceTag = GetUDFTagName(options.object).toLowerCase();   
        if(options.object && (replaceTag == "jy:textarea")){
            // options.type = replaceTag == "xz:inputbutton" ? "input" : "image"; 获取type 当tag=input时为input 非则为image 现只有input 
            options.type = "input";
            this.init(options);//初始化对象
        }
    }
}
//默认项配置 
Textarea.InputOption ={
    object:null,
    parents:"div",
    ensembleWrapper:"textarea",
    className:"jy-textarea jy-textarea--medium"
}

Textarea.prototype.init = function(options){
   var initOptionType = Textarea.InputOption;
    var newOption = extend(initOptionType,options);
    for(var p in newOption){
        this[p]= newOption[p];
    }
    //e_wrapper是生成DOM,this指向Textarea对象 
    var e_wrapper = document.createElement(this.ensembleWrapper);
    var e_wrapperId = this.object.getAttribute("id");  
    var e_wrapperClassName = this.object.className; 
    var e_name = this.object.getAttribute("name");
    var e_defaultValue = this.object.getAttribute("defaultValue");    
    var e_disabled = eval(this.object.getAttribute("disabled"));
    var e_rows = eval(this.object.getAttribute("allow-row"));
    var e_size = this.object.getAttribute("textarea-size");
    var e_style = this.object.getAttribute("style");
    var e_placeholder = this.object.getAttribute("placeholder");
    var e_resize = this.object.getAttribute("resize");
    var e_maxlength = eval(this.object.getAttribute("max-length"));
    var e_readonly = this.object.getAttribute("readonly");
    var e_required = eval(this.object.getAttribute("required"));
    var e_validate = eval(this.object.getAttribute("validate"));
    var e_tips= this.object.getAttribute("tips");
    if(e_wrapperId){
        e_wrapper.id = e_wrapperId;
    }
    if(e_name){
        e_wrapper.setAttribute("name",e_name);
    }
    if(e_defaultValue){
       e_wrapper.defaultValue = e_defaultValue;
    }
    if(e_disabled){
        e_wrapper.setAttribute("disabled",e_disabled);
    }
    if(e_style){
    	e_wrapper.setAttribute("style",e_style);
    }
    if(e_placeholder){
    	e_wrapper.setAttribute("placeholder",e_placeholder);
    }
    if(e_rows){
        e_wrapper.setAttribute("rows",e_rows);
    }
    if(e_size){
    	try
		  {
		  	if(e_size == "small"){
		    	this.className = "jy-textarea jy-textarea--small";
		    }
		    else if(e_size == "large"){
		    	this.className = "jy-textarea jy-textarea--large";
		    }else if(e_size == "medium"){
		    	this.className = "jy-textarea jy-textarea--medium"
		    }else{
		    	throw "size type is wrong";
		    }     
		  }
		catch(err)
		  {
		  	 throw new Error(err)
		  }
	}
    if(e_resize){
    	try
		  {
		  	if(e_resize == "true"){
		    	 e_wrapper.style.resize = "both";
		    }
		    else if(e_resize == "false"){
		    	 e_wrapper.style.resize = "none";
		    }else{
		    	throw "resize type is wrong";
		    }     
		  }
		catch(err)
		  {
		  	 throw new Error(err)
		  }
    		
    }
    if(e_readonly){
    	try{
    		if(e_readonly=="readonly")
    		e_wrapper.setAttribute("readonly",e_readonly);
    		else
    		throw "readonly type is wrong"
    	}
    	catch(err)
    	{
    		throw new Error(err)
    	}
    }
    if(e_maxlength){
    	e_wrapper.setAttribute("maxlength",e_maxlength);
    }
    if(e_validate){
		try{
			var w_wrapper = document.createElement("span");
			w_wrapper.className = "jy-textareaError";
			if(typeof(e_validate) == "function"){
				e_wrapper.onblur = function(){
					if(e_validate() == true){
						
					}else if(e_validate() == false){
						if(e_tips){
							var parent = e_wrapper.parentNode;
							parent.insertBefore(w_wrapper,e_wrapper.nextSibling);
							w_wrapper.innerText = e_tips;
						}else{
							w_wrapper.innerText = "校验错误"
						}
						
					}else{
						throw "volidate function iswrong"
					}
				}
			}else if(typeof(e_validate) == "object"){
				var contents = new RegExp(e_validate);
				e_wrapper.onblur = function(){
					var yourText = e_wrapper.value;
					if(contents.test(yourText)==true){
						if(e_wrapper.nextSibling){
							var parent = e_wrapper.parentNode;
							parent.removeChild(e_wrapper.nextSibling);
						}
					}else{
						if(e_tips){
							var parent = e_wrapper.parentNode;
							parent.insertBefore(w_wrapper,e_wrapper.nextSibling);
							w_wrapper.innerText = e_tips;
						}else{
							w_wrapper.innerText = "校验错误"
						}
					}
				}
			}else{
				throw "validate type is wrong"
			}
		}catch(err){
			throw new Error(err)
		}

    }
    if(!e_validate&&e_tips){
    	throw new Error("tips设置需要volidate属性")
    }
    if(e_wrapperClassName){
        e_wrapper.className = this.className+' '+e_wrapperClassName;
    }  
    var textareaBox = document.createElement("div");
    textareaBox.className = "jy-textareaBox";
	//将处理过的新按钮替换掉原生按钮 
    this.object.parentNode.replaceChild(textareaBox,this.object); 
    textareaBox.appendChild(e_wrapper);
    this.object = e_wrapper;
    //将相应的按钮类型放入到相应的集合，以便后续操作（待扩展，如禁用、隐藏等）
    textArea.push(e_wrapper);  
}
var jyTextareas = GetUDF("jy:textarea");

window.addEventListener("load",function(){
    while(jyTextareas.length>0){ 
        new Textarea({object:jyTextareas[0]});
    }
});