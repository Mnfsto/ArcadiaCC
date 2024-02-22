const express = require("express");
const path = require('path');
const { ObjectId, MongoClient, ServerApiVersion } = require('mongodb');
const PORT = process.env.PORT || 8081;
const handlers = require('./lib/handlers')
//ToDO:

const app = express();
const urlencodedParser = express.urlencoded({extended: false});


// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Handle GET requests to /api route
app.get("/api", handlers.api);


// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {

    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});


// airmax | Ec3SaBc2eciqg86Z
const url = "mongodb+srv://airmax:Ec3SaBc2eciqg86Z@testcluster.ynwolgf.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(url, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


(async () => {
    try {
        await client.connect();
        app.locals.collection = client.db("usersdb").collection("users");
        app.listen(PORT);
        console.log("Сервер ожидает подключения...");
    }catch(err) {
        return console.log(err);
    }
})()

process.on("SIGINT", async() => {

    await client.close();
    console.log("Приложение завершило работу");
    process.exit();
});