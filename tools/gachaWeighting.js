const gachaRarities = [
    {rarity: 'F', weight: 2}, // ZARUDE SANDSTORM
    {rarity: 'C', weight: 50},
    {rarity: 'B', weight: 25},
    {rarity: 'A', weight: 10},
    {rarity: 'S', weight: 7},
    {rarity: 'SS', weight: 5},
    {rarity: 'SSS', weight: 3}
]

const getRarity = () => {
    const weightedRarities = [];

    for (rarity of gachaRarities){
        for (let i = 0; i < rarity.weight; i++){
            weightedRarities.push(rarity.rarity);
        }
    }

    const randomIndex = Math.floor(Math.random() * weightedRarities.length);
    return weightedRarities[randomIndex];
}


module.exports = getRarity;