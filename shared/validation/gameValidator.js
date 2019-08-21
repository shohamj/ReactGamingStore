import validator from 'validator';
import isEmpty from 'lodash/isEmpty'

function gameValidator(data, image){
    let errors = {};
    console.log("data");
    console.log(data);
    console.log("image");
    console.log(image);

    if (image == undefined)
        errors.image = "This field is required";
    if (validator.isEmpty(data.name))
        errors.name = "This field is required";
    if (data.genre.length < 1)
        errors.genre = "You must choose at least one genre";
    if (data.genre.length < 1)
        errors.platform = "You must choose at least one platform";
    if (data.price == undefined)
        errors.price = "This field is required";
    if (validator.isEmpty(data.description))
        errors.description = "This field is required";
    if (data.price < 0)
        errors.price = "Price must be a positive number";
    if (validator.isEmpty(data.released))
        errors.released = "This field is required";
    if (!validator.isISO8601(data.released))
        errors.release = "Date format is YYYY-MM-DD";

    
    return {
        errors,
        isValid: isEmpty(errors)
    }

}

export default gameValidator;
