//
// Example that imports a CSV file, fixes date/time values in each row and exporting a new CSV file.
// Date/times are fixed by encoding in UTC so that the correct timezone is preserved.
//
// This example uses Data-Forge.
//

"use strict";

const moment = require('moment');
const dataForge = require('data-forge');

const importDateFormat = "YYYY-MM-DD HH:mm";
const inputFileName = "./data/surveys.csv";
const outputFileName = "./output/surveys-with-fixed-dates-using-data-forge.csv";

function parseDate (inputDate, timezoneOffset) {
    return moment(inputDate, importDateFormat).utcOffset(timezoneOffset).toDate();
}

function transformRow (inputRow) {
    const outputRow = Object.assign({}, inputRow);
    outputRow.start_datetime = parseDate(inputRow.start_datetime, inputRow.timezone);
    outputRow.end_datetime = parseDate(inputRow.end_datetime, inputRow.timezone);
    return outputRow;
}

function transformData (inputDataFrame) {
    return inputDataFrame.select(transformRow);
}

dataForge.readFile(inputFileName)
    .parseCSV()
    .then(inputDataFrame => {
        const outputDataFrame = transformData(inputDataFrame);
        return outputDataFrame
            .asCSV()
            .writeFile(outputFileName);
    })
    .then(() => {
        console.log("Done!");
    })
    .catch(err => {
        console.error("Error!");
        console.error(err && err.stack || err);
    });
