// Require model
const Fighter = require('../models/Fighter.js');

// CRUD Functions

// CREATE // 
const createFighter = (userId) => {
    const newFighter = new Fighter({userId});
    return newFighter.save();
}

// READ // 
const getFighter = (id) => {
    return  Fighter.findOne({ userId: id }).exec();
}

// UPDATE // 
const updateFighter = (id, update) => {
    
}

// DELETE // 
const deleteFighter = (id) => {
    return Fighter.deleteOne({userId: id});
}


module.exports = {
    createFighter,
    getFighter,
    updateFighter,
    deleteFighter
}