const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
    {
        student: {
            name: {
                type: String,
                required: [true, "a student must have a name"],
                unique: true,
                trim: true,
                maxlength: [40, 'A student name must have less or equal then 40 characters'],
                minlength: [5, 'A student name must have more or equal then 5 characters'],
            },
            birthday: {
                type: Date,
                required: [true, "birthday is required"],
            },
            email: {
                type: String,
                validate: {
                    validator: function (email) {
                        return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email);
                    },
                    message: props => `${props.value} is not a valid email address`
                },
                required: [true, 'Every student must have a valid email address'],
                unique: true,
                lowercase: true
            },
            mobil: {
                type: Number,
                unique: true
            },
            gender: {
                type: String,
                enum: {
                    values: ['male', 'female', 'other'],
                    message: 'Gender to choose from are male, female, other',
                },
            },
            address: {
                street: String,
                city: String,
                zipCode: String
            },
        },
        education: {
            name: {
                type: String,
                required: [true, 'A student must be associated with an education'],
                enum: {
                    values: ['datamatiker', 'bachelor', 'multimedia', 'webdesign'],
                    message: 'Education to choose from are datamatiker, bachelor, multimedia, webdesign',
                },
            },
            startDate: {
                type: Date,
                default: Date.now(),
            },
            endDate: {
                type: Date,
                default: function () {
                    const date = new Date();
                    const [month, day, year] = [
                        date.getMonth() + 6,
                        date.getDate(),
                        date.getFullYear() + 2,
                    ];
                    return new Date(year, month, day)
                }
            }
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            select: false,
        },
    },
    {
        toJSON: {
            transform: function (doc, ret) {
                delete ret._id;
            },
            virtuals: true
        }
        ,
        toObject: {
            virtuals: true
        }
    });

studentSchema.virtual('studentAge').get(function () {
    if (this.student.birthday) {
        return new Date().getFullYear() - this.student.birthday.getFullYear();
    }
})

studentSchema.pre(/^find/, function (next) {
    // to verify how long a query took. see below for second Date property
    this.start = Date.now();
    next();
})

studentSchema.post(/^find/, function (docs, next) {
    console.log(`Query took ${Date.now() - this.start} milliseconds`);
    next();
})

studentSchema.pre('aggregate', function (next) {
    //this.pipeline().pop()
    console.log(this.pipeline());
    next();
})

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
