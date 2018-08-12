//
// Example that imports a CSV file, fixes date/time values in each row and exporting a new CSV file.
// Date/times are fixed by encoding in UTC so that the correct timezone is preserved.
//

"use strict";

const moment = require('moment');
const importCsvFile = require('./toolkit/importCsvFile.js');
const exportCsvFile = require('./toolkit/exportCsvFile.js');

const inputFileName = "./data/surveys.csv";
const outputFileName = "./output/surveys-with-fixed-dates.csv";

function transformRow (inputRow) {
    const outputRow = Object.assign({}, inputRow);
    //
    // TODO: Your code here to fix the row of data.
    //
    return outputRow;
}

function transformData (inputData) {
    return inputData.map(transformRow);
}

importCsvFile(inputFileName)
    .then(inputData => {
        const outputData = transformData(inputData);
        return exportCsvFile(outputFileName, outputData);
    })
    .then(() => {
        console.log("Done!");
    })
    .catch(err => {
        console.error("Error!");
        console.error(err && err.stack || err);
    });