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

// Registration Step 2 — full member profile submission
app.post("/api/join-step-2", express.json(), async function (request, response) {
    const {
        fullName, email, phone,
        dob, city, emergencyContact,
        mileage, disciplines, goals,
        otherClubs, instagram, strava, garmin,
    } = request.body;

    try {
        const message = {
            to: smtp.to,
            subject: `New Member Application — ${fullName} — Arcadia Cycling Club`,
            template: 'newMember',
            context: {
                headerTitle: 'New Member Application',
                greeting: `A new member has completed the full registration form.`,
                fullName,
                email,
                phone,
                dob,
                city,
                emergencyContact,
                mileage,
                disciplines: disciplines && disciplines.length ? disciplines : null,
                goals: goals || null,
                strava: strava || null,
            },
        };
        await sendMail(message);

        console.log(`[join-step-2] Application from ${fullName} (${email}) processed.`);
        response.json({ success: true });
    } catch (err) {
        console.error(`[join-step-2] Error processing application from ${fullName}:`, err);
        response.status(500).json({ error: 'Failed to process your application. Please try again.' });
    }
});

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
            subject: 'New Join Us Request — Arcadia Cycling Club',
            template: 'newMember',
            context: {
                headerTitle: 'New Join Us Request',
                greeting: 'A new member has submitted a Join Us request.',
                fullName,
                email,
                phone,
            },
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
            subject: 'New Pixel Fighter Member — Arcadia Cycling Club',
            template: 'newMember',
            context: {
                headerTitle: 'New Pixel Fighter',
                greeting: 'A new Pixel Fighter member has joined.',
                fullName: name,
                email,
                phone,
            },
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
            subject: `Kids School Membership Order: ${plan} — Arcadia Cycling Club`,
            template: 'newMember',
            context: {
                headerTitle: 'Kids School Membership Order',
                greeting: 'A new Kids School membership order has been received.',
                fullName: name,
                email,
                phone,
                plan,
            },
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
            subject: `New Shop Order — Arcadia Cycling Club`,
            template: 'newMember',
            context: {
                headerTitle: 'New Shop Order',
                greeting: 'A new order has been placed through the club store.',
                fullName: name,
                email,
                phone,
                orderId,
            },
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