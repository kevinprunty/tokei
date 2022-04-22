const { getRandomSpirit } = require('../tools/spiritlist.js');
const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('getspirit')
		.setDescription('Returns a random spirit from SSBU.'),
	async execute(interaction) {
        const spirit = getRandomSpirit();
		await interaction.reply({
			content:`Your spirit is #${spirit.number}: ${spirit.name}. <@&966341443453063168>`,
			allowedMentions: { parse: ['roles'], repliedUser: false }
		})
	},
};