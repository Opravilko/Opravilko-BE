require('dotenv').config()

let express = require('express');
let path = require('path');
let logger = require('morgan');
const http = require('http');

const hostname = '127.0.0.1';
const httpPort = 3000;

let mongoose = require('mongoose');
// let mongoDB = "mongodb://127.0.0.1/socioloski_in_poklicni_vidiki";
// mongoose.connect(mongoDB);
// mongoose.Promise = global.Promise;
// let db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
var options = {
  dbName: 'Opravilko',
  connectTimeoutMS: 30000, // čas v milisekundah
  socketTimeoutMS: 60000  // čas v milisekundah
};

mongoose.connect(process.env.database_uri, options)
  .then(() => console.log('DB Connected!'))
  .catch(err => {
  console.log(`DB Connection Error: ${err.message}`);
});

let app = express();
const httpServer = http.createServer(app);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

let mainRouter = require('./routes/main');
let apiRouter = require('./routes/apiRouter');

app.use('/', mainRouter);
app.use('/api', apiRouter);

httpServer.listen(httpPort, () => {
  console.log(`Server running at http://${hostname}:${httpPort}/`);
});