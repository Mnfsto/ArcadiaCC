const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');
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

// Attach Handlebars engine
transporter.use('compile', hbs({
    viewEngine: {
        extName: '.hbs',
        partialsDir: path.resolve(__dirname, 'templates'),
        defaultLayout: false,
    },
    viewPath: path.resolve(__dirname, 'templates'),
    extName: '.hbs',
}));

/**
 * Send an email using a Handlebars template.
 *
 * Plain HTML fallback is also supported — if message.template is not
 * set the function behaves exactly like before.
 *
 * @param {Object} message  - Nodemailer message object
 *   @param {string}  message.to
 *   @param {string}  message.subject
 *   @param {string}  [message.template]  - template name without extension (e.g. 'newMember')
 *   @param {Object}  [message.context]   - variables passed to the template
 *   @param {string}  [message.html]      - fallback raw HTML (used if no template provided)
 * @returns {Promise}
 */
const mailer = (message) => {
    // Inject current year so templates can use {{year}}
    if (message.context) {
        message.context.year = message.context.year || new Date().getFullYear();
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