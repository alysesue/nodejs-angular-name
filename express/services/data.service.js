'use strict';

const promise = require('bluebird');

class DataService {

    constructor(datastore) {
        this.datastore = datastore;
    }

    // create function
    create(entity) {
        return new promise((resolve, reject) => {
            this.datastore.save(entity, function(err) {
                if(err) {
                    console.log('Error in create ' + err);
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}

module.exports = DataService;