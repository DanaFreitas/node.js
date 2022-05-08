const User = require("../models/User.js");
const path = require("path");
module.exports = (req, res) => {
  User.create(req.body, (error, user) => {
    //store created user
    if (error) {
      return res.redirect("/newuser");
    }

    res.redirect("/");
    // if (error) {   //return in case of an error
    // return res.redirect("/newuser");
  });
};

/*
const User = require('../models/User.js')
const path = require("path");
module.exports = (req, res) => {
  User.create(req.body, (error, user) => {
    res.redirect("/");
  })
};*/
