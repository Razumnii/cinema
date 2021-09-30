const moment = require('moment');

const emailMinLength = 13;
const emailMaxLength = 255;
const passwordMinLength = 3;
const passwordMaxLength = 32;
const verifiedEmailExtension = ['gmail.com', 'mail.ru'];

const isTime = (value, timeFormat, messageError = 'time is not a valid') => {
  isString(value);

  if (!moment(value, timeFormat, true).isValid()) {
    throw { message: messageError };
  }
};

const isInteger = (value, messageError = 'value is not a number') => {
  if (!value) {
    throw { message: messageError };
  }

  if (!Number.isInteger(+value)) {
    throw { message: messageError };
  }
};

const isString = (value, messageError = 'value is not a string') => {
  if (!value) {
    throw { message: messageError };
  }

  if (typeof value !== 'string') {
    throw { message: messageError };
  }
};

const isEmail = value => {
  if (!value) {
    throw { message: 'email is undefined' };
  }

  if (typeof value !== 'string') {
    throw { message: 'email not string' };
  }

  if (value.length < emailMinLength || value.length > emailMaxLength) {
    throw { message: `Mail length must not be less than ${emailMinLength} characters and more than ${emailMaxLength}` };
  }

  if (!value.match('@')) {
    throw { message: 'email not valid' };
  }

  if (!verifiedEmailExtension.includes(value.split('@')[1])) {
    throw { message: 'email not valid' };
  }
};

const isPassword = value => {
  if (!value) {
    throw { message: 'password is undefined' };
  }

  if (typeof value !== 'string') {
    throw { message: 'password not string' };
  }

  if (value.length < passwordMinLength || value.length > passwordMaxLength) {
    throw {
      message: `Password length must not be less than ${passwordMinLength} characters and more than ${passwordMaxLength}`,
    };
  }
};

const checkLength = (value, { min, max, minLengthError, maxLengthError }) => {
  const defaultError = 'the value has not a valid length';

  if (!min && !max) {
    throw { message: 'fuck you' };
  }

  isString(value);

  if (min && value.length < min) {
    isInteger(min);
    throw { message: minLengthError || defaultError };
  }

  if (max && value.length > max) {
    isInteger(max);
    throw { message: maxLengthError || defaultError };
  }
};

module.exports = {
  isTime,
  isInteger,
  isString,
  isEmail,
  isPassword,
  checkLength,
};
