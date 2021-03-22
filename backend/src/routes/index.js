const express = require('express');
const user = require('./../controllers/userController'); 
const  verifyToken = require('./../middlewares/verifyToken');
const  {isUserValid, isUserAdmin }  = require('./../middlewares/checkAuth') ;
const { validateSignup, validateSignin, validateEdit } = require('./../middlewares/userCredentials');
const app = express.Router();

app.get('/', (req, res) => res.send('Welcome to youDeyGo. A car pooling app'));

// User Route
app.get('/users',verifyToken, isUserAdmin, user.getAllUsers);
app.get('/users/:userId', user.getSingleUser);
app.post('/register', validateSignup, user.register);
app.post('/login', validateSignin, user.login);
app.put('/edit', verifyToken, isUserValid, validateEdit, user.editProfile);


module.exports = app;
