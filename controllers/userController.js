const User = require('../models/userModel');
const AppError = require('../utils/appError');


exports.getAllUser = async (req, res, next) => {
    const user = await User.find()

    res.status(200).json({
        status: 'success',
        data: user
    });
};

exports.getUser = async (req, res, next) => {
    try {
        const doc = await User.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: doc
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            data: err.message
        });
    }
};

exports.createUser = async (req, res, next) => {
    try {
        const newUser = await User.create(req.body)
        res.status(201).json({
            status: 'success',
            data: newUser
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            data: err.message
        });
    }
};

exports.updatedUser = async (req, res, next) => {
    try {
        const updatUser = await User.findByIdAndUpdate(req.params.id, req.body,{ new: true, runValidators: true });
        res.status(200).json({
            status: 'success',
            data: {
                user:updatUser
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            data: err.message
        });
    }
};

exports.deleteUser = async(req,res,next) => {
    try {
        const doc = await User.findByIdAndDelete(req.params.id)
        if (!doc) {
            return next(new AppError("Not Found ID",400));
        }
        res.status(204).json({
            status: 'success',
            data:null
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            data: err.message
        });
    }
}