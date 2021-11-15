const assert = require('assert');
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const mongoose = require('mongoose');
const { createFleet, createVehicle, createLocation, registerVehicleInFleet, parkVehicleAtLocation } = require('../app/Commands');
const { isVehicleRegistered, getVehicleLocation } = require('../app/Queries');

Before(async () =>  {
    this.mongoose = await mongoose.connect('mongodb://localhost:27017/fulll-fleet-vehicle');
});

Given('my fleet', async () =>  {
    this.fleetID = await createFleet();
});;

Given('a vehicle', async () =>  {
    this.plateNumber = Math.floor(Math.random() * 1000) + '-' + Math.floor(Math.random() * 1000) + '-' + Math.floor(Math.random() * 1000);
    this.vehicleID = await createVehicle({ plateNumber: this.plateNumber });
});;

When('I register this vehicle into my fleet', async () =>  {
    await registerVehicleInFleet(this.fleetID, this.plateNumber);
});

Then('this vehicle should be part of my vehicle fleet', async () =>  {
    assert(await isVehicleRegistered(this.fleetID, this.plateNumber));
});

Given('I have registered this vehicle into my fleet', async () =>  {
    await registerVehicleInFleet(this.fleetID, this.vehicleID);
});

When('I try to register this vehicle into my fleet', async () =>  {
    this.response = await registerVehicleInFleet(this.fleetID, this.plateNumber);
});

Then('I should be informed this this vehicle has already been registered into my fleet', () =>  {
    assert.equal(this.response, "Vehicle already registered");
});

Given('the fleet of another user', async () =>  {
    this.another_fleetID = await createFleet();
});

Given('this vehicle has been registered into the other user\'s fleet', async () =>  {
    await registerVehicleInFleet(this.another_fleetID, this.plateNumber);
});

Given('a location', async () =>  {
    this.location = await createLocation({ latitude: 48.864716, longitude: 2.349014, altitude: 120 });
});

When('I park my vehicle at this location', async () =>  {
    await parkVehicleAtLocation(this.plateNumber, this.location);
});

Then('the known location of my vehicle should verify this location', async () =>  {
    let vehicle_location = await getVehicleLocation(this.vehicleID);
    assert.deepEqual(this.location.toString(), vehicle_location);
});

Given('my vehicle has been parked into this location', async () =>  {
    await parkVehicleAtLocation(this.plateNumber, this.location);
});

When('I try to park my vehicle at this location', async () =>  {
    this.location = await parkVehicleAtLocation(this.plateNumber, this.location);
});

Then('I should be informed that my vehicle is already parked at this location', () =>  {
    assert.equal(this.location, "Vehicle already at that location");
});

After(async () =>  {
    this.mongoose.connection.close();
});