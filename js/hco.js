var e=document.createElement('style');
e.innerHTML='body{background-color:#EEE}.ew-comment{padding:15px 10px;position:relative}.comment{width:800px;margin:0 auto}.ew-publish{overflow:hidden}.ew-publish-fly{position:absolute;top:256px;width:100%;left:0}.ew-publish-title{font-size:16px;padding:10px 0;font-weight:500;color:#565656}.ew-publish-title-lc{color:#969292;display:none}.ew-publish-back{color:#e07e7e;display:none;cursor:pointer;margin-left:30px}.ew-publish-fly .ew-publish-back,.ew-publish-fly .ew-publish-title-lc{display:inline-block}.ew-textarea-warp{background-color:#fff;border-radius:12px;padding:6px;border:1px solid #d0d0d0}.ew-textarea{width:100%;height:70px;background:0;overflow-x:hidden;overflow-y:auto;border:0;font-size:14px;color:#333;resize:none;line-height:normal;text-align:left;outline:medium}.ew-info{margin-top:20px;margin-bottom:10px;position:relative}.ew-info>.text-block{height:25px;width:24%;margin-right:2%;border:1px solid #b5b5b5;border-radius:4px;padding:0 4px;outline:0}.ew-info>.ew-send-btn{position:absolute;right:0;top:-4px;width:130px;background-color:#e88678;color:#fff;text-align:center;line-height:40px;font-size:20px;border-radius:10px;box-shadow:0 0 10px rgba(253,0,0,0.4);cursor:pointer}.ew-bar{background-color:#b5b5b5;color:#fff;margin-top:10px;margin-bottom:10px;font-size:15px;line-height:32px;padding:0 17px}.ew-li{overflow:hidden}.ew-li-main{overflow:hidden;border-left:7px solid #fb9b79;margin-bottom:4px}.ew-li-com-w>.ew-li-com{margin-left:90px}.ew-li-com-w>.ew-li-user,.ew-li-com-w>.ew-li-time{display:inline-block;color:#3a3a3a;font-size:15px;margin-top:12px}.ew-li-user>a{color:#3a3a3a;font-size:15px;text-decoration:none}.ew-li-time{color:#797878;margin-left:10px}.ew-li-main>.ew-li-logo{margin:16px 20px 16px 10px;background-image:url(https://0d077ef9e74d8.cdn.sohucs.com/clip_picture_1486299863299);width:60px;height:60px;background-size:cover;border-radius:50%;float:left}.ew-li-reply{float:right;color:#e88678;cursor:pointer}.ew-li-next{margin-left:50px}.ew-alert{position:fixed;width:300px;height:80px;background-color:rgba(51,51,51,0.56);left:0;right:0;top:0;bottom:0;margin:auto;line-height:80px;z-index:999;color:#fff;text-align:center;font-size:25px;animation:.8s tada}@keyframes tada{from{transform:scale3d(1,1,1)}10%,20%{transform:scale3d(.9,.9,.9) rotate3d(0,0,1,-3deg)}30%,50%,70%,90%{transform:scale3d(1.1,1.1,1.1) rotate3d(0,0,1,3deg)}40%,60%,80%{transform:scale3d(1.1,1.1,1.1) rotate3d(0,0,1,-3deg)}to{transform:scale3d(1,1,1)}}'
document.body.appendChild(e);
function Hco(ele,webid,id){
			var warp=document.createElement('div');
			this.ele=warp;
			this.cid=webid+'_'+id;
			warp.className='ew-comment';
			warp.innerHTML=`<div class="ew-publish">
				<div class="ew-publish-title">正在回复 <span class="ew-publish-title-lc">#0</span> <span class="ew-publish-back">返回评论</span></div>
					<div class="ew-textarea-warp">
						<textarea node-type="textarea" name="" class="ew-textarea" placeholder="评论.." autocomplete="off" spellcheck="false"></textarea>
					</div>
					<div class="ew-info">
						<input class="text-block ew-author"  name="author" type="text" value="" size="30" placeholder="昵称 *" autocomplete="off">
						<input class="text-block ew-email"  name="email" type="email" value="" size="30" placeholder="邮箱 *" autocomplete="off">
						<input class="text-block ew-weburl"  name="url" type="url" value="" size="30" placeholder="网址" autocomplete="off">
						<div class="ew-send-btn">发送</div>
					</div>
				</div>
				<div class="ew-bar">喵喵</div>
				<div class="ew-list">
				</div>`;
			if(typeof ele=="string"){
				ele=document.querySelector(ele);
			}
			ele.appendChild(warp);
			var _this=this;
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
					if(earr[i].style.marginBottom){earr[i].style.marginBottom='auto'}
				}
			},false);
			_this.update();
		}
		//提示框
		Hco.prototype.alert=(s)=>{
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
		Hco.prototype.getfloor=(temp)=>{
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
		Hco.prototype.gettime=(time)=>{
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
					temp=t.getFullYear()+'年'+t.getMonth()+'月'+t.getDay()+'日'
				}
				return temp;
		}
		
		//更新评论
		Hco.prototype.update=function(k){
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
					}
				}
			
				xmlhttp.open("GET",this.api+"/get/?id="+this.cid,true);
				xmlhttp.send();
		}
		//输出评论
		Hco.prototype.sendcom=function(id,name,email,weburl,time,str){
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
				const xdom=`<div class="ew-li-main">
							<div class="ew-li-logo" style="background-image:url(https://v2ex.assets.uxengine.net/gravatar/${MD5(email)}?s=80&d=retro)"></div>
							<div class="ew-li-com-w">
								<div class="ew-li-user"><a href="${weburl}" target="_blank">${name}</a></div>
								<div class="ew-li-time">${_this.gettime(time)}</div>
								<pre class="ew-li-com">${str}</pre>
							</div>
						</div>
						<div class="ew-li-next"></div>
						</div>`;
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
					_this.publish.style.top=`${e.offsetHeight+e.offsetTop}px`;
					e.style.marginBottom='250px';
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
		Hco.prototype.submitfun=function(){
				var _this=this;
				//验证url,e-mail
				var mailreg=/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
				if(_this.$c('.ew-textarea').value.length<=6){
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
//dm5
var hex_chr = "0123456789abcdef"; 
function rhex(num) 
{ 
str = ""; 
for(j = 0; j <= 3; j++) 
str += hex_chr.charAt((num >> (j * 8 + 4)) & 0x0F) + 
hex_chr.charAt((num >> (j * 8)) & 0x0F); 
return str; 
} 
function str2blks_MD5(str) 
{ 
nblk = ((str.length + 8) >> 6) + 1; 
blks = new Array(nblk * 16); 
for(i = 0; i < nblk * 16; i++) blks[i] = 0; 
for(i = 0; i < str.length; i++) 
blks[i >> 2] |= str.charCodeAt(i) << ((i % 4) * 8); 
blks[i >> 2] |= 0x80 << ((i % 4) * 8); 
blks[nblk * 16 - 2] = str.length * 8; 
return blks; 
} 
function add(x, y) 
{ 
var lsw = (x & 0xFFFF) + (y & 0xFFFF); 
var msw = (x >> 16) + (y >> 16) + (lsw >> 16); 
return (msw << 16) | (lsw & 0xFFFF); 
} 
function rol(num, cnt) 
{ 
return (num << cnt) | (num >>> (32 - cnt)); 
} 
function cmn(q, a, b, x, s, t) 
{ 
return add(rol(add(add(a, q), add(x, t)), s), b); 
} 
function ff(a, b, c, d, x, s, t) 
{ 
return cmn((b & c) | ((~b) & d), a, b, x, s, t); 
} 
function gg(a, b, c, d, x, s, t) 
{ 
return cmn((b & d) | (c & (~d)), a, b, x, s, t); 
} 
function hh(a, b, c, d, x, s, t) 
{ 
return cmn(b ^ c ^ d, a, b, x, s, t); 
} 
function ii(a, b, c, d, x, s, t) 
{ 
return cmn(c ^ (b | (~d)), a, b, x, s, t); 
} 
function MD5(str) 
{ 
x = str2blks_MD5(str); 
var a = 1732584193; 
var b = -271733879; 
var c = -1732584194; 
var d = 271733878; 
for(i = 0; i < x.length; i += 16) 
{ 
var olda = a; 
var oldb = b; 
var oldc = c; 
var oldd = d; 
a = ff(a, b, c, d, x[i+ 0], 7 , -680876936); 
d = ff(d, a, b, c, x[i+ 1], 12, -389564586); 
c = ff(c, d, a, b, x[i+ 2], 17, 606105819); 
b = ff(b, c, d, a, x[i+ 3], 22, -1044525330); 
a = ff(a, b, c, d, x[i+ 4], 7 , -176418897); 
d = ff(d, a, b, c, x[i+ 5], 12, 1200080426); 
c = ff(c, d, a, b, x[i+ 6], 17, -1473231341); 
b = ff(b, c, d, a, x[i+ 7], 22, -45705983); 
a = ff(a, b, c, d, x[i+ 8], 7 , 1770035416); 
d = ff(d, a, b, c, x[i+ 9], 12, -1958414417); 
c = ff(c, d, a, b, x[i+10], 17, -42063); 
b = ff(b, c, d, a, x[i+11], 22, -1990404162); 
a = ff(a, b, c, d, x[i+12], 7 , 1804603682); 
d = ff(d, a, b, c, x[i+13], 12, -40341101); 
c = ff(c, d, a, b, x[i+14], 17, -1502002290); 
b = ff(b, c, d, a, x[i+15], 22, 1236535329); 
a = gg(a, b, c, d, x[i+ 1], 5 , -165796510); 
d = gg(d, a, b, c, x[i+ 6], 9 , -1069501632); 
c = gg(c, d, a, b, x[i+11], 14, 643717713); 
b = gg(b, c, d, a, x[i+ 0], 20, -373897302); 
a = gg(a, b, c, d, x[i+ 5], 5 , -701558691); 
d = gg(d, a, b, c, x[i+10], 9 , 38016083); 
c = gg(c, d, a, b, x[i+15], 14, -660478335); 
b = gg(b, c, d, a, x[i+ 4], 20, -405537848); 
a = gg(a, b, c, d, x[i+ 9], 5 , 568446438); 
d = gg(d, a, b, c, x[i+14], 9 , -1019803690); 
c = gg(c, d, a, b, x[i+ 3], 14, -187363961); 
b = gg(b, c, d, a, x[i+ 8], 20, 1163531501); 
a = gg(a, b, c, d, x[i+13], 5 , -1444681467); 
d = gg(d, a, b, c, x[i+ 2], 9 , -51403784); 
c = gg(c, d, a, b, x[i+ 7], 14, 1735328473); 
b = gg(b, c, d, a, x[i+12], 20, -1926607734); 
a = hh(a, b, c, d, x[i+ 5], 4 , -378558); 
d = hh(d, a, b, c, x[i+ 8], 11, -2022574463); 
c = hh(c, d, a, b, x[i+11], 16, 1839030562); 
b = hh(b, c, d, a, x[i+14], 23, -35309556); 
a = hh(a, b, c, d, x[i+ 1], 4 , -1530992060); 
d = hh(d, a, b, c, x[i+ 4], 11, 1272893353); 
c = hh(c, d, a, b, x[i+ 7], 16, -155497632); 
b = hh(b, c, d, a, x[i+10], 23, -1094730640); 
a = hh(a, b, c, d, x[i+13], 4 , 681279174); 
d = hh(d, a, b, c, x[i+ 0], 11, -358537222); 
c = hh(c, d, a, b, x[i+ 3], 16, -722521979); 
b = hh(b, c, d, a, x[i+ 6], 23, 76029189); 
a = hh(a, b, c, d, x[i+ 9], 4 , -640364487); 
d = hh(d, a, b, c, x[i+12], 11, -421815835); 
c = hh(c, d, a, b, x[i+15], 16, 530742520); 
b = hh(b, c, d, a, x[i+ 2], 23, -995338651); 
a = ii(a, b, c, d, x[i+ 0], 6 , -198630844); 
d = ii(d, a, b, c, x[i+ 7], 10, 1126891415); 
c = ii(c, d, a, b, x[i+14], 15, -1416354905); 
b = ii(b, c, d, a, x[i+ 5], 21, -57434055); 
a = ii(a, b, c, d, x[i+12], 6 , 1700485571); 
d = ii(d, a, b, c, x[i+ 3], 10, -1894986606); 
c = ii(c, d, a, b, x[i+10], 15, -1051523); 
b = ii(b, c, d, a, x[i+ 1], 21, -2054922799); 
a = ii(a, b, c, d, x[i+ 8], 6 , 1873313359); 
d = ii(d, a, b, c, x[i+15], 10, -30611744); 
c = ii(c, d, a, b, x[i+ 6], 15, -1560198380); 
b = ii(b, c, d, a, x[i+13], 21, 1309151649); 
a = ii(a, b, c, d, x[i+ 4], 6 , -145523070); 
d = ii(d, a, b, c, x[i+11], 10, -1120210379); 
c = ii(c, d, a, b, x[i+ 2], 15, 718787259); 
b = ii(b, c, d, a, x[i+ 9], 21, -343485551); 
a = add(a, olda); 
b = add(b, oldb); 
c = add(c, oldc); 
d = add(d, oldd); 
} 
return rhex(a) + rhex(b) + rhex(c) + rhex(d); 
} 
