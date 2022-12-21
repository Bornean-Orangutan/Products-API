const { Style } = require('./database.js');
const lineByLine = require('n-readlines');
const liner = new lineByLine('./server/data/styles1.csv');

let line = liner.next();
const data = [];

while (line = liner.next()) {
  const row = line.toString('ascii').split(/(?!\B"[^"]*),(?![^"]*"\B)/);
  data.push({
    id: Number(row[0]),
    ProductId: Number(row[1]),
    name: row[2].replaceAll('"', ''),
    sale_price: Number(row[3]) || null,
    original_price: Number(row[4]),
    default: Number(row[5]),
  })
}

console.log(data);

async function saveData() {
  let chunkSize = 100000;
  for (let i = 0; i < data.length; i+= chunkSize) {
    let chunk = data.slice(i, i + chunkSize);
    await Style.bulkCreate(chunk);
  }
}

saveData();