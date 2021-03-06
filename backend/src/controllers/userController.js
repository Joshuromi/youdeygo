const bcrypt = require("bcryptjs");
const createToken = require("../helpers/createToken");
const userModel = require("../models/userModel");
const rideModel = require("../models/rideModel");
const cloudinary = require('../services/cloudinary');
const upload = require('../services/multer');
const fs = require("fs");

const saltRounds = 10;
const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
const today = new Date().toLocaleDateString("en-US", options);
/**
 * @description user controller
 * class user
 */
class user {
  /**
   * @description signup a user into database
   * @method POST
   * @param {*} req
   * @param {*} res
   */
  static async register(req, res) {
    const { firstName, lastName, email, password } = req.body;
    await bcrypt.hash(password, saltRounds, async (error, hash) => {
      const createUser = new userModel({
        firstName,
        lastName,
        email: email.toLowerCase(),
        password: hash,
        enabled: true,
        verified: false,
        role: 0,
        createdAt: today,
        updatedAt: today,
      });
      const newUser = await createUser.save();
      return res.status(201).json({
        message: "User successfully created",
        token: await createToken(newUser),
      });
    });
  }

  /**
   * @description login user from database
   * @method POST
   * @param {*} req
   * @param {*} res
   */
  static async login(req, res) {
    const { email, password } = req.body;
    const userFound = await userModel.findOne({ email: email.toLowerCase(), enabled: true });
    if (userFound) {
      await bcrypt.compare(password, userFound.password, (error, result) => {
        if (result) {
          return res.status(200).send({
            message: "Access granted!",
            token: createToken(userFound),
          });
        }
        return res.send('Email and password not match!');
      });
    } else {
      return res.send('Access denied!');

    }
  }

  /**
   * @description Edit user details
   * @method PUT
   * @param {*} req
   * @param {*} res
   */
  static async editProfile(req, res) {
    const userId = req.decoded.userId;
    const userFound = await userModel.findById(userId);
    const { firstName, lastName, email, phoneNumber, address } = req.body;
    if (userFound) {
      userFound.set({
        firstName: firstName || userFound.firstName,
        lastName: lastName || userFound.lastName,
        email: email || userFound.email,
        phoneNumber: phoneNumber || userFound.phoneNumber,
        address: address || userFound.address,
        updatedAt: today,
      });
      userFound.save();

      return res.send({
        message: 'User updated successfully!',
        userFound,
      });
    }
    return res.send('User not found');

  }
  /**
   * @description Upload profile picture
   * @method PATCH
   * @param {*} req
   * @param {*} res
   */
  static async uploadProfilePicture (req, res) {
    const userId = req.decoded.userId;
    const userFound = await userModel.findById(userId);
    await upload(req, res, async (error) => {
      if (error) {
        return res.status(400).json({
          error,
        });
      }
      const fileName = req.file.filename;
      const filePath = `./uploads/${fileName}`;
  
      const uploadImage = await cloudinary.uploader.upload(
        filePath,
        function (error, result) {
          //console.log(result, error);
        }
      );
      fs.unlink(filePath, (result, error) => {
        //console.log(result, error);
      });
      if (uploadImage) {
        userFound.set({ 
          profilePicture: uploadImage.secure_url,
          updatedAt: today
         });
         userFound.save();
      return res.send({
        message: "Success",
        data: uploadImage.secure_url
      });
      }

    });
  }



  /**
   * @description fetch all users from database
   * @method GET
   * @param {*} req
   * @param {*} res
   */
  static async getAllUsers(req, res) {
    const allUsers = await userModel.find();
    if (allUsers.length > 0) {

      return res.send({
        message: 'Success',
        allUsers,
      });
    }
    return res.send( 'No registered user yet!');

  }

  /**
   * @description fetch a single user from database
   * @method GET/:userId
   * @param {*} req
   * @param {*} res
   */
  static async getSingleUser(req, res) {
    const userId = req.params.userId;
    const userFound = await userModel.findById(userId);
    if (userFound) {
      const rides = await rideModel.find({userId: userFound.id});
      const rideCreated = rides.length > 0 ? rides : 'No ride created yet!'
      return res.send({
        message: 'Success',
        userFound,
        rideCreated,
      });
    }

    return res.send('User not found!') ;

  }
  /**
   * @description Enable a User
   * @method PUT/:userId
   * @param {*} req
   * @param {*} res
   */

  static async enableUser(req, res) {
    const userId = req.params.userId;
    const signInId = req.decoded.userId;
    const userFound = await userModel.findById(userId);
    if (userFound) {
      if (userFound.id === signInId) {

        return res.send('You can\'t enable yourself');
      }
      await userFound.set({ enabled: true });
      userFound.save();
      return res.send('User successfully enabled!');
    }
    return res.status(201).json({
      message: "User not found!",
    });
  }

  /**
   * @description Disable a User from userDB dummy database
   * @method PUT/:userId
   * @param {*} req
   * @param {*} res
   */

  static async disableUser(req, res) {
    const userId = req.params.userId;
    const signInId = req.decoded.userId;
    const userFound = await userModel.findById(userId);
    if (userFound) {
      if (userFound.id === signInId) {
        return res.send( 'You can\'t disable yourself');
      }
      await userFound.set({ enabled: false });
      userFound.save();
      return res.send('User successfully disabled!');
    }
    return res.send('User not found!');
  }

  /**
   * @description Delete User from userDB dummy database
   * @method DELETE/:userId
   * @param {*} req
   * @param {*} res
   */
  static async deleteUser(req, res) {
    const userId = req.params.userId;
    const signInId = req.decoded.userId;
    const userFound = await userModel.findById(userId);
    if (userFound) {
      if (userFound.id === signInId) {
        return res.send('You can\'t delete yourself');
      }
      await userModel.deleteOne({_id: userId});
      return res.send('User successfully deleted!');
    }
    return res.send('User not found!');
  }
}

module.exports = user;
