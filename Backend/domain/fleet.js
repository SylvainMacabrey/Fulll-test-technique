const { ValueObject } = require('./ValueObject');
const { Vehicle } = require('./vehicle');

const FleetData = {
    vehicles: [String],
    userID: String
}

exports.FleetData = FleetData;

exports.Fleet = class extends ValueObject {

    constructor(opt = { vehicles: [] }) { 
        super(FleetData, opt);
    }

    get vehicles() { 
        return this._data.vehicles;
    }

    get userID() { 
        return this._data.userID; 
    }

    registerVehicle(v) {
        console.log(v);
        if (!this.isVehicleRegistered(v))
            return this._data.vehicles.push(v);
        return "Vehicle already registered";
    }

    isVehicleRegistered(o) {
        return this._data.vehicles.includes(o);
    }
    
}