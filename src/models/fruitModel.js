const mongoose = require('mongoose');


const fruitSchema = new mongoose.Schema({

    fruitName: {
        type: String,
        index: { unique: true }
    },

    price: {
        type: Number
    },

}, { timestamps: true })


module.exports = mongoose.model('Fruit', fruitSchema)