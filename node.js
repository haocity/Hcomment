"use strict";
var http = require('http');
var url = require('url');
var util = require('util');
var querystring = require('querystring');
var mysql      = require('mysql');
var xss = require('xss');
var db;
var nodemailer = require("nodemailer");
// 开启一个 SMTP 连接池
var transporter =nodemailer.createTransport({
  host: "smtp.qq.com", // 主机
  secureConnection: true, // 使用 SSL
  port: 465, // SMTP 端口
  auth: {
    user: "my@haotown.cn", // 账号
    pass: "password" // 密码
  }
});
function handleConnect() {
      db = mysql.createConnection({
      host     : 'localhost',
      user     : 'user',
      password : 'password',
      database : 'hco'
    }); 
    db.connect(function(err) {        
      if(err) {                                    
        console.log('error when connecting to db:', err);
        setTimeout(handleConnect, 2000);
      }                                     
    });                                     
    db.on('error', function(err) {
      console.log('db error', err);
      if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
        handleConnect();                       
      } else {                                      
        console.log(err)		
      }
    });
  }
console.log('hco服务开启');
http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'application/json; charset=utf8','Access-Control-Allow-Origin':'*'});
    var getobj=querystring.parse(url.parse(req.url).query);
   try{
      if (getobj.id) {
          handleConnect();
		  console.log('查询id: '+getobj.id+'的评论');
		   db.query('CREATE TABLE IF NOT EXISTS `'+getobj.id+'`(`id` int(8) NOT NULL AUTO_INCREMENT,`user` char(30) NOT NULL, `email` char(20) NOT NULL,`weburl` char(20) DEFAULT NULL,`cid` char(20) NOT NULL,`time` char(30) NOT NULL,`text` text NOT NULL,PRIMARY KEY (`id`))');
           db.query('SELECT * FROM `'+getobj.id+'`ORDER BY `id`', function(err, rows, fields) {
           if (err){
              res.end('{"success":0,"data":[{"id":0,"time":10,"text":"链接弹幕失败￣□￣｜｜","color":"#fff","place":1}]}');
			}
            var i=0;
            i++
            var d= rows;
            res.end('{"success":1,"data":'+JSON.stringify(d)+'}');
            db.end();
	  				console.log('关闭连接');
          });
      }else{
          res.end('{"success":0,"data":[{"text":"参数错误￣□￣｜｜"}]}');
      }
     
    }
    catch(error){
      console.log('发生错误了'+error)
      res.end('{"success":0,"data":[{"text":"请求出现错误￣□￣｜｜"}]}');
    }
}).listen(5225);

http.createServer(function (req, res) {
    var body = "";
    req.on('data', function (chunk) {
      body += chunk;
    });
    req.on('end', function () {
      // 解析参数
      var p = querystring.parse(body);
      // 设置响应头部信息及编码
      res.writeHead(200, {'Content-Type': 'application/json; charset=utf8','Access-Control-Allow-Origin':'*'});
      var xtime=new Date().getTime();
      console.log(xtime);
      if(p.id&&p.cid&&p.user&&p.email&&p.text) { // 输出提交的数据
          handleConnect();
          //var regarr=[/\n/g,/<script/g,/<\/script/g,/<style/g,/<\/style/g,/<\/div/g,/<div/g,/<\/pre/g,/<[a-z]+\s+on[a-z]+\s+?=/g];
          //for (let i = 0; i <regarr.length; i++) {
          //		p.user=p.user.replace(regarr[i],'');
          //		p.email=p.email.replace(regarr[i],'');
		  //		if(p.weburl){
	      //		p.weburl=p.weburl.replace(regarr[i],'');
		  //	}
          // 	  p.text=p.text.replace(regarr[i],'');
          //}
		  p.user=xss(p.user);
		  p.email=xss(p.email);
		  p.text=xss(p.text);
		  if(p.weburl){
			p.weburl=xss(p.weburl);
		  }
          db.query("INSERT INTO `hco`.`"+p.id+"` (`id`, `user`, `email`, `weburl`, `cid`,`time`, `text`) VALUES (NULL, "+db.escape(p.user)+", "+db.escape(p.email)+", "+db.escape(p.weburl)+","+db.escape(p.cid)+","+xtime+","+db.escape(p.text) +")", function(err, rows, fields) {
          res.end(`{"success":1,"container":"发送成功","time":"${xtime}"}`);
		      console.log(`发送成功:${p.id}内容:${p.text}`);
		      db.end();
		      if(p.pm&&p.url&&p.title){
						var mailOptions = {
						  from: "Hco评论<my@haotown.cn>", // 发件地址
						  to: p.pm, // 收件列表
						  subject: `你有一条新的回复 《${p.title}》`, 
						  html: `<div style="background-color:white;border-top: 2px solid #dc8b8b;box-shadow: 0 1px 3px #AAAAAA;line-height:180%;padding:0 15px 12px;width:500px;margin:50px auto;color:#555555;font-family:'Century Gothic','Trebuchet MS','Hiragino Sans GB',微软雅黑,'Microsoft Yahei',Tahoma,Helvetica,Arial,'SimSun',sans-serif;font-size:12px;">  
			        <h2 style="border-bottom:1px solid #DDD;font-size:14px;font-weight:normal;padding:13px 0 10px 8px;"><span style="color: #12ADDB;font-weight: bold;">&gt; </span>您在<a style="text-decoration:none;color: #12ADDB;" href="${p.url}" target="_blank">《${p.title}》</a>的评论有了新的回复</h2>  
			        <div style="padding:0 12px 0 12px;margin-top:18px">  
			        <p>时间：<span style="border-bottom:1px dashed #ccc;" t="5" times=" 20:42"><span style="border-bottom:1px dashed #ccc;" t="5" times=" 16:45">${new Date()}</span> 16:45:22</span></p>  
			        <p><strong>jeff</strong>&nbsp;回复说：</p>  
			            <p style="background-color: #f5f5f5;border: 0px solid #DDD;padding: 10px 15px;margin:18px 0">${p.text}</p>  
			            <p>您可以点击 <a style="text-decoration:none; color:#12addb" href="${p.url}" target="_blank">查看回复的完整內容 </a>，本邮件为自动发送，请勿直接回复</p>  
			       	</div></div> `;
						}
						// 发送邮件
						transporter.sendMail(mailOptions, (error, info) => {
						    if (error) {
						        return console.log(error);
						    }
						    console.log('Message %s sent: %s', info.messageId, info.response);
						});
		      }
         
          })
      } else {  
          res.end('{"success":0,"data":[{"text":"参数错误￣□￣｜｜"}]}');
      }
    });
  
}).listen(5226);