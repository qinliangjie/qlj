/*
window.onload = function(){ 
	InputInit();
} 

//function init
function InputInit(){
	var listInput = document.getElementsByTagName('jy:input');
	
}*/
var buttons=document.getElementsByTagName("jy:button");
var inputs=document.getElementsByTagName("jy:input"); 
var buttonnumber=buttons.length;
var inputnumber=inputs.length;

(function(){
if(!buttonnumber==0){
	JYbuttons();
}
if(!inputnumber==0){
	JYinputs();
}
})();


function JYbuttons(){
	var fns=[];
	var list=[];
	var classname=[];
	var typename=[];
	var idname=[];
	var names=[];
	for(var i=0;i<buttonnumber;i++){
		var Lfn=buttons[i].getAttribute('fn');
		fns.push(Lfn);
		var Lname=buttons[i].getAttribute('name');
		names.push(Lname);  
		var id=buttons[i].id;
		idname.push(id);
		var name=buttons[i].className;
	    classname.push(name);
	    var types=buttons[i].getAttribute('type');
	    typename.push(types);
	    var value=buttons[i].firstChild.nodeValue;  
	    list.push(value);
	}  
	for(var i=0;i<buttonnumber;i++){
		var a =	" onclick=\""+fns[i]+"\"";
		var b = " name="+names[i]+"";
		var c = " id="+idname[i]+"";
		var d = " class=\"jy-button"+" "+classname[i]+" jy-button-"+typename[i]+"\"";
		if(fns[i]==null){
			a ="";
		}
		if(names[i]==null){
			b="";
		}
		if(idname[i]==""){
			c="";
		}
		if(typename[i]==null){
			d=" class=\"jy-button"+" "+classname[i]+"\"";
		}
		buttons[0].outerHTML="<div"+a+b+c+d+">"+"<span>"+list[i]+"</sapn>"+"</div>";
	}
}

function JYinputs(){
	var idname=[];
	var classname=[];
	var names=[];
	var valuename=[];
	var typename=[];
	var labelname=[];
	var placeholdername=[];
	var disablename=[];
	var validatename=[];
	var tipsname=[];
	var requirename=[];
	var showPasswordname=[];
	for(var i=0;i<inputnumber;i++){
		var id=inputs[i].id;
		idname.push(id);
		var name=inputs[i].className;
	    classname.push(name);
	    var Lname=inputs[i].getAttribute('name');
		names.push(Lname);
		var Lvalue=inputs[i].getAttribute('value');
		valuename.push(Lvalue);
		var Ltype=inputs[i].getAttribute('type');
		typename.push(Ltype);
		var Llabel=inputs[i].getAttribute('label');
		labelname.push(Llabel);
		var Lplaceholder=inputs[i].getAttribute('placeholder');
		placeholdername.push(Lplaceholder);
		var Ldisable=inputs[i].getAttribute('disable');
		disablename.push(Ldisable);
		var Lvalidate=inputs[i].getAttribute('validate');
		validatename.push(Lvalidate);
		var Ltips=inputs[i].getAttribute('tips');
		tipsname.push(Ltips);
		var Lrequire=inputs[i].getAttribute('require');
		requirename.push(Lrequire);
		var LshowPasswordname=inputs[i].getAttribute('showpassword');
		showPasswordname.push(LshowPasswordname);
	}
	for(var i=0;i<inputnumber;i++){
		var a = " id="+idname[i]+"";
		var b = " class=\"jy-input"+" "+classname[i]+"\"";
		var c = " name="+names[i]+"";
		var d = " value="+valuename[i]+"";
		var e = " type="+typename[i]+"";
		var f = "<label class=\"jy-input-label\">"+labelname[i]+"</label>"
		var g = " placeholder="+placeholdername[i]+"";
		var h = "";
		var q = "";
		var p = "";
		var o = "";
		if(idname[i]==""){
			a="";
		}
		if(names[i]==null){
			c="";
		}
		if(valuename[i]==null){
			d="";
		}
		if(typename[i]==null){
			e= " type=text";
		}
		if(labelname[i]==null){
			f="";
		}
		if(placeholdername[i]==null){
			g="";
		}
		if(disablename[i]=="false"){
			h = " disabled="+"disabled"+"";
		}
		if(validatename[i]){
			var rule = validatename[i];
			var rules = validatename[i];
			var ruleid = "";
			var requires = "";
			if(requirename[i]=="true"){
				requires=true;
			}
			if(idname[i]==""){
				ruleid = "ruleid"+i;
				a = " id="+ruleid+"";
			}else{
				ruleid = idname[i];
			}
			rule=rule.substr(0, 1);
			if(rule=="/"){
				q = " onblur=\"inputrule1("+ruleid+","+rules+","+requires+")\"";
				p = "<div class=\"jy-tips\">"+tipsname[i]+"</div>";
				o = "<div class=\"jy-require\">输入框不能为空</div>";
			}else{
				q = " onblur=\"inputrule2("+ruleid+","+rules+","+requires+")\"";
				p = "<div class=\"jy-tips\">"+tipsname[i]+"</div>";
				o = "<div class=\"jy-require\">输入框不能为空</div>";
			}
		}
		inputs[0].outerHTML=f+"<div "+b+"><input "+a+c+d+e+g+h+q+" class=\"jy-input--inner\" />"+p+o+"</div>";
	}
}

function inputrule1(e,s,r){  
	var str=e.value;
    reg=s;    
    if(!reg.test(str)){    
        e.parentNode.getElementsByClassName("jy-tips")[0].style.display='block';
    }else{
    	e.parentNode.getElementsByClassName("jy-tips")[0].style.display='none';
    }
    if(r==true){
		require(e,str);
	}
}
function inputrule2(e,s,r){
	var str=e.value;
	var reg= s(str);
	if(reg==true){
		e.parentNode.getElementsByClassName("jy-tips")[0].style.display='none';
	}else{
		e.parentNode.getElementsByClassName("jy-tips")[0].style.display='block';
	}
	if(r==true){
		require(e,str);
	}
}
function require(e,str){
	if(str.length==0){
		e.parentNode.getElementsByClassName("jy-require")[0].style.display='block';
		e.parentNode.getElementsByClassName("jy-tips")[0].style.display='none';
	}else{
		e.parentNode.getElementsByClassName("jy-require")[0].style.display='none';
	}
}
function what(str){
	if(str){
		return true;
	}else{
		return false;
	}
}
function copyText(){
 alert(1);
}