const { gacha, gachaPlayer } = require('../data/database/driver.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

// Cached player Ids
const gachaPlayers= [];

module.exports = {
	data: new SlashCommandBuilder()
		.setName('gacha')
		.setDescription('Pull from the EXP Gacha!'),
	async execute(interaction) {
        await interaction.deferReply();
        const userId = interaction.user.id;
        let player;
        // Check if player exists in cache
        const gachaPlayersIds = gachaPlayers.map(gachaPlayer => gachaPlayer.userId);

        if (!gachaPlayersIds.includes(userId)){
            // Check if player exists at all
            player = await gachaPlayer.getGachaPlayer(userId);
            if (!player){
                // Since it doesn't exist, make one
                console.log("Initializing player:", userId);
                await gachaPlayer.initializePlayer(userId)
                console.log("Initializing player initialized.");
                player = await gachaPlayer.getGachaPlayer(userId);
            }

            gachaPlayers.push(player);
        } else {
            player = gachaPlayers[gachaPlayersIds.indexOf(userId)];
        }

        const randomGachaRarityList = await gacha.getRandomGachaRarity();
        if (randomGachaRarityList.length == 0){
            return interaction.reply({
                content: "There isn't anything in that rarity!", 
                ephemeral: true
            })
        }
        const randomIndex = Math.floor(Math.random() * randomGachaRarityList.length);
        const gachaPull = randomGachaRarityList[randomIndex];

        // Push gacha pull to player
        const gachaId = gachaPull._id;

        const pushedItem = await gachaPlayer.pushGachaItem(userId, gachaId);
        if (!pushedItem.success){
            throw new Error(pushedItem.error);
        } else {
            // Update cached player
            player = pushedItem.player
            gachaPlayers[gachaPlayersIds.indexOf(userId)] = player;
        }




		await interaction.editReply({
			content:`**You pulled** #${gachaPull.gachaId} ${gachaPull.name} (${gachaPull.rarity.toUpperCase()})! ${gachaPull.description}`,
		})
	},
};