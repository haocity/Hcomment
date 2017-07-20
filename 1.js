var http = require('http');
var url = require('url');
var util = require('util');
var querystring = require('querystring');
mysql      = require('mysql');
  function handleConnect() {
    db = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : 'root',
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
console.log('hcon服务开启');
http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'application/json; charset=utf8','Access-Control-Allow-Origin':'*'});
    var getobj=querystring.parse(url.parse(req.url).query);
   try{
      if (getobj.id) {
          handleConnect();
		  console.log('查询id: '+getobj.id+'的评论');
		   db.query('CREATE TABLE IF NOT EXISTS `'+getobj.id+'`(`id` int(8) NOT NULL AUTO_INCREMENT,`user` char(30) NOT NULL, `email` char(20) NOT NULL,`weburl` char(20) DEFAULT NULL,`cid` char(20) NOT NULL,PRIMARY KEY (`id`))');
           db.query('SELECT * FROM `'+parseInt(getobj.id)+'`', function(err, rows, fields) {
           if (err){
              res.end('{"success":0,"data":[{"id":0,"time":10,"text":"链接弹幕失败￣□￣｜｜","color":"#fff","place":1}]}');
						}
            var i=0;
            i++
            var d= rows;
            res.end('{"success":1,"data":'+JSON.stringify(d)+'}');
          });
      }else{
          res.end('{"success":0,"data":[{"id":0,"time":10,"text":"链接弹幕失败￣□￣｜｜","color":"#fff","place":1}]}');
      }
      db.end();
	  console.log('关闭连接');
    }
    catch(err){
      console.log('发生错误了'+eer)
      res.end('{"success":0,"data":[{"id":0,"time":10,"text":"链接弹幕失败￣□￣｜｜","color":"#fff","place":1}]}');
    }
}).listen(5221);

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
      var now=new Date();
      var time=1900+now.getYear()+"-"+(now.getMonth()+1)+"-"+now.getDate()+" "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds();
      if(p.id&&p.time&&p.text&&p.color&&p.place) { // 输出提交的数据
         handleConnect();
          db.query("INSERT INTO `danmu`.`"+parseInt(p.id)+"` (`id`, `time`, `text`, `color`, `place`) VALUES (NULL, "+db.escape(p.time)+", "+db.escape(p.text)+", "+db.escape(p.color)+", "+db.escape(p.place)+")", function(err, rows, fields) {
           res.end(`{"success":1,"container":"发送成功","time":"${time}"}`);
		    console.log(`发送弹幕完成表:${p.id}内容:${p.text}`)
            db.end();
            
          })
      } else {  
          res.end(`{"success":0,"container":"请求参数错误","time":"${time}"}`);
      }
    });
  
}).listen(5220);