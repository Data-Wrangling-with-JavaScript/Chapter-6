//
// Aggregate data from multiple files.
//
// This example uses Data-Forge.
//

'use strict';

var globby = require('globby');
var importCsvFile = require('./toolkit/importCsvFile.js');
var exportCsvFile = require('./toolkit/exportCsvFile.js');

globby('./data/by-country/*.csv')
    .then(paths => {
        return paths.reduce((prevPromise, path) => {
                return prevPromise.then(workingData => {
                    return importCsvFile(path)
                        .then(inputData => {
                            return workingData.concat(inputData);
                        });
                });
            }, Promise.resolve([]));
    })
    .then(aggregatedData => {
        return exportCsvFile('./output/surveys-aggregated-from-separate-files.csv', aggregatedData);
    })
    .then(() => {
        console.log("Done!");
    })
    .catch(err => {
        console.error("An error occurred.");
        console.error(err);
    })