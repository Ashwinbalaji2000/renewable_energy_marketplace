const mongoose = require('mongoose');

const schema = mongoose.Schema;

const TransactionSchema = new schema({
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
    cost:{
        type: Number,
        required: true
    }

})

module.exports = mongoose.model('Transaction',TransactionSchema)