
var jyDiag = document.getElementsByTagName('*');
  		for(var dis = 0;dis<jyDiag.length;dis++){
  			if(jyDiag[dis].getAttribute('jy-modal')!=null){
  				jyDiag[dis].addEventListener('click',function(){
  					var jymodalId = this.getAttribute('jy-modal');
  					myFunction1(jymodalId);
  				});
  			}
  			if(jyDiag[dis].tagName=='JY-DIALOG'){
  				jyDiag[dis].show = function(){
  					var jymodalIda = this.id;
  					myFunction1(jymodalIda);
  				}
  			}
  			if(jyDiag[dis].getAttribute('jy-modal-cancel')!=null||undefined){
  				jyDiag[dis].addEventListener('click',function(){
  					var parentsnode = this.parentNode;
					if(parentsnode.tagName!='jy-dialog'){
		  					parentsnode = parentsnode.parentNode
		  			}
		  			var s = parentsnode.parentNode;
		  				s.close();
  				});
  			}
		}


function myFunction1(e){
	var dia = new Jy_dialog({
		ids:e
	});
}
function Jy_dialog(configs){
	/*参数初始化*/
	this.configs = {
		ids:'',
		showMask:true
	}
	extend(this.configs,configs);
	 this.init();
}

Jy_dialog.prototype.init = function(){  
	var parentDom = document.getElementById(this.configs.ids);
	var dialogDom = document.getElementById(this.configs.ids).children[0];
	dialogDom.style.display = 'block';
	var jy_mask = document.createElement("div");
		jy_mask.className = "jy_mask";
		jy_mask.style.height = document.body.clientHeight +'px';
		document.body.style.overflowY = 'hidden'

	if(this.configs.showMask == true){
		document.body.appendChild(jy_mask);
	}
    var tops = parseInt(document.documentElement.scrollTop) + parseInt((document.documentElement.clientHeight-dialogDom.offsetHeight)/2);
    dialogDom.style.left = (document.documentElement.clientWidth-dialogDom.offsetWidth)/2 +'px';
	dialogDom.style.top = 0+'px';
	animate(dialogDom,{top:tops},1,0.05,function(){});
	parentDom.close = function(){
		dialogDom.style.display = "none";
		dialogDom.style.top = 0+'px';
		document.body.style.overflowY = 'auto'
		document.body.removeChild(jy_mask);
	}

	/*document.getElementsByClassName("jy_mask")[0].onclick = function(){
		parentDom.close();
	}*/
}