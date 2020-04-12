const http=require('http');
const localhost='127.0.0.1';
const port=5000;

var server=http.createServer(function(req,res){
    if (req.url=="/"){
        res.writeHead(200, {'Content-Type':'text/html'});
        res.write('<html><head><title>Welcome Page</title></head><body><h1>Welcome Mario</h1></body></html>');
        res.end();
    }

    else if (req.url=="/app"){
        var fs = require('fs');
        fs.readFile('./Chat_box.html', function(err,html){
            if(err){
                throw err;
            }
            res.writeHead(200, {'Content-Type':'text/html'});
            res.write(html);
            res.end();
        });
       
    }

    else if (req.url=="/json"){
        res.writeHead(200, {'Content-Type':'application/json'});
        req.write(JSON.stringify({ message: "Hello World"}));
        req.end();
    }

    else
    res.end('Page not found');
    
});

server.listen(5000);
console.log('Node.js web server at port 5000 is running..')