const mongoose = require('mongoose');
const { Schema } = mongoose;

const drawingSchema = new Schema({
    artist: {type: String, required: true},
    number: Number,
    name: {type: String, required: true},
    series: String,
    event: {type: String, required: true},
    status: {
        received: {type: Boolean, required: true},
        slideshow: Boolean
    }
});

drawingSchema.virtual('entryString').get(function(){
    return `For the ${this.event} event: #${this.number} ${this.name} ${this.series ? `(${this.series})` : ''}.`;
})

const EventDrawing = mongoose.model('EventDrawing', drawingSchema);

module.exports = EventDrawing;