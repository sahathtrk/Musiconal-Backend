const mongoose = require("mongoose");
const mentor = require("../models/mentor");
const store = require("../models/store");
const users = require("../models/users");
const bcrypt = require("bcrypt");
const {
  create201Response,
  create409Response,
  create400Response,
  create500Response,
  create404Response,
  create200Response,
  create401Response,
  create200CountResponse,
} = require("./responseController");
const mentorStudent = require("../models/mentorStudent");

/*
 * Role 1 is Customer
 * Role 2 is Seller
 * Role 3 is Mentor
 */

/**
 * @Request
 * {
 *  email: string,
 *  password: string
 * }
 *
 */
exports.login_process = (req, res, next) => {
  users
    .findOne({ email: req.body.email })
    .populate("store")
    .populate("mentor")
    .then((result) => {
      if (result === null) {
        create404Response(res, "User not exists");
      } else {
        bcrypt.compare(req.body.password, result.password, (err, same) => {
          if (err) {
            create500Response(res, err);
          } else if (same) {
            create200Response(res, result);
          } else {
            create401Response(res, "Password wrong");
          }
        });
      }
    })
    .catch((err) => {
      create500Response(res, err);
    });
};

/**
 * Seller
 * @Request
 * {
 *  password: string,
 *  email: string,
 *  fullName: string,
 *  phoneNumber: string,
 *  storeaddress: string,
 *  storename: string,
 *  payment: string
 * }
 *
 * Mentor
 * @Request
 * {
 *  password: string,
 *  email: string,
 *  fullName: string,
 *  phoneNumber: string,
 *  address: string,
 *  education: string,
 *  descprition: string,
 *  payment: string,
 * }
 *
 * Customer
 * @Request
 * {
 *  password: string,
 *  email: string,
 *  fullName: string,
 *  phoneNumber: string
 * }
 */
exports.register_process = (req, res, next) => {
  if (req.body.role === 2) {
    let new_store = new store({
      _id: mongoose.Types.ObjectId(),
      address: req.body.storeaddress,
      name: req.body.storename,
      payment: req.body.payment,
    });
    new_store
      .save()
      .then((response) => {
        makeUser(req, res, next, new_store, null);
      })
      .catch((err) => {
        if (err.keyPattern !== undefined) {
          if (err.keyPattern.name !== undefined) {
            create409Response(res, "Store name already exist");
          } else {
            create400Response(res, err);
          }
        } else {
          create500Response(res, err);
        }
      });
  } else if (req.body.role === 3) {
    let new_mentor = new mentor({
      _id: mongoose.Types.ObjectId(),
      address: req.body.address,
      education: req.body.education,
      description: req.body.description,
      payment: req.body.payment,
      isVerification: 1,
    });
    new_mentor
      .save()
      .then((response) => {
        makeUser(req, res, next, null, new_mentor);
      })
      .catch((err) => {
        if (err.keyPattern !== undefined) {
          if (err.keyPattern.email !== undefined) {
            create409Response(res, "Email Already exist");
          } else {
            create400Response(res, "Check your request again");
          }
        } else {
          create500Response(res, err.toString());
        }
      });
  } else {
    makeUser(req, res, next, null, null);
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @param {*} store
 * @param {*} mentor
 */
const makeUser = (req, res, next, stores, mentors) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      create500Response(res, err);
    } else {
      let new_users = new users({
        _id: mongoose.Types.ObjectId(),
        password: hash,
        email: req.body.email,
        fullName: req.body.fullName,
        phoneNumber: req.body.phoneNumber,
        store: stores === null ? null : stores._id,
        mentor: mentors === null ? null : mentors._id,
      });
      new_users
        .save()
        .then((response) => {
          let modif_user = new_users;
          modif_user.store = stores;
          modif_user.mentor = mentors;
          create201Response(res, modif_user);
        })
        .catch((err) => {
          console.log("Here Errror");
          if (stores !== null) {
            store.deleteOne({ _id: stores._id });
          } else if (mentors !== null) {
            mentor.deleteOne({ _id: mentors._id });
          }
          if (err.keyPattern !== undefined) {
            if (err.keyPattern.email !== undefined) {
              create409Response(res, err);
            } else {
              create400Response(res, err);
            }
          } else {
            create500Response(res, err);
          }
        });
    }
  });
};

/**
 *
 * @Request
 * {
 *  customer: string_id,
 *  limit: number,
 *  skip: number
 * }
 */
exports.my_mentor = (req, res, next) => {
  mentorStudent
    .find({ students: req.body.id })
    .limit(req.body.limit)
    .skip(req.body.skip)
    .populate("mentor")
    .then((response) => {
      create200CountResponse(res, response, response.length);
    })
    .catch((err) => {
      create500Response(res, err);
    });
};
/**
 *
 * @Request
 * {
 *  limit: number,
 *  skip: number
 * }
 */
exports.all_mentor = (req, res, next) => {
  users
    .find({ mentor: { $ne: null } })
    .limit(req.body.limit)
    .skip(req.body.skip)
    .populate({ path: "mentor" })
    .then((response) => {
      create200CountResponse(res, response, response.length);
    })
    .catch((err) => {
      create500Response(res, err);
    });
};
/**
 *
 * @Request
 * {
 *  limit: number,
 *  skip: number,
 *  mentor: string
 * }
 */
exports.my_students = (req, res, next) => {
  mentorStudent
    .find({ mentor: req.body.id })
    .limit(req.body.limit)
    .skip(req.body.skip)
    .populate("students")
    .then((response) => {
      create200CountResponse(res, response, response.length);
    })
    .catch((err) => {
      create500Response(res, err);
    });
};

exports.verify_mentor = (req, res, next) => {
  mentor
    .updateOne({ _id: req.body.id }, { isVerification: req.body.verification })
    .then((response) => {
      create200Response(res, response);
    })
    .catch((err) => {
      create500Response(res, "Internal server error: " + err);
    });
};