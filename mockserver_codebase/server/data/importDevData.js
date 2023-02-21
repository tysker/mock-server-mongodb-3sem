const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Student = require('../models/studentModel');

dotenv.config({ path: `${__dirname}/../config.env` });


const DB = process.env.DATABASE_DEV
    .replace("<USER>", process.env.DATABASE_USERNAME)
    .replace("<PASSWORD>", process.env.DATABASE_PASSWORD)

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('DB connection successful!');
});

// Read json file
console.log(__dirname)

const students = JSON.parse(
  fs.readFileSync(`${__dirname}/students.json`, 'utf-8'),
);

// Import data to database

const importData = async () => {
  try {
    await Student.create(students);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// Delete all from collection
const deleteData = async () => {
  try {
    await Student.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

console.log(process.argv);
