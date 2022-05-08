const Issue = require("../models/Issue.js");
module.exports = async (req, res) => {
  const issue = await Issue.findById(req.params.id).populate('userid');
  console.log(issue);
  res.render("form", { issue });
};
