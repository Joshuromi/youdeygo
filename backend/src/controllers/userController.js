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
        enabled: false,
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
    const userId = (req.decoded.userId);
    const userFound = await userModel.findById(userId);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }; 
    const today =  new Date().toLocaleDateString("en-US", options);
 
    if (userFound) { 
      userFound.set({
        fullName: req.body.fullName || userFound.fullName,
        email: req.body.email || userFound.email,
        phoneNumber: req.body.phoneNumber || userFound.phoneNumber,
        udpatedAt: today
      });
      userFound.save()
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
    const allUsers = await userModel.find();
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
    const userId = (req.params.userId);
    const userFound = await userModel.findById(userId);
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
}

module.exports =  user;
