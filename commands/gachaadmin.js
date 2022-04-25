const { SlashCommandBuilder } = require('@discordjs/builders');
const { gacha } = require('../data/database/driver.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('gachaadmin')
		.setDescription('Handle the gacha from the staff side')
        // .defaultPermission(false)
        .addSubcommand(subcommand => 
            subcommand
                .setName('create')
                .setDescription('Create an item for the gacha system')
                .addStringOption(option => option
                    .setName('name')
                    .setDescription('The name for the gacha item')
                    .setRequired(true))
                .addStringOption(option => option
                    .setName('rarity')
                    .setDescription('Rarity for item. [C, B, A, S, SS, SSS]')
                    .setRequired(true))
                .addStringOption(option => option
                    .setName('description')
                    .setDescription('The short description for the item.')
                    .setRequired(true)))
        .addSubcommand(subcommand => 
            subcommand
                .setName('delete')
                .setDescription('Delete a gacha item by its number! (Careful!)')
                .addNumberOption(option => option.setName('id').setDescription('The number of the gacha item').setRequired(true)))
        .addSubcommand(subcommand => 
            subcommand
                .setName('getinfo')
                .setDescription('Get info on a gacha item')
                .addStringOption(option => option.setName('gachaname').setDescription('The name of the item you are looking for').setRequired(true))),

        
	async execute(interaction) {
        console.log("Gacha admin command id: ", interaction);
        // Create
        if (interaction.options.getSubcommand() === 'create'){
            const name = interaction.options.getString('name');
            const rarity = interaction.options.getString('rarity');
            const description = interaction.options.getString('description');

            const validRarities = ['C', 'B', 'A', 'S', 'SS', 'SSS'];

            // If rarity isn't valid
            if (!validRarities.includes(rarity.toUpperCase())){
                return interaction.reply({
                    content: "Rarity isn't valid. Try any of the following: [C, B, A, S, SS, SSS]",
                    ephemeral: true
                })
            }

            // Start to create the gacha item
            await interaction.deferReply();

            try {
                const createdGacha = await gacha.createGacha(name, rarity, description);
                return interaction.editReply({
                    content: `Gacha #${createdGacha.gachaId}: ${createdGacha.name} successfully created!`
                })
            } catch (error) {
                console.error(error.message);
                return interaction.editReply({
                    content: "Command broke, sorry! Tell Toaster.",
                    ephemeral: true
                })
            }

        }


        // Delete Item
        if (interaction.options.getSubcommand() === 'delete'){
            const id = interaction.options.getNumber('id');
            await interaction.deferReply();

            // Delete item
            try {
                const item = await gacha.getGachaById(id);
                if(!item){
                    return interaction.editReply({
                        content: "That item didn't exist!", 
                        ephemeral: true
                    })
                }
                gacha.deleteGacha(id);
                return interaction.editReply({
                    content: `#${item.gachaId}: ${item.name} is no more!`
                })
            } catch (error) {
                console.error(error.message);
                return interaction.editReply({
                    content: "Command broke, sorry! Tell Toaster.",
                    ephemeral: true
                })
            }
        }

        if (interaction.options.getSubcommand() === 'getinfo'){
            const name = interaction.options.getString('gachaname');
            await interaction.deferReply();

            try{
                const resultString = await gacha.getGachasStringByName(name);
                return interaction.editReply({
                    content: `Found items: ${resultString}`
                })
            } catch (error) {
                console.error(error.message);
                return interaction.editReply({
                    content: "Command broke, sorry! Tell Toaster.",
                    ephemeral: true
                })
            }
        }

        const replyContent = ``;
		await interaction.reply({
			content:replyContent,
		})
	},
};