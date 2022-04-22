// Read files
const fs = require('node:fs');

// Read environment file
const dotenv = require('dotenv');
dotenv.config();

// discord.js
const { Client, Collection, Intents } = require('discord.js');

// Create a new client
const client = new Client({
    intents: [Intents.FLAGS.GUILDS],
    allowedMentions: { parse: ['roles'], repliedUser: false }
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


client.once('ready', () => {
    console.log('Bot is ready.');
});

// Commands
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

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