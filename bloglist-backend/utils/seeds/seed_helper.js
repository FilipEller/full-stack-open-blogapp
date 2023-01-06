const bcrypt = require('bcrypt')
const Blog = require('../../models/blog')
const User = require('../../models/user')
const seedUsers = require('./seedUsers')
const seedBlogs = require('./seedBlogs')

const initializeUserDB = async () => {
  const saltRounds = 10
  await User.deleteMany({})

  return Promise.all(
    seedUsers.map(async user => {
      const passwordHash = await bcrypt.hash(user.password, saltRounds)
      const userObj = new User({
        username: user.username,
        name: user.name,
        passwordHash,
      })
      userObj.save()
    })
  )
}

const initializeBlogDB = async () => {
  await Blog.deleteMany({})
  const users = await User.find({})

  if (!users.length) {
    throw new Error('No users found')
  }

  /* eslint-disable */
  for (let i = 0; i < seedBlogs.length; i++) {
    const user = users[i % users.length]
    const seed = seedBlogs[i]
    const blog = new Blog({ ...seed, user: user._id })

    const result = await blog.save()

    user.blogs = user.blogs.concat(result._id)
    await user.save()
  }
}

const seedDatabase = async () => {
  await initializeUserDB()
  await initializeBlogDB()
}

module.exports = { seedDatabase }
