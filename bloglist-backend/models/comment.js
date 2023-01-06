const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      minLength: 3,
      required: [true, 'Content is required'],
    },
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    },
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

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment
