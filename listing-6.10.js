//
// Aggregate data from multiple files.
//
// This example uses Data-Forge.
//

"use strict";

const globby = require('globby');
const importCsvFile = require('./toolkit/importCsvFile.js');
const exportCsvFile = require('./toolkit/exportCsvFile.js');

const inputFileSpec = "./data/by-country/*.csv";
const outputFileName = "./output/surveys-aggregated-from-separate-files.csv";

globby(inputFileSpec)
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
        return exportCsvFile(outputFileName, aggregatedData);
    })
    .then(() => {
        console.log("Done!");
    })
    .catch(err => {
        console.error("An error occurred.");
        console.error(err);
    });