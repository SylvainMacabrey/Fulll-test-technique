const { ValueObject } = require('./ValueObject');

const LocationData = {
    latitude: Number,
    longitude: Number,
    altitude: Number
}

exports.LocationData = LocationData;

exports.Location = class extends ValueObject {

    constructor(opt) { 
        super(LocationData, opt);
    }

    get latitude() { 
        return this._data.latitude;
    }

    get longitude() { 
        return this._data.longitude;
    }

    get altitude() { 
        return this._data.altitude; 
    }

    equals(o) {
        return o && this.latitude == o.latitude && this.longitude == o.longitude && this.altitude == o.altitude;
    }
    
}
