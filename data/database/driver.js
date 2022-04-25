const mongoose = require('mongoose');
const fs = require('fs');

// Require all model functions 
const fighter = require('./functions/fighterFunctions.js');

// Actual database functions
const fightMode = {
   register(userId){
      return fighter.createFighter(userId);
   },
   unregister(userId){
      return fighter.deleteFighter(userId);
   },
   getFighter(userId){
      return fighter.getFighter(userId);
   }
}


 module.exports = {
    fightMode
 }