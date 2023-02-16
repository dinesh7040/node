import multer from "multer";

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "assets/images/doctor");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, `vetsline-${Date.now()}.jpg`);
  },
});

var fileFilter = (req, file, cb) => {
  console.log(file);
  var allowedMimes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "application/octet-stream",
  ];
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
    fileSize: 1024 * 1024 * 7,
  },
  fileFilter: fileFilter,
}).fields([
  {
    name: "photo",
    maxCount: 1,
  },
  {
    name: "signature",
    maxCount: 1,
  },
]);

// multer : banner milddleware
export const photoMiddleware = (req, res, next) => {
  let r = upload(req, res, (err) => {
    if (err) {
      if (err.code == "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          status: false,
          message: "Image size is too large. Max image size is 7 MB",
        });
      }

      return res.status(400).json({
        status: false,
        message: err.message,
        data: "",
      });
    }
    next();
  });
};
