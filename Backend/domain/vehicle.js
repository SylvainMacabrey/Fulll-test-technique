const { ValueObject } = require('./ValueObject');
const { Location } = require('./location');

const VehicleData = {
    plateNumber: String,
    location: String
}

exports.VehicleData = VehicleData;

exports.Vehicle = class extends ValueObject {

    constructor(opt = {}) { 
        super(VehicleData, opt); 
    }

    get plateNumber() { 
        return this._data.plateNumber; 
    }

    get location() { 
        return this._data.location; 
    }

    equals(o) {
        return o && this.fleetID == o.fleetID && this.plateNumber == o.plateNumber && this.location == o.location;
    }

    parkAt(location) {
        if (location == this.location)
            return "Vehicle already at that location";
        this._data = { ...this._data, location };
        return this.location;
    }
    
}

