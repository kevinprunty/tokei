const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

const createButton = (buttonName, buttonLabel) => {
    return MessageButton()
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