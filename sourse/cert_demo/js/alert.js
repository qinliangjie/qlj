
function jy_alert(){
	/*参数初始化*/
	this.configs = {
		width:500,//宽度
		height:300,//高度
		top:'',//距离顶部的位置
		title:'提示',
		left:'',
		confirmText:'确定',
		content:'',//内容
		hasCloseBtn:'',//是否带关闭按钮
		showMask:true,//是否模态弹窗
		sucessFn:null,//确定按钮回调
		closeFn:null//取消按钮回调
	}
}
jy_alert.prototype={
	alert:function(configs){

		var jy_configs = extend(this.configs,configs);
		/*弹窗结构体*/
		var jy_alertBox = document.createElement("div");
		jy_alertBox.className = "jy-alertBox";

		var alertTitle = document.createElement("div");
		alertTitle.className = "jy-alertTitle";
		alertTitle.innerHTML = jy_configs.title;
		jy_alertBox.appendChild(alertTitle);

		var alertContent = document.createElement("div");
		alertContent.className = "jy-alertContent";
		jy_alertBox.insertBefore(alertContent,alertTitle.nextSibling);
		var alertBottom = document.createElement("div");
		alertBottom.className = "jy-alertBottom";
		jy_alertBox.insertBefore(alertBottom,alertContent.nextSibling);
		
		alertContent.innerHTML = jy_configs.content;
		var closeBtn = document.createElement("div");
		closeBtn.className = "jy-alertbtnConfirm";
		closeBtn.innerHTML= jy_configs.confirmText;
		alertBottom.appendChild(closeBtn);
		closeBtn.onclick = function(){
			jy_configs.sucessFn && jy_configs.sucessFn();
			if(jy_configs.showMask == true){
				document.body.style.overflowY = 'auto';
				document.body.removeChild(jy_mask);
				document.body.removeChild(jy_alertBox);
			}else{
				document.body.removeChild(jy_alertBox)
			}
		};
		if(jy_configs.hasCloseBtn == true){
			var jy_closeBtn = document.createElement("i");
			jy_closeBtn.className="icon iconfont icon-close alertclose";
			alertTitle.appendChild(jy_closeBtn);
			jy_closeBtn.onclick = function(){
				jy_configs.closeFn && jy_configs.closeFn.closeFn();
				if(jy_configs.showMask == true){
					document.body.style.overflowY = 'auto';
					document.body.removeChild(jy_mask);
					document.body.removeChild(jy_alertBox);
				}else{
					document.body.removeChild(jy_alertBox)
				}
			}
		}
		/*设置box的宽高定位*/
		jy_alertBox.style.width = jy_configs.width +"px";
		jy_alertBox.style.height = jy_configs.height +"px";
		jy_alertBox.style.left = (jy_configs.left || (window.innerWidth-jy_configs.width)/2) +"px";
		jy_configs.top = jy_configs.top || parseInt((window.innerHeight-jy_configs.height)/2);
		if(jy_configs.showMask == true){
			var jy_mask = document.createElement("div");
			jy_mask.className = "jy_mask";
			document.body.style.overflowY = 'hidden';
			jy_mask.style.height = document.body.clientHeight +'px';
			document.body.appendChild(jy_mask);
		}
		var alerts = document.getElementsByClassName("jy-alertBox");
		//把之前的弹窗移除
		if(alerts.length>0){
			for(var a = 0;a<alerts.length;a++){
				document.body.removeChild(alerts[a]);
			}
		}
		document.body.appendChild(jy_alertBox);
		jy_alertBox.style.top = 0 +'px';
		animate(jy_alertBox,{top:jy_configs.top},1,0.05,function(){});
	}
}
