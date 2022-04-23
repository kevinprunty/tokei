const { SlashCommandBuilder } = require('@discordjs/builders');
// Server list
const serverList = require('../data/servers.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('serverlist')
		.setDescription('Returns info about EXP owned servers.')
		.addStringOption(option => 
			option.setName('server')
				.setDescription('The server to get info for (e.g. "Minecraft")')
				.setRequired(true)),
	async execute(interaction) {
        const requestedServer = interaction.options.getString('server');
		
		// Find server
		const foundServer = serverList.find(server => server.name.toLowerCase() == requestedServer.toLowerCase())

		if (!foundServer) {
			return interaction.reply({content: `We don't own a '${requestedServer}' server. Check your spelling?`});
		}

		const serverName = foundServer.name;
		const serverIP = foundServer.ip;

		const responseMessage = `The ${serverName} server's connection info is:\n${serverIP}`;
		await interaction.reply({
			content:responseMessage,
		})
	},
};