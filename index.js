// добавить библиотеки и модули Express, Path, Middleware для статического отображения страниц
const express = require("express");
const path = require("path");
const fs = require('fs');
const bodyParser = require('body-parser')


const app= express();
const port = 3005;


app.use(express.static(__dirname + '/public'));
app.get('/', function (req,res){
    res.sendFile(path.join(__dirname, '/public/home.html'))
});
console.log(__dirname + '/public')

app.get('*', (req, res) => {
    let filePath = path.join(__dirname, req.url);
    let extname = path.extname(filePath);
    let contentType = 'text/html';

    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.svg':
            contentType = 'image/svg+xml';
            break;
        case '.woff':
            contentType = 'application/x-font-ttf';
            break;
    }

    if (extname === '.woff') {
        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(404);
                res.end('File not found');
            } else {
                res.writeHead(200, {
                    'Content-Type': contentType
                });
                res.end(content);
            }
        });
    } else {
        filePath += (extname === '') ? '.html' : '';
        fs.readFile(filePath, (err, content) => {
            if (err) {
                fs.readFile(path.join(__dirname, 'error.html'), (err, data) => {
                    if (err) {
                        res.writeHead(500);
                        res.end('Error');
                    } else {
                        res.writeHead(200, {
                            'Content-Type': 'text/html'
                        });
                        res.end(data);
                    }
                });
            } else {
                res.writeHead(200, {
                    'Content-Type': contentType
                });
                res.end(content);
            }
        });
    }
});



app.listen(port, ()=>{
    console.log(`Server start http://localhost:${port}`)
});