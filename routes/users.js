const express = require('express');
const router = express.Router();
const userConroller = require('../controller/users_controller');

router.get('/profile', userConroller.profile);
router.get('/sign-in', userConroller.signIn);
router.get('/sign-up', userConroller.signUp);
router.post('/create', userConroller.create);
router.post('/create-seassion', userConroller.createSeassion);

module.exports = router;