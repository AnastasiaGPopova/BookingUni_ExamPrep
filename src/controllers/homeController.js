const Hotel = require('../models/Hotel.js')
const User = require('../models/User')
const hotelService = require('../services/hotelService')


exports.getHomePage = async (req, res) => {
    const allHotels = await hotelService.getSorted().lean()
    const top3hotels = allHotels.slice(0,3)
        res.render('home', {top3hotels})
}

exports.getProfilePage = async (req,res) => {
    const currentUser = await User.findById(req.user._id).lean()
    const bookedHotels = await Hotel.find({bookedByUsers: req.user._id}).lean()
    const hotels = bookedHotels.map(h => h.name)

    res.render('auth/profile', { currentUser, hotels })

}

// exports.getHomePage = async (req,res) => {

//     res.render('home')
//     // //console.log(req.query) //express is doing this for us
//     // const {search, from, to } = req.query

//     // let cubes = await Cube.find().lean()

//     // if(search) {
//     //     cubes = cubes.filter(cube => cube.name.toLowerCase().includes(search.toLowerCase())) //this will filter all cubes, that include the search key word
        
//     // }

//     // if(from) {
//     //     cubes = cubes.filter(cube => cube.difficultyLevel >= from)
//     // }

    
//     // if(to) {
//     //     cubes = cubes.filter(cube => cube.difficultyLevel <= to)
//     // }
//     // //we do this in separate "if-s" and not with "if-else", because we do not know what the user will use - Only Name, Only from or Only to. 
//     // //This way it will works only with name, or only with from, or with name + from etc


//     // res.render('home', {cubes, search, from, to})
// }

exports.getAboutPage = (req,res) => {
    res.render('about')
}

exports.getErrorPage404 = (req, res) => {
    res.render('404')
}