const { MessageActionRow, MessageButton } = require('discord.js');



const createButton = (buttonName, buttonLabel, disabled) => {
    return new MessageButton()
        .setCustomId(buttonName.toLowerCase())
        .setLabel(buttonLabel)
        .setStyle("PRIMARY")
        .setDisabled(disabled)
}

const createButtonRow = (initiallyDisabled, sections) => {
    const buttonData = [
        { name: "firstPage", label: "<< First", disabled: true },
        { name: "prevPage", label: "< Previous", disabled: true},
        { name: "currentPage", label: `Page 1 of ${sections}`, disabled: true },
        { name: "nextPage", label: "> Next", disabled: initiallyDisabled },
        { name: "lastPage", label: ">> Last", disabled: initiallyDisabled },
    ]

    const buttonComponents = buttonData.map(button => createButton(button.name, button.label, button.disabled));

    return new MessageActionRow().addComponents(...buttonComponents);
}


const paginate = async (interaction, embedPages, initiallyDisabled) => {
    const buttonRow = createButtonRow(initiallyDisabled, embedPages.length);

    await interaction.reply({
        embeds: [embedPages[0]], 
        components: [buttonRow]
    });


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
        
        let thisPage = 1;

        collector.on('collect', async i => {
            console.log("Button collected");
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

            await interaction.update({embeds: [embedPages[thisPage - 1]], components: [buttonRow]});


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