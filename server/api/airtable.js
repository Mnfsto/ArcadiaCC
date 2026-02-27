const Airtable = require('airtable')


Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: 'process.env.AIRTABLE_API_KEY',
})

const base = Airtable.base('appuiJ0zwDJQ9vRQU');

exports.getTable = base('New Member').select({
    // Selecting the first 3 records in Grid view:
    maxRecords: 3,
    view: "Grid view"
}).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.

    records.forEach(function(record) {
        console.log('Retrieved', record.get('Name'));
    });

    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();

}, function done(err) {
    if (err) { console.error(err); return; }
});

// Для регистрации нового участника клуба
exports.createMember = (Name, Phone, Email) => base('New Member').create([{
    "fields": {
        Name: Name, Phone: Phone, Email: Email,
    }

}], function(err, records) {
    if (err) {
        console.error(err);
        return;
    }
    records.forEach(function (record) {
        console.log(record.getId());
    });
});
// Обработка заказа с магазина Аркадии
exports.createOrder = (Name, Phone, Email) => base('Order').create([{
    "fields": {
        Name: Name, Phone: Phone, Email: Email,
    }

}], function(err, records) {
    if (err) {
        console.error(err);
        return;
    }
    records.forEach(function (record) {
        console.log(record.getId());
    });
});

// Обработка формы со страницы Pixel Fighter
exports.createMemberPixel = (Name, Phone, Email) => base('New Pixel').create([{
    "fields": {
        Name: Name, Phone: Phone, Email: Email,
    }

}], function(err, records) {
    if (err) {
        console.error(err);
        return;
    }
    records.forEach(function (record) {
        console.log(record.getId());
    });
});