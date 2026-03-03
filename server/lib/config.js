require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const credentials = {
    cookieSecret: process.env.COOKIE_SECRET || "coming strength nothing half"
};
module.exports = { credentials };