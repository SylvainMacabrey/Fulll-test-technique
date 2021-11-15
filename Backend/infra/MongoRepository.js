const mongoose = require('mongoose');

const { Fleet, FleetData } = require('../domain/fleet');
const { Vehicle, VehicleData } = require('../domain/vehicle');
const { Location, LocationData } = require('../domain/location');

class Repository {

    constructor(name, data, _class) {
        this.name = name;
        this._class = _class;
        this.model = mongoose.model(name, new mongoose.Schema(data));
    }

    async insert(e) {
        const doc = new this.model(e._data);
        await doc.save();
        return doc._id.toString();
    }

    async update(id, e) {
        await this.model.updateOne({ _id: id }, e._data);
        return id;
    }

    async get(id) {
        let data = await this.model.findById(id);
        if (data == null)
            throw `${this.name} with ID #${id} not found`;
        return new this._class(data);
    }

    async find(nameValue, value) {
        let requete = {};
        requete[nameValue] = value;
        let data = await this.model.findOne(requete);
        if (data == null)
            throw `${this.name} with ${nameValue} #${value} not found`;
        let obj = new this._class(data);
        let id = data._id;
        return { obj, id };
    }
    
}

exports.FleetRepository = new Repository('Fleet', FleetData, Fleet);
exports.VehicleRepository = new Repository('Vehicle', VehicleData, Vehicle);
exports.LocationRepository = new Repository('Location', LocationData, Location);
