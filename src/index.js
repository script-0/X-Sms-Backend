var dotenv = require('dotenv')
dotenv.config();

const express = require('express')
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const session = require('express-session');
const multer = require('multer');
var upload = multer();

// Configure express
const app = express()
app.use(session({ secret: process.env.SESSION_PASSWORD, cookie: { maxAge: parseInt(process.env.SESSION_PASSWORD) }}))

// Configure the root route
app.get('/', (req, res) => {
  if (req.session.page_views) {
    req.session.page_views += 1;
    res.send('Vous avez visité cette page ' + req.session.page_views + ' fois!');
  }
  else {
    req.session.page_views = 1;
    res.send("Bienvenue sur express!");
  }
});

// Launch express server on port 3000
app.listen(3000);

// Initalize body parser to parse JSON objects
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Initialize authentication system
// var auth = require('./auth/auth.js')
// auth(app)

// Initialize routes
var routes = require("./routes.js")
routes(app)

console.log('API server started on: ' + 3000);