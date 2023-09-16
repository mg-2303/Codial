const express = require('express');
const router = express.Router();
const homeController = require('../controller/home_controller');

console.log('Router is Loaded');
router.get('/', homeController.home);
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));

// for further routes,access name
// router.use('/routerName', require('./routerFile'));

module.exports = router;