const Hotel = require('../models/Hotel.js')
const hotelService = require('../services/hotelService.js')
const hotelUtility = require('../utils/hotelUtility.js')
const parser = require('../utils/parser')



exports.getHotelCreationPage = (req,res) => {
    res.render('create')
}

exports.postCreatedHotel = async (req, res) => {

    
    const name = req.body.hotel
    const city = req.body.city
    const freeRooms = req.body["free-rooms"]
    const imageUrl = req.body.imgUrl
    console.log(name)
    try{
        if(!name || !city || !freeRooms || !imageUrl){
            throw new Error ("All fields are requiered!")
        }
        const newHotel = new Hotel({name, city, imageUrl, freeRooms, owner: req.user._id})//encoded body-to, which we receive, will create a new cube
        //save newhotel

        await newHotel.save()
        //redirect
        res.redirect('/')

    } catch(error){
        const errors = parser.parseError(error)
        res.render('create', {errors, body: req.body.username})
    }

}

// exports.getDetails = async (req, res) => {

//     const isEnrolled = await courseUtils.isEnrolled(req.user._id, req.params.courseId)

//     let currentCourse = await Tutorial.findById(req.params.courseId)//it makes a request to the DB and gives us back all accessories with all details and infos/not only the ID/
//                                 .populate('owner')
//                                 .lean()

//     if(!currentCourse){
//         return res.redirect('/404')
//     }

//     let isOwner = false
//     let isLogged = false

//     if(req.user){
//       isLogged = true

//       if(currentCourse.owner._id == req.user._id){
//         isOwner = true
//       }
//     } 

//     res.render('details', {currentCourse, isOwner, isEnrolled})

// }



// exports.getEditCoursePage = async (req, res) => {

//     const tutorial = await hotelService.getOneCourse(req.params.courseId).lean()

//     if(!courseUtils.isTutorialOwner(req.user, tutorial)){
//         res.redirect('/404')
//     }

//     res.render('edit', {tutorial})

// }

// exports.getDeletedCubePage = async (req, res) => {
//     const tutorial = await hotelService.getOneCube(req.params.courseId).lean()
//     if(!courseUtils.isTutorialOwner(req.user, tutorial)){
//         res.redirect('/404')
//     }

//     res.render('edit', {tutorial})
// }

// exports.postEditedCourse = async (req,res) => {

//     const { title, description, imageUrl , duration } = req.body
//     await hotelService.update(req.params.courseId, { title, description, imageUrl , duration, owner: req.user._id })

//     res.redirect(`/course/${req.params.courseId}/details`)

// }

// exports.postDeleteCourse = async (req, res) => {
//     if(!courseUtils.isTutorialOwner(req.user, tutorial)){
//         res.redirect('/404')
//     }
//    await hotelService.deleteCourse(req.params.courseId)
//    res.redirect('/')
// }

// exports.postEnrollCourse = async (req, res) => {
//     const enrolledUser = req.user._id
//     console.log(enrolledUser)
//     const tutorial = await hotelService.getOneCourse(req.params.courseId)
//     tutorial.usersEnrolled.push(enrolledUser)
//     await tutorial.save()
 
//     res.redirect(`/course/${req.params.courseId}/details`)
// }