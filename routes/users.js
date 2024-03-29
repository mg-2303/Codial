const express = require('express');
const passport = require('passport');
const router = express.Router();
const userConroller = require('../controller/users_controller');

router.get('/profile/:id', passport.checkAuthentication, userConroller.profile);
router.post('/update/:id', passport.checkAuthentication, userConroller.update);
router.get('/sign-in', userConroller.signIn);
router.get('/sign-up', userConroller.signUp);
router.post('/create', userConroller.create);
// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    { failureRedirect: '/users/sign-in' },
), userConroller.createSession);

router.get('/sign-out', userConroller.destroy);

module.exports = router;