const { SlashCommandBuilder} = require('@discordjs/builders');


const singleEvents = [
    '|{1} receives medical supplies from an unknown sponsor.',
    '|{1} discovers a cave.',
    '|{1} receives an explosive from an unknown sponsor.',
    '|{1} picks flowers.', 
    '|{1} camouflages themself in the bushes',
    '|{1} receives a hatchet from an unknown sponsor.',
    '|{1} sees smoke rising in the distance, but decides not to investigate.',
    '|{1} explores the arena.', 
    '|{1} tries to treat their infection.',
    '|{1} passes out from exhaustion.',
    '|{1} tries to sing themself to sleep.',
    '|{1} thinks about home.',
    '|{1} questions their sanity.', 
    '|{1} falls into a pit and dies.',
    '|{1} receives clean water from an unknown sponsor.',
    '|{1} hunts for other tributes.',
    '|{1} goes hunting.',
    '|{1} makes a slingshot.',
    '|{1} sets up camp for the night.',
    '|{1} climbs a tree to rest.',
    '|{1} is awoken by nightmares.',
    '|{1} cries themself to sleep.',
    '|{1} makes a wooden spear.',
    '|{1} injures themself.',
    '|{1} sees a fire but stays hidden.',
    '|{1} receives fresh food from an unknown sponsor.',
    '|{1} fishes.',
    '|{1} practices their archery.',
    '|{1} discovers a cave.',
    '|{1} dies of dysentery.',
    '|{1} dies trying to escape the arena.',
    '|{1} falls into a frozen lake and freezes to death.',
    '|{1} discovers a river.',
    '|{1} picks flowers.',
    '|{1} tries to treat their infection.',
    '|{1} is unable to start a fire and sleeps without warmth.',
    '|{1} screams for help.',
    '|{1} loses sight of where they are.',
    '|{1} is awoken by nightmares.',
    '|{1} is pricked by thorns while picking berries.',
    '|{1} thinks about home.',
    '|{1} accidentally makes contact with spiny, lethal plant life.',
    '|{1} accidentally detonates a land mine while trying to arm it.',
    '|{1} stays awake all night.',
    '|{1} cooks their food before putting their fire out.',
    '|{1} attempts to start a fire, but is unsuccessful.',
    '|{1} tries to sleep through the entire day.',
    '|{1} travels to higher ground.',
    '|{1} thinks about winning.',
];

const doubleEvents = [
    '|{1} runs away from |{2}.', 
    '|{1} attacks |{2}, but they manage to escape.', 
    '|{1} repeatedly stabs |{2} to death with sais.',
    '|{1} kills |{2} with a sickle.',
    '|{1} and |{2} work together for the day.', 
    "|{1} tends to |{2}'s wounds.", 
    '|{1} sprains their ankle while running away from |{2}.', 
    '|{1} and |{2} get into a fight over raw meat, but |{2} gives up and runs away.',
    '|{1} chases |{2}.',
    '|{1} and |{2} talk about the tributes still alive.',
    '|{1} defeats |{2} in a fight, but spares his life.',
    '|{1} scares |{2} off.',
    '|{1} decapitates |{2} with a sword.',
    '|{1} and |{2} sleep in shifts.',
    '|{1} sets an explosive off, killing |{2}.',
    '|{1} mistakes |{2} for a bear and kills them.',
    '|{1} strangles |{2} with a rope.',
    '|{1} begs for |{2} to kill her. She refuses, keeping |{2} alive.',
    '|{1} destroys |{2}\'s supplies while she is asleep.',
    '|{1} and |{2} run into each other and decide to truce for the night.',
    '|{1} and |{2} tell stories about themselves to each other.',
    '|{1} steals from |{2} while they aren\'t looking.',
    'While fighting, |{1} and |{2} lose their balance, roll down a jagged hillside, and die.',
    '|{1} flails their weapon around, accidentally killing |{2}.',
    '|{1} convinces |{2} to snuggle with them.',
    '|{1} kills |{2} with her own weapon.',
    '|{1} severely slices |{2} with a sword.',
    '|{1} stalks |{2}.',


]

const tripleEvents = [
    '|{1}, |{2}, and |{3} hunt for other tributes.', 
    '|{1}, |{2}, and |{3} tell each other ghost stories to lighten the mood.',
    '|{1} and |{2} unsuccessfully ambush |{3} who kills them instead.',
    '|{1} and |{2} track down and kill |{3}.',
    '|{1}, |{2}, and |{3} cheerfully sing songs together.', 
    '|{1} and |{2} fight |{3}. |{3} survives.',
    '|{1} hears |{2} and |{3} talking in the distance.'

]

const tripleConfigurations = [
    [singleEvents, doubleEvents],
    [doubleEvents, singleEvents], 
    [singleEvents, singleEvents, singleEvents],
    [tripleEvents]
]

const doubleConfigurations = [
    [doubleEvents],
    [singleEvents, singleEvents],
]


const randomArrayItem = (array) => {
	const randomIndex = Math.floor(Math.random() * array.length);
	return (array[randomIndex]);
}

const populateString = (string, target) => {
    return string.replace('|{1}', target);
}

const populateStringTwo = (string, targetOne, targetTwo) => {
    return string.replace('|{1}', targetOne).replace('|{2}', targetTwo);
}

const populateStringThree = (string, targetOne, targetTwo, targetThree) => {
    return string.replace('|{1}', targetOne).replace('|{2}', targetTwo).replace('|{3}', targetThree);
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(unshuffled) {
   return unshuffled
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

// https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
function arraysEqual(a, b) {

    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
  
    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.
  
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }


  const pickRandomNew = (a, used) => {
      const selection = randomArrayItem(a);
      if (used.includes(selection)) { return pickRandomNew(a, used) }
      return selection;
  }


module.exports = { 
    data: new SlashCommandBuilder()
        .setName('hungergames')
        .setDescription('Simulate a hunger game event with up to 3 targets.')
        .addStringOption(option => option.setName('targetone').setDescription('First target.'))
        .addStringOption(option => option.setName('targettwo').setDescription('Second target.'))
        .addStringOption(option => option.setName('targetthree').setDescription('Third target.')),
    async execute(interaction){

        let responseText = "Prompt not processed, whoops!"
        const responseArray = [];

        const twoTargets = (target1, target2) => {
            const availableTargets = [target1, target2];
            const usedTargets = [];
            const configs = randomArrayItem(doubleConfigurations);
            for (let array of configs){
                if (arraysEqual(array, doubleEvents)){
                    const participants = shuffleArray(availableTargets)
                    responseArray.push(populateStringTwo(randomArrayItem(array), participants[0], participants[1]));
                } else if (arraysEqual(array, singleEvents)) {
                    const participant = pickRandomNew(availableTargets, usedTargets);
                    usedTargets.push(participant);
                    responseArray.push(populateString(randomArrayItem(array), participant));
                }
            }
          } 

        const targetOne = interaction.options.getString('targetone') || interaction.member.displayName;
        const targetTwo = interaction.options.getString('targettwo');
        const targetThree = interaction.options.getString('targetthree');
        if (targetOne && !targetTwo && !targetThree){
            // Simple. One prompt.
            responseArray.push(populateString(randomArrayItem(singleEvents), targetOne));
        } else if (!targetOne && targetTwo && !targetThree) {
            responseArray.push(populateString(randomArrayItem(singleEvents), targetTwo));
        } else if (!targetOne && !targetTwo && targetThree) {
            responseArray.push(populateString(randomArrayItem(singleEvents), targetThree));
        } else if (targetOne && targetTwo && !targetThree) {
            twoTargets(targetOne, targetTwo);
        } else if (!targetOne && targetTwo && targetThree) {
            twoTargets(targetTwo, targetThree);
        } else if (targetOne && !targetTwo && targetThree) {
            twoTargets(targetOne, targetThree);
        } else if (targetOne && targetTwo && targetThree) {
            const availableTargets = [targetOne, targetTwo, targetThree];
            const usedTargets = [];
            const configs = randomArrayItem(tripleConfigurations);
            for (let array of configs){
                if (arraysEqual(array, tripleEvents)){
                    const participants = shuffleArray(availableTargets)
                    responseArray.push(populateStringThree(randomArrayItem(array), participants[0], participants[1], participants[2]));
                } else if (arraysEqual(array, doubleEvents)){
                    const participant1 = pickRandomNew(availableTargets, usedTargets);
                    usedTargets.push(participant1);
                    const participant2 = pickRandomNew(availableTargets, usedTargets);
                    usedTargets.push(participant2);
                    responseArray.push(populateStringTwo(randomArrayItem(array), participant1, participant2));
                } else if (arraysEqual(array, singleEvents)) {
                    const participant = pickRandomNew(availableTargets, usedTargets);
                    usedTargets.push(participant);
                    responseArray.push(populateString(randomArrayItem(array), participant));
                }
            }

        }

        responseText = responseArray.join('\n\n');

        await interaction.reply({
            content: responseText
        })

    }
}