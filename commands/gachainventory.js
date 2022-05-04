const { gachaPlayer } = require('../data/database/driver.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const paginate = require('../tools/embedPagination.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('gachainventory')
		.setDescription('See your gacha inventory!')
        .addUserOption(option => option.setName('target').setDescription('The user whose inventory you want to see.')),
	async execute(interaction) {
        await interaction.deferReply();
        const userId = interaction.options.getUser('target') ? interaction.options.getUser('target').id : interaction.user.id;
        const member = interaction.guild.members.cache.find(member => member.user.id === userId);
        const displayName = member.displayName;
        const displayColor = member.displayHexColor;
        // Check if player exists:
        const player = await gachaPlayer.getPopulatedGachaPlayer(userId);
        if (!player){
            return interaction.editReply({
                content:`You or the indicated user did not try /gacha yet!`,
            })
        }

        const playerInventory = player.inventory; // Array of objects
        const sortedInventory = playerInventory.sort((a, b) => a.item.gachaId - b.item.gachaId);
        const inventorySize = playerInventory.length;

        // 25 is the field limit on embeds
        const sections = Math.ceil(inventorySize/25);

        const embedPages = [];

            // Loop: Create the Embed, push it to array
            // i represents the current section
            for (let i = 0; i < sections; i++){
                const indexOffset = i*25;

                const fields = [];

                let endingIndex = 25;
                if (i === sections-1){
                    endingIndex = inventorySize - (indexOffset);
                } 

                for (let index = 0; index < endingIndex; index++){
                    const totalIndex = index+indexOffset;
                    const currentItem = sortedInventory[totalIndex];

                    fields.push(
                        {
                            name: currentItem.item.gachaId.toString(),
                            value: `${currentItem.item.name} (${currentItem.item.rarity.toUpperCase()}) x${currentItem.count}`, 
                            inline: true
                        }
                    )
                }

                const embed = new MessageEmbed()
                    .setColor(displayColor)
                    .setTitle(`${displayName}'s Inventory`)
                    .setFooter({text: 'EXP Gacha System'})
                    .addFields(
                        ...fields
                    )

                embedPages.push(embed);
                

            }
            if (sections > 1){
                return paginate(interaction, embedPages, false);
            } else {
                return paginate(interaction, embedPages, true);
            }
	},
};