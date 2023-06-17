const express = require('express')
const router = express.Router()

const ThoughtConotroller = require('../controllers/ThoughtConotroller')

router.get('/', ThoughtConotroller.showThoughts)

module.exports = router