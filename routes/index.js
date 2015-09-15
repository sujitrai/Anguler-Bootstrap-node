
/*
 * GET home page.
 */
var auth=require('./auth.js');
exports.index = function(req, res){
	
  res.render('index', {title:'Welcome',layout:false})
};

exports.home = function(req, res){
	
	if(!req.session.role)
		res.render('index', {title:'Welcome',layout:false});
	else if(req.session.role=='admin'){
		auth.getUsers(function(objData){
	console.log('--------------');
	console.log(req.session);
  	res.render('home', {title:'Admin',data:JSON.stringify(objData),isAdmin:true,layout:false})
  		});
	}
	else if(req.session.email)
	{
	auth.getUser(req.session.email,function(objData){
	console.log('--------------');
	console.log(req.session);
	console.log(objData);
  	res.render('home', {title:'User Profile',data:JSON.stringify(objData),isAdmin:false,layout:false})
  		});
  	}
};