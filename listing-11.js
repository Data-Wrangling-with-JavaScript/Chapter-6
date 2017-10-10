//
// Example Data-Forge data pipeline.
//


'use strict';

var dataForge = require('data-forge');
var moment = require('moment');

var importDateFormat = "YYYY-MM-DD HH:mm:ss";

dataForge.readFile('./data/surveys.csv')
    .parseCSV()
    .then(dataFrame => {
        console.log(
dataFrame.subset(["start_datetime", "end_datetime", "dive_temperature"])
            .parseDates(["start_datetime", "end_datetime"], importDateFormat)
            .where(row => moment(row.start_datetime).year() === 2014)
            .where(row => row.dive_temperature !== 0)            
            .toString()
        ); //fio:

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
            .writeFile('./output/data-pipeline-output.csv');
    })
    .then(() => {
        console.log("Done!");
    })
    .catch(err => {
        console.error("An error occured");
        console.error(err);
    });



