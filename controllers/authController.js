const User = require("../models/userModel");
const AppError = require('../utils/appError');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');

const singToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })
}

const createToken = async (user, statusCode, res) => {
    const token = singToken(user.id)

    res.cookie('jwt', token, {
        expires: new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000
        ), httpOnly: true
    })

    res.status(statusCode).json({
        status: 'success',
        token,
        data: { user }
    })

}

exports.singUp = async (req, res, next) => {
    const user = new User.create(req.body)
    createToken(user, 201, res)
}

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError('Please provide email and password!', 400));
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect email or password', 401));
    }

    createToken(user, 200, res)
}


exports.protect = catchAsync(async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        return next(new AppError('You are not login', 401))
    }

    const decode = await jwt.verify(token, process.env.JWT_SECRET);

    const currentUser = User.findById(decode.id);

    if (!currentUser) {
        return next(
            new AppError(
                'The user belonging to this token does no longer exist.',
                401
            )
        );
    }
    res.locals.user = currentUser
    next();
})

exports.logout = (req, res) => {
    res.cookie('jwt', '', { expires: new Date(Date.now() + 10 * 1000), httpOnly: true })
    console.log(Date.now())

    res.status(200).json({
        status: 'success'
    })
}