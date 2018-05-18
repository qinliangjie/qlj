var pagings=document.getElementsByTagName("jy:page");
	var pagingnumber=pagings.length;
	var pagingTotal=5;
	var allTotal=0;
	var sizeOptionsS=[10,20,30];
	var pageNum=1;
	var pageSize=10;
	var pagetotalNames=[];
	var pageIds=[];
	var pageNames=[];
	var pageClasss=[];
	var pageShowTotals=[];
	var pageShowPagess=[];

		function JYpagings(){		//初始化数据
			var pagingTotalClass=typeof NewpagingTotal;
			if(pagingTotalClass=="undefined"){
			}else{
				pagingTotal=NewpagingTotal;
			}
			var sizeOptionsClass=typeof NewsizeOptions;
			if(sizeOptionsClass=="undefined"){
			}else{
				sizeOptionsS=NewsizeOptions;
			}
			this.pagetotalName=[];
			this.pageId=[];
			this.pageName=[];
			this.pageClass=[];
			this.pageShowTotal=[];
			this.pageShowPages=[];
			for(var i=0;i<pagingnumber;i++){
				var Lpagetotal=Math.ceil(pageOptions[i].total/pageSize);
				Lpagetotal=Number(Lpagetotal);
				this.pagetotalName.push(Lpagetotal);
				pagetotalNames=this.pagetotalName;
				var LpageId=pagings[i].getAttribute('id');
				this.pageId.push(LpageId);
				pageIds=this.pageId;
				var LpageName=pagings[i].getAttribute('name');
				this.pageName.push(LpageName);
				pageNames=this.pageName;
				var LpageClass=pagings[i].getAttribute('class');
				this.pageClass.push(LpageClass);
				pageClasss=this.pageClass;
				var LpageShowTotal=pagings[i].getAttribute('show-total');
				this.pageShowTotal.push(LpageShowTotal);
				pageShowTotals=this.pageShowTotal;
				var LpageShowPages=pagings[i].getAttribute('show-pages');
				this.pageShowPages.push(LpageShowPages);
				pageShowPagess=this.pageShowPages;
			}
			this.compute();
		}
		JYpagings.prototype={
			compute:function(){
			for(var i=0;i<pagingnumber;i++){
				var a=[];
				var b=[];
				if(this.pagetotalName[i]>=pagingTotal){
					if(this.pagetotalName[i]==pagingTotal){
						for(var ll=0;ll<this.pagetotalName[i];ll++){
							var jj=ll+1;
							var conment=document.createElement('li');
							if(ll==0){
								conment.setAttribute("class","number now");
							}else{
								conment.setAttribute("class","number");
							}
							conment.setAttribute("onclick","pagerButton("+'this'+")");
							conment.innerHTML=jj;
							a.push(conment.outerHTML);
						}
					}else{
						for(var lll=0;lll<pagingTotal;lll++){
							var jjj=lll+1;
							var conment=document.createElement('li');
							if(lll==0){
								conment.setAttribute("class","number now");
							}else{
								conment.setAttribute("class","number");
							}
							conment.setAttribute("onclick","pagerButton("+'this'+","+"'more')");
							conment.innerHTML=jjj;
							a.push(conment.outerHTML);
						}
						var conmentS=document.createElement('li');
						conmentS.setAttribute("class","totalNumber");
						conmentS.innerHTML="...";
						conmentS.setAttribute("data-total",this.pagetotalName[i]);
						a.push(conmentS.outerHTML);
					}
				}else{
					for(var l=0;l<this.pagetotalName[i];l++){
						var j=l+1;
						var conment=document.createElement('li');
						if(l==0){
							conment.setAttribute("class","number now");
						}else{
							conment.setAttribute("class","number");
						}
						conment.setAttribute("onclick","pagerButton("+'this'+")");
						conment.innerHTML=j;
						a.push(conment.outerHTML);
					}
				}	
				

				var JYpagingSelect = document.createElement('div');
				JYpagingSelect.setAttribute("onclick","pagerlistOut("+'this'+")");
				JYpagingSelect.setAttribute("class","jy-paging-select");
				var JYpagingSelectInput = document.createElement('input');
				JYpagingSelectInput.setAttribute("class","jy-paging-select__inner");
				JYpagingSelectInput.setAttribute("autocomplete","off");
				JYpagingSelectInput.setAttribute("readonly","readonly");
				JYpagingSelectInput.setAttribute("type","text");
				JYpagingSelectInput.setAttribute("rows","2");
				JYpagingSelectInput.setAttribute("value",pageSize+"条/页");
				var JYpagingSelectI = document.createElement('i');
				JYpagingSelectI.setAttribute("class","ion-arrow-down-b jy-input__icon");
				var JYpagingSelectUL = document.createElement('div');
				JYpagingSelectUL.setAttribute("class","jy-paging-select__ul");
				JYpagingSelectUL.setAttribute("style","display:none");
				var JYpagingSelectULs = document.createElement('ul');
				JYpagingSelect.appendChild(JYpagingSelectI);
				JYpagingSelect.appendChild(JYpagingSelectInput);
				JYpagingSelect.appendChild(JYpagingSelectUL);
				JYpagingSelectUL.appendChild(JYpagingSelectULs);
				for(var x=0;x<sizeOptionsS.length;x++){
					var JYpagingSelectLI = document.createElement('li');
					JYpagingSelectLI.setAttribute("class","jy-paging-li__item");
					JYpagingSelectLI.setAttribute("val",sizeOptionsS[x]);
					JYpagingSelectLI.setAttribute("onclick","pagerlist("+'this'+")");
					JYpagingSelectLI.innerHTML=sizeOptionsS[x]+"条/页";
					b.push(JYpagingSelectLI.outerHTML);
				}
				JYpagingSelectULs.innerHTML=b.join('');


				var JYpagingConment = document.createElement('div');
				if(this.pageId[i]){
					JYpagingConment.setAttribute("id",this.pageId[i]);
				}
				if(this.pageName[i]){
					JYpagingConment.setAttribute("name",this.pageName[i]);
				}

				if(this.pageClass[i]==null){
					JYpagingConment.setAttribute("class","jy-paging");
				}else{
					JYpagingConment.setAttribute("class","jy-paging "+this.pageClass[i]);
				}
				
				var JYpagingbuttonl = document.createElement('button');
				JYpagingbuttonl.setAttribute("type","button");
				JYpagingbuttonl.setAttribute("class","btn-prev disabled");
				JYpagingbuttonl.setAttribute("onclick","pagePre("+'this'+")");
				var JYpagingil = document.createElement('i');
				JYpagingil.setAttribute("class","ion-chevron-left");
				JYpagingbuttonl.appendChild(JYpagingil);
				var JYpagingbuttonr = document.createElement('button');
				JYpagingbuttonr.setAttribute("type","button");
				JYpagingbuttonr.setAttribute("class","btn-next");
				JYpagingbuttonr.setAttribute("onclick","pageNext("+'this'+")");
				var JYpagingir = document.createElement('i');
				JYpagingir.setAttribute("class","ion-chevron-right");
				JYpagingbuttonr.appendChild(JYpagingir);
				var JYpagingul = document.createElement('ul');
				JYpagingul.setAttribute("class","jy-pager");
				JYpagingul.innerHTML=a.join('');
				var JYpagingJump = document.createElement('span');
				JYpagingJump.setAttribute("class","jy-pager-span")
				var JYpagingJumpInput = document.createElement('input');
				JYpagingJumpInput.setAttribute("type","number");
				JYpagingJumpInput.setAttribute("class","jy-pager-jump");
				JYpagingJumpInput.setAttribute("number","true");
				JYpagingJumpInput.setAttribute("min","1");
				JYpagingJumpInput.setAttribute("max",Math.ceil(pageOptions[i].total/pageSize));
				JYpagingJumpInput.setAttribute("onblur","jumpPage("+'this'+")");
				JYpagingJump.innerHTML = "前往"+JYpagingJumpInput.outerHTML+"页";

				if(this.pageShowTotal[i]=="true"){
					var JYpageShowTotal = document.createElement('span');
					JYpageShowTotal.setAttribute("class","jy-paging-span");
					JYpageShowTotal.innerHTML="共"+pageOptions[i].total+"条";
					JYpagingConment.appendChild(JYpageShowTotal);
				}
				JYpagingConment.appendChild(JYpagingSelect);
				JYpagingConment.appendChild(JYpagingbuttonl);
				JYpagingConment.appendChild(JYpagingul);
				JYpagingConment.appendChild(JYpagingbuttonr);
				JYpagingConment.appendChild(JYpagingJump);
				if(this.pageShowPages[i]=="true"){
					var JYpageShowPages = document.createElement('span');
					JYpageShowPages.setAttribute("class","jy-paging-span1");
					JYpageShowPages.innerHTML="共"+Math.ceil(pageOptions[i].total/pageSize)+"页";
					JYpagingConment.appendChild(JYpageShowPages);
				}
				if(pagings[0]){
					pagings[0].outerHTML = JYpagingConment.outerHTML;
				}else{
					document.getElementsByClassName("jy-paging")[i].outerHTML=JYpagingConment.outerHTML;
					//JYpagingConment.innerHTML=JYpagingConment.outerHTML;
				}

			}
		}
	}
		function pagerButton(obj,val){			//计算分页按钮的方法
			if(obj.parentNode.getElementsByClassName("totalNumber")[0]){
				allTotal=parseInt(obj.parentNode.getElementsByClassName("totalNumber")[0].getAttribute('data-total'));
			}
			var cls="now";
			if(val=="more"){
				var nowNumber=parseInt(obj.innerHTML);
				if(nowNumber==1){
					obj.parentNode.parentNode.getElementsByClassName("btn-prev")[0].className="btn-prev disabled";
				}else{
					obj.parentNode.parentNode.getElementsByClassName("btn-prev")[0].className="btn-prev";
				}
				var total=parseInt(obj.parentNode.getElementsByClassName("totalNumber")[0].getAttribute('data-total'));
				if(total-nowNumber<pagingTotal-3){
					var j = total-pagingTotal+1;
					for(var l=0;l<pagingTotal;l++){
						obj.parentNode.getElementsByClassName("number")[l].innerHTML=j;
						obj.parentNode.getElementsByClassName("number")[l].setAttribute("onclick","pagerButton("+'this'+")");	
						j++;					
					}
					obj.parentNode.getElementsByClassName("totalNumber")[0].remove();
				}else{
					if(obj.innerHTML>Math.floor(pagingTotal/2)){
						var num = total-nowNumber;
						var nowNumberV = Math.floor(pagingTotal/2);
						var z = nowNumber-nowNumberV;
						for(var p=0;p<pagingTotal;p++){
							obj.parentNode.getElementsByClassName("number")[p].innerHTML=z;
							z++;
						}
					}else{
						for(var n=0;n<pagingTotal;n++){
							obj.parentNode.getElementsByClassName("number")[n].innerHTML=n+1;
						}
					}
				}
			}else{
				var cls="now";
				var nowNumber=parseInt(obj.innerHTML);
				var objNumber=nowNumber;
				if(parseInt(allTotal)-objNumber==pagingTotal-1){
					var SnumS=0;
					if(parseInt(obj.innerHTML)>=pagingTotal){
						for(var Snum=parseInt(objNumber)-pagingTotal+2;SnumS<pagingTotal;Snum++){
							obj.parentNode.getElementsByClassName("number")[SnumS].innerHTML=Snum;
							obj.parentNode.getElementsByClassName("number")[SnumS].setAttribute("onclick","pagerButton("+'this'+","+"'more')");
							SnumS++;
						}
					 }else{
					 	for(var Snum=1;SnumS<pagingTotal;Snum++){
					 		obj.parentNode.getElementsByClassName("number")[SnumS].innerHTML=Snum;
					 		obj.parentNode.getElementsByClassName("number")[SnumS].setAttribute("onclick","pagerButton("+'this'+","+"'more')");
					 		SnumS++;
					 	}
					 }
					var conmentS=document.createElement('li');
					conmentS.setAttribute("class","totalNumber");
					conmentS.innerHTML="...";
					conmentS.setAttribute("data-total",allTotal);
					obj.parentNode.append(conmentS);
					var objNumberS=obj.parentNode.getElementsByClassName("number")[Math.floor(pagingTotal/2)-1];
					obj.parentNode.getElementsByClassName("number")[pagingTotal-1].setAttribute("class","number");
				}
				if(nowNumber==1){
					obj.parentNode.parentNode.getElementsByClassName("btn-prev")[0].className="btn-prev disabled";
				}else{
					obj.parentNode.parentNode.getElementsByClassName("btn-prev")[0].className="btn-prev";
				}
			}
			if(obj.parentNode.lastChild.innerHTML=="..."||obj.parentNode.lastChild.innerHTML>=pagingTotal){
				var pagingTotalS=pagingTotal
				if(nowNumber==obj.parentNode.lastChild.innerHTML){
					obj.parentNode.parentNode.getElementsByClassName("btn-next")[0].className="btn-next disabled";
				}else{
					obj.parentNode.parentNode.getElementsByClassName("btn-next")[0].className="btn-next";
				}
			}else{
				var pagingTotalS=obj.parentNode.lastChild.innerHTML;
				if(nowNumber==obj.parentNode.lastChild.innerHTML){
					obj.parentNode.parentNode.getElementsByClassName("btn-next")[0].className="btn-next disabled";
				}else{
					obj.parentNode.parentNode.getElementsByClassName("btn-next")[0].className="btn-next";
				}
			}
			for(var s=0;s<pagingTotalS;s++){
				if(nowNumber<=1){
					nowNumber=1;
				}
				if(obj.parentNode.getElementsByClassName("number")[s].innerHTML==nowNumber){
					var objNumber=obj.parentNode.getElementsByClassName("number")[s];
				}
			}
			if(obj.parentNode.getElementsByClassName("now")[0]==undefined){
			}else{
				obj.parentNode.getElementsByClassName("now")[0].className="number";
			}
			addClass(objNumber,cls);
			pagerOut(obj,nowNumber);
		}
		function hasClass(obj, cls) {  
			return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));  
		}  
		function addClass(obj, cls) {  		//添加class的方法
			if (!this.hasClass(obj, cls)) obj.className += " " + cls;  
		}  
		function pagePre(obj){			//上一页的方法
			if(obj.className=="btn-prev disabled"){
				alert("已经到第一页");
				return false;
			}
			var cls="now";
			var judge=obj.parentNode.getElementsByClassName("jy-pager")[0].getElementsByClassName("now")[0];

			if(parseInt(allTotal)-parseInt(obj.parentNode.getElementsByClassName("jy-pager")[0].getElementsByClassName("now")[0].innerHTML)+1==pagingTotal){
				var SnumS=0;
				for(var Snum=parseInt(obj.parentNode.getElementsByClassName("jy-pager")[0].getElementsByClassName("now")[0].innerHTML)-pagingTotal+1;SnumS<pagingTotal;Snum++){
					obj.parentNode.getElementsByClassName("jy-pager")[0].getElementsByClassName("number")[SnumS].innerHTML=Snum;
					obj.parentNode.getElementsByClassName("jy-pager")[0].getElementsByClassName("number")[SnumS].setAttribute("onclick","pagerButton("+'this'+","+"'more')");
					SnumS++;
				}
				if(obj.parentNode.getElementsByClassName("jy-pager")[0].getElementsByClassName("totalNumber")[0]==undefined){
					var conmentS=document.createElement('li');
					conmentS.setAttribute("class","totalNumber");
					conmentS.innerHTML="...";
					conmentS.setAttribute("data-total",allTotal);
					obj.parentNode.getElementsByClassName("jy-pager")[0].append(conmentS);
				}
				var objNumberS=obj.parentNode.getElementsByClassName("jy-pager")[0].getElementsByClassName("number")[pagingTotal-2];
				addClass(objNumberS,cls);
			}

			if(judge==undefined){
				var objNumber=obj.parentNode.getElementsByClassName("number")[0];
			}else{
				var nowNumber=parseInt(judge.innerHTML);
				var objNumber=obj.parentNode.getElementsByClassName("number")[nowNumber];
			}
			if(obj.parentNode.getElementsByClassName("now")[0]==undefined){
				obj.parentNode.getElementsByClassName("number")[0].onclick();
			}else{
				obj.parentNode.getElementsByClassName("now")[0].className="number";
				var objNumber=parseInt(judge.innerHTML)-1;
				if(obj.parentNode.getElementsByClassName("jy-pager")[0].lastChild.innerHTML=="..."||obj.parentNode.getElementsByClassName("jy-pager")[0].lastChild.innerHTML>=pagingTotal){
					var pagingTotalS = pagingTotal;
				}else{
					var pagingTotalS = obj.parentNode.getElementsByClassName("jy-pager")[0].lastChild.innerHTML;
				}
				for(var s=0;s<pagingTotalS;s++){
					if(obj.parentNode.getElementsByClassName("number")[s].innerHTML==objNumber){
						obj.parentNode.getElementsByClassName("number")[s].onclick();
					}
				}
			}
		}
		function pageNext(obj){		//下一页的方法
			if(obj.className=="btn-next disabled"){
				alert("已经到最后一页");
				return false;
			}
			var cls="now";
			var judge=obj.parentNode.getElementsByClassName("jy-pager")[0].getElementsByClassName("now")[0];
			if(judge==undefined){
				var objNumber=obj.parentNode.getElementsByClassName("number")[0];
			}else{
				var nowNumber=parseInt(judge.innerHTML);
				var objNumber=obj.parentNode.getElementsByClassName("number")[nowNumber];
			}
			if(obj.parentNode.getElementsByClassName("now")[0]==undefined){
				obj.parentNode.getElementsByClassName("number")[0].onclick();
			}else{
				obj.parentNode.getElementsByClassName("now")[0].className="number";
				var objNumber=parseInt(judge.innerHTML)+1;
				if(obj.parentNode.getElementsByClassName("jy-pager")[0].lastChild.innerHTML=="..."||obj.parentNode.getElementsByClassName("jy-pager")[0].lastChild.innerHTML>=pagingTotal){
					var pagingTotalS = pagingTotal;
				}else{
					var pagingTotalS = obj.parentNode.getElementsByClassName("jy-pager")[0].lastChild.innerHTML;
				}
				for(var s=0;s<pagingTotalS;s++){
					if(obj.parentNode.getElementsByClassName("number")[s].innerHTML==objNumber){
						obj.parentNode.getElementsByClassName("number")[s].onclick();
					}
				}
			}
		}
		function jumpPage(obj){				//跳转的方法
			var cls="now";
			if(obj.getAttribute('max')>=pagingTotal){
				if(obj.getAttribute('max')==pagingTotal){
					obj.parentNode.parentNode.getElementsByClassName("jy-pager")[0].getElementsByClassName("number")[parseInt(obj.value)-1].onclick();
				}else{
					if(obj.value>=pagingTotal){
						var j=parseInt(obj.value)-Math.floor(pagingTotal/2);
						for(var i=0;i<pagingTotal;i++){
							obj.parentNode.parentNode.getElementsByClassName("jy-pager")[0].getElementsByClassName("number")[i].innerHTML=j;
							j++;
						}
						if(obj.value>parseInt(obj.getAttribute('max'))-Math.floor(pagingTotal/2)){
						}else{
							for(var i=0;i<pagingTotal;i++){
								obj.parentNode.parentNode.getElementsByClassName("jy-pager")[0].getElementsByClassName("number")[i].setAttribute("onclick","pagerButton("+'this'+","+"'more')");
							}	
							var conmentS=document.createElement('li');
							conmentS.setAttribute("class","totalNumber");
							conmentS.innerHTML="...";
							conmentS.setAttribute("data-total",allTotal);
							obj.parentNode.parentNode.getElementsByClassName("jy-pager")[0].append(conmentS);
							if(obj.parentNode.parentNode.getElementsByClassName("jy-pager")[0].getElementsByClassName("totalNumber").length>1){
								obj.parentNode.parentNode.getElementsByClassName("jy-pager")[0].getElementsByClassName("totalNumber")[1].remove();
							}
						}
						for(var s=0;s<pagingTotal;s++){
							if(obj.parentNode.parentNode.getElementsByClassName("jy-pager")[0].getElementsByClassName("number")[s].innerHTML==obj.value){
								var objNumber=obj.parentNode.parentNode.getElementsByClassName("jy-pager")[0].getElementsByClassName("number")[s];
							}
						}
						obj.parentNode.parentNode.getElementsByClassName("jy-pager")[0].getElementsByClassName("number")[pagingTotal-Math.ceil(pagingTotal/2)].onclick();
						if(obj.value>parseInt(obj.getAttribute('max'))-Math.floor(pagingTotal/2)+1){
							var q=obj.getAttribute('max')-pagingTotal+1;
							for(var i=0;i<pagingTotal;i++){
								obj.parentNode.parentNode.getElementsByClassName("jy-pager")[0].getElementsByClassName("number")[i].innerHTML=q;
								q++;
							}
							var numQ=parseInt(obj.getAttribute('max')-obj.value)+1;
							obj.parentNode.parentNode.getElementsByClassName("jy-pager")[0].getElementsByClassName("number")[pagingTotal-numQ].onclick();
						}
					}else{
						if(obj.value){
							obj.parentNode.parentNode.getElementsByClassName("jy-pager")[0].getElementsByClassName("number")[parseInt(obj.value)-1].onclick();
						}
					}
				}
			}else{
				obj.parentNode.parentNode.getElementsByClassName("jy-pager")[0].getElementsByClassName("number")[parseInt(obj.value)-1].onclick();
			}
		}
		function pagerlistOut(obj){
			var objs = obj.getElementsByClassName("jy-paging-select__ul")[0];
			var displayS = objs.style.display;
			if(displayS == 'none'){
				objs.style.display="block";
				if(event.clientY-document.documentElement.clientHeight/2>0){
					obj.getElementsByClassName("jy-paging-select__ul")[0].style.cssText="top:30px";
				}else{
					obj.getElementsByClassName("jy-paging-select__ul")[0].style.cssText="bottom:30px";
				}
			}else{
				objs.style.display="none";
			}
		}
		function pagerlist(obj){
			var conment=obj.getAttribute('val')+"条/页";
			var newPageSize=parseInt(obj.getAttribute('val'));
			obj.parentNode.parentNode.parentNode.getElementsByClassName("jy-paging-select__inner")[0].value=conment;
			pageSizeOut(obj.getAttribute('val'));
			var forClassName=obj.parentNode.parentNode.parentNode.parentNode.getAttribute("class").slice(0,9);
			var tureClass=obj.parentNode.parentNode.parentNode.parentNode;
			var num=forPagerlist(forClassName,tureClass);
			var nowNumber=Math.ceil(pageOptions[num].total/newPageSize);
			if(obj.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("jy-pager")[0].getElementsByClassName("totalNumber")[0]){
				var numberLength=obj.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("jy-pager")[0].getElementsByClassName("number");
				if(nowNumber>pagingTotal){
					obj.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("jy-pager")[0].getElementsByClassName("totalNumber")[0].setAttribute("data-total",nowNumber)
					obj.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("jy-paging-span1")[0].innerHTML="共"+nowNumber+"页";
					for(var i=0;i<numberLength.length;i++){
						numberLength[i].innerHTML=i+1;
						numberLength[i].className="number";
					}
				}else{
					obj.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("jy-pager")[0].innerHTML="";
					var aa=[];
					for(var ll=0;ll<nowNumber;ll++){
						var jj=ll+1;
						var conment=document.createElement('li');
						conment.setAttribute("class","number");
						conment.setAttribute("onclick","pagerButton("+'this'+")");
						conment.innerHTML=jj;
						aa.push(conment.outerHTML);
					}
					obj.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("jy-pager")[0].innerHTML=aa.join('');
				}
					numberLength[0].className+=" now";
					obj.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("btn-prev")[0].className="btn-prev disabled";
					obj.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("btn-next")[0].className="btn-next";
			}else{
				var numberLength=obj.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("jy-pager")[0].getElementsByClassName("number");
				obj.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("jy-pager")[0].innerHTML="";
				var aa=[];
					if(nowNumber>pagingTotal){
						for(var ll=0;ll<pagingTotal;ll++){
							var jj=ll+1;
							var conment=document.createElement('li');
							conment.setAttribute("class","number");
							conment.setAttribute("onclick","pagerButton("+'this'+","+"'more')");
							conment.innerHTML=jj;
							aa.push(conment.outerHTML);
						}
						var conmentS=document.createElement('li');
						conmentS.setAttribute("class","totalNumber");
						conmentS.innerHTML="...";
						conmentS.setAttribute("data-total",nowNumber);
						aa.push(conmentS.outerHTML);
					}else{
						for(var ll=0;ll<nowNumber;ll++){
							var jj=ll+1;
							var conment=document.createElement('li');
							conment.setAttribute("class","number");
							conment.setAttribute("onclick","pagerButton("+'this'+")");
							conment.innerHTML=jj;
							aa.push(conment.outerHTML);
						}
					}
					obj.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("jy-pager")[0].innerHTML=aa.join('');
				numberLength[0].className+=" now";
				obj.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("jy-paging-span1")[0].innerHTML="共"+nowNumber+"页";
				obj.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("btn-prev")[0].className="btn-prev disabled";
				obj.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("btn-next")[0].className="btn-next";
			}
		}
		function forPagerlist(name,tureClass){
			var length=document.getElementsByClassName(name);
			for(var i=0;i<length.length;i++){
				if(length[i]==tureClass){
					return i
				}
			}
		}
		function pagerOut(obj,num){
			pageNum=num;
			if(typeof(output)=="function"){
				output(pageNum,pageSize);
			}else{
				console.error("未创建output函数");
			}
		}
		function pageSizeOut(num){
			pageSize=num;
			if(typeof(output)=="function"){
				output(pageNum,pageSize);
			}else{
				console.error("未创建output函数");
			}
		}