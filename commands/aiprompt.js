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
		const prompt = interaction.options.getString('prompt');
        await interaction.reply('Getting AI response');
        const response = await getResponse(prompt);
        if (!response) {
            await interaction.editReply({content:"The AI responses are broken at the moment!"});
        }
        const compositeResponse = `Your prompt: ${prompt}\nResponse: ${response}`
		if (compositeResponse.length > 2000){
			console.log(compositeResponse);
			try{
				const regex = /[\s\S]{1,2000}/gm;
				const sections = compositeResponse.match(regex);
				const firstSection = sections.shift();
				await interaction.editReply({content:firstSection});
				for (let section of sections){
					await interaction.followUp({content: section});
				}

			} catch(err){
				return interaction.editReply({content:"Whoops, that response was too long. Sorry!"})
			}
		} else {
			await interaction.editReply({content:compositeResponse});
		}
		
	},
};