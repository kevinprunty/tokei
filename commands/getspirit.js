const { getRandomSpirit } = require('../tools/spiritlist.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

// Database functions
const { eventDrawing } = require('../data/database/driver.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('getspirit')
		.setDescription('Returns a random spirit from SSBU.'),
	async execute(interaction) {
        const spirit = getRandomSpirit();

		await interaction.reply({content: 'Connecting to database...'});
		// Save entry to database
		const entry = await eventDrawing.createNewEntry("spirits", spirit, interaction)

		await interaction.editReply({
			content:`Your spirit is #${entry.number}: ${entry.name} (${entry.series}). <@&966341443453063168>`,
			allowedMentions: { parse: ['roles'], repliedUser: false }
		})
	},
};