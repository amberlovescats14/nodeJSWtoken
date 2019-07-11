const jwt = require('jsonwebtoken')

const verify = (req, res, next) => {
  try {
    //check to make sure a header named auth-token is being send back
    const token = req.header('auth-token')
    if(!token) return res.status(401).json({msg: `Unauthorized`})


    const verified = jwt.verify(token, process.env.TOKEN_SECRET)
    req.user = verified;
    next()
  } catch (error) {
    console.error(error.message)
    res.status(400).json({msg: `SERVER ERRROR`})
  }
}

module.exports = verify