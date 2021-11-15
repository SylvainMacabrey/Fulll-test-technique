const { FleetRepository, VehicleRepository, LocationRepository } = require("../infra/MongoRepository.js");

exports.isVehicleRegistered = async (fleetID, plateNumber) => {
    let fleet = await FleetRepository.get(fleetID);
    return fleet.isVehicleRegistered(plateNumber);
};

exports.getLocation = (locationID) => {
    return LocationRepository.get(locationID);
};

exports.getVehicle = (plateNumber) => {
    return VehicleRepository.find("plateNumber", plateNumber);
};

exports.getFleet = (FleetID) => {
    return FleetRepository.get(FleetID);
};

exports.getVehicleLocation = async (vehicleID) => {
    let vehicle = await VehicleRepository.get(vehicleID);
    return vehicle.location;
};