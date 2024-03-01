const express = require('express');
const { registerpage, register } = require('../controllers/userController');

const router = express.Router();

router.get('/', registerpage);
router.post('/', register);

module.exports = router;
