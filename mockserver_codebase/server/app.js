// Only express/api related code
const express = require('express');
const morgan = require('morgan');
const AppError = require('./exceptions/appError');
const globalErrorHandler = require('./controllers/errorController');
const studentRouter = require('./routes/studentRoutes');

const app = express();

// 1) Middleware
app.use(morgan('dev')); //https://expressjs.com/en/resources/middleware/morgan.html

app.use(express.json()); // For getting the request body
app.use(express.static(`${__dirname}/public`)); // To get static files like images, html... localhost:3000/img/imageName.png

app.use((req, res, next) => { // Set the request time
    req.requestTime = new Date().toISOString();
    next();
});

app.use('/api/v1/students', studentRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
