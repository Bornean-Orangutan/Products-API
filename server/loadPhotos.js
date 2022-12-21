const { Photo } = require('./database.js');
const lineByLine = require('n-readlines');
const liner = new lineByLine('./server/spreadsheets/photos.csv');

let line = liner.next();
const data = [];

while (line = liner.next()) {
  const row = line.toString('ascii').split(/(?!\B"[^"]*),(?![^"]*"\B)/);
  data.push({
    id: Number(row[0]),
    StyleId: Number(row[1]),
    url: row[2].replaceAll('"', ''),
    thumbnail_url: row[3].replaceAll('"', ''),
  })
}

console.log(data);

async function saveData() {
  let chunkSize = 100000;
  for (let i = 0; i < data.length; i+= chunkSize) {
    let chunk = data.slice(i, i + chunkSize);
    await Photo.bulkCreate(chunk);
  }
}

saveData();