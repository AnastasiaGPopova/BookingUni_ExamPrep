//--------Configuring the router /which gets exported at the end----------
const express = require('express')
const Router = express.Router
const router = Router()
// ----------------------------------


//----- importing the controllers----------
const hotelController = require('./controllers/hotelController')
const homeController = require('./controllers/homeController')
const authController = require('./controllers/authController.js')
const {isAuthenticated} = require('./middlewares/authMiddleware.js')

//-------------------------------------------

router.get('/', homeController.getHomePage)


//Login and Register
router.get('/login', authController.loginPage)
router.get('/register', authController.registerPage)
router.post('/register', authController.postRegisterUser)
router.post('/login', authController.postLoginUser)


//hotels creation
router.get('/hotel/create', isAuthenticated, hotelController.getHotelCreationPage)
router.post('/hotel/create', isAuthenticated, hotelController.postCreatedHotel)

// router.get('/course/:hotelId/details', hotelController.getDetails)

// //Edit Page
// router.get('/course/:hotelId/edit', isAuthenticated, hotelController.)
// router.post('/course/:hotelId/edit', isAuthenticated,hotelController.)

// //Delete Course
// router.post('/course/:hotelId/delete', hotelController.postDeleteCourse)

// //Enroll Course
// router.get('/course/:hotelId/enroll', hotelController.postEnrollCourse)



router.get('/logout', authController.logout)



module.exports = router