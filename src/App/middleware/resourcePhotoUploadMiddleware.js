import multer from "multer";
import require from "requirejs";
const sharp = require("sharp");
const fs = require("fs");
import { env } from "../../core/lib/env.js";
import { Utilities } from "../../core/utils/function.js";

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "assets/images/resource");
  },
  filename: (req, file, cb) => {
    cb(null, `vetsline-resource_${Date.now()}.jpg`);
  },
});

var fileFilter = (req, file, cb) => {
  var allowedMimes = ["image/jpeg", "image/jpg", "image/png", "application/octet-stream"];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      {
        status: false,
        message: { error: "Invalid file type. Only jpg, png image files are allowed." },
      },
      false
    );
  }
};

var upload = multer({
  storage: multerStorage,
  limits: {
    fileSize: 1024 * 1024 * 7,
  },
  fileFilter: fileFilter,
}).array("photo", 3);

// multer : resource photo upload middleware
export const resourcePhotoUpload = (req, res, next) => {

  let r = upload(req, res, (err) => {
    if (err) {
      if (err.code == "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          status: false,
          message: { error: "Image size is too large. Max image size is 7 MB" },
        });
      }

      console.log(err);
      if (err.code == "LIMIT_UNEXPECTED_FILE") {
        return res.status(400).json({
          status: false,
          message: { error: "You cannot upload more than 3 images" },
        });
      }

      return res.status(400).json({
        status: false,
        message: {
          error: err.message
        },
      });
    }

    if (Utilities.isNull(req.files)) {
      req.files = "";
      next();
    } else {
      req.files = req.files.map((v) => {
        return { ...v, path: "/resource/" + v.filename };
      });
      next();
    }
  });
};
