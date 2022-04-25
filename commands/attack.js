const { SlashCommandBuilder } = require('@discordjs/builders');
const { ApplicationCommandPermissionType } = require('discord-api-types/v10');

const hitsAttacks = [
	'suplex',
	'camel clutch',
	'leg drop',
	'falcon punch',
	'falcon kick',
	"people's elbow",
	'punt kick',
	'cease and desist letter',
	'lawsuit',
	'wombo combo',
	'goomba stomp',
	'ground pound',
	'scissor kick',
	'double slap',
	'brick',
	'minecraft pickaxe',
	'flying lariat',
	'darkest lariat', 
	'alolan whip',
	'bitch slap',
	'bicycle',
	'strike',
	'folding chair',
	'koopa shell',
	'front grapple',
	'Irish whip',
	'back grapple',
	'revolver',
	'keyblade'
];

const sliceAttacks = [
	'katana',
	'masamune',
];
const stabAttacks = [
	'dagger',
	'kitchen knife',
	'stabbity stab'
];

const attacks = [...hitsAttacks, ...sliceAttacks, ...stabAttacks]

const adjectives = [
	'vicious',
	'terrifying',
	'devastating',
	'chunky',
	'cruel'
];

const randomArrayItem = (array) => {
	const randomIndex = Math.floor(Math.random() * array.length);
	return (array[randomIndex]);
}






module.exports = {
	data: new SlashCommandBuilder()
		.setName('attack')
		.setDescription('Attack another member!')
		.addUserOption(option => option.setName('user').setDescription('User to attack').setRequired(true)),
	async execute(interaction) {
        let action;
		let attack = randomArrayItem(attacks)

		if (sliceAttacks.includes(attack)){
			action = "slices";
		} else if (stabAttacks.includes(attack)) {
			action = "stabs";
		} else {
			action = "hits";
		}

		const target = interaction.options.getUser('user');
		const attacker = interaction.user;

		await interaction.reply({
			content:`${attacker} ${action.toUpperCase()} ${target} WITH A ${randomArrayItem(adjectives).toUpperCase()} ${attack.toUpperCase()}!`,
			allowedMentions: { parse: ['users'], repliedUser: false }
		})
	},
};