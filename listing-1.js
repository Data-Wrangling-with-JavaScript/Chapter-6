//
// Example that imports a CSV file, fixes date/time values in each row and exporting a new CSV file.
// Date/times are fixed by encoding in UTC so that the correct timezone is preserved.
//

'use strict';

var moment = require('moment');
var extend = require('extend');
var importCsvFile = require('./toolkit/importCsvFile.js');
var exportCsvFile = require('./toolkit/exportCsvFile.js');

var importDateFormat = "YYYY-MM-DD HH:mm";
var inputFileName = './data/surveys.csv';
var outputFileName = './output/surveys-with-fixed-dates.csv';

function parseDate (inputDate, timezoneOffset) {
    return moment(inputDate, importDateFormat).utcOffset(timezoneOffset).toDate();
}

function transformRow (inputRow) {
    var outputRow = extend({}, inputRow);
    outputRow.start_datetime = parseDate(inputRow.start_datetime, inputRow.timezone);
    outputRow.end_datetime = parseDate(inputRow.end_datetime, inputRow.timezone);
    return outputRow;
}

function transformData (inputData) {
    return inputData.map(transformRow);
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