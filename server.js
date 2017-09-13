//=============================================================================
//								Main Server File
//=============================================================================

// adding dependencies
const express 				= require("express"),
	  bodyParser 			= require("body-parser"),
	  dotenv 				= require('dotenv').config(),
	  passport				= require('passport'),
	  LocalStrategy 		= require('passport-local').Strategy,
	  passportLocalMongoose = require('passport-local-mongoose'),
	  expressSession		= require('express-session'),
	  mongoose 				= require("mongoose"),
	  User					= require('./models/User');


const app = express();

app.use(expressSession({
	secret: "AC Torino is the best team in the world",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Set up a default port, configure mongoose, configure our middleware
const PORT = process.env.PORT || 4000;

// Connect mongoose to our database
const db = process.env.MONGODB_URI || "mongodb://localhost/ridemate";

mongoose.connect(db, function(error) {
  if (error) {
    console.error(error);
  }
  else {
    console.log("mongoose connection is successful");
  }
});

// enable CORS
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
//   next();
// });

// routes

// Routes
const htmlRoutes = require("./controllers/htmlController.js");
const authRoutes = require("./controllers/authController.js");

app.use("/", htmlRoutes)
app.use("/signup", authRoutes)

// app.get("/", (req, res) => {
// 	res.send({ hi: "there" });
// });

// app.get('/signup', (req, res) => {
// 	res.send('signup.html');
// });

// Start the server
app.listen(PORT, function() {
	console.log('=============================================================');
  	console.log("Now listening on port %s! Visit localhost:%s in your browser.", PORT, PORT);
});