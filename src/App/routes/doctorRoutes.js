import { Router } from "express";
import { doctorController } from "../controller/doctorController.js";
import { photoMiddleware } from "../middleware/photoUploadMiddleware.js";
import { doctorMiddleware } from "../middleware/doctorMiddleware.js";
import { resourceMiddleware } from "../middleware/resourceMiddleware.js";
import { resourcePhotoUpload } from "../middleware/resourcePhotoUploadMiddleware.js";
import { doctorForumMiddleware } from "../middleware/doctorForumMiddleware.js";

const doctorRoutes = Router();

doctorRoutes.post("/signup", photoMiddleware, doctorController.auth.signup);
doctorRoutes.post("/login", doctorController.auth.login);
doctorRoutes.post('/sendOtp', doctorController.auth.sendOtp);

// instant approval letter
doctorRoutes.post("/instant_approval", doctorController.auth.instant_approval);

// designation list
doctorRoutes.get("/designation", doctorController.designation.list);

// district list
doctorRoutes.get("/district/list", doctorController.district.list);

// district only list
doctorRoutes.get("/districts", doctorController.district.district);

// news list
doctorRoutes.get("/news", doctorMiddleware, doctorController.news.list);

// news desc
doctorRoutes.get("/news_desc", doctorMiddleware, doctorController.news.desc);

// animal list
doctorRoutes.get("/animals", doctorController.animal.list);

// match find animal list
doctorRoutes.get("/mf_animals", doctorController.animal.matchfind_list);

// search news
doctorRoutes.post(
  "/news_search",
  doctorController.news.search
);

// find nearby module
// doctors list
doctorRoutes.post(
  "/find_nearby/doctors",
  doctorController.find_nearby.doctors
);
// doctors details 
doctorRoutes.post(
  "/find_nearby/doctor/details",
  doctorController.find_nearby.doctor_details
);


// profile
doctorRoutes.get(
  "/profile",
  doctorMiddleware,
  doctorController.profile.profile
);

// rise query for edit profile
doctorRoutes.post(
  '/rise_query',
  doctorMiddleware,
  doctorController.profile.rise_query
)

// my uploads
// resource list
doctorRoutes.post(
  "/uploads/resource",
  doctorMiddleware,
  doctorController.uploads.upload
);

// rating
doctorRoutes.post(
  "/add_rating",
  resourceMiddleware,
  doctorController.rating.addRating
);

// forum section
// forum list
doctorRoutes.get(
  "/forum",
  doctorForumMiddleware,
  doctorController.forum.list
)

// forum ask question
doctorRoutes.post(
  '/forum/ask_question',
  doctorMiddleware,
  doctorController.forum.askQuestion
)

// forum reply question
doctorRoutes.post(
  '/forum/reply_to_question',
  doctorForumMiddleware,
  doctorController.forum.replyToQuestion
)

// form chat
doctorRoutes.post('/forum/chat', doctorMiddleware, doctorController.forum.chat)

//whatsapp group link
doctorRoutes.get('/forum/whtslink', resourceMiddleware, doctorController.whatsapp.group)

// poultry type list
doctorRoutes.get('/poultry_type', doctorMiddleware, doctorController.poultry.list)

// feed formulation list
doctorRoutes.get('/poultry/feed_formulation', doctorMiddleware, doctorController.poultry.feed_formulation)

// ruminant
// energy list
doctorRoutes.get('/ruminant/energy', doctorMiddleware, doctorController.ruminant.energy)
// protein list
doctorRoutes.get('/ruminant/protein', doctorMiddleware, doctorController.ruminant.protein)
// by product list
doctorRoutes.get('/ruminant/product', doctorMiddleware, doctorController.ruminant.product)

doctorRoutes.post('/check_phone', doctorController.auth.check_phone)

// calculator
// drug index calculator
// search drug index calculator
doctorRoutes.post('/calc/drugindex', doctorMiddleware, doctorController.drugindex.drug)



export { doctorRoutes };
