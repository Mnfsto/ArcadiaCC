const nodemailer = require('nodemailer')
const smtp = require('./config')

let transporter = nodemailer.createTransport({
    service:'Gmail',
    host: smtp.host,
    port: smtp.port,
        auth: {
            user: smtp.user,
            pass: smtp.pass
        }
},{
    from: `"Письмо от " <${smtp.from}>`,
})

const mailer = message => {
    transporter.sendMail(message, (err, info) => {
        if (err) return console.log(err)
        console.log('Email отправлен:', info)
    })
}

module.exports = mailer