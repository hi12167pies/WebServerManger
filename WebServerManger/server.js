//apis import
const fs = require('fs');
const http = require('http');

//configs import
const config = require('./config.json');
const files = require('./files.json')

//error page
var errorpage;
fs.readFile(`${files.errorpage}`, function(error, data){ 
    if (error) { throw error };
    errorpage = data;
});

//server code
const server = http.createServer(function (req, res) {
    res.writeHead(200, {"Content-Type":"text/html"})
    res.write(`<title>${config.title}</title>`) //title
    res.write(`<link rel="icon" href="./favicon.ico">`) //favicon
    if (req.url == '/'){
        fs.readFile(`${config.root}/${config.defaultpagename}`, function(error, data){ 
            if(error){
                res.write(errorpage); //error
            } else {
                res.write(data); //read data
            };
            res.end();
        });
    } else {
        fs.readFile(`${config.root}/${req.url}`, function(error, data){ 
            if(error){
                res.write(errorpage); //error
            } else {
                res.write(data); //read data
            };
            res.end();
        });
    }
});

//server listen
server.listen(config.port, function(error){
    if (error){
        config.log('Some went wrong | ', error)
    } else {
        console.log('Server is listening on port ' + config.port)
    };
});