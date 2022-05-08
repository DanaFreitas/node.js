const { populate } = require("../models/Issue.js");
const Issue = require("../models/Issue.js");
module.exports = async (req, res) => {
  const issues = await Issue.find({}).populate('userid');//populate references uses of userid
  res.render("index", { issues });
};
