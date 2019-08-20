import validator from 'validator';
import isEmpty from 'lodash/isEmpty'

function emailValidator(data){
    let errors = {};

    
    if (!validator.isEmail(data.email))
        errors.email = "Email is invalid";
    if (validator.isEmpty(data.email))
        errors.email = "This field is required";

    return {
        errors,
        isValid: isEmpty(errors)
    }

}

export default emailValidator;
