const { SlashCommandBuilder, hideLinkEmbed } = require('@discordjs/builders');

const values = [
    'Ace',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'Jack',
    'Queen',
    'King'
]

const suits = [
    'Clubs',
    'Diamonds',
    'Hearts',
    'Spades'
]

const randomArrayItem = (array) => {
	const randomIndex = Math.floor(Math.random() * array.length);
	return (array[randomIndex]);
}

module.exports = { 
    data: new SlashCommandBuilder()
        .setName('drawcard')
        .setDescription('Draw a random card. (Doesn\'t persist.)'),
    async execute(interaction){

        const value = randomArrayItem(values);
        const suit = randomArrayItem(suits);

        const responseText = `You drew a **${value} of ${suit}** and shuffled it back into the deck.`

        await interaction.reply({
            content: responseText
        })

    }
}