//
// Split a data file out to multiple data files where data is grouped by country.
//
// This example uses Data-Forge.
//

'use strict';

var dataForge = require('data-forge');

var inputFileName = './data/surveys.csv';

function filterRow (inputRow, country) {
    return inputRow.country === country;
}

function transformData (inputDataFrame, country) {
    return inputDataFrame.where(inputRow => filterRow(inputRow, country));
}

function getCountries (inputDataFrame) {
    return inputDataFrame
        .getSeries("country")
        .distinct();    
}

function splitDataByCountry (inputDataFrame) {
    return getCountries(inputDataFrame)
        .aggregate(Promise.resolve(), (prevPromise, country) => {
            return prevPromise.then(() => {
                var outputDataFrame = transformData(inputDataFrame, country);
                var outputFileName = './data/by-country/' + country + '.csv';
                console.log('>> ' + outputFileName);
                return outputDataFrame
                    .asCSV()
                    .writeFile(outputFileName);
            });
        });
}

dataForge.readFile(inputFileName)
    .parseCSV()
    .then(splitDataByCountry)
    .then(() => {
        console.log('Done!');
    })
    .catch(err => {
        console.error('Error!');
        console.error(err && err.stack || err);
    });
