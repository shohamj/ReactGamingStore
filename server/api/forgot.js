import express from 'express';
import emailValidation from '../../shared/validation/emailValidation.js';

let router = express.Router();  

const User = require('./../models/user');

var async = require("async");
var nodemailer = require("nodemailer");
var crypto = require("crypto");

import {getKey, getPublicKey} from './../../shared/encryption/RSAKey';
var tokenW = "";
// forgot password
router.post('/',function(req, res, next) {
  var response = res;
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        console.log(token);
        done(err, token);
        tokenW = token;
      });
    },
    function(token, done) {
      User.findOne({ email: req.body.email }, function(err, user) {
        console.log(user);
        if (!user) {
          console.log('!user redirect /forgot', user);
          return res.status(400).send('Fail');
        }
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + (1000 * 60 * 60 * 1); // 1 hour

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
          user: 'React2019JCT@gmail.com',
          pass: "React2019JCT" // We know this isn't safe, but we don't care (so edgy)
        },
        tls: {
            rejectUnauthorized: false
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'React2019JCT@gmail.com',
        subject: 'Exercise 6 Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/forgotPassword/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        console.log('mail sent');
        //req.flash('success', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
        return res.send('Success');
        done(err, 'done');
      });
    }
  ], function(err) {
    if (err) return next(err);
    res.send('error');
  });
});

router.get('/reset/:token', function(req, res) {
  User.findOne({ resetPasswordToken: tokenW, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if (!user) {
      //req.flash('error', 'Password reset token is invalid or has expired.');
      return res.redirect('/forgot');
    }
    res.render('reset', {token: req.params.token, title: "Reset"});
  });
});

router.post('/reset/:token', function(req, res) {
    console.log('entered to reset after sending the new pass', tokenW);
  async.waterfall([
    function(done) {
      User.findOne({ resetPasswordToken: tokenW, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        console.log('entered to reset after sending the new pass');
        if (!user) {
          //req.flash('error', 'Password reset token is invalid or has expired.');
          return res.redirect('/forgot');
        }
        var decryptedPassword = getKey().decrypt(req.body.password, "utf-8");
        var decryptedConfirm = getKey().decrypt(req.body.confirmPassword, "utf-8");
        if(decryptedPassword === decryptedConfirm) {
            console.log('entered to reset after sending the new pass');
          user.setPassword(decryptedPassword, function(err) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;

            user.save(function(err) {
              req.logIn(user, function(err) {
                done(err, user);
              });
            });
          })
        } else {
            //req.flash("error", "Passwords do not match.");
            return res.redirect('/forgot');
        }
      });
    },
    function(user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'Gmail', 
        auth: {
          user: 'React2019JCT@gmail.com',
          pass: "React2019JCT" // We know this isn't safe, but we don't care (so edgy)
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'React2019JCT@gmail.com',
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        //req.flash('success', 'Success! Your password has been changed.');
        done(err);
      });
    }
  ], function(err) {
    res.redirect('/');
  });
});        

export default router;
