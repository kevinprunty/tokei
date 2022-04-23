const POKEMON_MAX = 905;


const pokemon = require('../data/pokemon.json');

const randomPokemonNumber = () => Math.floor(Math.random() * (POKEMON_MAX + 1));
const findRandomPokemon = () => {
    const randomNumber = randomPokemonNumber();
    let foundPokemon = {};
    for (const key in pokemon){
        const value = pokemon[key];
        if (value.num == randomNumber){
            foundPokemon = value;
            break;
        }
    }

    return foundPokemon;
}

const getMinimizedPokemon = () => {
    const randomPokemon = findRandomPokemon();
    return {
        number: randomPokemon.num,
        name: randomPokemon.name
    }
}

module.exports = {
    findRandomPokemon,
    getMinimizedPokemon
}