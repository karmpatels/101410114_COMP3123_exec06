const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const noteRoutes = require('./routes/NoteRoutes'); // Import the routes

const DB_URL = "mongodb+srv://karmpatels:chandrika%2376@karmpatels.wlqbe.mongodb.net/karmpatels?retryWrites=true&w=majority";
mongoose.connect(DB_URL, { useNewUrlParser: true })
    .then(() => {
        console.log("Successfully connected to the MongoDB Atlas server");
    })
    .catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    });
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database mongoDB Atlas Server");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.get('/', (req, res) => {
    res.send("<h1>Welcome to Note taking application - Week06 Exercise</h1>");
});

// Use the routes
app.use('/', noteRoutes);

app.listen(8081, () => {
    console.log("Server is listening on port 8081");
});
