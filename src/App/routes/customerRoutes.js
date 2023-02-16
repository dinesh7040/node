import { Router } from "express";
import { customerController } from "../controller/customerController.js";
import { photoMiddleware } from "../middleware/photoUploadMiddleware.js";
import { doctorMiddleware } from "../middleware/doctorMiddleware.js";
import { resourceMiddleware } from "../middleware/resourceMiddleware.js";
import { resourcePhotoUpload } from "../middleware/resourcePhotoUploadMiddleware.js";
import { customerMiddleware } from "../middleware/customerMiddleware.js";

const customerRoutes = Router();

customerRoutes.post("/signup", customerController.auth.signup);
customerRoutes.post('/send_otp', customerController.auth.sendOtp)
customerRoutes.post("/login", customerController.auth.login);
customerRoutes.post("/verify_otp", customerController.auth.verify);

customerRoutes.get("/news", customerController.news.list);
customerRoutes.post("/news/search", customerController.news.search);
customerRoutes.post("/news/desc", customerController.news.desc);
customerRoutes.get("/news/recent", customerController.news.recent);

// customerRoutes.post(
//   "/find_nearby/doctors",
//   customerController.find_nearby.doctor
// );
customerRoutes.post(
  "/find_nearby/doctor/details",
  customerController.find_nearby.doctor_details
);

customerRoutes.post(
  "/find_nearby/resources",
  customerController.find_nearby.resources
);
customerRoutes.post(
  "/find_nearby/resources/details",
  customerController.find_nearby.resources_details
);

customerRoutes.post(
  "/animal/buy/list",
  customerMiddleware,
  customerController.find_nearby.resources_details
);

// doctorRoutes.get(
//   "/profile",
//   doctorMiddleware,
//   doctorController.profile.profile
// );

// // my uploads
// // resource list
// doctorRoutes.get(
//   "/uploads/resource",
//   doctorMiddleware,
//   doctorController.uploads.upload
// );

export { customerRoutes };
