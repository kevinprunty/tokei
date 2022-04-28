const axios = require('axios');
const { SlashCommandBuilder } = require('@discordjs/builders');



module.exports = {
	data: new SlashCommandBuilder()
		.setName('aichat')
		.setDescription('Chat with an AI.')
		.addStringOption(option => option.setName('message').setDescription('The message to send the AI').setRequired(true)),
	async execute(interaction) {
		const message = interaction.options.getString('message');
		await interaction.deferReply();

		const options = {
			method: 'GET',
			url: 'https://random-stuff-api.p.rapidapi.com/ai',
			params: {
			  msg: message,
			  bot_name: 'Tokei',
			  bot_gender: 'agender',
			  bot_master: 'ToasterBrains',
			  bot_age: '3000',
			  bot_location: 'Richmond, Virginia',
			  bot_email: 'not important',
			  bot_build: 'EXP Special',
			  bot_birth_year: '2022',
			  bot_birth_date: 'April 2022',
			  bot_birth_place: 'USA',
			  bot_favorite_color: 'Red',
			  bot_favorite_book: 'Series of Unfortunate Events by Lemony Snicket',
			  bot_favorite_band: 'Polkadot Stingray',
			  bot_favorite_artist: 'Polkadot Stingray',
			  bot_favorite_actress: 'Emma Watson',
			  bot_favorite_actor: 'Jim Carrey',
			  id: interaction.member.id
			},
			headers: {
			  Authorization: process.env.RANDOM_STUFF_TOKEN,
			  'X-RapidAPI-Host': 'random-stuff-api.p.rapidapi.com',
			  'X-RapidAPI-Key': process.env.RANDOM_STUFF_TOKEN
			}
		  };

		
		  try {
			const response = await axios(options);
			console.log(response.data);
			await interaction.editReply({
				content:`No errors. Check the log for response data.`,
				ephemeral: true
			})
		  } catch (error) {
			console.log(error.message);
			await interaction.editReply({
				content:`Errors! Check the log for response data.`,
				ephemeral: true
			})
		  }
		  

		

	},
};