const Issue = require("../models/Issue.js");
const path = require("path");
module.exports = (req, res) => {
  let image = req.files.image;
  image.mv(
    path.resolve(__dirname, "..", "public/assets/image", image.name),
    async (error) => {
      await Issue.create({
        ...req.body,
        image: "/assets/image/" + image.name,
        userid: req.session.userId

      });
      res.redirect("/");
    }
  );
};
