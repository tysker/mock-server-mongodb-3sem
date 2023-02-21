const express = require('express');
const studentController = require('../controllers/studentController');

const router = express.Router();

const {
    createStudent,
    deleteStudent,
    getAllStudents,
    getStudent,
    updateStudent,
    getStudentStats,
} = studentController;

router.route('/').get(getAllStudents);

router.route('/').post(createStudent);

router.route('/students-stats/:year').get(getStudentStats);

router.route('/:id').get(getStudent).patch(updateStudent).delete(deleteStudent);

module.exports = router;
