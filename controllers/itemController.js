const Item = require('../models/itemModel');
const AppError = require('../utils/appError');


exports.getAllItems = async (req, res, next) => {
    const items = await Item.find().select('-__v')
    console.log(items);

    res.status(200).json({
        status: 'success',
        data: items,
    })
    next();
}

exports.getItem = async (req, res, next) => {
    const item = await Item.findById(req.params.id).select('-__v')
    res.status(200).json({
        status: 'success',
        data: item,
    })
    next();
}


exports.createItem = async (req, res, next) => {
    try {
        const newitem = await Item.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                item: newitem
            },
        });

    } catch (err) {
        // console.log(err)
        res.status(400).json({
            status: 'fail',
            message: err.message

        })
    }
    next();
}

exports.updatedItem = async (req, res, next) => {
    try {
        const updateitem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        res.status(200).json({
            status: 'success',
            data: {
                item: updateitem
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message

        })
    }
}

exports.deleteItem = async (req, res, next) => {
    try {
        const doc = await Item.findByIdAndDelete(req.params.id)
        if (!doc) {
            return next(new AppError("Not Found ID",400));
        }
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message

        })
    }
}