require('dotenv').config()

const { PORT, SECRET } = process.env

const MONGODB_URI =
  process.env.NODE_ENV !== 'test'
    ? process.env.MONGODB_URI
    : process.env.TEST_MONGODB_URI

module.exports = { PORT: PORT || 3003, SECRET, MONGODB_URI }
