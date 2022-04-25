const mongoose = require('mongoose');
const { Schema } = mongoose;

const fighterSchema = new Schema({
    userId: {type: String, required: true, unique: true},
    coins: {type: Number, default: 0},
    inventory: [{type:Schema.Types.ObjectId, ref: 'Item'}], // Array of item _ids
    stats: {
        hp: {type: Number, default: 100, min: 0, max: 100},
        speed: {type: Number, default: 10},
        defense: {type: Number, default: 0}
    }
});

module.exports = mongoose.model('Fighter', fighterSchema);