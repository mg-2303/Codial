const express = require('express');
const usersController = require('../controller/users_controllers');
const router = express.Router();

router.get('/profile', usersController.profile);
router.get('/sign-in', usersController.signIn);
router.get('/sign-up', usersController.signUp);

module.exports = router;