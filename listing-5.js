//
// This example imports a CSV file, filters out any row that is not associated with Australia and 
// exports a new CSV file.
//

'use strict';

var importCsvFile = require('./toolkit/importCsvFile.js');
var exportCsvFile = require('./toolkit/exportCsvFile.js');

var inputFileName = './data/surveys.csv';
var outputFileName = './output/surveys-but-only-Australia.csv';

function filterRow (inputRow) {
    //TODO:  Your predicate here. Return true to preserve the row of data or false to filter it out.
    var preserveRow = true; 
    return preserveRow;
}

function transformData (inputData) {
    return inputData.filter(filterRow);
};

importCsvFile(inputFileName)
    .then(inputData => {
        var outputData = transformData(inputData);
        return exportCsvFile(outputFileName, outputData)
    })
    .then(() => {
        console.log('Done!');
    })
    .catch(err => {
        console.error('Error!');
        console.error(err && err.stack || err);
    });