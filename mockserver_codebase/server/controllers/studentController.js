const Student = require('../models/studentModel');
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require('../exceptions/catchAsync');
const AppError = require('../exceptions/appError');

exports.getAllStudents = catchAsync(async (req, res, next) => {

    const features = new APIFeatures(Student.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

    const students = await features.query;

    res.status(200).json({
        status: 'success',
        results: students.length,
        data: students
    });
});

exports.getStudent = catchAsync(async (req, res, next) => {
    const student = await Student.findById(req.params.id);

    res.status(200).json({
        status: 'success',
        data: student,
    });
});

exports.createStudent = catchAsync(async (req, res, next) => {

    const newStudent = await Student.create(req.body);
    res.status(201).json({
        status: 'success',
        data: newStudent,
    });

});

exports.updateStudent = catchAsync(async (req, res, next) => {

    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
        new: true, // New document will be sent back
        runValidators: true,
    });
    res.status(200).json({
        status: 'success',
        data: student
    });
});

exports.deleteStudent = catchAsync(async (req, res, next) => {

    await Student.findByIdAndDelete(req.params.id);
    res.status(204).json({
        status: 'succes',
        data: null,
    });
});

exports.getStudentStats = catchAsync(async (req, res, next) => {

    const year = req.params.year * 1;
    console.log(year)
    const stats = await Student.aggregate(
        [
            {
                $match:
                    {
                        "education.startDate": {
                            $gte: new Date(`${year}-01-01`),
                            $lte: new Date(`${year}-12-31`),
                        }
                    }
            },
            {
                $group: {
                    _id: '$education.name',
                    numOfStudents: {$sum: 1},
                    students: {$push: '$student.name'},
                    education: {$first: '$education.name'}
                }
            },
            {
                $project: {_id: 0},
            }
        ])


    res.status(200).json({
        status: 'succes',
        data: stats
        // data: {result: limitFields.length, data: limitFields}
    });
});

// exports.getStudentStats = catchAsync(async (req, res) => {
//
//     const subject = req.query.subject;
//
//     const stats = await Student.aggregate(
//         [
//             {
//                 $unwind: "$subjects"
//             },
//             {
//                 $match:
//                     {
//                         "subjects.subject": {$eq: subject}
//                     }
//             },
//             {
//                 $group: {
//                     _id: subject,
//                     numOfSubject: {$sum: 1},
//                     students: {$push: '$student'}
//                 }
//             },
//             {
//                 $addFields: {subject: '$_id'}
//             },
//             {
//                 $project: {_id: 0}
//             }
//         ])
//
//
//     res.status(200).json({
//         status: 'succes',
//         data: stats
//         // data: {result: limitFields.length, data: limitFields}
//     });
// });





























