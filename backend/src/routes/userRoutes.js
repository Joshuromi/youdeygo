const express = require('express');
const user = require('../controllers/userController');
const  verifyToken = require('../middlewares/verifyToken');
const  {isUserValid, isUserAdmin }  = require('../middlewares/checkAuth') ;
const { validateSignup, validateSignin, validateEdit } = require('../middlewares/userCredentials');

const router = express.Router();

router.post('/register', validateSignup, user.register);
router.post('/login', validateSignin, user.login);
router.put('/edit', [verifyToken, isUserValid, validateEdit], user.editProfile);
router.patch('/profilePicture', [verifyToken, isUserValid], user.uploadProfilePicture);
router.get('/users', [verifyToken, isUserAdmin], user.getAllUsers);
router.get('/users/:userId',[verifyToken, isUserAdmin], user.getSingleUser);
router.patch('/enable/:userId', [verifyToken, isUserAdmin], user.enableUser);
router.patch('/disable/:userId', [verifyToken, isUserAdmin], user.disableUser);
router.delete('/delete/:userId', [verifyToken, isUserAdmin], user.deleteUser);

module.exports = router;