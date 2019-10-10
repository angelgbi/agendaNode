const express = require('express')
const router = express.Router()

//API V1
router.use('/api/v1/agenda', require('./contact.routes'))

//API V2
router.use('/api/v2/agenda', require('./contactMongo.routes'))

module.exports = router
