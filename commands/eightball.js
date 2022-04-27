const { SlashCommandBuilder } = require('@discordjs/builders');

const yes = [
	"Yes.",
	"Absolutely",
	"It is certain.", 
	"It is decidedly so.",
	"Without a doubt.",
	"Yes definitely.",
	"You may rely on it.",
	"As I see it, yes.",
	"Most likely.",
	"Outlook good.",
	"Signs point to yes."
]

const no = [
	"No.",
	"Absolutely not.",
	"Did you honestly think that was the case?", 
	"My reply is no.",
	"Don't count on it", 
	"My sources say no.", 
	"Outlook not so good.",
	"Very doubtful."
]


const noncommital = [
	"Maybe",
	"Yes and no.", 
	"Reply hazy, try again.", 
	"Ask again later.", 
	"Better not tell you now.", 
	"Cannot predict now.",
	"Concentrate and ask again.",
]

const answersArrays = [
	yes, 
	no, 
	noncommital
]

const randomArrayItem = (array) => {
	const randomIndex = Math.floor(Math.random() * array.length);
	return (array[randomIndex]);
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('eightball')
		.setDescription('Answers your yes or no question.')
		.addStringOption(option => 
			option.setName('question')
				.setDescription('The yes or no question you want to ask.')
				.setRequired(true)),
	async execute(interaction) {
		const question = interaction.options.getString('question');
		const seed = Math.floor(Math.random()* (question.length % 10));

		let selectedArray;
		
		for (let i; i < seed; i++){
			selectedArray = randomArrayItem(answersArrays);
		}


		const answer = randomArrayItem(selectedArray);


		const responseMessage = `Your question: ${question}\nBot's answer:${answer}`;
		await interaction.reply({
			content:responseMessage,
		})
	},
};