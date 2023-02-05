const Tutorial = require('../models/Hotel')

exports.getOneCourse = (couseId) => Tutorial.findById(couseId)
exports.update = (courseId, data) => Tutorial.findByIdAndUpdate(courseId, data, {runValidators: true})
exports.deleteCourse = (courseId) => Tutorial.findByIdAndDelete(courseId, {runValidators: true})
