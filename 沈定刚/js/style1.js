// JavaScript Document
window.onload=function(){
	var oNav=document.getElementById("nav");
	var aLi=oNav.getElementsByTagName("li");
	var oPopup=document.getElementById("popup");
	var aSection=oPopup.getElementsByClassName("section");
	var leave_menu;
	
		function del_li_ac(){
		for(var i=0;i<aLi.length; i++){
			aLi[i].className="";
			}
		}
		
	for(var i=0; i<aLi.length; i++){
		aLi[i].index=i;//发牌照
		
		aLi[i].onmouseover=function(){
			clearTimeout(leave_menu);
			oPopup.style.display="block";
			del_li_ac();//删除所有li上的ac  
			aLi[this.index].className="ac";//自己增加ac
			
			
			//显示相对应的内容(就是选项卡的原理)
			for(var i=0; i<aSection.length; i++){
				aSection[i].style.display="none";
			}
			aSection[this.index].style.display="block";
		};
		
		aLi[i].onmouseout=function(){
			clearTimeout(leave_menu);
			leave_menu=setTimeout(function(){
				oPupop.style.display="none";
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
}