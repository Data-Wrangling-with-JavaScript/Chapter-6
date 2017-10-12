//
// This example imports a CSV file, filters out an entire column and exports a new CSV file.
//
// This example uses Data-Forge.
//

'use strict';

var dataForge = require('data-forge');

function transformData (inputDataFrame) {
    return inputDataFrame.dropSeries("reef_type");
}

dataForge.readFile('./data/surveys.csv')
    .parseCSV()
    .then(inputDataFrame => {
        var outputDataFrame = transformData(inputDataFrame);

        return outputDataFrame
            .asCSV()
            .writeFile('./output/surveys-with-no-reef_type-using-data-forge.csv');
    })
    .then(() => {
        console.log('Done!');
    })
    .catch(err => {
        console.error('Error!');
        console.error(err && err.stack || err);
    });
