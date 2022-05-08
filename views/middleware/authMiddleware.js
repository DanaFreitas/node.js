const User = require("../../models/User");
module.exports = (req, res, next) => {
  User.findById(req.session.userId, (error, user) => {  //fetch user from database. if, valid, the program will continue
    if (error || !user) return res.redirect("/");
    next()
  })
}