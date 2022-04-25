const db = require('../data/database/driver.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('fightmode')
		.setDescription('EXP Fight Mode minigame! [Under Construction]')
        .addSubcommand(subcommand => 
            subcommand
                .setName("register")
                .setDescription('Register to participate in Fight Mode.'))
        .addSubcommand(subcommand => 
            subcommand
                .setName("unregister")
                .setDescription('Remove yourself from participation in Fight Mode'))
        .addSubcommand(subcommand => 
            subcommand
                .setName("info")
                .setDescription('Get the stats of yourself or another fighter.')
                .addUserOption(option => option.setName("user").setDescription("The user you want the info of. Leave blank for yourself."))),
	async execute(interaction) {
        const userId = interaction.user.id;
        return interaction.reply({content: "This function is currently under construction!", ephemeral: true});
        // // Register
        // if(interaction.options.getSubcommand() === 'register'){
            
        //     await interaction.reply({content: `Registering ${interaction.user}...`, ephemeral: true});
            
        //     try{
        //         await db.fightMode.register(userId);
        //         await interaction.editReply({content: 'Registration succeeded. Welcome to Fight Mode!', ephemeral: true});
        //     } catch (error){
        //         console.error(error);
        //         if (error.code == 11000){
        //             await interaction.editReply({content: 'Registration failed. You are already registered.', ephemeral: true});
        //         } else {
        //             await interaction.editReply({content: 'Registration failed. Ask Toaster to help.', ephemeral: true});
        //         }
                
                
        //     }
            
            
        // }

        // // Unregister
        // if(interaction.options.getSubcommand() === 'unregister'){
        //     await interaction.reply({content: `Deleting ${interaction.user} from Fight Mode...`, ephemeral: true});

        //     try{
        //         await db.fightMode.unregister(userId);
        //         await interaction.editReply({content: 'Delete succeeded.', ephemeral: true});
        //     } catch (error){
        //         console.error(error.message);
        //         await interaction.editReply({content: 'Delete failed.', ephemeral: true});
        //     }
        // }

        // // Info
        // if(interaction.options.getSubcommand() === 'info'){
        //     const targetUser = interaction.options.getUser('user') || interaction.user;
            
        //     try {
        //         const fighter = await db.fightMode.getFighter(targetUser.id);
        //         if (!fighter) return interaction.reply({content: "That person isn't registered in our system.", ephemeral:true}); // No fighter.

        //         await interaction.reply({content: `<@${fighter.userId}>'s stats:\n**HP**:${fighter.stats.hp}\n**Defense**:${fighter.stats.defense}\n**Speed**:${fighter.stats.speed}\n`, allowedMentions: { parse: [], repliedUser: false }});
        //     } catch (error) {
        //         console.error(error.message);
        //         await interaction.reply({content: "Something went wrong when trying to find that fighter.", ephemeral: true})
        //     }
        // }
	},
};