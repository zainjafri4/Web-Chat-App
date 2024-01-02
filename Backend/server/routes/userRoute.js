const express = require('express')
const router = express.Router();

const userController = require("../controllers/userController")

router.post('/register', userController.userCreate)
router.post('/login', userController.userLogin)
router.get('/find/:userId', userController.userFind)
router.get('/', userController.userFindAll)

module.exports = router;