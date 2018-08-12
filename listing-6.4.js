//
// This example imports a CSV file, filters out any row that is not associated with Australia and 
// exports a new CSV file.
//

"use strict";

const importCsvFile = require('./toolkit/importCsvFile.js');
const exportCsvFile = require('./toolkit/exportCsvFile.js');

const inputFileName = "./data/surveys.csv";
const outputFileName = "./output/surveys-but-only-Australia.csv";

function filterRow (inputRow) {
    return inputRow.country === "Australia";
}

function transformData (inputData) {
    return inputData.filter(filterRow);
};

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