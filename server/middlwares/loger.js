let logFile = process.cwd()+require('../config.js').logFile;
let fs = require('fs');
module.exports = function(req,res,next){
	let logData = req.url+"|"+req.method+"|"+Date.now()+"\r\n";
	fs.appendFile(logFile,logData,(err)=>{
		if(err){throw new Error(err);}
	});
	next();
}