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
			return interaction.editReply({content:"Whoops, that response was too long. Sorry!"})
		}
		await interaction.editReply({content:compositeResponse});
	},
};