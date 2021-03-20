/* eslint-disable no-plusplus */
/* eslint-disable radix */
const bcrypt = require('bcryptjs');
const createToken = require('../helpers/createToken');
const userModel = require('../model/userModel')

const saltRounds = 10; 
/**
 * @description user controller
 * class user
 */
class user {
  /**
     * @description signup a user into database
     * @method userRegister
     * @param {*} req
     * @param {*} res
     */
  static async register(req, res) { 
    const { fullName, phoneNumber, email, password } = req.body;
    await bcrypt.hash(password, saltRounds, async (error, hash) => { 
      const  createUser = new userModel({
        fullName, 
        email,
        password: hash,
        phoneNumber, 
        role: 0
      });
      const newUser = await createUser.save();
      return res.status(201).json({
        message: 'User successfully created',
        token: await createToken(newUser)
      });
    });
  }

  /**
   * @description login user from database
   * @method userLogin
   * @param {*} req
   * @param {*} res
   */
  static async login(req, res) {
    const { email, password } = req.body;
    const userFound = await userModel.findOne({ email });
    if (userFound) {
      await bcrypt.compare(password, userFound.password, (error, result) => {
        if (result) {
          return res.status(200).json({
            message: 'Access granted!',
            token: createToken(userFound)
          });
        }
        return res.status(400).json({
          message: 'Email and password not match!'
        });
      });
    } else {
      return res.status(400).json({
        message: 'Access denied!'
      });
    }
  }

  /**
     * @description Edit user details
     * @method editDetails
     * @param {*} req
     * @param {*} res
     */
  static async editProfile(req, res) {
    const userId = parseInt(req.decoded.userId);
    const userFound = await Model.user.findOne({
      where: { id: userId }
    });

    if (userFound) {
      userFound.update({
        firstName: req.body.firstName || userFound.firstName,
        lastName: req.body.lastName || userFound.lastName,
        middleName: req.body.middleName || userFound.middleName,
        email: req.body.email || userFound.email,
        phoneNumber: req.body.phoneNumber || userFound.phoneNumber
      });
      return res.status(200).json({
        message: 'User updated successfully!',
        userFound
      });
    }
    return res.status(404).json({
      message: 'User not found'
    });
  }

  /**
     * @description fetch all users from database
     * @method getAllUsers
     * @param {*} req
     * @param {*} res
     */
  static async getAllUsers(req, res) {
    const allUsers = await Model.user.findAll({});
    if (allUsers.length > 0) {
      return res.status(200).json({
        message: 'Success',
        users: allUsers
      });
    }
    return res.status(200).json({
      message: 'No registered user yet!'
    });
  }

  /**
     * @description fetch a single user from database
     * @method getSingleUser
     * @param {*} req
     * @param {*} res
     */
  static async getSingleUser(req, res) {
    const userId = parseInt(req.params.userId);
    const userFound = await Model.user.findOne({
      where: { id: userId },
      include: [{
        model: Model.transaction,
        as: 'transactions',
      }],
    });
    if (userFound) {
      return res.status(200).json({
        message: 'Success',
        user: userFound
      });
    }
    return res.status(404).json({
      message: 'User not found!'
    });
  }

  /**
   * @description fetch user's account and loan balance from database
   * @method checkBalance
   * @param {*} req
   * @param {*} res
   */

  static async checkBalance(req, res) {
    const userId = parseInt(req.decoded.userId);
    const userFound = await Model.user.findOne({
      where: { id: userId }
    });
    if (userFound) {
      return res.status(200).json({
        message: 'Balance successfully fetched!',
        accountBalance: userFound.accountBalance,
        loanBalance: userFound.loanBalance
      });
    }
    return res.status(404).json({
      message: 'User not found!'
    });
  }
}

module.exports =  user;
