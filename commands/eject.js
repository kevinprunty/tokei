
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment, MessageEmbed } = require('discord.js');

const colors = [
	'black',
	'blue',
	'brown',
	'cyan',
	'darkgreen',
	'lime',
	'orange',
	'pink',
	'purple',
	'red',
	'white',
	'yellow'
]

// Weighted boolean array
const bool = [
	true,
	false, 
	false, 
	false
]

const randomArrayItem = (array) => {
	const randomIndex = Math.floor(Math.random() * array.length);
	return (array[randomIndex]);
}


module.exports = {
	data: new SlashCommandBuilder()
		.setName('eject')
		.setDescription('Eject someone and find out if they are an imposter.')
		.addUserOption(option => option.setName('target').setDescription('Who you are ejecting').setRequired(true)),
	async execute(interaction) {
		const user = interaction.options.getUser('target');

		const color = randomArrayItem(colors);
		const imposter = randomArrayItem(bool);
		let targetName;
		await interaction.deferReply();
		try {
			targetName = interaction.guild.members.cache.find(member => member.user.id === user.id).displayName;
		} catch (error) {
			console.error(error.message);
			return interaction.editReply({
				content: `Whoops, eject command broke. Tell Toaster.`
			})
		}

		const url = `https://vacefron.nl/api/ejected?name=${targetName}&impostor=${imposter}&crewmate=${color}`
		const embed = new MessageEmbed()
			.setTitle(`${targetName} has been ejected...`)
			.setImage(url);
		await interaction.editReply({
			content:`${user}:`,
			embeds: [embed],
			allowedMentions: { parse: ['users'], repliedUser: false }
		})
	},
};