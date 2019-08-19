import validator from 'validator';
import isEmpty from 'lodash/isEmpty'

function chatUserValidator(name, image){
    let errors = {};

    if (image == undefined)
        errors.image = "This field is required";
    if (validator.isEmpty(name))
        errors.name = "This field is required";
   
    return {
        errors,
        isValid: isEmpty(errors)
    }

}

export default chatUserValidator;
