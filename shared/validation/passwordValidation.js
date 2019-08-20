import validator from 'validator';
import isEmpty from 'lodash/isEmpty'

function passwordValidator(data){
    let errors = {};

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

export default passwordValidator;