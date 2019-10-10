const express = require('express')
const router = express.Router()

router.use('/api/agenda', require('./contact.routes'))

module.exports = router
