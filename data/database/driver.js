const mongoose = require('mongoose');
const fs = require('fs');

// Require all model functions 
const fighter = require('./functions/fighterFunctions.js');
const gachaItem = require('./functions/gachaItemFunctions.js');
const gachaPlayers = require('./functions/gachaPlayerFunctions.js');

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
         rarity: rarity.toUpperCase(),
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
   }, 
   updateGacha(id, update){
      return gachaItem.updateGacha(id, update);
   }, 
   getAll(){
      return gachaItem.getAll();
   }

}

const gachaPlayer = {
   initializePlayer(userId){
      return gachaPlayers.createGachaPlayer(userId);
   }, 
   getGachaPlayer(userId){
      return gachaPlayers.getGachaPlayer(userId);
   }, 
   async pushGachaItem(userId, gachaId){

      try {
         // Get user to update
         const player = await gachaPlayers.getGachaPlayer(userId);

         // Return to ObjectIds
         if (player.populated()){
            player.depopulate();
         }

         // Check if item exists in inventory
         // If it does, just increment the count
         // If not, push the item
         const inventory = player.inventory;
         const inventoryItemIds = inventory.map(inventoryItem => inventoryItem.item)
         const foundIndex = inventoryItemIds.indexOf(gachaId);

         if (foundIndex !== -1){
            player.inventory[foundIndex].count++;
         } else {
            player.inventory.push({
               item: gachaId, 
               count: 1
            })
         }

         // Repopulate inventory
         await player.populate();

         // Update player
         await gachaPlayers.updateGachaPlayer(userId, player);
         return {
            message: "Inventory item pushed successfully",
            success: true,
            player
         }
      } catch (error) {
         return {
            message: "There was an error in pushing an inventory item.",
            error,
            success: false
         }
      }


   }
}

 module.exports = {
    fightMode, 
    gacha, 
    gachaPlayer
 }