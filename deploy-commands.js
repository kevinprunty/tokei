const fs = require('node:fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const dotenv = require('dotenv');
dotenv.config();

const token = process.env.BOT_TOKEN;

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

(async ()=>{

	try {
		let guildID = '';
		if (process.env.NODE_ENV === "development"){
			guildID = process.env.DEV_GUILD_ID
		} else { 
			guildID = process.env.GUILD_ID;
		}

		console.log(`Started refreshing slash commands for ${process.env.NODE_ENV}.`);
		await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, guildID), { body: commands })
		.then(() => console.log('Successfully registered application commands.'))
		.catch(console.error);

		console.log('Successfully reloaded slash commands.');
	} catch (error) {
		console.error(error.message);
	}


})()





