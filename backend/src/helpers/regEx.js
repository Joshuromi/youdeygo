/**
* @description check valid name
*/
const validName = /^[a-zA-z]{2,20}$/;

/**
* @description check valid number
*/
const validNumber = /^[0-9]*$/;

/**
* @description check valid phone number
*/
const validPhoneNumber = /^[0-9]{11}$/;

/**
 * @description check valid email
*/
const validEmail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

/**
 * @description check valid time
*/
const validTime =  /((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))/;

module.exports = { validName, validNumber, validPhoneNumber, validEmail, validTime };
