//Packages needed for express
import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import passport from 'passport'
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import session from 'express-session';

//Packages needed for webpack
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.dev.js'

// requires the model with Passport-Local Mongoose plugged in
import User from './models/user';

//Routers
import users from './api/users';
import games from './api/games';
import orders from './api/orders';
import contact from './api/contact';
import forgot from './api/forgot';

//Mongoose 
let sessConnStr = 'mongodb+srv://admin:q1w2e3r4@internetcourse-bu1ca.mongodb.net/ReactGamingStore?retryWrites=true';
mongoose.connect(sessConnStr,{ useNewUrlParser: true });

//Middleware
let app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//Using webpack as middleware to bundle all js
const compiler = webpack(webpackConfig);
app.use(webpackMiddleware(compiler));
app.use(webpackHotMiddleware(compiler,{
    hot: true, 
    publicPath: webpackConfig.output.publicPath,
    noInfo: true
}));

//Session
let secret = 'Doodi Shark'; // must be the same one for cookie parser and for session
app.use(cookieParser(secret));
app.use(session({
    name: 'rgs.sid',         // the name of session ID cookie
    secret: secret,            // the secret for signing the session ID cookie
    resave: false,             // do we need to resave unchanged session? (only if touch does not work)
    saveUninitialized: false,  // do we need to save an 'empty' session object?
    rolling: true,             // do we send the session ID cookie with each response?
    cookie: { maxAge: 15*60*1000, httpOnly: true, sameSite: true }  // cookie parameters
    // NB: maxAge is used for session object expiry setting in the storage backend as well
}));
app.use(passport.initialize());
app.use(passport.session());

// use static authenticate method of model in LocalStrategy
passport.use(User.createStrategy());

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes
app.use('/api/users', users);
app.use('/api/games', games);
app.use('/api/orders', orders);
app.use('/api/contact', contact);
app.use('/api/forgot', forgot);

//Express server
app.get("/*",  (req,res) =>{
    res.sendFile(path.join(__dirname,'./index.html'));
})

app.listen("3000", () => {console.log("Running on port localhost:3000")})