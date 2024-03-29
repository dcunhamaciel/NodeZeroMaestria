const router = require('express').Router()

const verifyToken = require('../helpers/verify-token')
const imageUpload = require('../helpers/image-upload')

const PetController = require('../controllers/PetController')

router.get('/', PetController.getAll)
router.get('/:id', PetController.getPetById)
router.get('/mypets', verifyToken, PetController.getAllUserPets)
router.get('/myadoptions', verifyToken, PetController.getAllUserAdoptions)
router.post('/create', verifyToken, imageUpload.array('images'), PetController.create)
router.patch('/:id', verifyToken, imageUpload.array('images'), PetController.updatePetById)
router.patch('/schedule/:id', verifyToken, PetController.schedule)
router.patch('/conclude/:id', verifyToken, PetController.concludeAdoption)
router.delete('/:id', verifyToken, PetController.removePetById)

module.exports = router