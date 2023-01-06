const mongoose = require('mongoose')
const logger = require('../logger')
const { MONGODB_URI } = require('../config')
const { seedDatabase } = require('./seed_helper')

const main = async () => {
  try {
    await mongoose.connect(MONGODB_URI)
    logger.success('Connected to database')
  } catch (err) {
    logger.error('Failed to connect to database:', err.message)
  }

  logger.info('seeding database')
  await seedDatabase()
  logger.success('database seeded successfully')

  mongoose.connection.close()
}

main()
