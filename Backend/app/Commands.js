const { Fleet } = require("../domain/fleet");
const { Vehicle } = require("../domain/vehicle");
const { Location } = require("../domain/location");
const { FleetRepository, VehicleRepository, LocationRepository } = require("../infra/MongoRepository.js");
const { getFleet, getVehicle, isVehicleRegistered } = require('./Queries');

const createFleet = async opt => await FleetRepository.insert(new Fleet(opt));

const createVehicle = async opt => await VehicleRepository.insert(new Vehicle(opt));

const createLocation = async opt => await LocationRepository.insert(new Location(opt));

const registerVehicleInFleet = async (fleetID, plateNumber) => {
    try {
        let fleet = await getFleet(fleetID);
        let res = fleet.registerVehicle(plateNumber);
        await FleetRepository.update(fleetID, fleet);
        return res;
    } catch (e) {
        return e;
    }
};

const parkVehicleAtLocation = async (plateNumber, locationID) => {
    try {
        let vehicle = await getVehicle(plateNumber);
        let res = vehicle.obj.parkAt(locationID);
        VehicleRepository.update(vehicle.id, vehicle.obj);
        return res;
    } catch (e) {
        return e;
    }
};

const parkVehicleFromFleetAtLocation = async (fleetID, plateNumber, latitude, longitude, altitude) => {
    try {
        if (await isVehicleRegistered(fleetID, plateNumber)) {
            let locationID = await createLocation({ latitude, longitude, altitude });
            let vehicle = parkVehicleAtLocation(plateNumber, locationID);
            return vehicle;
        } else {
            return "Vehicle not in fleet";
        }
    } catch (e) {
        return e;
    }
};

exports.createFleet = createFleet;
exports.createVehicle = createVehicle;
exports.createLocation = createLocation;
exports.registerVehicleInFleet = registerVehicleInFleet;
exports.parkVehicleAtLocation = parkVehicleAtLocation;
exports.parkVehicleFromFleetAtLocation = parkVehicleFromFleetAtLocation;