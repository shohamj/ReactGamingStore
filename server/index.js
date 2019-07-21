//Packages needed for express
import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
//Packages needed for webpack
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.dev.js'

//Routers
import users from './api/users';

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

app.listen("3000", () => {console.log("Running on port localhost:3000")})