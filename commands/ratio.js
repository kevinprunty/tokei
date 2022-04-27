const { SlashCommandBuilder } = require('@discordjs/builders');

const ratios = [
	'skill issue',
	'seethe',
	'mald',
	"don't care + didn't ask",
	"log off",
	'this is going in my cringe compilation', 
	'like + comment + subscribe', 
	'touch grass', 
	'L again',
	'blocked',
	'dumb avatar',
	'cope',
	'i have issues',
	'zarude lose',
	'omae wa mou shinderu',
	'dishonor',
	'not on starboard', 
	'short arms', 
	'game over', 
	'unga bunga',
	'grrrr bark bark bark', 
	'anime pfp',
	'ratio again',
	'maidenless', 
	'ruh roh',
	'typo',
	'no nitro',
	'bad name color',
	'android',
	'iphone',
	'crestless',
	'Loss.jpg',
	'rank 10',
	'bad shirt',
	'persona fan',
	'hat goomba', 
	'comically large hat',
	'mobile',
	'cried',
	'FBI called',
	'dripless',
	'absorption',
	'obvious shill',
	'got a strike',
	'bad game',
	'horrendous vibes',
	'bot', 
	'you have scurvy',
	'plundered',
	'marooned', 
	'keelhauled',
	'time to starve',
	'updated autopsy report',
	'no evidence', 
	'F-tier',
	'mid'
]

const no = [
	'chaos emeralds',
	'bitches',
	'wenches',
	'men',
	'women',
	'honor',
	'mates',
	'likes',
	'friends',
	'stars', 
	'upvotes', 
	'smitches', 
	'rollback'

]

const randomArrayItem = (array) => {
	const randomIndex = Math.floor(Math.random() * array.length);
	return (array[randomIndex]);
}

const randomNumberOfRatios = () => {
	const min = 3;
	const max = 10;

	return Math.floor(Math.random() * (max - min + 1) + min)
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ratio')
		.setDescription('Ratio another member!'),
	async execute(interaction) {
		const selectedRatios = ['L', 'ratio'];

		const getRatio = ()=> {
			const randomRatio = randomArrayItem(ratios);

			if (selectedRatios.includes(randomRatio)) return getRatio();

			selectedRatios.push(randomRatio);
		}
		

		const randomNumber = randomNumberOfRatios();
		for(let i = 0; i <= randomNumber; i ++){
			if (i == randomNumber-2){
				selectedRatios.push(`no ${randomArrayItem(no)}`);
			} else { 
				getRatio();
			}
		}

		await interaction.reply({
			content:selectedRatios.join(' + '),
		})
	},
};