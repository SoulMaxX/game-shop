const User = require("../models/userModel");
const AppError = require('../utils/appError');

exports.login = async (req,res,next) => {
    const {email , password} = req.body;

    if (!email || !password) {
        return next(new AppError('Please provide email and password!', 400));
      }
      
      const user = await User.findOne({ email }).select('+password');
    
      if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect email or password', 401));
      }
    
      res.json({
        status:"success login",
        data: user
      })
}