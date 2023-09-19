const express = require('express');
const router = express.Router();
const passport = require('passport');
const commentConroller = require('../controller/comments_controller');

router.post('/create', passport.checkAuthentication, commentConroller.create);

module.exports = router;