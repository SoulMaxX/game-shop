const express = require('express');
const router = express.Router();
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');


router.get('/',authController.isLoggedIn,viewController.getHome);
router.get('/login',authController.isLoggedIn,viewController.getLogin);

router.get('/singup',viewController.getSingup);
router.get('/console',authController.isLoggedIn,viewController.getConsole);
router.get('/game',authController.isLoggedIn,viewController.getGame);
router.get('/accessory',authController.isLoggedIn,viewController.getAccessory);
router.get('/cart',authController.isLoggedIn,viewController.getCart);

module.exports = router;