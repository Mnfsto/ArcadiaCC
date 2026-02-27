require('dotenv').config();
const express = require("express");
const helmet = require("helmet");
const path = require('path');
const { connectDB, getCollection, closeConnection } = require('./data-access/db');
const PORT = process.env.PORT || 8081;
const handlers = require('./lib/handlers')
const airtable = require('./api/airtable')
const sendMail = require('./mailer/nodemailer')
const smtp = require('./mailer/config')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const { credentials } = require('./lib/config')
// ... (предыдущие импорты) ...
const { auth, genId } = require('./lib/middleware/userSession')

const app = express();
module.exports = app; // Экспортируем app для Vercel

app.use(helmet({
    contentSecurityPolicy: false, // Отключаем CSP для простоты деплоя, если возникнут проблемы с загрузкой ресурсов
}));
const urlencodedParser = express.urlencoded({ extended: true });
app.use(express.json());

// Cookies && Session
app.use(cookieParser(credentials.cookieSecret))
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: credentials.cookieSecret,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
    }
}))
app.use(genId)

app.get('/auth', auth)

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Handle GET requests to /api route
app.get("/api", handlers.api);

// Form processing on the main page
app.post("/", urlencodedParser, async function (request, response) {
    const userId = request.signedCookies.user_id
    const name = request.body.name
    const email = request.body.email
    const phone = request.body.phone
    const user = { name: name, email: email, phone: phone, }
    const collection = request.app.locals.collection
    try {
        console.log("save:" + userId)
        request.session.userId = userId
        request.session.user = user

        await collection.insertOne(user)
        await airtable.createMember(name, phone, email)

        const message = {
            to: smtp.to,
            subject: 'Заявка Join Us - AClub',
            text: `Новая заявка! Имя: ${name}, Email: ${email}, Телефон: ${phone}`,
            html: `<h3>Новая заявка!</h3>
        <b>Имя:</b> ${name} </br>
        <b>Email:</b> ${email}</br>
        <b>Телефон:</b> ${phone}</br>`
        }
        await sendMail(message)

        console.log(request.body);
        response.format({
            'text/html': () => response.redirect(303, '/thank-you'),
            'application/json': () => response.json({ success: true }),
        })
    } catch (err) {
        console.log(`Ошибка при обработке контакта от ${request.body.name} - ${request.body.phone} - ${request.body.email}`)
        response.format({
            'text/html': () => response.redirect(303, '/contact-error'),
            'application/json': () => response.status(500).json({
                error: 'ошибка при сохранении информации о контакте'
            }),
        })
    }
});

// Pixel fighter Form new Member
app.post("/sendPixel", urlencodedParser, async function (request, response) {
    const name = request.body.name
    const email = request.body.email
    const phone = request.body.phone
    const user = { name: name, email: email, phone: phone, }

    try {
        await airtable.createMemberPixel(name, phone, email)

        const message = {
            to: smtp.to,
            subject: 'Новый Pixel :)',
            text: `Новый Участник Pixel Fighter. Имя: ${name}, Email: ${email}, Телефон: ${phone}`,
            html: `<h3>Новый Участник Pixel Fighter</h3>
        <b>Имя:</b> ${name} </br>
        <b>Email:</b> ${email}</br>
        <b>Телефон:</b> ${phone}</br>`
        }
        await sendMail(message)

        response.format({
            'text/html': () => response.redirect(303, '/thank-you'),
            'application/json': () => response.json({ success: true }),
        })
    } catch (err) {
        console.log(`Ошибка при обработке контакта от ${request.body.name} - ${request.body.phone} - ${request.body.email}`)
        response.format({
            'text/html': () => response.redirect(303, '/contact-error'),
            'application/json': () => response.status(500).json({
                error: 'ошибка при сохранении информации о контакте'
            }),
        })
    }
});

// Order form on the cart page
app.post("/cart-submit", urlencodedParser, async function (request, response) {
    const name = request.body.name
    const email = request.body.email
    const phone = request.body.phone

    try {
        await airtable.createOrder(name, phone, email)

        const message = {
            to: smtp.to,
            subject: 'Заказ с магазина - AClub',
            text: `Новый Заказ! Имя: ${name}, Email: ${email}, Телефон: ${phone}`,
            html: `<h3>Новый Заказ!</h3>
        <b>Имя:</b> ${name} </br>
        <b>Email:</b> ${email}</br>
        <b>Телефон:</b> ${phone}</br>`
        }
        await sendMail(message)

        response.format({
            'text/html': () => {
                response.json({ success: true, message: 'Спасибо за ваш заказ!' });
            },
            'application/json': () => {
                response.json({ success: true, message: 'Спасибо за ваш заказ!' });
            },
        })
    } catch (err) {
        console.log(`Ошибка при обработке заказа от ${request.body.name}`)
        response.format({
            'text/html': () => response.redirect(303, '/contact-error'),
            'application/json': () => response.status(500).json({
                error: 'ошибка при сохранении информации о заказе'
            }),
        })
    }
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.get('/express_backend', (req, res) => {
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

// Startup logic
if (process.env.NODE_ENV !== 'production') {
    (async () => {
        try {
            await connectDB();
            app.locals.collection = getCollection("users");
            app.listen(PORT, () => {
                console.log(`The server is waiting for a connection on port ${PORT}...`);
            });
            await airtable.getTable;
            console.log('Airtable connect.....');
        } catch (err) {
            console.error("Initialization error:", err);
        }
    })();
} else {
    // В продакшене (Vercel) инициализация будет происходить через middleware или при первом запросе
    app.use(async (req, res, next) => {
        try {
            if (!app.locals.collection) {
                await connectDB();
                app.locals.collection = getCollection("users");
                await airtable.getTable;
            }
            next();
        } catch (err) {
            console.error("Middleware initialization error:", err);
            res.status(500).send("Internal Server Error during initialization");
        }
    });
}

// Shutdown logic
process.on("SIGINT", async () => {
    await closeConnection();
    console.log("The application has terminated");
    process.exit();
});