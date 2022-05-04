const mongoose = require('mongoose');
const { Schema } = mongoose;

const gachaPlayerSchema = new Schema({
    userId: {type: String, required: true, unique: true},
    inventory: [{
        item: {type:Schema.Types.ObjectId, ref: 'GachaItem'}, 
        count: { type: Number, default: 0, min: 0}
    }], // Array of item _ids
});

module.exports = mongoose.model('GachaPlayer', gachaPlayerSchema);