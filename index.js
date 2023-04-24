// добавить библиотеки и модули Express, Path, Middleware для статического отображения страниц
const express = require("express");
const path = require("path");
const fs = require('fs');
const {replaceBackground} = require('./forKids.js');
const bodyParser = require('body-parser')
const mailer = require('./nodemailer.js')
const smtp = require('./config.js');
let order = undefined;

const app= express();
const port = 3005;


app.use(express.static(__dirname + '/public'));
app.get('/', function (req,res){
    res.sendFile(path.join(__dirname, '/public/home.html'))
});
console.log(__dirname + '/public')

app.get('/forkids.html', replaceBackground, function(req, res) {
    res.render("forkids.html");
});

// настрой обработчика запроса
app.use(bodyParser.urlencoded({ extended: false }))
// отправка формы
app.post('/send', (req, res) => {
    // проверка заполнения обязательных полей
    if(!req.body.name || !req.body.email || !req.body.telephone) return res.sendStatus(400)
    const message = {
        to: smtp.to, // Кому (для нескольких адресатов используйте запятую)
        subject: "Заявка", // Тема письма
        text: '', // Содержимое письма
        html: `<h3>Новая заявка!</h3>
        <b>Имя:</b> ${req.body.name} </br>
        <b>Телефон:</b> ${req.body.email}</br>
        <b>Телефон:</b> ${req.body.telephone}</br>` // html код письма
    }
    mailer(message)
    order = req.body
    // редирект для предотвращения повторной отправки
    res.redirect('/confirm.html')

})
// возврат к исходному состоянию
app.get('/send', (req,res) => {
    if(typeof order !== 'object') return res.sendFile(__dirname + '/confirm.html')
    res.send('Заявка успешно принята!')
    order = undefined
})

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
