const express = require('express')
const router = express.Router()

const ThoughtController = require('../controllers/ThoughtController')

const checkAuth = require('../helpers/auth')

router.get('/add', checkAuth, ThoughtController.createThought)
router.post('/add', checkAuth, ThoughtController.createThoughtPost)
router.get('/edit/:id', checkAuth, ThoughtController.updateThought)
router.post('/edit', checkAuth, ThoughtController.updateThoughtPost)
router.post('/remove', checkAuth, ThoughtController.removeThought)
router.get('/dashboard', checkAuth, ThoughtController.dashboard)
router.get('/', ThoughtController.showThoughts)

module.exports = router