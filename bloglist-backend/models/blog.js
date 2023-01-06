const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      minLength: 3,
      required: [true, 'Title is required'],
    },
    author: {
      type: String,
      minLength: 3,
      required: [true, 'Author is required'],
    },
    url: {
      type: String,
      minLength: 3,
      required: [true, 'URL is required'],
    },
    likes: {
      type: Number,
      min: 0,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  {
    toJSON: {
      transform: (document, returnedObject) => {
        /* eslint-disable */
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
      },
    },
  }
)

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
