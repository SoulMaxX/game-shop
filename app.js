const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path')
const app = express();
const cookieParser = require('cookie-parser');
const viewRouter = require('./router/viewRouter');
const itemRouter = require('./router/itemRouter');
const userRouter = require('./router/userRouter');



app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use('/', viewRouter);
app.use('/api/items', itemRouter);
app.use('/api/users', userRouter);

dotenv.config({ path: './config.env' });


app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500,
        err.status = err.status || 'error'

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
});



module.exports = app;