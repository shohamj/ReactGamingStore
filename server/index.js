//Packages needed for express
import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import passport from 'passport'
import session from 'express-session'
import mongoose from 'mongoose';

//Packages needed for webpack
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.dev.js'


//Routers
import users from './api/users';

//Mongoose 
let sessConnStr = 'mongodb+srv://admin:q1w2e3r4@internetcourse-bu1ca.mongodb.net/ReactGamingStore?retryWrites=true';
mongoose.connect(sessConnStr,{ useNewUrlParser: true });

//Middleware
let app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use('/api/users', users);

//Using webpack as middleware to bundle all js
const compiler = webpack(webpackConfig);
app.use(webpackMiddleware(compiler));
app.use(webpackHotMiddleware(compiler,{
    hot: true, 
    publicPath: webpackConfig.output.publicPath,
    noInfo: true
}));

//Express server
app.get("/*",  (req,res) =>{
    res.sendFile(path.join(__dirname,'./index.html'));
})



//Sessions
app.use(session({
    name: 'users.sid',         // the name of session ID cookie
    secret: "secret",            // the secret for signing the session ID cookie
    resave: false,             // do we need to resave unchanged session? (only if touch does not work)
    saveUninitialized: false,  // do we need to save an 'empty' session object?
    rolling: true,             // do we send the session ID cookie with each response?
    cookie: { maxAge: 900000, httpOnly: true, sameSite: true }  // cookie parameters
    // NB: maxAge is used for session object expiry setting in the storage backend as well
}));
app.use(passport.initialize());
app.use(passport.session());

app.listen("3000", () => {console.log("Running on port localhost:3000")})