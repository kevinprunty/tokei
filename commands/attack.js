const { SlashCommandBuilder } = require('@discordjs/builders');

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
	'keyblade', 
	'quarterstaff',
	'can of soup', 
	'cross chop',
	'jump kick',
	'karate chop',
	'mach punch',
	'seismic toss', 
	'Signature 619',
	'West Coast Pop',
	'dragon punch',
	'pot of greed', 
	'one-inch punch', 
	'pink slip', 
	'headbutt',
	'open-handed strike',
	'hundred hand slap',
	'spinning piledriver',
	'tiger knee',
	'split punch',
	'hurricane kick',
	'Tatsumaki Senpukyaku',
	'shoryuken',
	'destructo disc',
	'crowbar',
	'mama mia',
	'car', 
	'can of bang energy drink', 
	'powerbomb', 
	'spoiler', 
	'diamond cutter',
	'RKO OUTTA NOWHERE'
];

const pluralAttacks = [
	'facts and logic', 
	'energy beams',
	'thrown hammers',
	'sweet nothings', 
	'depressing thoughts',
	'thoughts and prayers', 
	'flaming arrows'
]

const sliceAttacks = [
	'katana',
	'masamune',
	'photon edge',
	'slicey slice', 
	'scythe', 
	'plastic knife'
];
const stabAttacks = [
	'dagger',
	'kitchen knife',
	'stabbity stab', 
	'spear',
	'pike',
	'plastic fork', 
	'plastic spoon'
];

const shootAttacks = [
	'gun',
	'revolver',
	'laser gun',
	'flamethrower', 
	'bow and arrow',
	'missile', 
	'special beam cannon',
	'kamehameha', 
	'death beam', 
	'galick gun', 
	'poison arrow', 
	'hadouken',
	'fireball'
]

const destroyAttacks = [
	'facts and logic'
]

const attacksSet = new Set([...hitsAttacks, ...sliceAttacks, ...stabAttacks, ...shootAttacks, ...pluralAttacks, ...destroyAttacks]); // Remove duplicates
const attacks = [...attacksSet];

const adjectives = [
	'vicious',
	'terrifying',
	'devastating',
	'chunky',
	'fat',
	'cruel',
	'spicy',
	'well placed',
	'well earned',
	'pretty weak',
	'strong',
	'chad-like', 
	'intimidating',
	'appropriate',
	'inappropriate',
	'scary',
	'spooky',
	'',
	'simple',
	'huge',
	'small',
	'large',
	'massive',
	'tiny',
	'microscopic',
	'poorly placed',
	'sexy', 
	'greedy',
	'prideful',
	"unstoppable",
	"weak", 
	'wake-up',
	'plus on block', 
	'serious', 
	'speedy', 
	'poorly timed', 
	'sweaty'
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
		let article;
		let attack = randomArrayItem(attacks)
		let adjective = randomArrayItem(adjectives);

		if (sliceAttacks.includes(attack)){
			action = "slices";
		} else if (stabAttacks.includes(attack)) {
			action = "stabs";
		} else if (shootAttacks.includes(attack)) {
			action = "shoots";
		} else if (destroyAttacks.includes(attack)) {
			action = "destroys";
		} else {
			action = "hits";
		}

		const adjectiveFirstLetter = adjective.charAt(0);
		if (['a','e','i','o','u'].includes(adjectiveFirstLetter)){
			article = 'an';
		} else if (pluralAttacks.includes(attack)) {
			article = "some";
		} else { 
			article = 'a';
		}

		const target = interaction.options.getUser('user');
		const attacker = interaction.user;

		await interaction.reply({
			content:`${attacker} ${action.toUpperCase()} ${target} WITH ${article.toUpperCase()} ${adjective.toUpperCase()} ${attack.toUpperCase()}!`,
			allowedMentions: { parse: ['users'], repliedUser: false }
		})
	},
};