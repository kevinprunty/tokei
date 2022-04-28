const { gacha } = require('../data/database/driver.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const MAX_PULLS = 6;


module.exports = {
	data: new SlashCommandBuilder()
		.setName('multigacha')
		.setDescription('Pull multiple from the EXP Gacha!')
        .addNumberOption(option => option.setName('pulls').setDescription(`Number of pulls. Between 2-${MAX_PULLS}.`)),
	async execute(interaction) {
        let pulls;
        if (interaction.options.getNumber('pulls') && interaction.options.getNumber('pulls') != 0){
            pulls = interaction.options.getNumber('pulls') || 2;
        }
        
        const pullsArray = [];

        if (pulls > MAX_PULLS || pulls < 2){
            return interaction.reply({
                content: `Pulls should be between 2-${MAX_PULLS}`, 
                ephemeral: true
            })
        }

        for (let i = 0; i < pulls; i++){
            const randomGachaRarityList = await gacha.getRandomGachaRarity();
            if (randomGachaRarityList.length == 0){
                return interaction.reply({
                    content: "There isn't anything in that rarity!", 
                    ephemeral: true
                })
            }
            const randomIndex = Math.floor(Math.random() * randomGachaRarityList.length);
            const gachaPull = randomGachaRarityList[randomIndex];
            pullsArray.push(gachaPull);
        }
        
        const pullsStringArray = pullsArray.map(gachaPull => `[#${gachaPull.gachaId} ${gachaPull.name} (${gachaPull.rarity.toUpperCase()}): ${gachaPull.description}]`);

		await interaction.reply({
			content:`**You pulled**:\n${pullsStringArray.join('\n\n')}`,
		})
	},
};