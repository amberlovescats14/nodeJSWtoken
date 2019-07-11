const router = require('express').Router()
const verify = require('./verifyToken')

router.get('/', verify, (req, res) => {
  // res.json({
  //   posts: {
  //     title: `THIS IS A TEST`,
  //     description: `DO NOT ACCESS WITHOUT BEING LOGGED IN`
  //   }
  // })
res.send(req.user)
})





module.exports = router