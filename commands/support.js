const { SlashCommandBuilder, hideLinkEmbed } = require('@discordjs/builders');

const supportLinks = [
    {
        name: 'PayPal',
        link: 'http://paypal.me/toasterbrains'
    }, 
    {
        name: 'Ko-fi', 
        link: 'https://ko-fi.com/toasterbrains'
    }
]


module.exports = { 
    data: new SlashCommandBuilder()
        .setName('support')
        .setDescription('Show links that support Toaster and the bot.'),
    async execute(interaction){

        let supportTextArray = supportLinks.map(link => `[${link.name}: ${hideLinkEmbed(link.link)}]`);

        const responseText = `Thank you for using the bot so much!\nYou don't have to support me, I will still make bot content free forever, but here are a few links where you can donate if you want.\n\n${supportTextArray.join('\n')}`

        await interaction.reply({
            content: responseText
        })

    }
}