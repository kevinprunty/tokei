const mongoose = require('mongoose');
const { Schema } = mongoose;

const itemSchema = new Schema({
    name: {type: String, required: true},
    price: {type: Number, default: 0},
    stats: {
        attack: {type: Number, default: 0},
        defenseBoost: {type: Number, default: 0},
        hpBoost: {type: Number, default: 0}
    }
});

module.exports = mongoose.model('Item', itemSchema);