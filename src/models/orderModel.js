const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({

    fruitName: {
        type: String,
    },

    name: {
        type: String
    },

    quantity: {
        type: Number
    },

    totalPrice: {
        type: Number
    },

}, { timestamps: true })


module.exports = mongoose.model('Order', orderSchema)