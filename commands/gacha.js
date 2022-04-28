const { gacha } = require('../data/database/driver.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('gacha')
		.setDescription('Pull from the EXP Gacha!'),
	async execute(interaction) {
        const randomGachaRarityList = await gacha.getRandomGachaRarity();
        if (randomGachaRarityList.length == 0){
            return interaction.reply({
                content: "There isn't anything in that rarity!", 
                ephemeral: true
            })
        }
        const randomIndex = Math.floor(Math.random() * randomGachaRarityList.length);
        const gachaPull = randomGachaRarityList[randomIndex];
		await interaction.reply({
			content:`**You pulled** #${gachaPull.gachaId} ${gachaPull.name} (${gachaPull.rarity.toUpperCase()})! ${gachaPull.description}`,
		})
	},
};