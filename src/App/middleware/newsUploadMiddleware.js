import multer from "multer";
import require from "requirejs";
const sharp = require("sharp");
const fs = require("fs");
import { env } from "../../core/lib/env.js";
import { Utilities } from "../../core/utils/function.js";

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "assets/images/tmp");
  },
  filename: (req, file, cb) => {
    cb(null, `vetsline-${Date.now()}.jpg`);
  },
});

var fileFilter = (req, file, cb) => {
  var allowedMimes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      {
        status: false,
        message: "Invalid file type. Only jpg, png image files are allowed.",
      },
      false
    );
  }
};

var upload = multer({
  storage: multerStorage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
}).single("photo");

// multer : news feed photo upload middleware
export const newsfeedPhotoMiddleware = (req, res, next) => {
  let r = upload(req, res, (err) => {
    if (err) {
      if (err.code == "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          status: false,
          message: "Image size is too large. Max image size is 5 MB",
        });
      }

      return res.status(400).json({
        status: false,
        message: err.message,
      });
    }

    if (Utilities.isNull(req.file)) {
      req.file = "";
      next();
    } else {
      let tmpPath = req.file.path;
      let newsPath = `assets/images/news/${req.file.filename}`;
      let imageInfo = sharp(req.file.path);
      imageInfo.metadata().then((image) => {
        if (image.width == 1280 && image.height == 720) {
          fs.rename(tmpPath, newsPath, (err) => {
            if (err) {
              return res.status(400).json({
                status: false,
                message: err.message,
              });
            }
            req.file.path = env.BASE_URL + "/news/" + req.file.filename;
            return next();
          });
        } else {
          return res.status(400).json({
            status: false,
            message: "Image dimension should be 1280x720",
          });
        }
      });
    }
  });
};
