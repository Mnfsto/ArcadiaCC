const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const path = require('path');
const fs = require('fs');
const smtp = require('./config');

// Create the transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: smtp.host,
    port: smtp.port,
    auth: {
        user: smtp.user,
        pass: smtp.pass,
    },
}, {
    from: `"Arcadia Cycling Club" <${smtp.from}>`,
});

// Cache for compiled templates
const templateCache = {};

/**
 * Send an email using a Handlebars template manually compiled.
 */
const mailer = async (message) => {
    // Inject current year so templates can use {{year}}
    if (message.context) {
        message.context.year = message.context.year || new Date().getFullYear();
    }

    // Compile template safely manually to bypass plugins
    if (message.template) {
        try {
            if (!templateCache[message.template]) {
                const templatePath = path.resolve(__dirname, 'templates', `${message.template}.hbs`);
                const templateFile = fs.readFileSync(templatePath, 'utf8');
                templateCache[message.template] = handlebars.compile(templateFile);
            }
            message.html = templateCache[message.template](message.context || {});
        } catch (compileErr) {
            console.error('Template compilation error:', compileErr);
            throw compileErr;
        }
    }

    return new Promise((resolve, reject) => {
        transporter.sendMail(message, (err, info) => {
            if (err) {
                console.error('Email error:', err);
                return reject(err);
            }
            console.log('Email sent:', info.messageId);
            resolve(info);
        });
    });
};

module.exports = mailer;