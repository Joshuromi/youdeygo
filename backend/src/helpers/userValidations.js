const userModel = require("../model/userModel");
const  { validName,validFullName, validEmail, validPhoneNumber } = require('./regEx') ;

// Check if email already in the database
const checkEmail = (email) => userModel.findOne({ email });

// Check if phoneNumber already in the database
const checkPhoneNumber = (phoneNumber) => userModel.findOne({  phoneNumber }); 
/**
 * @description validate user details
 * @class Validations
 */
class validations {
  /**
   * @description validate user details
   * @function signupValidations
   * @param {object} body
   * @returns {Array} signupErrors
   */
  static async signupValidations(body) {
    const { fullName, phoneNumber, email, password, confirmPassword } = body; 
    const signupErrors = {};
    const emailAlreadyExist = await checkEmail(email);
    const phoneNumberAlreadyExist = await checkPhoneNumber(phoneNumber);

    if (!fullName || !validFullName.test(fullName)) {
      signupErrors.fullName = [];
      signupErrors.fullName.push(
        'First, Middle and Last name must be at least 3 alphabetical characters each'
      );
    }

    if (!phoneNumber || !validPhoneNumber.test(phoneNumber)) {
      signupErrors.phoneNumber = [];
      signupErrors.phoneNumber.push(
        'Phone Number is required and must be up to 11 digits'
      );
    }
    if (phoneNumberAlreadyExist) {
      signupErrors.phoneNumber = [];
      signupErrors.phoneNumber.push(
        'Phone Number already exist'
      );
    }

    if (!email || !validEmail.test(email)) {
      signupErrors.email = [];
      signupErrors.email.push('Invalid Email Format');
    }

    if (emailAlreadyExist) {
      signupErrors.email = [];
      signupErrors.email.push('Email already exist');
    }

    if (!password || password.length < 3) {
      signupErrors.password = [];
      signupErrors.password.push(
        'Password is required, with at least three characters'
      );
    }

    if (!confirmPassword || confirmPassword !== password) {
      signupErrors.confirmPassword = [];
      signupErrors.confirmPassword.push("Passwords don't match");
    }
    return signupErrors;
  }

  /**
   * @description validate user details
   * @function signinValidations
   * @param {object} body
   * @returns {Array} siginErrors
   */
  static signinValidations(body) {
    const { email, password } = body;
    const siginErrors = {};

    if (!email || !validEmail.test(email)) {
      siginErrors.email = [];
      siginErrors.email.push('Invalid Email Format');
    }

    if (!password || password.length < 2) {
      siginErrors.password = [];
      siginErrors.password.push('Password must be at least three characters');
    }

    return siginErrors;
  }

  /**
   * @description validate user details
   * @function editValidations
   * @param {object} body
   * @returns {Array} editErrors
   */
  static async editValidations(body, userId) {
    const { fullName, email, phoneNumber } = body;
    const editErrors = {};
    const emailAlreadyExist = await checkEmail(email);
    const phoneNumberAlreadyExist = await checkPhoneNumber(phoneNumber);

    if (!fullName || fullName.length < 7 || !validName.test(fullName)) {
      signupErrors.fullName = [];
      signupErrors.fullName.push(
        'Full name is required, with at least seven alphabetical characters'
      );
    }

     
    if (!email || !validEmail.test(email)) {
      editErrors.email = [];
      editErrors.email.push('Invalid Email Format');
    }
    if (emailAlreadyExist !== null && emailAlreadyExist.dataValues.email.length > 0 && emailAlreadyExist.dataValues.id !== userId
    ) {
      editErrors.email = [];
      editErrors.email.push('User with this email already exist');
    }

    if (!phoneNumber || !validPhoneNumber.test(phoneNumber)) {
      editErrors.phoneNumber = [];
      editErrors.phoneNumber.push('Phone Number is required and must be up to 11 digits');
    }

    if (phoneNumberAlreadyExist !== null
      && phoneNumberAlreadyExist.dataValues.phoneNumber.length > 0
      && phoneNumberAlreadyExist.dataValues.id !== userId
    ) {
      editErrors.phoneNumber = [];
      editErrors.phoneNumber.push('User with this phone number already exist');
    }
    return editErrors;
  }
}
module.exports = validations