const { SlashCommandBuilder } = require('@discordjs/builders');

const rollDice = inputSides => {
    const sides = Math.floor(inputSides);
    return Math.floor(Math.random() * sides + 1);
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('flipcoin')
		.setDescription('Flip a coin.'),
	async execute(interaction) {
        let result;
        const hotNumber = Math.floor(Math.random() * 2);


        if (hotNumber === 0){
            result = tails;
        } else {
            result = heads;
        }

		await interaction.reply({ content:`You flipped a coin. It's ${result}!`})
	},
};