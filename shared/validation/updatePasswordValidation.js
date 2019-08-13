import validator from 'validator';
import isEmpty from 'lodash/isEmpty'

function updatePasswordValidation(data){
    let errors = {};
    
    if (data.newPassword == data.currentPassword)
        errors.newPassword = "New password can't be equal to the current one";
    if (validator.isEmpty(data.currentPassword))
        errors.currentPassword = "This field is required";
    if (validator.isEmpty(data.newPassword))
        errors.newPassword = "This field is required";
    return {
        errors,
        isValid: isEmpty(errors)
    }

}

export default updatePasswordValidation;
