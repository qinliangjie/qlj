window.addEventListener("load",function(){
    SelectInit();
});

//function init
function SelectInit(){
	//get select elements list
	var listSelect = document.getElementsByTagName('jy:select');
	//for list
	if(listSelect && listSelect.length > 0){
		var listSelectLength = listSelect.length;
		for(var i = 0;i < listSelectLength;i++){
			var selectItem = document.getElementsByTagName('jy:select')[0];
			
			//tld get attribute
			// get options
			var options_ = eval(selectItem.getAttribute("options"));
			// get id
			var id_ = selectItem.getAttribute("id");
			// get class
			var class_ = selectItem.getAttribute("class");
			// get name
			var name_ = selectItem.getAttribute("name");
			// get value
			var value_ = selectItem.getAttribute("value");
			// get label
			var label_ = selectItem.getAttribute("label");
			// get labelStyle
			var labelStyle_ = selectItem.getAttribute("label-style");
			// get multiselect
			var multiselect_ = eval(selectItem.getAttribute("multiselect"));
			// get showCheackBox
			var showCheackBox_ = eval(selectItem.getAttribute("show-cheack-box"));
			// get disable
			var disable_ = eval(selectItem.getAttribute("disable"));
			// get changes
			var changes_ = eval(selectItem.getAttribute("changes"));
			
			// deal with options_
			//if options is a function then use this function
			if(typeof(options_) =='function'){
				options_ = eval(options_());
			}
			
			//for options
			if(options_){
				//create dom 
				var select_div = document.createElement('div');
				//select dom sytle
				if(!class_){
					class_ = '';
				}
				if(labelStyle_=='inline'){
					
					select_div.className = 'jy_select select_inline '+class_
				}else{
					select_div.className = 'jy_select '+class_
				}
				
				//create label dom
				var select_label = document.createElement('div');
				//label dom style
				select_label.className = 'select_label';
				//label inner html
				if(!label_){
					label_ = '';
				}
				select_label.innerHTML = label_;
				
				//select input dom
				var select_input = document.createElement('div');
				select_input.className = 'select_input';
				
				var select_inner_input = document.createElement('input');
				select_inner_input.setAttribute("type","text");
				select_inner_input.setAttribute("readonly",'true');
				
				var select_inner_input_val = document.createElement('input');
				select_inner_input_val.setAttribute("type","hidden");
				if(id_){
					select_inner_input_val.setAttribute("id",id_);
				}
				if(name_){
					select_inner_input_val.setAttribute("name",name_);
				}
				
				var select_i = document.createElement('i');
				select_i.className = 'iconfont icon-down';
				
				//create option dom
				var select_options = document.createElement('div');
				select_options.className = 'select_options';
				if(options_.length == 0){
					//have no data
					var select_options_items = document.createElement('div');
					select_options_items.className = 'opt_items forbid';
					select_options_items.innerHTML = 'no data';
					select_options_items.setAttribute('data-key','');
					
					//install option dom
					select_options.appendChild(select_options_items);
					
					//install input dom
					select_input.appendChild(select_inner_input);
					select_input.appendChild(select_inner_input_val);
					select_input.appendChild(select_i);
					
					//install select dom
					select_div.appendChild(select_label);
					select_input.appendChild(select_options);
					select_div.appendChild(select_input);
					
				}else{
					//have data
					for(var op = 0;op < options_.length;op++){
						var obj = eval(options_[op]);
						if(obj){
							var opt_name = obj.name;
							var opt_val = obj.val;
							var opt_disable = obj.disable;
							// make sure data allright
							if(opt_name == undefined || opt_val == undefined){
								console.error('options params error!');
								return;
							}
							
							//have no data
							var select_options_items = document.createElement('div');
							//is disabled
							if(opt_disable){
								select_options_items.className = 'opt_items forbid';
							}else{
								select_options_items.className = 'opt_items';
								select_options_items.setAttribute('data-key',opt_val);
							}
							select_options_items.innerHTML = opt_name;
							
							//install option dom
							select_options.appendChild(select_options_items);
							
							if(value_ && value_== opt_val){
								select_inner_input.setAttribute('value',opt_name);
								select_inner_input_val.value = opt_val;
							}
						}else{
							console.error('options params error!');
							return;
						}
					}
					
				}
				
				//install input dom
				select_input.appendChild(select_inner_input);
				select_input.appendChild(select_inner_input_val);
				select_input.appendChild(select_i);
				
				//install select dom
				select_div.appendChild(select_label);
				select_input.appendChild(select_options);
				select_div.appendChild(select_input);
			}else{
				console.error('options is undefined!');
				return;
			}
			
			//output dom element
			selectItem.outerHTML = select_div.outerHTML;
			
			//binding click
			var option_list_all = document.getElementsByClassName('select_options')[i];
			var option_list = option_list_all.getElementsByClassName('opt_items')
			if(option_list && option_list.length > 0){
				for(var ol = 0;ol < option_list.length;ol++){
					var obj_ol = option_list[ol];
					var classname = obj_ol.className;
					if(classname.indexOf('forbid') < 0){
						obj_ol.onclick = function(){
							var father_obj = this.parentNode.parentNode;
							var key_obj = this.getAttribute('data-key')
							father_obj.getElementsByTagName("input")[0].setAttribute('value',this.innerHTML);
							father_obj.getElementsByTagName("input")[1].setAttribute('value',key_obj);
						}
					}
				}
			}
		}
	}
	//binding option show
	var show_list = document.getElementsByClassName("select_input");
	if(show_list!=undefined && show_list.length > 0){
		for(var sl = 0;sl < show_list.length;sl++){
			var obj_sl = show_list[sl];
			obj_sl.onclick = function(){
				var classname_sl = this.className;
				if(classname_sl.indexOf('is_open') < 0){
					this.className = this.className+" is_open";
					var obj_sl_items = this.getElementsByClassName("select_options")[0];
					var items_length = obj_sl_items.getElementsByClassName('opt_items').length;
					var items_height = obj_sl_items.getElementsByClassName('opt_items')[0].offsetHeight;
					var height_total = items_length * items_height;
					animate(obj_sl_items,{height:height_total},1,0.05,function(){});
				}else{
					this.className = "select_input";
					var obj_sl_items = this.getElementsByClassName("select_options")[0];
					animate(obj_sl_items,{height:0},1,0.05,function(){});
				}
			}
			
		}
	}
}