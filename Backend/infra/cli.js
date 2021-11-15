const mongoose = require('mongoose');
const yargs = require('yargs');
const { createFleet, createVehicle, registerVehicleInFleet, parkVehicleFromFleetAtLocation } = require('../app/Commands');

const client = mongoose.connect('mongodb://localhost:27017/fulll-fleet-vehicle');

const argv = yargs.argv._;
const command = argv[0];
const subcommand = argv[1];
const params = argv.slice(2);

const errorsMessage = {
    './vehicle': {
        'create': "form command: ./vehicle create <plateNumber>"
    },
    './fleet': {
        'create:': "form command: ./fleet create <userID>",
        'register-vehicle': "form command: ./fleet register-vehicle <fleetID> <vehiclePlateNumber>",
        'localize-vehicle': "form command: ./fleet localize-vehicle <fleetIDZ> <vehiclePlateNumber> lat lng [alt]"
    }
};

const main = () => {
    if(command == './vehicle') {
        if(subcommand == 'create') {
            if(params.length == 1) {
                createVehicle({ plateNumber: params[0] })
                    .then(result => console.log(result))
                    .catch(err => console.log(err));
            } else {
                console.log('[Error command] ' + errorsMessage[command][subcommand]);
            }
        } else {
            console.log('[Error command] ' + errorsMessage[command][subcommand]);
        }
    } else if(command == './fleet') {
        switch(subcommand) {
            case 'create':
                if(params.length == 1) {
                    createFleet({ userID: params[0] })
                        .then(result => console.log(result))
                        .catch(err => console.log(err));
                } else {
                    console.log('[Error command] ' + errorsMessage[command][subcommand]);
                }
                break;
            case 'register-vehicle':
                if(params.length == 2) {
                    registerVehicleInFleet(params[0], params[1])
                        .then(result => console.log(result))
                        .catch(err => console.log(err));
                } else {
                    console.log('[Error command] ' + errorsMessage[command][subcommand]);
                }
                break;
            case 'localize-vehicle':
                if(params.length == 4 || params.length == 5) {
                    parkVehicleFromFleetAtLocation(params[0], params[1], params[2], params[3], params[4])
                        .then(result => console.log(result))
                        .catch(err => console.log(err));
                } else {
                    console.log('[Error command] ' + errorsMessage[command][subcommand]);
                }
                break;
            default:
                console.log('[Error command] ' + errorsMessage[command][subcommand]);
                break;
        }
    } else {
        console.log('Command not exist');
    }
};

main();
process.exitCode = 1;