const Hotel = require('../models/Hotel')

exports.getOneCourse = (hotelId) => Hotel.findById(hotelId)
exports.update = (hotelId, data) => Hotel.findByIdAndUpdate(hotelId, data, {runValidators: true})
exports.deleteCourse = (hotelId) => Hotel.findByIdAndDelete(hotelId, {runValidators: true})
exports.getAllHotels = () => Hotel.find()
