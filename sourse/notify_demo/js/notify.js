
function jy_notify(){
	/*参数初始化*/
	this.configs = {
		width:200,//宽度
		height:100,//高度
		top:100,//距离顶部的位置
		title:'提示',
		left:'',
		type:'success',
		autoClose:true,
		closeTime:5000,
		content:'',//内容
	}
}
jy_notify.prototype={
	notify:function(configs){
		var jy_configs = extend(this.configs,configs);
		/*notify结构体*/
		var jy_notifyBox = document.createElement("div");
		jy_notifyBox.className = "jy_notifyBox";
		jy_notifyBox.style.height = jy_configs.height +"px";
		animate(jy_notifyBox,{width:jy_configs.width},1,0.05,function(){

				});
		var notifyTitle = document.createElement("h2");
		notifyTitle.className = "jy_notifyTitle";
		notifyTitle.innerHTML = jy_configs.title;
		var jy_closeBtn = document.createElement("i");
			jy_closeBtn.className="icon iconfont icon-close notifyclose";
			notifyTitle.appendChild(jy_closeBtn);
		jy_closeBtn.onclick = function(e){
			jy_configs.closeFn && jy_configs.closeFn.closeFn();
				animate(jy_notifyBox,{height:0,border:0},1,0.1,function(){
				document.getElementsByClassName("allbox")[0].removeChild(jy_notifyBox);
			});
				
			}
		jy_notifyBox.appendChild(notifyTitle);
		if(jy_configs.type=="success"){
			var jy_success = document.createElement("i");
			jy_success.className="icon iconfont icon-xiangqing notifySuccess";
			notifyTitle.appendChild(jy_success);
		}else if(jy_configs.type=="warning"){
			var jy_waring = document.createElement("i");
			jy_waring.className="icon iconfont icon-icon-test32 notifyWarning";
			notifyTitle.appendChild(jy_waring);
		}else if(jy_configs.type=="info"){
			var jy_info = document.createElement("i");
			jy_info.className="icon iconfont icon-ld notifyInfo";
			notifyTitle.appendChild(jy_info);
		}else if(jy_configs.type=="error"){
			var jy_error = document.createElement("i");
			jy_error.className="icon iconfont icon-icon-test10 notifyError";
			notifyTitle.appendChild(jy_error);
		}
		var notifyContent = document.createElement("div");
		notifyContent.className = "jy_notifyContent";
		notifyContent.innerHTML = jy_configs.content;
		jy_notifyBox.insertBefore(notifyContent,notifyTitle.nextSibling);

		/*if(document.getElementsByClassName("jy_notifyBox").length>0){
			var tops = 0;
			var boxLengths = document.getElementsByClassName("jy_notifyBox").length;
			tops = boxLengths*jy_configs.height+30*(boxLengths+1)+"px";

			jy_notifyBox.style.top = tops;
		}else{
			jy_notifyBox.style.top = jy_configs.top;
		}*/
		if(jy_configs.autoClose){
			setTimeout(function(){
				animate(jy_notifyBox,{height:0,border:0},1,0.1,function(){
					document.getElementsByClassName("allbox")[0].removeChild(jy_notifyBox);
				});
			},jy_configs.closeTime)
		}
		// var notifyContent = document.createElement("div");
		// notifyContent.className = "jy-notifyContent";
		// jy_notifyBox.insertBefore(notifyContent,notifyTitle.nextSibling);
		
		// notifyContent.innerHTML = jy_configs.content;
		
		/*设置box的宽高定位*/
		if(document.getElementsByClassName("allbox").length>0){
			document.getElementsByClassName("allbox")[0].appendChild(jy_notifyBox)
		}else{
			var allbox = document.createElement("div");
			allbox.className = "allbox";
			allbox.style.width = jy_configs.width +"px";
			allbox.style.top = document.body.scrollTop + 10 + "px"
			document.body.appendChild(allbox);
			allbox.appendChild(jy_notifyBox);
		}
		
	}
}