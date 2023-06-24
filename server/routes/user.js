const router = require('express').Router();
const userControls = require('../controllers/user');

router.post('/register', userControls.register);
router.post('/login', userControls.login);

module.exports = router;
