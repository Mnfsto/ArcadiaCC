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
const puppeteer = require('puppeteer');
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const { credentials } = require('./lib/config')
const { auth, genId } = require('./lib/middleware/userSession')
const { orderMessage, hashOrder } = require("./lib/orderData");
const handlebars = require("handlebars");

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
const buildPath = path.join(__dirname, '../client/build');
app.use(express.static(buildPath));

// Handle GET requests to /api route
app.get("/api", handlers.api);

// Registration Step 2 — full member profile submission
app.post("/join-step-2", express.json(), async function (request, response) {
    const {
        fullName, email, phone,
        dob, city, emergencyContact,
        mileage, disciplines, goals,
        otherClubs, instagram, strava, garmin,
    } = request.body;

    const htmlTemplate = `
      <html>
        <head>
          <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;800&family=Cormorant+Garamond:wght@400;600&display=swap" rel="stylesheet">
          <style>
            @page { margin: 0; }
            body { 
              font-family: 'Cormorant Garamond', serif; 
              background-color: #0b0b0b; 
              color: #e0e0e0; 
              padding: 40px; 
              line-height: 1.4; 
              margin: 0;
            }
            .border-wrap {
              border: 2px solid #444;
              padding: 30px;
              position: relative;
              background-color: #0b0b0b;
            }
            .border-wrap::before {
              content: '';
              position: absolute;
              top: 5px; left: 5px; right: 5px; bottom: 5px;
              border: 1px solid #222;
              pointer-events: none;
            }
            .header { 
              text-align: center; 
              font-family: 'Cinzel', serif; 
              color: #ffffff; 
              text-transform: uppercase;
              letter-spacing: 3px;
              border-bottom: 1px solid #333;
              padding-bottom: 15px;
              margin-bottom: 20px;
            }
            .header h1 {
              font-size: 26px;
              margin: 0;
            }
            .header h2 {
              font-size: 14px;
              color: #b30000;
              margin-top: 10px;
              letter-spacing: 5px;
            }
            .content { 
              margin-top: 10px; 
              font-size: 13px;
            }
            .greeting {
              font-size: 16px;
              color: #fff;
              margin-bottom: 15px;
            }
            .rules h3 {
              font-family: 'Cinzel', serif;
              color: #fff;
              font-size: 13px;
              margin-top: 15px;
              margin-bottom: 8px;
              border-bottom: 1px dashed #333;
              padding-bottom: 3px;
            }
            .rules ul {
              padding-left: 20px;
              margin: 0;
            }
            .rules li {
              margin-bottom: 6px;
              text-align: justify;
            }
            .rules strong {
              color: #b30000;
              font-weight: 600;
            }
            .signature-section { 
              margin-top: 40px; 
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
            }
            .sig-box {
               text-align: center;
               width: 45%;
            }
            .sig-line {
              border-bottom: 1px solid #666;
              height: 30px;
              margin-bottom: 8px;
            }
            .sig-label {
              font-family: 'Cinzel', serif;
              font-size: 11px;
              color: #888;
            }
            .footer { 
              margin-top: 30px; 
              font-size: 10px; 
              text-align: center;
              color: #555;
              border-top: 1px solid #222;
              padding-top: 10px;
            }
          </style>
        </head>
        <body>
          <div class="border-wrap">
            <div class="header">
              <h1>Arcadia Cycling Club</h1>
              <h2>Annual Membership Contract</h2>
            </div>
            <div class="content">
              <p class="greeting">Welcome, <strong style="color:#fff;">{{fullName}}</strong>!</p>
              <p>This document officially confirms your membership in the Arcadia Cycling Club and your unwavering agreement to the club's principles and rules.</p>
              
              <div class="rules">
                <h3>1. Team Spirit, Ethics, and Discipline</h3>
                <ul>
                  <li><strong>Mutual assistance:</strong> I pledge to help, respect, and support my clubmates. Team interests are higher than personal sports ambitions within team rides.</li>
                  <li><strong>Culture of behavior:</strong> I pledge to observe traffic rules and behave correctly towards other road users. Any display of aggression or unsportsmanlike behavior is unacceptable.</li>
                  <li><strong>Attendance:</strong> I pledge to actively participate in the life of the club whenever possible, and to be present at general training sessions and official meetings.</li>
                </ul>

                <h3>2. Equipment, Safety, and Assets</h3>
                <ul>
                  <li><strong>Club Kit:</strong> I pledge to be present at all official training sessions, races, and podiums exclusively in the current kit of the club.</li>
                  <li><strong>Safety (No Helmet — No Ride):</strong> I pledge to always use a fastened bicycle helmet. Riding without a helmet or with an unfastened strap is strictly prohibited.</li>
                  <li><strong>Care of assets:</strong> I pledge to take good care of the property and assets of the club provided to me for temporary use.</li>
                </ul>

                <h3>3. Media and Partner Support</h3>
                <ul>
                  <li><strong>Social networks:</strong> I pledge to tag the official club account (@arcadia_cycling_club) and partners when publishing content related to the club.</li>
                  <li><strong>Brand protection:</strong> I pledge to avoid public statements that disrepute the club or its partners.</li>
                  <li><strong>Media consent:</strong> I give indefinite consent to the club to use my image (photos and videos) for promotional materials and reports.</li>
                </ul>

                <h3>4. Financial and Legal Conditions</h3>
                <ul>
                  <li><strong>Membership fee:</strong> I pledge to pay the annual fee of 250 euros.</li>
                  <li><strong>FCU License:</strong> I pledge to arrange a valid sports license of the Federation of Cycling of Ukraine for the current year.</li>
                  <li><strong>Health & Responsibility:</strong> I confirm I have undergone a medical examination and have no contraindications. I am aware that cycling is a high-risk activity and take full responsibility.</li>
                </ul>

                <h3>5. Term and Termination</h3>
                <ul>
                  <li><strong>Term:</strong> This agreement is valid for one calendar year from the moment the fee is paid.</li>
                  <li><strong>Termination:</strong> The club reserves the right to exclude a participant without a refund for gross violations of safety, unsportsmanlike behavior or actions harming the reputation.</li>
                </ul>
              </div>

              <div class="signature-section">
                <div class="sig-box">
                  <div class="sig-line"></div>
                  <div class="sig-label">Club Representative</div>
                </div>
                <div class="sig-box">
                  <div class="sig-line"></div>
                  <div class="sig-label">Member Signature ({{fullName}})</div>
                </div>
              </div>

            </div>
            <div class="footer">
              <p>Generated automatically on {{date}} | Arcadia CC - Official Branch in the Odessa Region</p>
            </div>
          </div>
        </body>
      </html>
    `;

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

        const templ = handlebars.compile(htmlTemplate);
        const date = new Date().toLocaleDateString('en-GB');
        const finalHtml = templ({fullName, date});

        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();
        await page.setContent(finalHtml, { waitUntil: 'networkidle0' });


        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: { top: '20px', right: '20px', bottom: '20px', left: '20px' }
        });

        const answer = {
            to: email,
            subject: `Contract Member — ${fullName} — Arcadia Cycling Club`,
            template: 'contract',
            context: {
                headerTitle: 'Your Annual Contract - Arcadia Cycling Club',
                greeting: `This document confirms your membership in the club and your agreement with the rules. You must provide one signed copy to the Arcadia Management.`,
                fullName,
                email,
                phone,
            },
            attachments: [
                {
                    filename: `Contract_Arcadia_${fullName}.pdf`,
                    content: pdfBuffer
                }
            ],
        };

        await sendMail(answer);
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
        console.log(`Error processing order from ${request.body.name}`, err)
        response.format({
            'text/html': () => response.redirect(303, '/contact-error'),
            'application/json': () => response.status(500).json({
                error: 'error saving order information'
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