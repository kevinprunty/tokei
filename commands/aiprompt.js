const { SlashCommandBuilder } = require('@discordjs/builders');
const { getResponse } = require('../tools/ai/prompt.js');

module.exports = {
	
	data: new SlashCommandBuilder()
		.setName('aiprompt')
		.setDescription('Prompt an ai for a response.')
		.addStringOption(option => 
			option.setName('prompt')
				.setDescription('The prompt for the AI')
				.setRequired(true)),
	async execute(interaction) {

		// Check if the user has the right role
		// Role ID: 968274336999936100
		const tokeiTeamRole = interaction.member.roles.cache.get('968274336999936100');
		if(!tokeiTeamRole){
			return interaction.reply({
				content: "The AI Prompt is currently disabled unless you're on the Tokei Team.\nI'm currently looking for alternative AI engines.\n-Toaster", 
				ephemeral: true
			})
		}
		const prompt = interaction.options.getString('prompt');


		if (prompt.split(' ').length < 5){
			return interaction.reply({
				content: "Try using a prompt with at least 5 words.",
				ephemeral: true
			})
		}

		await interaction.deferReply();
        const response = await getResponse(prompt);
        if (!response) {
            await interaction.editReply({content:"The AI responses are broken at the moment!"});
        }
        const compositeResponse = `${response}`
		if (compositeResponse.length > 2000){
			try{
				const regex = /[\s\S]{1,2000}/gm;
				const sections = compositeResponse.match(regex);
				const firstSection = sections.shift();
				await interaction.editReply({content:firstSection});
				for (let section of sections){
					await interaction.followUp({content: section});
				}

			} catch(err){
				console.log(compositeResponse);
				await interaction.editReply({content:"Whoops, that response was too long. Sorry!"})
				await interaction.followUp({content:err.message});
			}
		} else {
			await interaction.editReply({content:compositeResponse});
		}
		
	},
};