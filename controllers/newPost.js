module.exports = (req, res) => {
  if (req.session.userId) {
    return res.render("form",{
    createPost:true
  });}
  res.redirect("login");
};
