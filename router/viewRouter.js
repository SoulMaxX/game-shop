const express = require('express');
const router = express.Router();
const viewController = require('../controllers/viewController');

router.get('/',viewController.getHome);
router.get('/login',viewController.getLogin);
router.get('/singup',viewController.getSingup);

module.exports = router;