
const { SlashCommandBuilder } = require('@discordjs/builders');
const { gacha } = require('../data/database/driver.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('editgacha')
		.setDescription('Gacha team only! Edit a gacha entry.')
        .addSubcommand(subcommand => 
            subcommand
                .setName('name')
                .setDescription('Change the name of an entry.')
                .addNumberOption(option=>option.setName('id').setDescription('The number of the entry to edit.').setRequired(true))
                .addStringOption(option=>option.setName('name').setDescription('The name to change it to.').setRequired(true)))
        .addSubcommand(subcommand => 
            subcommand
                .setName('description')
                .setDescription('Change the description of an entry.')
                .addNumberOption(option=>option.setName('id').setDescription('The number of the entry to edit.').setRequired(true))
                .addStringOption(option=>option.setName('description').setDescription('The description to change it to.').setRequired(true))),
	async execute(interaction) {
        await interaction.deferReply();
         // Check if the user has the right role
        // Role ID: 968274336999936100
        const gachaTeamRole = interaction.member.roles.cache.get('968274336999936100');
        if(!gachaTeamRole){
            return interaction.reply({
                content: "You aren't part of the gacha team", 
                ephemeral: true
            })
        }
        
        // Change name
        if (interaction.options.getSubcommand() === 'name'){
            const id = interaction.options.getNumber('id');
            const newName = interaction.options.getString('name');
            try{
                // Get 
                const selection = await gacha.getGachaById(id);
                if (!selection){
                    return interaction.editReply({
                        content: "That id doesn't exist!", 
                        ephemeral: true
                    })
                }
                // Update 
                const update = {...selection};
                update.name = newName;
                console.log(update);
                await gacha.updateGacha(id, update);
                return interaction.editReply({
                    content: `${selection.name} updated to ${newName}!`, 
                    ephemeral: true
                })

            } catch(err) {
                console.error(err);
                return interaction.editReply({
                    content: "Problem editing entry!", 
                    ephemeral: true
                })
            }
        }

        // Change description
        if (interaction.options.getSubcommand() === 'name'){
            const id = interaction.options.getNumber('id');
            const description = interaction.options.getString('description');
            try{
                // Get 
                const selection = await gacha.getGachaById(id);
                if (!selection){
                    return interaction.editReply({
                        content: "That id doesn't exist!", 
                        ephemeral: true
                    })
                }

                // Update 
                const update = {...selection};
                update.description = description;
                await gacha.updateGacha(id, update);
                return interaction.editReply({
                    content: `${selection.name}'s description is updated!`, 
                    ephemeral: true
                })
                
            } catch(err) {
                console.error(err);
                return interaction.editReply({
                    content: "Problem editing entry!", 
                    ephemeral: true
                })
            }
        }
	},
};