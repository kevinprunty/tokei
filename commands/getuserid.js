const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('getuserid')
		.setDescription('Returns a user id')
        .addUserOption(option => 
            option.setName('user')
                .setDescription('The user to find')
                .setRequired(true)),
	async execute(interaction) {
        const user = interaction.options.getUser('user');
		await interaction.reply({content:`${user}'s id is: `})
	},
};