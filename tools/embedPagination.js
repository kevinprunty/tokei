const { MessageActionRow, MessageButton } = require('discord.js');



const createButton = (buttonName, buttonLabel) => {
    return new MessageButton()
        .setCustomId(buttonName.toLowerCase())
        .setLabel(buttonLabel)
        .setStyle("PRIMARY")
        .setDisabled(true)
}

const createButtonRow = () => {
    const buttonData = [
        { name: "firstPage", label: "<< First" },
        { name: "prevPage", label: "< Previous" },
        { name: "currentPage", label: "Page # of #" },
        { name: "nextPage", label: "> Next" },
        { name: "lastPage", label: ">> Last" },
    ]

    const buttonComponents = buttonData.map(button => createButton(button.name, button.label));

    return new MessageActionRow().addComponents(...buttonComponents);
}


const paginate = async (interaction, embedPages) => {
    const buttonRow = createButtonRow();

    await interaction.reply({
        embeds: [embedPages[0]], 
        components: [buttonRow]
    })


    const ids = [
        "firstpage",
        "prevpage",
        "currentpage",
        "nextpage",
        "lastpage"
    ]


    try { 
        // This code is adapted from the code Moydow showed me in #developers,
        // combined with the code on https://discordjs.guide/interactions/buttons.html#responding-to-buttons

        const filter = i => ids.includes(i.customId);
        const time = 5 * 60 * 1000;
        const collector = interaction.channel.createMessageComponentCollector({filter, time});
        
        const thisPage = 1;

        collector.on('collect', async i => {
            switch (i.customId) {
                case "firstpage":
                    thisPage = 1;
                    break;
                case "prevpage":
                    thisPage--;
                    break;
                case "nextpage":
                    thisPage++;
                    break;
                case "lastpage":
                    thisPage = embedPages.length;
                    break;
            }

            // Update button labels and disable/enable according to which page we're on
            if (thisPage === 1) {
                buttonRow.components[0].setDisabled(true);
                buttonRow.components[1].setDisabled(true);
            } else {
                buttonRow.components[0].setDisabled(false);
                buttonRow.components[1].setDisabled(false);
            }

            if (thisPage === embedPages.length) {
                buttonRow.components[3].setDisabled(true);
                buttonRow.components[4].setDisabled(true);
            } else {
                buttonRow.components[3].setDisabled(false);
                buttonRow.components[4].setDisabled(false);
            }

            buttonRow.components[2].setLabel(`Page ${thisPage} of ${embedPages.length}`);

            await message.edit({embeds: [embedPages[thisPage - 1]], components: [buttonRow]});


        });
            
    } catch (error) {
        // means buttons timed out, remove them
        if (error.name === "Error [INTERACTION_COLLECTOR_ERROR]") return message.edit({components: []})
            .catch(e => {if (e.name !== "DiscordAPIError") throw error;});
        // otherwise throw the error if something else went wrong
        if (error.name !== "DiscordAPIError") throw error;
    }
}


module.exports = paginate;