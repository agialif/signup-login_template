const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var inventorySchema = new Schema ({
    fruit: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    }
})

const Inventory = mongoose.model('Inventory', inventorySchema)

module.exports = Inventory