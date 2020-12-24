const express = require('express');
const { user } = require('../routes.json');
const { userController } = require('../../controllers');

const router = express.Router();

router.post(user.signUp, userController.signUp);

router.post(user.logIn, userController.logIn);

module.exports = router;
