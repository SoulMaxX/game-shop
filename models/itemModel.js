const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Must have a name'],
        unique: true
    },
    image: String,
    detail: String,
    price: {
        type: Number,
        required: [true, 'Must have a price']
    },
    quantity: Number,
    type: { type: String, required: [true, 'Must have a type'] }
});

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;