const Blog = require('../models/blog')
const User = require('../models/user')
const initialUsers = require('../utils/seeds/seedUsers')
const initialBlogs = require('../utils/seeds/seedBlogs')
const { seedDatabase } = require('../utils/seeds/seed_helper')

const blogsInDB = async () => {
  const blogs = await Blog.find({})
  const blogsProcessed = blogs.map(blog => JSON.parse(JSON.stringify(blog)))
  // JSON.stringify calls, inter alia, blog's toJSON
  return blogsProcessed
}

const usersInDB = async () => {
  const users = await User.find({})
  const usersProcessed = users.map(user => JSON.parse(JSON.stringify(user)))
  return usersProcessed
}

const nonExistingID = async () => {
  const blog = new Blog({
    title: 'temp',
    author: 'temp',
    url: 'temp',
    likes: 0,
  })

  await blog.save()
  await blog.remove()

  return blog.toJSON().id
}

const loggedInUser = async api => {
  const user = initialUsers[0]
  const credentials = {
    username: user.username,
    password: user.password,
  }

  const userInDB = await User.findOne({ username: user.username })
  const response = await api.post('/api/login').send(credentials)

  return { user: userInDB, authorization: `Bearer ${response.body.token}` }
}

const blogWithAuthorization = async api => {
  const { user, authorization } = await loggedInUser(api)
  const blog = await Blog.findById(user.blogs[0])
  const blogProcessed = JSON.parse(JSON.stringify(blog))

  return { blog: blogProcessed, authorization }
}

const validAuthorization = async api => {
  const { authorization } = await loggedInUser(api)
  return authorization
}

module.exports = {
  initialBlogs,
  initialUsers,
  seedDatabase,
  blogsInDB,
  usersInDB,
  nonExistingID,
  loggedInUser,
  blogWithAuthorization,
  validAuthorization,
}
