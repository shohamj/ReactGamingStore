import express from 'express';
import signupValidator from '../../shared/validation/signupValidation.js';
import User from '../models/user';
import isEmpty from 'lodash/isEmpty';
import {getKey, getPublicKey} from '../../shared/encryption/RSAKey.js';
import {Decrypt, CreateKeyFromPublic, Encrypt} from '../../shared/encryption/RSAUtills.js';

let router = express.Router();  


function extendedSignupValidator(data, signupValidator){
    let {errors} = signupValidator(data);
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
router.post('/signup', (req,res) => {
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
        else{
            const data = {...req.body, admin: false};
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

router.get('/key', (req,res) => {
    let pub = getPublicKey();
    let pubkey = CreateKeyFromPublic(pub);
    console.log(pub);
    res.send(pub);
})
export default router;