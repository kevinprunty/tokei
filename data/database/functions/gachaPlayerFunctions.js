// Require Model
const GachaPlayer = require('../models/GachaPlayer.js');

// CRUD Functions

// CREATE // 
const createGachaPlayer = (item) => {
    const newGachaPlayer = new GachaPlayer(item);
    return newGachaPlayer.save();
}

// READ // 
const getGachaPlayer = (id) => {
    return GachaPlayer.findOne({userId: id}).exec();
}

// UPDATE // 
const updateGachaPlayer = (id, update) => {
    return GachaPlayer.updateOne({userId: id}, update);
}

// DELETE // 
const deleteGachaPlayer = (id) => {
    return GachaPlayer.deleteOne({userId: id});
}


module.exports = {
    createGachaPlayer,
    getGachaPlayer,
    updateGachaPlayer,
    deleteGachaPlayer, 
}