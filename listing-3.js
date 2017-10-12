//
// Example that imports a CSV file, fixes date/time values in each row and exporting a new CSV file.
// Date/times are fixed by encoding in UTC so that the correct timezone is preserved.
//
// This example uses Data-Forge.
//

'use strict';

var dataForge = require('data-forge');

var importDateFormat = "YYYY-MM-DD HH:mm:ss";

function transformData (inputDataFrame) {
    return inputDataFrame.parseDates(["start_datetime", "end_datetime"], importDateFormat);
}

dataForge.readFile('./data/surveys.csv')
    .parseCSV()
    .then(inputDataFrame => {
        var outputDataFrame = transformData(inputDataFrame);
        return outputDataFrame
            .asCSV()
            .writeFile('./output/surveys-with-fixed-dates-using-data-forge.csv');
    })
    .then(() => {
        console.log('Done!');
    })
    .catch(err => {
        console.error('Error!');
        console.error(err && err.stack || err);
    });