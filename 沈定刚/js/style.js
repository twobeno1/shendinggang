// JavaScript Document

window.onload=function(){
	var oDiv=document.getElementById("slide");
	var aImg=oDiv.getElementsByTagName("img");
	var aUl=oDiv.getElementsByTagName("ul")[0];
	var aOl=oDiv.getElementsByTagName("ol")[0];
	var html="";
	var num=0;

	
	for(var i=0;i<aImg.length;i++){
	html+='<li>'+(i+1)+'</li>'
	};
aOl.innerHTML=html;
var aBtn=aOl.getElementsByTagName("li");
var aLi=aUl.getElementsByTagName("li");
aBtn[0].className="ac";
//按钮和图片可以自动切换;  按钮和图片同步显示;
function show_img(n){
		for(var i=0;i<aBtn.length;i++){
			aBtn[i].className="";
			aLi[i].style.display="none";
		}
		aBtn[n].className="ac";
		aLi[n].style.display="block";	
	};
function run(){
	timer=setInterval(function(){
		show_img(num);
		num++;
		if(num==aLi.length){
			num=0;
			}
		},1000)
	}
//点击某按钮后，鼠标离开焦点图时，自动切换能顺延切换;
	for(var i=0;i<aBtn.length;i++){
		aBtn[i].index=i;
		aBtn[i].onclick=function(){
			clearInterval(timer);
			show_img(this.index);	
		}
	}
	//鼠标移入移出，移入停止切换，移出开始切换;
	oDiv.onmouseover=function(){
		clearInterval(timer);
		}
		
	oDiv.onmouseout=function(){
		clearInterval(timer);
		run();
		}
	run();
	
		
	
	
	
	
	
	var oNav=document.getElementById("nav");
	var oLi=oNav.getElementsByTagName("li");
	var oPopup=document.getElementById("popup");
	var aSection=oPopup.getElementsByClassName("section");
	var leave_menu;
	
		function del_li_ac(){
		for(var i=0;i<aLi.length; i++){
			oLi[i].className="";
			}
		}
		
	for(var i=0; i<aLi.length; i++){
		oLi[i].index=i;//发牌照
		
		oLi[i].onmouseover=function(){
			clearTimeout(leave_menu);
			oPopup.style.display="block";
			del_li_ac();//删除所有li上的ac  
			oLi[this.index].className="ac";//自己增加ac
			
			
			//显示相对应的内容(就是选项卡的原理)
			for(var i=0; i<aSection.length; i++){
				aSection[i].style.display="none";
			}
			aSection[this.index].style.display="block";
		};
		
		oLi[i].onmouseout=function(){
			clearTimeout(leave_menu);
			leave_menu=setTimeout(function(){
				oPopup.style.display="none";
				del_li_ac();//删除所有li上的ac  
			},100)
		};
	}
	
	oPopup.onmouseenter=function(){
		clearTimeout(leave_menu);
		this.style.display="block";
	};
	
	
	oPopup.onmouseleave=function(){
			del_li_ac();//删除所有li上的ac  
			this.style.display="none";
	};
	
	var page=document.getElementById("page2");
	var vUl=page.getElementsByTagName("ul")[0];
	var vLi=vUl.getElementsByTagName("li");
	var oCont=page.getElementsByClassName("cont")[0];
	var vDiv=oCont.getElementsByClassName("content");
	var timer;

	// 1 循环给所有的li做点击事件	
	for(var i=0;i<vLi.length;i++){
		vLi[i].index=i;
		vLi[i].onmouseover=function(){
			// 关掉所有的li，打开当前li
			setTab(this.index);

		}
	}
	
	// 2 定义函数--显示指定li，隐藏其它li
	function setTab(n){
		// 首先隐藏所有的li;
		for(var i=0;i<vDiv.length;i++){
			vDiv[i].style.display="none"
		}
		
		// 打开指定的li

		vDiv[n].style.display="block"
	}

	
	
	}
		