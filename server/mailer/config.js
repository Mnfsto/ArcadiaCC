require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });

const smtp = {
    host: 'smtp.gmail.com',
    port: 465,
    user: process.env.EMAIL_USER,
    from: 'maximtitov13@gmail.com',
    to: 'Arcadiacyclingclub@gmail.com',
    pass: process.env.EMAIL_PASS,
}

module.exports = smtp