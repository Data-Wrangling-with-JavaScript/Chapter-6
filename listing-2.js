//
// Example that imports a CSV file, fixes date/time values in each row and exporting a new CSV file.
// Date/times are fixed by encoding in UTC so that the correct timezone is preserved.
//

'use strict';

var moment = require('moment');
var extend = require('extend');
var importCsvFile = require('./toolkit/importCsvFile.js');
var exportCsvFile = require('./toolkit/exportCsvFile.js');

var importDateFormat = "YYYY-MM-DD HH:mm:ss";

function fixRow (inputRow) {
    var outputRow = extend({}, inputRow);
    //
    // TODO: Your code here to fix the row of data.
    //
    return outputRow;
}

function transformData (inputData) {
    return inputData.map(fixRow);
}

importCsvFile(inputFileName)
    .then(inputData => {
        var outputData = transformData(inputData);
        return exportCsvFile(outputFileName, outputData);
    })
    .then(() => {
        console.log('Done!');
    })
    .catch(err => {
        console.error('Error!');
        console.error(err && err.stack || err);
    });