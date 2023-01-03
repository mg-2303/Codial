const express = require('express');
const homeController = require('../controller/home_controller');
const router = express.Router();

console.log('router is loaded');
//for any further route, access by here
//router.use('routerName',require('./routerFile'));

router.use('/users', require('./user'));
router.get('/', homeController.home);

module.exports = router;