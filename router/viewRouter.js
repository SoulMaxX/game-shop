const express = require('express');
const router = express.Router();
const viewController = require('../controllers/viewController');

router.get('/',viewController.getHome);
router.get('/login',viewController.getLogin);
router.get('/singup',viewController.getSingup);
router.get('/console',viewController.getConsole);
router.get('/game',viewController.getGame);
router.get('/accessory',viewController.getAccessory);

module.exports = router;