// Read files
const fs = require('node:fs');

// Database
const mongoose = require('mongoose');

// Read environment file
const dotenv = require('dotenv');
dotenv.config();

// discord.js
const { Client, Collection, Intents } = require('discord.js');

// Create a new client
const client = new Client({
    intents: [Intents.FLAGS.GUILDS],
});

// Create a collection of commands
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles){
    const command = require(`./commands/${file}`);

    // Set a new item in the Collection
	// With the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
}


client.once('ready', async () => {
    console.log('Bot is ready.');
    console.log('Connecting to the database');
    const connection = await mongoose.connect(`mongodb+srv://admin:${process.env.DB_PASS}@cluster0.dumc6.mongodb.net/tokei?retryWrites=true&w=majority`);
    console.log('Conencted to the database');

    // Set command permissions
    
    // Gacha admin
    // Role: : 968274336999936100
    // Command ID: 968273941573541948

    const fullPermissions = [
        {
            id: '968273941573541948', 
            permissions: [{
                id: '968274336999936100',
                type: 'ROLE',
                permission: true,
            }]
        }
    ]

    await client.guilds.cache.get(process.env.GUILD_ID).commands.permissions.set({ fullPermissions })

});



// Commands
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    //Command logging
    console.log(`${interaction.user.tag} used ${interaction.commandName}.`)


    // Command handling
    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try { 
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ 
            content: 'There was an error while executing that command!', 
            ephemeral: true
        });
    }

})


client.login(process.env.BOT_TOKEN);