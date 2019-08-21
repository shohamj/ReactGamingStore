import validator from 'validator';
import isEmpty from 'lodash/isEmpty'

function postValidator(data, image){
    let errors = {};

    if (image == undefined)
        errors.image = "This field is required";
    if (validator.isEmpty(data.author))
        errors.author = "This field is required";
    if (data.categories.length < 1)
        errors.categories = "You must choose at least one category";
    if (validator.isEmpty(data.title))
        errors.title = "This field is required";
    if (validator.isEmpty(data.text))
        errors.text = "This field is required";
    
    return {
        errors,
        isValid: isEmpty(errors)
    }

}

export default postValidator;
