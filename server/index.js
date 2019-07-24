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


// requires the model with Passport-Local Mongoose plugged in
import User from './models/user';

// use static authenticate method of model in LocalStrategy
passport.use(User.createStrategy());

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.listen("3000", () => {console.log("Running on port localhost:3000")})