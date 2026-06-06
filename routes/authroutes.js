const { Router } = require('express');
const { register, login } = require('../controller/authcontroller');

const router = Router();

router.post('/register', register);
router.post('/login', login);

module.exports = router;
//exports.router = router;