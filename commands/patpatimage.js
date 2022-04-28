const fetch = require('node-fetch');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

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


		const outputUrl = `https://api.jeyy.xyz/image/patpat?image_url=${url}`


		await interaction.deferReply();
		const response = await fetch(outputUrl);
		console.log(response);
		const responseJson = response.json();
		if (responseJson.detail && responseJson.detail.msg){
			return interaction.editReply({
				content:`Validation error: $${detail.msg}`,
				ephemeral: true
			})
		}

		await interaction.editReply({
			content: outputUrl
		})
	},
};