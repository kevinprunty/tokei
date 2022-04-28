const fetch = require('node-fetch');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageAttachment} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('patpatimage')
		.setDescription('Patpats an image. Takes an image url parameter.')
		.addStringOption(option => option.setName('url').setDescription('The image url to patpat').setRequired(true)),
	async execute(interaction) {
		const url = interaction.options.getString('url');
		const urlRegex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;

		if (!url.match(urlRegex)){
			return interaction.reply({
				content:`Your URL isn't valid.`,
				ephemeral: true
			})
		}


		const outputUrl = `https://api.jeyy.xyz/image/patpat?image_url=${url}.gif`
		const attachment = new MessageAttachment(outputUrl, 'patpat.gif');

		const embed = new MessageEmbed()
			.setImage('attachment://patpat.gif');


		await interaction.reply({
			embeds: [embed], 
			files: [attachment]
		})
	},
};