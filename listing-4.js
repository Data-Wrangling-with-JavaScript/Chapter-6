//
// This example imports a CSV file, filters out any row that is not associated with Australia and 
// exports a new CSV file.
//

'use strict';

var importCsvFile = require('./toolkit/importCsvFile.js');
var exportCsvFile = require('./toolkit/exportCsvFile.js');

var importDateFormat = "YYYY-MM-DD HH:mm:ss";

function filterRow (inputRow) {
    return inputRow.country === 'Australia';
}

function transformData (inputData) {
    return inputData.filter(filterRow);
};

importCsvFile('./data/surveys.csv')
    .then(inputData => {
        var outputData = transformData(inputData);

        return exportCsvFile('./output/surveys-but-only-Australia.csv', outputData)
    })
    .then(() => {
        console.log('Done!');
    })
    .catch(err => {
        console.error('Error!');
        console.error(err && err.stack || err);
    });