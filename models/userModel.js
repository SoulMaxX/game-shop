const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({

    user: {
        type: String,
        required: [true, 'Required user']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            // This only works on CREATE and SAVE!!!
            validator: function (el) {
                return el === this.password;
            },
            message: 'Passwords are not the same!'
        }
    },
    firstname: {
        type: String,
        required: [true, 'Required firstname']
    },
    lastname: {
        type: String,
        required: [true, 'Required lastname']
    },
    age: Number,
    address: {
        type: String,
        required: [true, 'Required address']
    },
    zipcode: {
        type: Number,
        required: [true, 'Required zipcode']
    },
    phone: {
        type: String,
        required: [true, 'Required phone']
    },
    email: {
        type: String,
        required: [true, 'Required email'],
        unique: true,
        validate: [validator.isEmail]
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
})

userSchema.methods.correctPassword = async function (candidatePassword,userPassword) {
    return await bcrypt.compare(candidatePassword,userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;