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
	"Signs point to yes.", 
	"I think so.", 
	"YES! YES! YES!", 
	"For sure.", 
	"Looks like it.", 
	"Yes uwu",
]

const no = [
	"No.",
	"Absolutely not.",
	"Did you honestly think that was the case?", 
	"My reply is no.",
	"Don't count on it", 
	"My sources say no.", 
	"Outlook not so good.",
	"Very doubtful.", 
	"Hell no.", 
	"I wish, but no.", 
	"NOOOOOOOOOOO!", 
	"No way.",
	"No owo",
]


const noncommittal = [
	"Maybe",
	"Yes and no.", 
	"Reply hazy, try again.", 
	"Ask again later.", 
	"Better not tell you now.", 
	"Cannot predict now.",
	"Concentrate and ask again.",
	"Idunno.", 
	"idk lol", 
	"Ask something else.", 
	"I choose to ignore that question."
]

const oops = [
	"Oopsie whoopsie! We made a fucky wucky! A little fucko boingo!", 
	"To answer that, we need to talk about parallel universes.",
	"The answer is-- RKO OUTTA NOWHERE!",
	"Secret unlocked! But not your answer.", 
	"I'll tell you if you ironman with me in Runescape.",
	"Wow, you found a secret answer. Your question seems less important now, huh?"
]

const answersArrays = [
	yes,
	yes,
	yes, 
	no, 
	no, 
	no, 
	noncommittal,
	noncommittal,
	noncommittal,
	yes,
	yes,
	yes, 
	no, 
	no, 
	no, 
	noncommittal,
	noncommittal,
	noncommittal,
	oops
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
		for (let i = 0; i <= seed; i++){
			selectedArray = randomArrayItem(answersArrays);
		}


		const answer = randomArrayItem(selectedArray);


		const responseMessage = `Your question: ${question}\n:8ball:: ${answer}`;
		await interaction.reply({
			content:responseMessage,
		})
	},
};