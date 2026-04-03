require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
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
const { orderMessage, hashOrder } = require("./lib/orderData");

const app = express();
app.use(helmet({
    contentSecurityPolicy: false,
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
const buildPath = path.join(process.cwd(), 'client/build');
app.use(express.static(buildPath));

// Handle GET requests to /api route
app.get("/api", handlers.api);

// Form processing on the main page
app.post("/", urlencodedParser, async function (request, response) {
    const userId = request.signedCookies.user_id;
    const fullName = request.body.fullName;
    const email = request.body.email;
    const phone = request.body.phone;
    const user = { fullName: fullName, email: email, phone: phone };
    const collection = request.app.locals.collection;

    try {
        console.log("save:" + userId);
        request.session.userId = userId;
        request.session.user = user;

        // =========================================================
        // TODO: HIGHLIGHTED CODE FOR INDEPENDENT REFINEMENT
        // Here you can set up MongoDB and Airtable integration,
        // and refine the email logic as needed.
        // =========================================================
        await collection.insertOne(user);
        await airtable.createMember(fullName, phone, email);

        const message = {
            to: smtp.to,
            subject: 'Join Us Request - AClub',
            text: `New Join Us request! Name: ${fullName}, Email: ${email}, Phone: ${phone}`,
            html: `<h3>New Join Us Request!</h3>
        <b>Name:</b> ${fullName} </br>
        <b>Email:</b> ${email}</br>
        <b>Phone:</b> ${phone}</br>`
        };
        await sendMail(message);

        // =========================================================

        console.log(request.body);
        response.format({
            'text/html': () => response.redirect(303, '/thank-you'),
            'application/json': () => response.json({ success: true }),
        });
    } catch (err) {
        console.log(`Error processing contact from ${request.body.fullName} - ${request.body.phone} - ${request.body.email}`, err);
        response.format({
            'text/html': () => response.redirect(303, '/contact-error'),
            'application/json': () => response.status(500).json({
                error: 'error saving contact information'
            }),
        });
    }
});

// Pixel fighter Form new Member
app.post("/sendPixel", urlencodedParser, async function (request, response) {
    const name = request.body.name;
    const email = request.body.email;
    const phone = request.body.phone;
    const user = { name: name, email: email, phone: phone };

    try {
        // =========================================================
        // TODO: HIGHLIGHTED CODE FOR INDEPENDENT REFINEMENT
        // Here you can set up Airtable (e.g. airtable.createSubscription(...))
        // and refine the email logic as needed.
        // =========================================================
        await airtable.createMemberPixel(name, phone, email);

        const message = {
            to: smtp.to,
            subject: 'New Pixel :)',
            text: `New Pixel Fighter Member. Name: ${name}, Email: ${email}, Phone: ${phone}`,
            html: `<h3>New Pixel Fighter Member</h3>
        <b>Name:</b> ${name} </br>
        <b>Email:</b> ${email}</br>
        <b>Phone:</b> ${phone}</br>`
        };
        await sendMail(message);

        // =========================================================

        response.format({
            'text/html': () => response.redirect(303, '/thank-you'),
            'application/json': () => response.json({ success: true }),
        });
    } catch (err) {
        console.log(`Error processing contact from ${request.body.name} - ${request.body.phone} - ${request.body.email}:`, err);
        response.format({
            'text/html': () => response.redirect(303, '/contact-error'),
            'application/json': () => response.status(500).json({
                error: 'error saving contact information'
            }),
        });
    }
});
// Order Kids Subscription Form
app.post("/order-kids-subscription", urlencodedParser, async function (request, response) {
    const { name, email, phone, plan } = request.body;

    try {
        // =========================================================
        // TODO: HIGHLIGHTED CODE FOR INDEPENDENT REFINEMENT
        // Here you can set up Airtable (e.g. airtable.createSubscription(...))
        // and refine the email logic as needed.
        // =========================================================
        
        const message = {
            to: smtp.to,
            subject: `Kids School Membership Order: ${plan} - AClub`,
            text: `New Kids School membership order! Plan: ${plan}, Name: ${name}, Email: ${email}, Phone: ${phone}`,
            html: `<h3>New Kids School Membership Order</h3>
        <b>Selected plan:</b> ${plan} <br/>
        <b>Name:</b> ${name} <br/>
        <b>Email:</b> ${email} <br/>
        <b>Phone:</b> ${phone} <br/>`
        };
        await sendMail(message);

        // =========================================================

        response.format({
            'text/html': () => response.redirect(303, '/thank-you'),
            'application/json': () => response.json({ success: true }),
        });
    } catch (err) {
        console.log(`Error processing Kids School membership order from ${name}:`, err);
        response.status(500).json({ error: 'error saving order information' });
    }
});

// Order form on the cart page
app.post("/cart-submit", urlencodedParser, async function (request, response) {
    const name = request.body.name
    const email = request.body.email
    const phone = request.body.phone
    const order = request.body.cartData
    const itemCount = request.body.itemCount
    console.log(itemCount);
    console.log(order);

    const orderHtml = await orderMessage(order);
    const orderId = await hashOrder(order);
    console.log(orderHtml);
    const messageSuccess = `Thank you for your order! ID ${orderId}`
    try {
        await airtable.createOrder(name, phone, email)

        const message = {
            to: smtp.to,
            subject: 'Заказ с магазина - AClub',
            text: `Новый Заказ! Имя: ${name}, Email: ${email}, Телефон: ${phone}`,
            html: `<h3>Новый Заказ!</h3>
        <b>Имя:</b> ${name} </br>
        <b>Email:</b> ${email}</br>
        <b>Телефон:</b> ${phone}</br>
        <b>id:</b> ${orderId}</br>
        <b> Order:</b>
            <b> ${orderHtml}</b>`

        }
        await sendMail(message)

        response.format({
            'text/html': () => {
                response.json({ success: true, message: messageSuccess });
            },
            'application/json': () => {
                response.json({ success: true, message: messageSuccess });
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
    res.sendFile(path.join(buildPath, 'index.html'));
});

app.get('/express_backend', (req, res) => {
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

// Startup logic
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

// Shutdown logic
process.on("SIGINT", async () => {
    await closeConnection();
    console.log("The application has terminated");
    process.exit();
});