const userModel = require("../models/userModel");
const  { validName, validEmail, validPhoneNumber } = require('./regEx') ;

// Check if email already in the database
const checkEmail = (email) => userModel.findOne({ email : email.toLowerCase() });

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
      signupErrors.message =  'First name is required, with at least three alphabetical characters';
    }
   
    if (!lastName || lastName.length < 3 || !validName.test(lastName)) {
      signupErrors.message = 'Last name is required, with at least three alphabetical characters';
    } 
    
    if (!email || !validEmail.test(email)) {
      signupErrors.message = 'Invalid Email Format';
    }

    if (emailAlreadyExist) {
      signupErrors.message = 'Email already exist';
    }

    if (!password || password.length < 3) {
      signupErrors.message = 'Password is required, with at least three characters';
    }

    if (!confirmPassword || confirmPassword !== password) {
      signupErrors.message = 'Passwords don\'t match';
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
      signinErrors.message = 'Invalid Email Format';
    }

    if (!password || password.length < 2) {
      signinErrors.message = 'Password must be at least three characters';
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
      editErrors.message = 'First name is required, with at least three alphabetical characters';
    }
   
    if (!lastName || lastName.length < 3 || !validName.test(lastName)) {
      editErrors.message = 'Last name is required, with at least three alphabetical characters';
    }
    if (!email || !validEmail.test(email)) {
      editErrors.message = 'Invalid Email Format';
    }
   
    if (emailAlreadyExist !== null && emailAlreadyExist.email.length > 0 && emailAlreadyExist.id !== userId
      ) {
        editErrors.message = 'User with this email already exist';
      }
    if (!phoneNumber || !validPhoneNumber.test(phoneNumber)) {
      editErrors.message = 'Phone Number is required and must be up to 11 digits';
    }

    if (phoneNumberAlreadyExist !== null
      && phoneNumberAlreadyExist.phoneNumber.length > 0
      && phoneNumberAlreadyExist.id !== userId
    ) {
      editErrors.message = 'User with this phone number already exist';
    }
    return editErrors;
  }
}
module.exports = validations