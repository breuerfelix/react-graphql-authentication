import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

function validateLogin(data) {
    const errors = {};

    //password
    if (validator.isEmpty(data.password + '')) {
        errors.password = 'This field is required!';
    }

    //username
    if (validator.isEmpty(data.username + '')) {
        errors.username = 'This field is required!';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}

function validateInput(data) {
    const { errors, isValid } = validateLogin(data)

    //email
    if (validator.isEmpty(data.email + '')) {
        errors.email = 'This field is required!';
    }
    if (!validator.isEmail(data.email + '')) {
        errors.email = 'Email is invalid!';
    }

    //password
    var pw = true;
    if (validator.isEmpty(data.password + '')) {
        errors.password = 'This field is required!';
        pw = false;
    }
    if (validator.isEmpty(data.passwordConfirm + '')) {
        errors.passwordConfirm = 'This field is required!';
        pw = false;
    }
    if (pw) {
        if (data.password !== data.passwordConfirm) {
            errors.passwordConfirm = 'Passwords do not match!';
        }
    }

    //gender
    if (validator.isEmpty(data.gender + '')) {
        errors.gender = 'This field is required!';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = {
    validateInput: validateInput,
    validateLogin: validateLogin
}