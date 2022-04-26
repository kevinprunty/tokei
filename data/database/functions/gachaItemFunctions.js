// Require Model
const GatchaItem = require('../models/GatchaItem.js');
const GachaItem = require('../models/GatchaItem.js');

// CRUD Functions

// CREATE // 
const createGacha = (item) => {
    const newGacha = new GachaItem(item);
    return newGacha.save();
}

// READ // 
const getGacha = (id) => {
    return GachaItem.findOne({gachaId: id}).exec();
}

const getGachaByName = (gachaName) => {
    return GachaItem.find({name: gachaName}).exec();
}

const getHighestId = async () => {
    const sortDescending = await GachaItem.find({}).sort({ gachaId: 'desc'});
    return sortDescending.shift();
}

const getByRarity = (inputRarity) => {
    return GatchaItem.find({rarity: inputRarity}).exec();
}

// UPDATE // 
const updateGacha = (id, update) => {
    return GachaItem.updateOne({gachaId: id}, update);
}

// DELETE // 
const deleteGacha = (id) => {
    return GachaItem.deleteOne({gachaId: id});
}


module.exports = {
    createGacha,
    getGacha,
    getGachaByName,
    getHighestId,
    getByRarity,
    updateGacha,
    deleteGacha
}