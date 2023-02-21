const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

// DOCKER
const DB = process.env.DATABASE_DEV
    .replace("<USER>", process.env.DATABASE_USERNAME)
    .replace("<PASSWORD>", process.env.DATABASE_PASSWORD)
// MongoDB Atlas
// const DB = process.env.DATABASE_DEV.replace(
//     '<PASSWORD>',
//     process.env.DATABASE_PASSWORD,
// );

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log(`Running in ${process.env.NODE_ENV.toUpperCase()} mode.`)
  console.log('DB connection successful!');
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
