//validation
const Joi = require('@hapi/joi')

//REGISTER Validation
const registerValidation = (data) => {
  const JoiRegisterSchema = {
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
  }
return Joi.validate(data, JoiRegisterSchema)
}

//login
const loginValidation = (data) => {
  const JoiLoginSchema = {
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
  }
  return Joi.validate(data, JoiLoginSchema)
}
module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation