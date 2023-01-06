const router = require('express').Router()
const Comment = require('../models/comment')
const Blog = require('../models/blog')

// CREATE
router.post('/', async (req, res, next) => {
  const { content, blog: blogId } = req.body
  const blog = await Blog.findById(blogId)

  if (!blog) {
    return res.status(400).json({ error: 'invalid blog ID' })
  }

  const commentToCreate = new Comment({
    content,
    blog: blog._id,
  })

  const saved = await commentToCreate.save()
  const result = await saved.populate('blog', {
    title: 1,
    url: 1,
  })

  blog.comments = blog.comments
    ? blog.comments.concat(result._id)
    : [result._id]
  await blog.save()

  res.status(201).json(result)
})

// READ ALL
router.get('/', async (req, res, next) => {
  const comments = await Comment.find({}).populate('blog', {
    title: 1,
    url: 1,
  })
  res.json(comments)
})

module.exports = router
