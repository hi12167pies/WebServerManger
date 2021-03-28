const fs=require('fs');const http=require('http');const config=require('./config.json');const files=config.files;var errorpage;fs.readFile(
`${config.errorpage}`,function(error,data){if(error){errorpage='Error, the error page was not found<hr>WebServerManger | Port '+config.port}
else{errorpage=data+'<hr>WebServerManger | Port '+config.port;}});const server=http.createServer(function(req,res){if(req.url in files){
res.writeHead(200,{"Content-Type":files[req.url].type});fs.readFile(`${config.root}/${files[req.url].root}`,function(error,data){if(error){res.write(
'File not found. If you are a server admin please check your "config.json". Otherwise try again later<hr>WebServerManger | Port '+config.port)}else{
res.write(data)}res.end()})}else{res.writeHead(200,{"Content-Type":"text/html"});res.write(errorpage);res.end()}});server.listen(config.port,function
(error){if(error){config.log('Some went wrong | ',error)}else{console.log('Server is listening on port '+config.port)};});