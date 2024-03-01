const express = require('express');
const { loginpage, login } = require('../controllers/userController');

const router = express.Router();

router.get('/', loginpage);
router.post('/', login);

module.exports = router;
