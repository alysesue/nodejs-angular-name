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

    // add
    app.post("/api/v1/add", function (req, res) { 
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;

        let person = new Person(firstName, lastName)

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

        dataService
            .create(entity)
            .then(() => {
              res.json(
                firstName + ' ' + lastName + ' is now registered. '
                )
            })
            .catch((err) => {
              res.json(
                'Error registering: ' + err
              )
            });
    })

}

module.exports = personController;