const router = require('express').Router()

const users = require('./users')
const runs = require('./runs')

router.get('/', (req, res) => res.send('Xumes Fitness Server is running.'))
router.use('/users', users)
router.use('/runs', runs)

module.exports = router
