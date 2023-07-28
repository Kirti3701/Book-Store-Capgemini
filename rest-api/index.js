//db connection
const { error } = require('console');
const createError = require('http-errors');
let express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    mongoDb = require('./database/db');

mongoose.Promise = global.Promise;
mongoose.connect(mongoDb.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DataBase Connected Successfully")
},
    error => {
        console.log("DataBase Error : " + error)
    })

//Port and Server
//import bookRoute from './node-backend/routes/book.routes.js';
const bookRoute = require("./node-backend/routes/book.routes");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());
//API Router
app.use('/api', bookRoute);
//Static Path
app.use(express.static(path.join(__dirname, 'dist/BookStoreManagement')));
//base route
app.get('/', (req, res) => {
    res.send("Invalid Endpoint")
})
//Port
const port = process.env.port || 8000;
app.listen(port, ()=>{
    console.log(`Listening on Port: http://localhost:${port}/api`);
});

//404 Error Handler
app.use((req, res, next) => {
    next(createError(404));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname , 'dist/BookStoreManagement/index.html'));
});
app.use(function (err, req, res, next) {
    console.log(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});

module.exports = app;