import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@nodeapi.w1es0.mongodb.net/${process.env.DB_NAME}`);

const database = mongoose.connection;

database.on('error', console.log.bind(console, 'Error connection'));
database.once('open', () => {
  console.log(`Connection successfully ${new Date()}`);
});

export default database;
