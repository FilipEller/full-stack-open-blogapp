const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = require('express').Router()
const User = require('../models/user')
const { SECRET } = require('../utils/config')

router.post('/', async (req, res, next) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })
  const passwordCorrect =
    user && (await bcrypt.compare(password, user.passwordHash))

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password',
    })
  }

  const tokenData = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(tokenData, SECRET, { expiresIn: 60 * 60 })

  res.status(200).json({ token, username: user.username, name: user.name })
})

module.exports = router
