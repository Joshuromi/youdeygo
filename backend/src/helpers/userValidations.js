const userModel = require("../models/userModel");
const  { validName, validEmail, validPhoneNumber } = require('./regEx') ;

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
    const { firstName, lastName, email, password, confirmPassword } = body; 
    const signupErrors = {};
    const emailAlreadyExist = await checkEmail(email); 

    if (!firstName || firstName.length < 3 || !validName.test(firstName)) {
      signupErrors.firstName = [];
      signupErrors.firstName.push(
        'First name is required, with at least three alphabetical characters'
      );
    }
   
    if (!lastName || lastName.length < 3 || !validName.test(lastName)) {
      signupErrors.lastName = [];
      signupErrors.lastName.push(
        'Last name is required, with at least three alphabetical characters'
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
   * @returns {Array} signinErrors
   */
  static signinValidations(body) {
    const { email, password } = body;
    const signinErrors = {};

    if (!email || !validEmail.test(email)) {
      signinErrors.email = [];
      signinErrors.email.push('Invalid Email Format');
    }

    if (!password || password.length < 2) {
      signinErrors.password = [];
      signinErrors.password.push('Password must be at least three characters');
    }

    return signinErrors;
  }

  /**
   * @description validate user details
   * @function editValidations
   * @param {object} body
   * @returns {Array} editErrors
   */
  static async editValidations(body, userId) {
    const { firstName, lastName, email, phoneNumber } = body;
    const editErrors = {};
    const emailAlreadyExist = await checkEmail(email);
    const phoneNumberAlreadyExist = await checkPhoneNumber(phoneNumber);

    if (!firstName || firstName.length < 3 || !validName.test(firstName)) {
      signupErrors.firstName = [];
      signupErrors.firstName.push(
        'First name is required, with at least three alphabetical characters'
      );
    }
   
    if (!lastName || lastName.length < 3 || !validName.test(lastName)) {
      signupErrors.lastName = [];
      signupErrors.lastName.push(
        'Last name is required, with at least three alphabetical characters'
      );
    }
    if (!email || !validEmail.test(email)) {
      editErrors.email = [];
      editErrors.email.push('Invalid Email Format');
    }
   
    if (emailAlreadyExist !== null && emailAlreadyExist.email.length > 0 && emailAlreadyExist.id !== userId
      ) {
        editErrors.email = [];
        editErrors.email.push('User with this email already exist');
      }
    if (!phoneNumber || !validPhoneNumber.test(phoneNumber)) {
      editErrors.phoneNumber = [];
      editErrors.phoneNumber.push('Phone Number is required and must be up to 11 digits');
    }

    if (phoneNumberAlreadyExist !== null
      && phoneNumberAlreadyExist.phoneNumber.length > 0
      && phoneNumberAlreadyExist.id !== userId
    ) {
      editErrors.phoneNumber = [];
      editErrors.phoneNumber.push('User with this phone number already exist');
    }
    return editErrors;
  }
}
module.exports = validations