import express from 'express';
import signupValidator from '../../shared/validation/signupValidation.js';
import signinValidator from '../../shared/validation/signinValidation.js';
import emailValidator from '../../shared/validation/emailValidation.js';
import updateInfoValidator from '../../shared/validation/updateInfoValidation.js';
import User from '../models/user';
import isEmpty from 'lodash/isEmpty';
import {getKey, getPublicKey} from '../../shared/encryption/RSAKey.js';
import pbkdf2_sha256_promise from '../../shared/encryption/pbkdf2.js';
import {Decrypt, CreateKeyFromPublic, Encrypt} from '../../shared/encryption/RSAUtills.js';
import crypto from 'crypto';
import request from 'request';
import userMiddleware from '../middlewares/userMiddleware'
let router = express.Router();  

function extendedSignupValidator(data, validator){
    let {errors} = validator(data);
    return User.find().or([{username: data.username}, {email:data.email}]).exec()
    .then(users => {
        users.forEach(function(user){
            if( user.username === data.username)
                errors.username = "This username is already taken"
            if(user.email === data.email)
                errors.email = "This email is already taken"
       });
        return { errors, isValid: isEmpty(errors) }
    })
}

function extendedEmailValidator(id, data, validator){
    let {errors} = validator(data);
    return User.findOne({email:data.email}).exec()
    .then(userFound => {
        if (userFound && !userFound._id.equals(id))
            errors.email = "Email already exists"
        return { errors, isValid: isEmpty(errors) }
    })
}

function extendedSigninValidator(data, challenge, validator){
    let {errors} = validator(data);
    console.log(challenge);
    return User.findOne({username:data.username}).select("+hash")
    .then(user => {
        if (user == null){
            errors.general = "Username and password do not match";
            return ""
        }
        return user.hash;
    })
    .then(hash => pbkdf2_sha256_promise(hash, challenge))
    .then(res => {
        console.log(res);
        console.log("********************************************************************");
        console.log(data.password);
        if (res !== data.password)
            errors.general = "Username and password do not match";
    })
    .catch(err => {console.log(err);errors.general="Database error"})
    .then( () => {return { errors, isValid: isEmpty(errors)}})
}
router.post('/signup', (req,res) => {
    if ((!req.user || req.user.role !=="manager") && (req.body.captcha === undefined || req.body.captcha === '' || req.body.captcha === null) )
        return res.status(400).json({general: 'Missing human verification'});

    const secretKey = "6LeC3LMUAAAAAKoCaeLAaiOju8BG5K6vZEblrwhH";
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`;

    let key = getKey();
    let pub = getPublicKey();
    console.log(pub);
    req.body.password = Decrypt(req.body.password, key);
    req.body.confirmPassword = Decrypt(req.body.confirmPassword, key);
    extendedSignupValidator(req.body, signupValidator)
    .then(({errors, isValid}) => {
        if (!isValid){
            res.status(400).json(errors);
        }
        else
            request(verifyUrl, function (error, response, body) {
                body = JSON.parse(body);
                if ((!req.user || req.user.role !=="manager") && !body.success)
                    return res.status(400).json({general: 'Human verification failed'});
                let data = {...req.body};
                if (data.role == undefined || !req.user || req.user.role!=='manager')
                    data.role="customer";
                let password = data.password;
                delete data.confirmPassword;
                delete data.password;
                User.register(new User(data),password)
                .then(user => res.send("Success"))
                .catch(err => res.status(500).json(err))
            });
    }).catch(err=>{console.log(err);res.status(500).json(err);})
})

router.post('/signin', (req,res) => {
    if (req.body.captcha === undefined || req.body.captcha === '' || req.body.captcha === null)
        return res.status(400).json({general: 'Missing human verification'});

    const secretKey = "6LeC3LMUAAAAAKoCaeLAaiOju8BG5K6vZEblrwhH";
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`;

    extendedSigninValidator(req.body, req.session.challenge, signinValidator)
    .then(({errors, isValid}) => {
        if (!isValid){
            console.log(errors);
            res.status(400).json(errors);
        }
        else
            request(verifyUrl, function (error, response, body) {
                body = JSON.parse(body);
                console.log(body);
                if (!body.success)
                    return res.status(400).json({general: 'Human verification error'});
                User.findOne({username:req.body.username})
                .then(user => req.logIn(user, function(){
                    res.send({username:req.body.username, role:req.body.role})
                })) 
            })   

    }
    ).catch(err=>{console.log(err);res.status(500).json(err);})
    
})

router.get('/signout', (req,res) => {
    req.logout();
    res.send("Success");
})

router.get('/key', (req,res) => {
    res.send(getPublicKey());
})

router.post('/deleteUser',userMiddleware(['manager']), (req,res) => {
    if (req.userError)
        return res.status(401).send(req.userError);
    User.remove({ _id: req.body.id }, function(err) {
        if (!err) {
            res.send("error");
        }
        else {
            res.send("success");
        }
    });
})

router.post('/updateUser',userMiddleware(['manager']), (req,res) => {
    if (req.userError)
        return res.status(401).send(req.userError);
    extendedEmailValidator(req.body.id, req.body.update, emailValidator)
    .then(({errors, isValid}) => {
        if (!isValid){
            res.status(400).json(errors);
        }
        else User.findOneAndUpdate({ _id: req.body.id}, req.body.update , function(err) {
            if (err) {
                console.log(err);
                return res.status(400).json({general: 'Database Error'});
            }
            else {
                res.send("success");
            }
        });
    })
    
})

router.post('/updateInfo',userMiddleware(), (req,res) => {
    if (req.userError)
        return res.status(401).send(req.userError);
    let key = getKey();
    let currentPassword = Decrypt(req.body.currentPassword, key);
    let newPassword = Decrypt(req.body.newPassword, key);
    console.log(newPassword);
    if (newPassword === '' || newPassword === undefined)
        newPassword = currentPassword;

    extendedEmailValidator(req.user._id, {currentPassword, email:req.body.email}, updateInfoValidator)
    .then(({errors, isValid}) => {
        if (!isValid)
            res.status(400).json(errors);
        else
            User.findOne({username: req.user.username}, function (err,user){
                if (err || !user)
                    return res.status(400).json({general: "Database Error"})
                user.changePassword(currentPassword, newPassword, function(err){
                    if (!err){
                        user.email = req.body.email;
                        user.save(function(saveErr){
                            if(!saveErr)
                                return res.send("Info Updated")
                            else
                                return res.status(400).json({general: "Database Error"})
                        })
                    }
                    else{
                        console.log(err);
                        return res.status(400).json({currentPassword: "Incorrect password"})
                    }
                })
            })
    })

})

//Async and not promise because we were noobs at lab7
router.post('/challenge_response', async (req, res) => {
        console.log(req.body);
    User.findOne({
      username: req.body.username
    }, function (err, user) {
      console.log(err, user);
      if (user !== null) {
        crypto.randomBytes(32, function (err, buf) {
          let challenge = buf.toString('hex');
          let salt = user.salt;
          req.session.challenge = challenge;
          console.log(req.session);
          return res.send({
            salt,
            challenge
          });
        });
      } 
      else{
        req.session.challenge = "";
        res.send({salt:"", challenge:""});
      }        
    }).select("+salt")
  });

router.get('/user',userMiddleware(['manager']), (req,res) => {
    if (req.user)
        res.json({
            username:req.user.username, 
            role:req.user.role, 
            email:req.user.email, 
            joined:req.user.joined,
            games_bought:req.user.games_bought,
            money_spent:req.user.money_spent
        })
    else
        res.json({});  
})

router.get('/usersList', function(req, res) {
    if (req.userError)
        return res.status(401).send(req.userError);
    User.find({}, function(err, users) {
      res.send(users);  
    });
  });
export default router;