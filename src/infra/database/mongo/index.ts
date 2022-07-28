import mongoose from 'mongoose';

mongoose.connect(`mongodb+srv://${'Challenge-Sprint'}:${'Challenge-Sprint'}@nodeapi.w1es0.mongodb.net/${'Challenge-Sprint3'}`);

const database = mongoose.connection;

database.on('error', console.log.bind(console, 'Error connection'));
database.once('open', () => {
  console.log(`Connection successfully ${new Date()}`);
});

export default database;
