import mongoose from 'mongoose'

/**
 * Clears every collection in the current test database connection.
 *
 * @returns {Promise<void>}
 */
export async function clearDatabase() {
  if (mongoose.connection.readyState === 1) {
    const collections = mongoose.connection.collections

    for (const key in collections) {
      await collections[key].deleteMany({})
    }

    console.log('ðŸ—‘ï¸ Database cleared')
  }
}

/**
 * Closes the active database connection at the end of integration tests.
 *
 * @returns {Promise<void>}
 */
export async function closeDatabase() {
  if (mongoose.connection.readyState === 1) {
    await mongoose.connection.close()
    console.log('ðŸ”Œ Database connection closed')
  }
}
