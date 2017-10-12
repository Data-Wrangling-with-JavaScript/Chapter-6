//
// This example imports a CSV file, filters out an entire column and exports a new CSV file.
//

'use strict';

var extend = require('extend');
var importCsvFile = require('./toolkit/importCsvFile.js');
var exportCsvFile = require('./toolkit/exportCsvFile.js');

var importDateFormat = "YYYY-MM-DD HH:mm:ss";
var inputFileName = './data/surveys.csv';
var outputFileName = './output/surveys-with-no-reef_type.csv';

function filterColumn (inputRow) {
    var outputRow = extend({}, inputRow);
    delete outputRow.reef_type;
    return outputRow;      
}

function transformData (inputData) {
    return inputData.map(filterColumn);
}

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