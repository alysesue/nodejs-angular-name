'use strict';

// require packages and modules
const DataService = require('../services/data.service');
const Person = require('../models/person.model');
const { Datastore } = require('@google-cloud/datastore');

const personController = function(app) {

    const datastore = new Datastore({
        projectId: 'datastorepuppies',
        keyFilename: 'DataStorePuppies-ce7544c8af76.json'
    });

    const dataService = new DataService(datastore);

    // add api
    app.post("/api/v1/add", function (req, res) { 
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;

        let person = new Person(firstName, lastName);

        let personKey = datastore.key('Person');

        let entity = {
            key: personKey,
            data: [
              {
                name: 'firstName',
                value: person.firstName,
                excludeFromIndexes: false,
              },
              {
                name: 'lastName',
                value: person.lastName,
                excludeFromIndexes: false,
              },
            ],
        };

        let sumASCIIresult = sumASCII(firstName, lastName);
        let binSumASCIIresult = binSumASCII(sumASCIIresult);
        let longestBinResult = longestBin(binSumASCIIresult);

        dataService
            .create(entity) 
            .then(() => {
              res.json(
                  'Hello ' + firstName + ' ' + lastName + '.\n\n' +
                  'When your name is converted to ASCII: \n' +
                  'Sum of ASCII values = ' + sumASCIIresult + '.\n\n' +
                  'When sum of ASCII is converted to binary: \n' +
                  'Longest number of consecutive zeroes = ' + longestBinResult + '.' 
                )
            })
            .catch(() => {
              res.json(
                'Error entering your name. \n Please try again.'
              )
            });
    });

    // convert to ASCII value and sum
    function sumASCII(firstName, lastName) {
        // create string from first and last name. remove space at end
        let personString = (firstName + ' ' + lastName).trim();
        let sum = 0;
        personString
            .split('') //turn into array of char
            .forEach(function(letter) {
                sum += letter.charCodeAt(0); // find value of char and sum
            });
        return sum;
    }

    // convert sum of ASCII values to binary (assume int and positive)  
    function binSumASCII(sumASCIIresult) {
        let result =
            (sumASCIIresult >>> 0).toString(2); // unsigned right shift bitwise operator (>>>) to coerce number to unsigned integer // toString converts to binary
        return result;
    }

    // find longest number of consecutive 0s
    function longestBin(binSumASCIIresult) {
        let result =
            binSumASCIIresult.split('1') // convert to array
                .reduce((curr, prev) => curr.length > prev.length ? curr : prev) // cycle through like a for loop
                .length;
        return result;
    }
}

module.exports = personController;