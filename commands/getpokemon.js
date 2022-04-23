const { getMinimizedPokemon } = require('../tools/pokemonlist.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('getpokemon')
		.setDescription('Returns a random Pokemon (does not include Scarlet & Violet).'),
	async execute(interaction) {
        const pokemon = getMinimizedPokemon();
		await interaction.reply({
			content:`Your Pokemon is #${pokemon.number}: ${pokemon.name}.`,
			allowedMentions: { parse: ['roles'], repliedUser: false }
		})
	},
};