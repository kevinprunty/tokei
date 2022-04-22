const csv = require('csvtojson');
const fs = require('fs');

const filePath = `${__dirname}\\${process.argv[2]}`

csv().fromFile(filePath).then((jsonObject) => {
    const json = JSON.stringify(jsonObject);
    fs.writeFileSync(process.argv[3],json);
})