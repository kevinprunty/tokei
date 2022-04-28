const { getRandomSpirit } = require('../tools/spiritlist.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('getspirit')
		.setDescription('Returns a random spirit from SSBU.'),
	async execute(interaction) {
		// Check if the user has the right role
        // Role ID: 968274336999936100
        const gachaTeamRole = interaction.member.roles.cache.get('968274336999936100');
        if(!gachaTeamRole){
            return interaction.reply({
                content: "This command isn't ready. :)\n-Toaster", 
                ephemeral: true
            })
        }
        const spirit = getRandomSpirit();
		await interaction.reply({
			content:`Your spirit is #${spirit.number}: ${spirit.name} (${spirit.series}). <@&966341443453063168>`,
			allowedMentions: { parse: ['roles'], repliedUser: false }
		})
	},
};