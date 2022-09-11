const app =require('./app')
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({path:'./config.env'});

mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => console.log('DB connect success!'))

app.listen(3000,() =>{
    console.log('server run on port 3000')
})