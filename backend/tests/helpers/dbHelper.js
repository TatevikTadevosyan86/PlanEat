import mongoose from 'mongoose'

export async function clearDatabase() {
  if (mongoose.connection.readyState === 1) {
    const collections = mongoose.connection.collections
    for (const key in collections) {
      await collections[key].deleteMany({})
    }
    console.log('🗑️ Database cleared')
  }
}

export async function closeDatabase() {
  if (mongoose.connection.readyState === 1) {
    await mongoose.connection.close()
    console.log('🔌 Database connection closed')
  }
}