const mongoose = require("mongoose");
const tutorial = require("../models/tutorial");
const {
  create200CountResponse,
  create500Response,
  create200Response,
} = require("./responseController");

exports.get_all_tutorial = (req, res, next) => {
  tutorial
    .find({})
    .populate("created_by")
    .then((result) => {
      create200CountResponse(res, result, result.length);
    })
    .catch((err) => {
      create500Response(res, err);
    });
};

exports.create_tutorial = (req, res, next) => {
  let link = "";
  if (req.body.link !== "") {
    link = req.body.link;
  } else {
    link = req.files.video[0].path;
  }
  tutorial
    .create({
      _id: mongoose.Types.ObjectId(),
      title: req.body.title,
      description: req.body.description,
      thubnail: req.files.thubnail[0].path,
      link: link,
      created_by: req.body.created_by,
    })
    .then((data) => {
      data.populate("created_by").then((result) => {
        create200Response(res, result);
      });
    })
    .catch((err) => {
      create500Response(res, err);
    });
};
