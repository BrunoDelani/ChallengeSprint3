import app from './app';
import 'dotenv/config';

app.listen((process.env.SERVER_PORT || 3000), () => {
  console.log(`Server start running ${new Date()}`);
});
