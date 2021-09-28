const emailMinLength = 13;
const emailMaxLength = 255;
const passwordMinLength = 3;
const passwordMaxLength = 32;
const verifiedEmailExtension = ['gmail.com', 'mail.ru'];

exports.isInteger = (value, messageError = 'value is not a number') => {
  if (!value) {
    throw { message: messageError };
  }

  if (!Number.isInteger(+value)) {
    throw { message: messageError };
  }
};

exports.isEmail = value => {
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

exports.isPassword = value => {
  if (!value) {
    throw { message: 'password is undefined' };
  }

  if (typeof value !== 'string') {
    throw { message: 'password not string' };
  }


  if (value.length < passwordMinLength || value.length > passwordMaxLength) {
    throw { message: `Password length must not be less than ${passwordMinLength} characters and more than ${passwordMaxLength}` };
  }
};
