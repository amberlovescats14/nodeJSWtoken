const router = require('express').Router()
const User = require('../model/User')
const bcrypt = require('bcryptjs')
const { loginValidation, registerValidation } = require('../validation')


//!REGISTER
router.post('/', async (req, res) => {
  try {
    // const { error } = Joi.validate(req.body, JoiSchema)
    // if(error) return res.status(404).send(error.details[0].message)

    const { error } = registerValidation(req.body)
    if(error) return res.status(404).send(error.details[0].message)

    //if user is already in data base
    const emailExist = await User.findOne({email: req.body.email})
    if(emailExist) return res.status(404).json({msg: `Email already exists.`})

    //HASH the password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword
    })
    const savedUser = await user.save()
    res.send({user: user._id})

  } catch (err) {
    console.error(err.message)
    res.send(400).json({msg: `SERVER ERROR`})
  }

})

//! LOGIN
router.post('/login', async(req, res) => {
  try {
      //validation
  const { error } = loginValidation(req.body)
  if(error) return res.status(404).send(error.details[0].message)

  //check if email exists
  //this only checks email, but we dont want to give away that only the password is wrong
  const user = await User.findOne({email: req.body.email})
  if(!user) return res.status(400).json({msg: `Please Register`})

  //check if password is correct--same error password
  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if(!validPassword) return res.status(400).json({msg: `Please Register`})

  res.send(`You are now logged in`)

  } catch (err) {
    console.error(err.message)
    res.status(500).json({msg: `SERVER ERROR`})
  }
})

module.exports = router