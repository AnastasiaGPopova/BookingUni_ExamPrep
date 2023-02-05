const authService = require('../services/authService.js')

exports.loginPage = (req,res) => {
    res.render('auth/login')
}

exports.registerPage = (req,res) => {
    res.render('auth/register')
}

exports.postRegisterUser = async (req, res) => {
    const {email, username, password, rePassword} = req.body
    if(password !== rePassword) {
        return res.redirect('/404')
    }
    const existingUserName = await authService.getUserByUsername(username)
    const existingUserEmail = await authService.getUserByEmail(email)

    if(existingUserName || existingUserEmail){
        throw new Error("Username or Email are taken!")
    }

    const token = await authService.register(email, username, password)
    res.cookie('auth', token, {httpOnly: true})
    res.redirect('/')
}

exports.postLoginUser = async (req, res) => {
    const {username, password} = req.body

    try{
        const token = await authService.login(username, password)
        res.cookie('auth', token, {httpOnly: true})
        res.redirect('/')
   
    } catch(err){
        console.log(err)
        return res.redirect('/')
    }
}

exports.logout = (req, res) => {
    res.clearCookie('auth')
    res.redirect('/')
}