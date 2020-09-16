var express = require('express');
var router = express.Router();
const { getUserList } = require('../controllers/user')

router.get('/user', getUserList);

module.exports = router;