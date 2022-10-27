const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({

    price: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Offers", offerSchema)