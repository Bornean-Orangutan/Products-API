const { Feature } = require('./database.js');
const lineByLine = require('n-readlines');
const liner = new lineByLine('./server/spreadsheets/features.csv');

let line = liner.next();
const data = [];

while (line = liner.next()) {
  const row = line.toString('ascii').split(/(?!\B"[^"]*),(?![^"]*"\B)/);
  data.push({
    id: Number(row[0]),
    ProductId: Number(row[1]),
    feature: row[2].replaceAll('"', ''),
    value: row[3].replaceAll('"', ''),
  })
}

async function saveData() {
  let chunkSize = 100000;
  for (let i = 0; i < data.length; i+= chunkSize) {
    let chunk = data.slice(i, i + chunkSize);
    await Feature.bulkCreate(chunk);
  }
}

saveData();