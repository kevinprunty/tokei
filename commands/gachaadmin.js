const { SlashCommandBuilder, EmbedAssertions } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const { gacha } = require('../data/database/driver.js');
const paginate = require('../tools/embedPagination.js');


const rarityChoices = [
    {name: 'C', value: 'C'},
    {name: 'B', value: 'B'},
    {name: 'A', value: 'A'},
    {name: 'S', value: 'S'},
    {name: 'SS', value: 'SS'},
    {name: 'SSS', value: 'SSS'},
]


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
                    .addChoices(...rarityChoices))
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
                .addNumberOption(option => option.setName('id').setDescription('The number of the gacha item').setRequired(true)))
        .addSubcommand(subcommand => 
            subcommand
                .setName('all')
                .setDescription('Get all gacha items.')),

        
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


        // Get all 
        if (interaction.options.getSubcommand() === 'all') {
            await interaction.deferReply();
            const allGacha = await gacha.getAll();
            const gachaTotal = allGacha.length;

            // 25 is the field limit on embeds
            const sections = Math.ceil(gachaTotal/25);

            const embedPages = [];

            // Loop: Create the Embed, push it to array
            // i represents the current section
            for (let i = 0; i < sections; i++){
                //  Generate a random color for each page. Why not?
                const randomColor = Math.floor(Math.random()*16777215).toString(16);
                const indexOffset = i*25;

                const fields = [];

                let endingIndex = 25;
                if (i === sections-1){
                    endingIndex = allGacha.length - (indexOffset);
                } 

                for (let index = 0; index < endingIndex; index++){
                    const totalIndex = index+indexOffset;
                    const currentItem = allGacha[totalIndex];

                    fields.push(
                        {
                            name: currentItem.gachaId.toString(),
                            value: `${currentItem.name} (${currentItem.rarity.toUpperCase()} x${currentItem.count ? currentItem.count : 0 })`, 
                            inline: true
                        }
                    )
                }

                const embed = new MessageEmbed()
                    .setColor(randomColor)
                    .setTitle(`All Gacha Items`)
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
            
        }

        const replyContent = ``;
		await interaction.reply({
			content:replyContent,
		})
	},
};