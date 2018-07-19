//
// Example Data-Forge data pipeline.
//


"use strict";

const dataForge = require('data-forge');
const moment = require('moment');

const importDateFormat = "YYYY-MM-DD HH:mm:ss";
const inputFileName = "./data/surveys.csv";
const outputFileName = "./output/data-pipeline-output.csv";

dataForge.readFile(inputFileName)
    .parseCSV()
    .then(dataFrame => {
        return dataFrame.dropSeries([
                "exp_id", 
                "dive_observations", 
                "obs_topography"
            ])
            .parseDates([
                    "start_datetime", 
                    "end_datetime"
                ], 
                importDateFormat
            )
            .where(row => 
                moment(row.start_datetime).year() === 2014
            )
            .parseFloats("dive_temperature")
            .where(row => row.dive_temperature !== 0)
            .groupBy(row => row.country)
            .select(group => ({
                country: group.first().country,
                dive_temperature: group
                    .deflate(row => row.dive_temperature)
                    .average()
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



