var jwt=require('jwt-simple');
var conf=require('../conf/conf.json');
var inspect = require('util').inspect;

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'myDB'
});

var auth={
	logout:function(req,res){
		req.session.destroy();
		res.json({
				"status":200,
				"message":"logout successfully"
			});
		return;
	},
	login:function(req,res){
		var username=req.body.username || '';
		var password=req.body.password || '';
		//console.log(req);
		if(username=='' || password==''){
			res.status(401);
			res.json({"status":401,
			"message":"invalid credentials"});
			return;
		}
		auth.validate(username,password,function(dbUserObj){

		console.log(JSON.stringify(dbUserObj));
		if(!dbUserObj){
			res.status(401);
			res.json({
				"status":401,
				"message":"invalid credentials"
			});
		return;
		}
		if(dbUserObj)
		{
		//res.json(getToken(dbUserObj));
		console.log(dbUserObj[0].role+'<<<<<<<<<<<<<<'+username);
		console.log(dbUserObj);
		var sess;
		console.log(req.session);
		if(!req.session)
		sess=req.session={};
		
		req.session.email=username;
		req.session.role=dbUserObj[0].role;
		
		//sess.email=req.session.email=username;
		console.log('============');
		console.log(req.session);
		res.json(dbUserObj);
		}
	});
	},
	create:function(req,res){
		var type=req.body.usrType || '';
		var name=req.body.fname || '';
		var email=req.body.email || '';
		var pwd=req.body.pwd || '';
		var skills=req.body.skills || '';
		console.log(req.body);
		console.log(type+','+name+','+email+','+pwd+','+skills);

		if(type=='' || name=='' || email=='' || pwd=='' || skills==''){
			res.status(401);
			res.json({"status":401,
			"message":"invalid credentials"});
			return;
		}
	
	auth.getUser(email,function(data){
		console.log('-----');
		console.log(data);
		if(data.length>0)
		{
			res.status(403);
			res.json({
				"status":403,
				"message":"userAlreadyEsists!"
			});
		return;
		}

		auth.createUser(email,name,type,pwd,skills,function(dbUserObj){
		console.log(JSON.stringify(dbUserObj));
		if(!dbUserObj){
			res.status(402);
			res.json({
				"status":402,
				"message":"error occured"
			});
		return;
		}
		if(dbUserObj)
		{
			//res.json(getToken(dbUserObj));
		res.json(dbUserObj);
		}
		});

	});

		
	},
	update:function(req,res){
		var email=req.body.email || '';
		var employer=req.body.employer || '';
		var name=req.body.fname || '';
		var skills=req.body.skills || '';
console.log(name+','+email+','+employer+','+skills);

		
	
		if(email && employer)
		{
			auth.updateEmployer(email,employer,function(dbUserObj){
		console.log(JSON.stringify(dbUserObj));
		if(!dbUserObj){
			res.status(402);
			res.json({
				"status":402,
				"message":"error occured"
			});
		return;
		}
		if(dbUserObj)
		{
			//res.json(getToken(dbUserObj));
		res.json(dbUserObj);
		}
		});
		}
		else if(email && name && skills)
		{

		auth.updateUser(email,name,skills,function(dbUserObj){
		console.log(JSON.stringify(dbUserObj));
		if(!dbUserObj){
			res.status(402);
			res.json({
				"status":402,
				"message":"error occured"
			});
		return;
		}
		if(dbUserObj)
		{
			//res.json(getToken(dbUserObj));
		res.json(dbUserObj);
		}
		});

		}
		else{
			res.status(401);
			res.json({"status":401,
			"message":"invalid values"});
			return;
		}
				
	},

	validate:function(username,password,callback){
		console.log(username+'----'+password);
		connection.query('select count(1) as isValid,type as role from users where email="'+username+'" and password=sha1("'+password+'")', function(err, rows, fields) {
		  if (err) throw err;

		  console.log('The solution is: ', rows);
		  callback( rows);
		});
	},
	createUser:function(email,name,type,password,skills,callback){
		connection.query('insert into users(email,name,type,skills,password) values("'+email+'","'+name+'","'+type+'","'+skills+'",sha1("'+password+'"))', 
			function(err, rows, fields) {

		  if (err) throw err;

		  console.log('The solution is: ', rows);
		  callback( rows);
		});
	},
	getUser:function(username,callback){
		connection.query('select name,email,type,skills,case when length(employer)>0 then employer else "---" end as employer from users where email="'+username+'"', function(err, rows, fields) {
		  if (err) throw err;  
		  callback( rows);
		});

	},
	getUsers:function(callback){
		connection.query('select name,email,type,skills,case when length(employer)>0 then employer else "---" end as employer from users where type!="admin"', function(err, rows, fields) {
		  if (err) throw err;  
		  callback( rows);
		});

	},
	updateEmployer:function(email,employer,callback){

		connection.query('update users set employer="'+employer+'" where email="'+email+'"', function(err, rows, fields) {
		  if (err) throw err;  
		  callback( rows);
		});

	},
	updateUser:function(email,username,skills,callback){

		connection.query('update users set name="'+username+'",skills="'+skills+'" where email="'+email+'"', function(err, rows, fields) {
		  if (err) throw err;  
		  callback( rows);
		});

	}
}

function getToken(username){
	var expires=expiresIn(7);
	var token=jwt.encode({
		exp:expires
	},require('../config/secret')());
	return {
		token:token,
		expires:expires,
		user:username
	};
}


function expiresIn(numDays){
	var datObj=new Date();
	return datObj.setDate(datObj.getDate()+numDays);
}

module.exports=auth;