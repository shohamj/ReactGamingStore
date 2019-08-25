import validator from 'validator';
import isEmpty from 'lodash/isEmpty'

function updateInfoValidation(data){
    let errors = {};
    
    // if (data.newPassword == data.currentPassword)
    //     errors.newPassword = "New password can't be equal to the current one";
    if (validator.isEmpty(data.currentPassword))
        errors.currentPassword = "This field is required";
    if (!validator.isEmail(data.email))
        errors.email = "Email is invalid";
    if (validator.isEmpty(data.email))
        errors.email = "This field is required";
    return {
        errors,
        isValid: isEmpty(errors)
    }

}

export default updateInfoValidation;
