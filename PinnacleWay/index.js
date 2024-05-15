const fs = require('fs');
const path = require('path');

function csvToJson(csvFilePath, jsonFilePath) {
  fs.readFile(csvFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading the CSV file: ${err.message}`);
      return;
    }

    const rows = data.split('\n');

    const headers = rows[0].split(',');

    const jsonData = [];

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i].trim();
      if (row) {  
        const values = row.split(',');
        const jsonObject = {};

        headers.forEach((header, index) => {
          jsonObject[header.trim()] = values[index].trim();
        });

        jsonData.push(jsonObject);
      }
    }

    fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        console.error(`Error writing the JSON file: ${err.message}`);
        return;
      }
      console.log(`CSV file has been converted to JSON and saved to ${jsonFilePath}`);
    });
  });
}

const csvFilePath = path.join(__dirname, 'input.csv'); 
const jsonFilePath = path.join(__dirname, 'output.json');  
csvToJson(csvFilePath, jsonFilePath);