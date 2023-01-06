const bcrypt = require('bcrypt')
const router = require('express').Router()
const User = require('../models/user')

// CREATE
router.post('/', async (req, res, next) => {
  const { username, name, password } = req.body

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return res.status(400).json({
      error: 'username must be unique',
    })
  }

  if (!password) {
    return res.status(400).json({
      error: 'password is required',
    })
  }

  if (password.length < 3) {
    return res.status(400).json({
      error: 'password must be at least 3 characters',
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  res.status(201).json(savedUser)
})

// READ all
router.get('/', async (req, res, next) => {
  const users = await User.find({}).populate('blogs', { title: 1, url: 1 })
  res.json(users)
})

// DELETE
router.delete('/:id', async (req, res, next) => {
  await User.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

module.exports = router
