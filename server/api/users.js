import express from 'express';
import signupValidator from '../../shared/validation/signupValidation.js';
import signinValidator from '../../shared/validation/signinValidation.js';
import User from '../models/user';
import isEmpty from 'lodash/isEmpty';
import {getKey, getPublicKey} from '../../shared/encryption/RSAKey.js';
import pbkdf2_sha256_promise from '../../shared/encryption/pbkdf2.js';
import {Decrypt, CreateKeyFromPublic, Encrypt} from '../../shared/encryption/RSAUtills.js';
import crypto from 'crypto';

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
    let key = getKey();
    let pub = getPublicKey();
    console.log(pub);
    req.body.password = Decrypt(req.body.password, key);
    req.body.confirmPassword = Decrypt(req.body.confirmPassword, key);
    extendedSignupValidator(req.body, signupValidator)
    .then(({errors, isValid}) => {
        if (!isValid){
            //setTimeout(() => res.status(400).json(errors), 5000);
            res.status(400).json(errors);
        }
        else{
            let data = {...req.body};
            if (data.role == undefined)
                data.role="customer";
            let password = data.password;
            delete data.confirmPassword;
            delete data.password;
            User.register(new User(data),password)
            .then(user => res.send("Success"))
            .catch(err => res.status(500).json(err))
            }
        }
    ).catch(err=>{console.log(err);res.status(500).json(err);})
})

router.post('/signin', (req,res) => {
    console.log(req.session);
    extendedSigninValidator(req.body, req.session.challenge, signinValidator)
    .then(({errors, isValid}) => {
        if (!isValid){
            console.log(errors);
            res.status(400).json(errors);
        }
        else
        {
            User.findOne({username:req.body.username})
            .then(user => req.logIn(user, function(){
                res.send({username:req.body.username, role:req.body.role})
            }))    
        }
    }
    ).catch(err=>{console.log(err);res.status(500).json(err);})
})

router.get('/signout', (req,res) => {
    req.logout();
    res.send("Success");
})

router.get('/key', (req,res) => {
    //setTimeout(() => res.send(getPublicKey()), 5000);
    res.send(getPublicKey());
})

router.post('/deleteUser', (req,res) => {
    User.remove({ _id: req.body.id }, function(err) {
        if (!err) {
            res.send("error");
        }
        else {
            res.send("success");
        }
    });
})

router.post('/updateUser', (req,res) => {
    User.findOneAndUpdate({ _id: req.body.id}, req.body.update , function(err) {
        if (!err) {
            res.send("error");
        }
        else {
            res.send("success");
        }
    });
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

router.get('/user', (req,res) => {
    if (req.user)
        res.json({username:req.user.username, role:req.user.role})
    else
        res.json({});  
})

router.get('/usersList', function(req, res) {
    User.find({}, function(err, users) {
      res.send(users);  
    });
  });
export default router;