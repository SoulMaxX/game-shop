const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router.post('/login',authController.login);
router.get('/logout',authController.logout);

router.route('/')
    .get(userController.getAllUser)
    .post(userController.createUser);
router.route('/:id')
    .get(userController.getUser)
    .patch(userController.updatedUser)
    .delete(userController.deleteUser);

module.exports = router;