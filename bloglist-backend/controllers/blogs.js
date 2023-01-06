const router = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

// CREATE
router.post('/', userExtractor, async (req, res, next) => {
  const { title, author, url, likes } = req.body
  const { user } = req

  const blogToCreate = new Blog({
    title,
    author,
    url,
    likes,
    user: user._id,
    comments: [],
  })

  const saved = await blogToCreate.save()
  const result = await saved.populate('user', { username: 1, name: 1 })

  user.blogs = user.blogs.concat(result._id)
  await user.save()

  res.status(201).json(result)
})

// READ ALL
router.get('/', async (req, res, next) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { content: 1 })
  res.json(blogs)
})

// UPDATE
router.put('/:id', async (req, res, next) => {
  const blog = await Blog.findById(req.params.id)

  if (!blog) {
    return res.status(404).json({ error: 'blog not found' })
  }

  const { title, author, url, likes, user } = req.body
  const blogToUpdate = {
    title,
    author,
    url,
    likes,
    user,
  }

  const result = await Blog.findByIdAndUpdate(req.params.id, blogToUpdate, {
    new: true,
  })
  res.json(result)
})

// DELETE
router.delete('/:id', userExtractor, async (req, res, next) => {
  const { user } = req

  const blog = await Blog.findById(req.params.id)

  if (!blog) {
    return res.status(204).end()
  }

  if (blog.user.toString() !== user._id.toString()) {
    return res.status(403).json({ error: 'deletion not permitted' })
  }

  await blog.remove()
  res.status(204).end()
})

module.exports = router
