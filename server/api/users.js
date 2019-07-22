import express from 'express';
import signupValidator from '../../shared/validation/signupValidation.js'
import User from '../models/user';
import isEmpty from 'lodash/isEmpty'

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
    extendedSignupValidator(req.body, signupValidator)
    .then(({errors, isValid}) => {
        if (!isValid){
            res.status(400).json(errors);
        }
        else{
            const data = {...req.body, admin: false,};
            delete data.ConfirmPassword;
            const user = new User(data)
            user.save()
            .then(result => {console.log(result);
                            res.send("Success")})
            }
        }
    ).catch(err=>{console.log(err);res.status(500).json(err);})
})

export default router;