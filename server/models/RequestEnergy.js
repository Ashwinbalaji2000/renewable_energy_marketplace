const mongoose = require('mongoose');

const schema = mongoose.Schema;

const RequestEnergySchema = new schema({
    from:{
        type: String,
        required: true
    },
    to:{
        type: String,
        required: true
    },
    energy:{
        type: Number,
        required: true
    },
    hours:{
        type: Number,
        required: true
    }

})

module.exports = mongoose.model('RequestEnergy',RequestEnergySchema)