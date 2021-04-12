const express = require('express');
const request = require('../controllers/requestController')
const  verifyToken = require('../middlewares/verifyToken');
const  {isUserValid }  = require('../middlewares/checkAuth') ;  
const { validateCreateRequest, checkRideOwner } = require('../middlewares/requestCredentials');

const router = express.Router();

router.post('/requests/:rideId', [verifyToken, isUserValid, validateCreateRequest], request.create);
router.patch('/accept/:requestId', [verifyToken, isUserValid, checkRideOwner], request.acceptRequest );
router.patch('/decline/:requestId', [verifyToken, isUserValid, checkRideOwner], request.declineRequest);

module.exports = router;