// Require Model
const GachaPlayer = require('../models/GachaPlayer.js');

// CRUD Functions

// CREATE // 
const createGachaPlayer = (id) => {
    const newGachaPlayer = new GachaPlayer({userId: id});
    return newGachaPlayer.save();
}

// READ // 
const getGachaPlayer = (id) => {
    return GachaPlayer.findOne({userId: id}).exec();
}

const getPopulatedPlayer = (id) => {
    console.log("Getting populated player");
    return GachaPlayer.findOne({userId: id}).populate('inventory.item').exec();
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
    getPopulatedPlayer
}