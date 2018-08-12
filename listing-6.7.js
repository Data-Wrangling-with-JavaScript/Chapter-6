//
// This example imports a CSV file, filters out an entire column and exports a new CSV file.
//

"use strict";

const importCsvFile = require('./toolkit/importCsvFile.js');
const exportCsvFile = require('./toolkit/exportCsvFile.js');

const inputFileName = "./data/surveys.csv";
const outputFileName = "./output/surveys-with-no-reef_type.csv";

function transformRow (inputRow) {
    const outputRow = Object.assign({}, inputRow);
    delete outputRow.reef_type;
    return outputRow;      
}

function transformData (inputData) {
    return inputData.map(transformRow);
}

importCsvFile(inputFileName)
    .then(inputData => {
        const outputData = transformData(inputData);
        return exportCsvFile(outputFileName, outputData)
    })
    .then(() => {
        console.log("Done!");
    })
    .catch(err => {
        console.error("Error!");
        console.error(err && err.stack || err);
    });