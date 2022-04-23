const mongoose = require('mongoose');
const fs = require('fs');

// Require all models 
const EventDrawing = require('./models/EventDrawing.js');

// Actual database functions
const eventDrawing = {
    createNewEntry : function(event, data, interaction) {
        if (!interaction) return;
        const newEntry = new EventDrawing({
            artist: interaction.member,
            number: data.number,
            name: data.name,
            series: data.series,
            event: event,
            status: {
                received: false,
                slideshow: false 
            }
        });

        return newEntry.save(function(err){
            if (err) console.log(err.message);
        });
    },
    debugDeleteAllEntries : function(){
        EventDrawing.remove({}, ()=>console.log("Error! For some reason!"));
    }
}


 module.exports = {
     eventDrawing,
 }