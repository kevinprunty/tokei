const mongoose = require('mongoose');
const fs = require('fs');

// Require all model functions 
const fighter = require('./functions/fighterFunctions.js');
const gachaItem = require('./functions/gachaItemFunctions.js');

// Helper tools
const randomRarity = require('../../tools/gachaWeighting.js');


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


const gacha = {
   async createGacha(name, rarity, description){
      const highestGacha = await gachaItem.getHighestId();
      const nextGachaId = highestGacha ? Number.parseInt(highestGacha.gachaId)+1 : 1;
      const gachaObject = {
         name,
         rarity,
         gachaId: nextGachaId, 
         description
      }
      await gachaItem.createGacha(gachaObject);
      return gachaObject;
   }, 
   async getGachasStringByName(name) {
      const gachaList = await gachaItem.getGachaByName(name);
      const mappedList = gachaList.map(item => `[#${item.gachaId}: ${item.name} (${item.rarity}). ${item.description}]`)
      return mappedList.join(', ');
   }, 
   getGachaById(id){
      return gachaItem.getGacha(id);
   }, 
   deleteGacha(id){
      return gachaItem.deleteGacha(id);
   }, 
   getRandomGachaRarity(){
      return gachaItem.getByRarity(randomRarity());
   }

}

 module.exports = {
    fightMode, 
    gacha
 }