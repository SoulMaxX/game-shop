const express = require('express')
const router = express.Router();

const itemController = require('../controllers/itemController');
const authController = require('../controllers/authController');

router.route('/')
    .get(authController.protect,itemController.getAllItems)
    .post(itemController.createItem);
router.route('/:id')
    .get(itemController.getItem)
    .patch(itemController.updatedItem)
    .delete(itemController.deleteItem);

module.exports = router;