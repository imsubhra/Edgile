const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const favicon = require('serve-favicon');
const passport = require('passport');
const flash    = require('connect-flash');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
app.use(express.json());

// using dotenv module for environment
require("dotenv").config();

//setting up configuration for flash

const PORT = process.env.PORT || 3000;
//Mongoose connection
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to mongo server"))
  .catch((err) => console.error(err));

//Setting EJS view engine
app.set("view engine", "ejs");

app.use(session({secret: 'my_app_secret'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//body parser
app.use(
  express.urlencoded({
    extended: true,
  })
);
//Setup for rendering static pages
//for static page
const publicDirectory = path.join(__dirname, "../public");
app.use(express.static(publicDirectory));

//Routes===========================================
var indexRoutes = require("./routes/index");
var studentRoutes=require("./routes/student");
var courses = require('./routes/course');
var teachers = require('./routes/teacher');
var make_exam = require('./routes/exam_control_teacher');
var take_exam = require('./routes/exam_control_student');
var admin = require('./routes/admin');
var login = require('./routes/login');
app.use("/", indexRoutes);
app.use('/students', studentRoutes);
app.use('/courses', courses);
app.use('/teachers', teachers);
app.use('/make_exam', make_exam);
app.use('/take_exam', take_exam);
app.use('/admin', admin);
app.use('/login', login);

//Start the server
app.listen(PORT, () => {
    console.log("Server listening on port", PORT);
  });