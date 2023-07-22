const router = require('express').Router()

const verifyToken = require('../helpers/verify-token')
const imageUpload = require('../helpers/image-upload')

const PetController = require('../controllers/PetController')

router.get('/', PetController.getAll)
router.post('/create', verifyToken, imageUpload.array('images'), PetController.create)

module.exports = router