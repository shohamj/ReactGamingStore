import express from 'express';
import signupValidator from '../../shared/validation/signupValidation.js'
let router = express.Router();  

router.post('/signup', (req,res) => {
    const {errors, isValid} = signupValidator(req.body);
    console.log({errors, isValid})
    if (!isValid){
        res.status(400).json(errors);
    }
    else{
        res.send("Success");
    }
})

export default router;