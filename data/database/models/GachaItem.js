const mongoose = require('mongoose');
const { Schema } = mongoose;

const gachaItemSchema = new Schema({
    gachaId: { type: Number, unique: true, default: 1, min: 1},
    name: {type: String, required: true},
    rarity: {type: String, required: true}, 
    description: {type: String, required: true},
    count: {type: Number, default: 0, min: 0 }
});

module.exports = mongoose.model('GachaItem', gachaItemSchema);