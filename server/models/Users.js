const mongoose = require('mongoose');

const schema = mongoose.Schema;

const UserSchema = new schema({
    name:{
        type: String,
        required: true
    },
    solar_energy:{
        type: Number,
        required: true
    },
    irradiation:{
        type: Number,
        required: true
    },
    wind_energy:{
        type: Number,
        required: true
    },
    wind_speed:{
        type: Number,
        required: true
    },
    energy_consumption:{
        type: Number,
        required: true
    },
    battery_soc:{
        type: Number,
        required: true
    },
    bought_energy:{
        type: Number,
        required: true
    },
    sold_energy:{
        type: Number,
        required: true
    }

})

module.exports = mongoose.model('User',UserSchema)