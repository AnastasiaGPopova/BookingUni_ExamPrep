const mongoose = require('mongoose')

const hotelSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    }, 
    city: {
        type: String,
        required: true,
        minLength: 20,
        maxLength: 50, //check real length
    },
    imageUrl: {
        type: String,
        required: true,
        // match: /^https?:\/\//
        validate : {
            validator: function (value){
                return value.startsWith("http://") || value.startsWith("https://")
            },
            message: "Invalid URL!"
        }

    }, 
    freeRooms: {
        type: String,
        required: true,
    },
    bookedByUsers: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type:mongoose.Types.ObjectId,
        ref: 'User'
    },
    offeredHotels:[{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
})

const Hotel = mongoose.model('Hotel', hotelSchema)
module.exports = Hotel