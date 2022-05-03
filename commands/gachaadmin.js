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
                    .setRequired(true)
                    .addChoices(['C', 'B', 'A', 'S', 'SS', 'SSS']))
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
                .addStringOption(option => option.setName('gachaname').setDescription('The name of the item you are looking for').setRequired(true)))
        .addSubcommand(subcommand => 
            subcommand
                .setName('getbynumber')
                .setDescription('Get a gacha item by its number')
                .addNumberOption(option => option.setName('id').setDescription('The number of the gacha item').setRequired(true))),

        
	async execute(interaction) {
        // Check if the user has the right role
        // Role ID: 968274336999936100
        const gachaTeamRole = interaction.member.roles.cache.get('968274336999936100');
        if(!gachaTeamRole){
            return interaction.reply({
                content: "You aren't part of the Tokei team.", 
                ephemeral: true
            })
        }
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


        // Delete
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
                await gacha.deleteGacha(id);
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


        // Get info
        if (interaction.options.getSubcommand() === 'getinfo'){
            const name = interaction.options.getString('gachaname');
            await interaction.deferReply();

            try{
                const resultString = await gacha.getGachasStringByName(name);
                return interaction.editReply({
                    content: `Found items: ${resultString}`,
                    allowedMentions: { parse: ['users'], repliedUser: false }
                })
            } catch (error) {
                console.error(error.message);
                return interaction.editReply({
                    content: "Command broke, sorry! Tell Toaster.",
                    ephemeral: true
                })
            }
        }

        // Get by number
        if (interaction.options.getSubcommand() === 'getbynumber'){
            const id = interaction.options.getNumber('id');
            await interaction.deferReply();

            try{
                const item = await gacha.getGachaById(id);
                const resultString = `#${item.gachaId}: ${item.name} (${item.rarity}). ${item.description}`;
                return interaction.editReply({
                    content: `Found item: ${resultString}`,
                    allowedMentions: { parse: ['users'], repliedUser: false }
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