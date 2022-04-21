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
        const response = await getResponse(prompt);
        if (!response) {
            await interaction.reply({content:"The responses are broken at the moment!", ephemeral: true});
        }
        const compositeResponse = `Your prompt: ${prompt}\nResponse: ${response}`
		await interaction.reply({content:compositeResponse});
	},
};