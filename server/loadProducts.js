const { Product } = require('./database.js');
const lineByLine = require('n-readlines');
const liner = new lineByLine('./server/spreadsheets/product.csv');

let line = liner.next();
const data = [];

while (line = liner.next()) {
  const row = line.toString('ascii').split(/(?!\B"[^"]*),(?![^"]*"\B)/);
  data.push({
    id: Number(row[0]),
    name: row[1].replaceAll('"', ''),
    slogan: row[2].replaceAll('"', ''),
    description: row[3].replaceAll('"', ''),
    category: row[4].replaceAll('"', ''),
    default_price: Number(row[5]) || null
  })
}

async function saveData() {
  let chunkSize = 100000;
  for (let i = 0; i < data.length; i+= chunkSize) {
    let chunk = data.slice(i, i + chunkSize);
    await Product.bulkCreate(chunk);
  }
}

saveData();