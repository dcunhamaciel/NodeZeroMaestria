const router = require('express').Router()

const verifyToken = require('../helpers/verify-token')

const PetController = require('../controllers/PetController')

router.post('/create', verifyToken, PetController.create)

module.exports = router