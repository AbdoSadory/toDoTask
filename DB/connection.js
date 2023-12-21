import mongoose from 'mongoose'

const db_connection = async () => {
  await mongoose
    .connect(process.env.DATABASE_CONNECTION_STRING)
    .then((res) => console.log('DB is connected now 👌👌'))
    .catch((error) => console.log('DB got problem in connection 🔴'))
}

export default db_connection
