//
// This example imports a CSV file, filters out an entire column and exports a new CSV file.
//

'use strict';

var extend = require('extend');
var importCsvFile = require('./toolkit/importCsvFile.js');
var exportCsvFile = require('./toolkit/exportCsvFile.js');

var importDateFormat = "YYYY-MM-DD HH:mm:ss";

function transformData (inputData) {
    return inputData
            .map(inputRow => {
                var outputRow = extend({}, inputRow);
                delete outputRow.reef_type;
                return outputRow;   
            });
}

importCsvFile('./data/surveys.csv')
    .then(inputData => {
        var outputData = transformData(inputData);
        return exportCsvFile('./output/surveys-with-no-reef_type.csv', outputData)
    })
    .then(() => {
        console.log('Done!');
    })
    .catch(err => {
        console.error('Error!');
        console.error(err && err.stack || err);
    });