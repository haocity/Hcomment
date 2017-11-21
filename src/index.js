require('./css/style.css');
var MD5 = require('md5');
import {html,html2} from './html.js';

class Hco{
	constructor(ele,webid,id){
			var warp=document.createElement('div');
			this.ele=warp;
			this.cid=webid+'_'+id;
			warp.className='ew-comment';
			warp.innerHTML=html('评论');
			if(typeof ele=="string"){
				ele=document.querySelector(ele);
			}
			ele.appendChild(warp);
		 	this.init(ele)
			
	}
	
	init(ele){
			let _this=this;
			function $c(i){
				return ele.querySelector(i);
			}
			this.$c=$c;
			const ew=new Object;
			this.now='father';
			this.id=this.cid;
			this.api='https://t5.haotown.cn/hcon';
			this.publish=$c('.ew-publish');
			//加载本地储存的信息
			if (localStorage.getItem('ew')) {
		       console.log('加载设置成功');
		       let t=JSON.parse(localStorage.getItem('ew'));
		       $c('.ew-email').value=t.email;
		       $c('.ew-author').value=t.user;
		       $c('.ew-weburl').value=t.weburl;
		  }
			this.changersize();
			//ctrl和enter按下发送评论
			$c('.ew-textarea').addEventListener('keydown',function(event){
				if(event.keyCode == 13 && event.ctrlKey){
					$c('.ew-send-btn').click();
				}
			},false);
			$c('.ew-send-btn').addEventListener('click',() => {
				_this.submitfun();
			},false);
			//返回评论
			$c('.ew-publish-back').addEventListener('click',() => {
				_this.now='father';
				_this.publish.className='ew-publish';
				const earr=document.querySelectorAll('.ew-li-main');
				for (let i = 0; i <earr.length; i++) {
					if(earr[i].style.marginBottom){earr[i].style.marginBottom='4px'}
				}
			},false);
			window.addEventListener('resize',function(){
				_this.changersize()
			})
			_this.update();
			
		
	}
	
		
		changersize(){
			let we=this.ele.querySelector(".ew-info");
			let w1=we.offsetWidth;
			let arr=we.querySelectorAll("input")
			for (var i = 0; i < arr.length; i++) {
				if(w1>800){
					arr[i].style.marginRight="7px";
					arr[i].style.width=(w1-200)/3+'px'
				}else{
					arr[i].style.marginRight=""
					arr[i].style.width=""
				}
			}
		}
		//提示框
		alert(s){
				var e=document.createElement('div');
				e.className='ew-alert';
				e.innerText=s;
				document.body.appendChild(e);
				setTimeout(function(){
					e.style.display='none';
					e.remove();
				},1900);
		}
		//计算是几楼
		getfloor(temp){
				let lc='#';
				const str=temp.toString();
				const arr=str.split('-');
				for (let i = 0; i < arr.length; i++) {
					if(i==arr.length-1){
						const t= parseInt(arr[i])+1;
						lc=lc+t;
					}else{
						lc=`${lc+(parseInt(arr[i])+1)}-`;
					}
				}
				return lc;
			}
		//时间计算
		gettime(time){
				let temp;
				const nowtime=new Date().getTime();
				let timed=nowtime-time;
				if(timed<60000){
					temp='刚刚';
				}else if(timed<60000*60){
					temp=new Date(timed).getMinutes()+'分钟前';
				}else if(timed<60000*60*24){
					temp=new Date(timed).getHours()+'小时前';
				}else{
					let t=new Date(parseInt(time));
					temp=t.getFullYear()+'年'+(t.getMonth()+1)+'月'+t.getDate()+'日'
				}
				return temp;
		}
		
		//更新评论
		update(k){
				let _this=this;
				let xmlhttp=new XMLHttpRequest();
				xmlhttp.onreadystatechange=function()
				{
					if (xmlhttp.readyState==4 && xmlhttp.status==200)
					{
						var json=JSON.parse(xmlhttp.responseText);
						_this.$c('.ew-list').innerHTML="";
						for (let i = 0; i < json.data.length; i++) {
							let t= json.data[i];
							_this.sendcom(t.cid,t.user,t.email,t.weburl,t.time,t.text)
						}
						if(k!='father'&&k!=undefined){
							if(_this.$c('.ew-id-'+k+'>.ew-li-main>.ew-li-com-w>.ew-li-reply')){
								_this.$c('.ew-id-'+k+'>.ew-li-main>.ew-li-com-w>.ew-li-reply').click();
							}
						}
						_this.ele.querySelector('.ew-bar').innerHTML=1+json.data.length+"条评论"
					}
				}
			
				xmlhttp.open("GET",this.api+"/get/?id="+this.cid,true);
				xmlhttp.send();
		}
		//输出评论
		sendcom(id,name,email,weburl,time,str){
			let _this=this;
				const warp= document.createElement('div');
				let number;
				if(id=='father'){
					number=_this.$c('.ew-list').querySelectorAll('.ew-li');
					warp.className=`ew-li ew-id-${number.length}`;
				}else if(_this.$c(`.ew-id-${id}`)){
					number=_this.$c(`.ew-id-${id}`).querySelectorAll('.ew-li');
					warp.className=`ew-li ew-id-${id}-${number.length}`;
				}else{
					console.log('数据可能存在错误')
				}
				const xdom=html2("https://v2ex.assets.uxengine.net/gravatar/"+MD5(email)+"?s=80&d=retro",weburl,name,_this.gettime(time),str);
				//commenthtml
				warp.innerHTML=xdom;
				warp.m=email;
				let btn=document.createElement('div');
				btn.className='ew-li-reply';
				btn.innerHTML='回复';
				btn.addEventListener('click',function(){
					_this.now=this.i;
					const earr=document.querySelectorAll('.ew-li-main');
					for (var i = 0; i <earr.length; i++) {
						if(earr[i].style.marginBottom){earr[i].style.marginBottom='auto'}
					}
					const e=warp.querySelector('.ew-li-main');
					_this.publish.className='ew-publish ew-publish-fly';
					_this.publish.style.top=`${e.offsetHeight+e.offsetTop+6}px`;
					e.style.marginBottom='210px';
					_this.$c('.ew-publish-title-lc').innerHTML=_this.getfloor(this.i);
				},false);
				warp.querySelector('.ew-li-main>.ew-li-com-w').appendChild(btn);
				if(id=='father'){
					btn.i=number.length;
					_this.$c('.ew-list').appendChild(warp);
				}else if(_this.$c(`.ew-id-${id}>.ew-li-next`)){
					btn.i=`${id}-${number.length}`;
					_this.$c(`.ew-id-${id}>.ew-li-next`).appendChild(warp);
				}else{
					console.log('数据可能存在错误'+id)
				}
			}
		//提交
		submitfun(){
				var _this=this;
				//验证url,e-mail
				var mailreg=/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
				if(_this.$c('.ew-textarea').value.length<=2){
					_this.alert('内容太短了')
				}else if(!_this.$c('.ew-author').value){
					_this.alert('请输入用户名')
				}else if(!mailreg.test(_this.$c('.ew-email').value)){
					_this.alert('邮箱错误')
				}else{
					const myDate = new Date();
					var regarr=[/\n/g,/<script/g,/<\/script/g,/<style/g,/<\/style/g,/<\/div/g,/<div/g,/<\/pre/g,/<[a-z]+\s+on[a-z]+\s+?=/g];
					for (var i = 0; i < regarr.length; i++) {
						var tvalue= _this.$c('.ew-textarea').value.replace(regarr[i], "<br>");
					}
				//取父邮箱
				let pm='';
				if(_this.now!='father'){
					pm=this.$c('.ew-id-'+this.now).m;
				}
				//发送数据
					var postData = {
			            id:_this.id,
			            user:_this.$c('.ew-author').value,
			            email:_this.$c('.ew-email').value,
			            weburl:_this.$c('.ew-weburl').value,
			            text:tvalue,
			            cid:_this.now,
			            url:document.location.href,
			            title:document.title,
			            pm:pm
		        	};
			        postData = function(obj) {
			            // 转成post需要的字符串.
			            var str = "";
			            for (var prop in obj) {
			                str += prop + "=" + obj[prop] + "&";
			            }
			            return str;
			        }(postData);
			   		let xhr = new XMLHttpRequest();
			        xhr.open("POST",_this.api+'/send/', true);
			        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			        xhr.onreadystatechange = function() {
			            var XMLHttpReq = xhr;
			            if (XMLHttpReq.readyState == 4) {
			                if (XMLHttpReq.status == 200) {
			                   let t= JSON.parse(XMLHttpReq.responseText);
			                   if(t.success){
			                   		_this.update(_this.now);
									_this.alert('评论成功');
									_this.$c('.ew-textarea').value='';
									var c=`{"user":"${_this.$c('.ew-author').value}","email":"${_this.$c('.ew-email').value}","weburl":"${_this.$c('.ew-weburl').value}"}`
									localStorage.setItem('ew', c);
			                   }else{
			                   		_this.alert('发送失败');
			                   }
			                }
			            }
			        };
			        xhr.send(postData);
		        //发送end	
			}	
		}
	
}
window.Hco=Hco;



