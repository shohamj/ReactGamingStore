import validator from 'validator';
import isEmpty from 'lodash/isEmpty'

function signupValidator(data){
    let errors = {};

    if (validator.isEmpty(data.username))
        errors.username = "This field is required";
    if (!validator.isEmail(data.email))
        errors.email = "Email is invalid";
    if (validator.isEmpty(data.email))
        errors.email = "This field is required";
    if (validator.isEmpty(data.password))
        errors.password = "This field is required";
    if (validator.isEmpty(data.confirmPassword))
        errors.confirmPassword = "This field is required";
    if (data.password != data.confirmPassword)
        errors.confirmPassword = "Passwords must match";
    
    return {
        errors,
        isValid: isEmpty(errors)
    }

}

export default signupValidator;
