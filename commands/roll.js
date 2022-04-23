const { getRandomSpirit } = require('../tools/spiritlist.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

const rollDice = inputSides => {
    const sides = Math.floor(inputSides);
    return Math.floor(Math.random() * sides + 1);
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roll')
		.setDescription('Roll a dice (#d# format).')
        .addStringOption(option => option.setName('roll').setDescription("#d# roll").setRequired(true)),
	async execute(interaction) {
        const rollRegex = /\d+d\d+/g;
        const roll = interaction.options.getString('roll');
        if (!rollRegex.test(roll)){ 
            return interaction.reply({
                content:`Your roll, ${roll}, isn't valid.`, 
                ephemeral: true
            })
        }

        const [number, sides] = roll.split('d');
        let total = 0;
        const rolls = [];
        for (let i = 0; i < number; i++){
            const newRoll = rollDice(sides);
            total += newRoll;
            rolls.push(newRoll);
        }

		await interaction.reply({ content:`Roll total: ${total}. Final roll: ${rolls[rolls.length-1]}.`})
	},
};