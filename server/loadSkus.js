const { Sku } = require('./database.js');
const lineByLine = require('n-readlines');
const liner = new lineByLine('./server/data/skus1.csv');

let line = liner.next();
const data = [];

while (line = liner.next()) {
  const row = line.toString('ascii').split(/(?!\B"[^"]*),(?![^"]*"\B)/);
  data.push({
    id: Number(row[0]),
    StyleId: Number(row[1]),
    size: row[2].replaceAll('"', ''),
    quantity: Number(row[3]),
  })
}

console.log(data);

async function saveData() {
  let chunkSize = 100000;
  for (let i = 0; i < data.length; i+= chunkSize) {
    let chunk = data.slice(i, i + chunkSize);
    await Sku.bulkCreate(chunk);
  }
}

saveData();