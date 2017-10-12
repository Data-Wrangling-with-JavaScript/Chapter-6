//
// Example Data-Forge data pipeline.
//


'use strict';

var dataForge = require('data-forge');
var moment = require('moment');

var importDateFormat = "YYYY-MM-DD HH:mm:ss";
var inputFileName = './data/surveys.csv';
var outputFileName = './output/data-pipeline-output.csv';

dataForge.readFile(inputFileName)
    .parseCSV()
    .then(dataFrame => {
        return dataFrame.dropSeries(["exp_id", "dive_observations", "obs_topography"])
            .parseDates(["start_datetime", "end_datetime"], importDateFormat)
            .where(row => moment(row.start_datetime).year() === 2014)
            .parseFloats("dive_temperature")
            .where(row => row.dive_temperature !== 0)
            .groupBy(row => row.country)
            .select(group => ({
                country: group.first().country,
                dive_temperature: group.select(row => row.dive_temperature).average()
            }))
            .inflate()
            .asCSV()
            .writeFile(outputFileName);
    })
    .then(() => {
        console.log("Done!");
    })
    .catch(err => {
        console.error("An error occured");
        console.error(err);
    });



