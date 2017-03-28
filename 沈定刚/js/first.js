// JavaScript Document
window.onload=function(){
	var oBox1=document.getElementById("box1");
	var oBox2=document.getElementById("box2");
	var oSpan=oBox1.getElementsByTagName("span")[0];
	var bigImg=oBox2.getElementsByTagName("img")[0];
	var oUl=document.getElementById("list");
	var aLi=oUl.getElementsByTagName("li");	
	var oPlus=document.getElementsByClassName("plus")[0];
	var oMinus=document.getElementsByClassName("minus")[0];
	var oNumber=document.getElementById("number");
	var num=1
	var cont=document.getElementById("cont");
	var oNav=cont.getElementsByClassName("nav")[0];
	var oLi=oNav.getElementsByTagName("li");
	var oProduct=cont.getElementsByClassName("product")[0];
	var aDiv=oProduct.getElementsByClassName("pic");

	
	oBox1.onmousemove=function(ev){
		ev=ev||event;
		oSpan.style.display="block";
		oBox2.style.display="block";
		
		var sw=oSpan.offsetWidth;
		var sh=oSpan.offsetHeight;
		
		var bw=oBox1.offsetWidth;
		var bh=oBox1.offsetHeight;
	
		var maxX=bw-sw;
		var maxY=bh-sh;
		
		var x=ev.clientX-this.offsetLeft-sw/2;
		var y=ev.clientY-this.offsetTop-sh/2;
	
		if(x<0){x=0;}
		if(y<0){y=0;}
		if(x>maxX){x=maxX;}
		if(y>maxY){y=maxY;} 
		
		oSpan.style.left=x+"px";
		oSpan.style.top=y+"px";
	
		var rateX=x/maxX;
		var rateY=y/maxY;
		
		
		bigImg.style.left=-(bigImg.offsetWidth-oBox2.offsetWidth)*rateX+"px";
		bigImg.style.top=-(bigImg.offsetHeight-oBox2.offsetHeight)*rateY+"px";
	
	}
	oBox1.onmouseout=function(){
		oSpan.style.display="none";
		oBox2.style.display="none";
		}
	function show_ac(n){
		for(var i=0;i<aLi.length;i++){
			aLi[i].className="";
			}
		aLi[n].className="ac";
		}
	for(var i=0;i<aLi.length;i++){
		aLi[i].index=i;
		aLi[i].onmouseover=function(){
			show_ac(this.index)
			}
	}
	
	oPlus.onclick=function(){
		oNumber.innerHTML=num;
		num++;
		}
	oMinus.onclick=function(){
		oNumber.innerHTML=num;
		num--;
		if(num<=1){num=1;}
		}
	
	// 1 循环给所有的li做点击事件	
	for(var i=0;i<aLi.length;i++){
		oLi[i].index=i;
		oLi[i].onmouseover=function(){
			// 关掉所有的li，打开当前li
			setTab(this.index);
		}
	}
	
	// 2 定义函数--显示指定li，隐藏其它li
	function setTab(n){
		// 首先隐藏所有的li;
		for(var i=0;i<aDiv.length;i++){
			aDiv[i].style.display="none"
			
		}
		
		// 打开指定的li
		
		aDiv[n].style.display="block"
	}

}