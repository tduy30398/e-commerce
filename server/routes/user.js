const router = require('express').Router();
const userControls = require('../controllers/user');

router.post('/register', userControls.register);

module.exports = router;
