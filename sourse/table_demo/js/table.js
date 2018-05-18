
var JRYtable = function (){

}
JRYtable.prototype.defaultOptions = {
	//table容器
	container:'',
	//是否支持批量操作
	batchable:false,
	rawData: [],
	// 表格每一列的信息
    cols: [],
    // 对表格每一行的操作
    operations: [],
	//数据
	data:[]
}

JRYtable.prototype.init = function(options){
	var self = this;
	self.checkArr = [];
	extend(self.defaultOptions,options);
	// self.initData(function(){
	// 	self.initTable()
	// });
	self.initTable();
}
//只操作data数据
/*JRYtable.prototype.initData = function(cb){
	var self = this;
	var selfoptions = self.defaultOptions;
	var tableData = selfoptions.data;
	for(var i=0;i<tableData.length;i++){
			for(var x= 0;x<selfoptions.cols.length;x++){
				//对应数值
				for(var j in tableData[i]){
					if(j==selfoptions.cols[x].name){
						if(!!selfoptions.cols[x].display)
							tableData[i][j]=selfoptions.cols[x].display(tableData[i][j],tableData[i]);
					}
				}
			}
	}
	cb();
}*/	

JRYtable.prototype.initTable = function(){
	var self = this;
	var checkArr = self.checkArr;
	var selfoptions = self.defaultOptions;
	var tableData = selfoptions.data;
	var containerData = selfoptions.container;
	var table_ = document.createElement("table");
	    table_.className = "table dataTable table-bordered";
    var tbody_ = document.createElement("tbody");
	var th_ = document.createElement("thead");
	    thr_ = document.createElement("tr");
	var tr_,td_,th_,thr_,thd_;
	var checkIn = 'icon iconfont icon-icon-test33 table-icon-nomal';
	var checkOut = 'icon iconfont icon-icon-test34 table-icon-nomal';

	if(selfoptions.cols == null || selfoptions.cols == [])
	return false;
	for(var i=0;i<tableData.length;i++){
			tr_ = document.createElement("tr");
			//批量操作
			if(selfoptions.batchable ==true){
				if(i==0){
					var thc_ = document.createElement("td");
					var thi_ = document.createElement('i');
					thi_.ches = false;
					thi_.className = checkOut;
					thc_.appendChild(thi_);
					thr_.appendChild(thc_);
				}
				tdc_ = document.createElement("td");
				var s = document.createElement('i');
				s.ches = false;//单个选中
				s.ids = i;
				s.className = checkOut;
				//绑定单选事件
				s.addEventListener('click',function(event){
					this.ches = !this.ches;
					if(this.ches){
						this.className = checkIn;
						for(var d in checkArr){
							if(checkArr[d].className!=checkIn){
								thi_.className = checkOut;
								thi_.ches = false
								break
							}else{
								thi_.className = checkIn;
								thi_.ches = true
							}
						}
					}
					else{
						this.className = checkOut;
						thi_.className = checkOut;
						thi_.ches = false
					}
					var e = event||window.event;
					if(e.stopPropagation){
						e.stopPropagation();
					}else{
						e.cancelBubble = true;
					}
				},false);
				//全选
				thi_.addEventListener('click',function(event){
					this.ches = !this.ches;
					if(this.ches){
						for(var c in checkArr){
							checkArr[c].ches = true;
							checkArr[c].className = checkIn;
						}	
						this.className = checkIn
					}
					else{
						for(var c in checkArr){
							checkArr[c].ches = false;
							checkArr[c].className = checkOut;
						}	
						this.className = checkOut;
					}
					var e = event||window.event;
					if(e.stopPropagation){
						    e.stopPropagation();
					}else{
							e.cancelBubble = true;
					}
				},false);
				checkArr.push(s);
				tdc_.appendChild(s);
				tr_.appendChild(tdc_);
			}
			for(var x= 0;x<selfoptions.cols.length;x++){
				//只做一次th循环
				if(i==0){
					thd_ = document.createElement("td");
					if(!!selfoptions.cols[x].style){
							thd_.className = selfoptions.cols[x].style
					}
					thd_.innerHTML = selfoptions.cols[x].alias;
					thr_.appendChild(thd_);
					th_.appendChild(thr_);
				}
				//对应数值塞入
				for(var j in tableData[i]){
					if(j==selfoptions.cols[x].name){
						td_ = document.createElement("td");
						if(!!selfoptions.cols[x].display){
							td_.innerHTML =  selfoptions.cols[x].display(tableData[i][j],tableData[i]);
						}else{
							td_.innerHTML =  tableData[i][j];
						}
						tr_.appendChild(td_);
					}
				}
			}
			//单独设置操作列
			if(selfoptions.operations !=[]){
				if(i==0){
					var thSetting_ = document.createElement("td");
					thSetting_.innerHTML = '操作';
					thr_.appendChild(thSetting_);
				}
				tds_ = document.createElement("td");
				for(var k=0;k<selfoptions.operations.length;k++){
					var set_ = document.createElement('div');
					set_.className = 'tableSet';
					//防止事件绑定只绑定循环最后设置的data值
					set_.ids = i;set_.idk = k;
					set_.innerHTML = selfoptions.operations[k].name;
					set_.addEventListener('click',function(event){
						selfoptions.operations[this.idk].todo(tableData[this.ids]);
						var e = event||window.event;
						if(e.stopPropagation){
							e.stopPropagation();
						}else{
							e.cancelBubble = true;
						}
					},false);
					tds_.appendChild(set_);
				}
				tr_.appendChild(tds_);
			}
			tbody_.appendChild(tr_);
		}
	table_.appendChild(th_);
	table_.appendChild(tbody_);
	var parent_ = document.getElementById(containerData);
	parent_.appendChild(table_);
}
JRYtable.prototype.getCheck = function (){
	var self = this;
	var tab_check = [];
	for(var a in self.checkArr){
		if(self.checkArr[a].className=='icon iconfont icon-icon-test33 table-icon-nomal')
			tab_check.push(self.checkArr[a].ids);
	} 
	return tab_check;
}

window.jrytable = {
	create:function(options){
		var jrytable = new JRYtable();
		jrytable.init(options);
		return jrytable;
	}
}
