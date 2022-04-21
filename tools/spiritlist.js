const SPIRITS_MAX = 1513;
const SPIRITS_MIN = 1;

const spirits = require('../data/spirits.json');


const randomSpiritNumber = () => Math.floor(Math.random() * (SPIRITS_MAX - SPIRITS_MIN + 1) + SPIRITS_MIN);

module.exports = {
    getRandomSpirit(){
        return spirits[randomSpiritNumber()-1]
    },
}