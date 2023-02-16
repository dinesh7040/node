import { Router } from "express";
// import { admin } from "../../core/database/models/adminModel.js";
import { adminController } from "../controller/adminController.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";
import { newsfeedPhotoMiddleware } from "../middleware/newsUploadMiddleware.js";

const adminRouter = Router();

// auth
adminRouter.post("/login", adminController.auth.login);
adminRouter.post("/signup", adminController.auth.signup);
adminRouter.get("/profile", adminMiddleware, adminController.auth.profile);

// doctor module
adminRouter.post(
  "/designation/add",
  adminMiddleware,
  adminController.designation.add
);

// designation list
adminRouter.get(
  "/designation",
  adminMiddleware,
  adminController.designation.list
);

// delete designation data
adminRouter.post(
  "/designation/delete",
  adminMiddleware,
  adminController.designation.delete
);

// instant approval list
adminRouter.get(
  "/doctor/instant_approval/list",
  adminMiddleware,
  adminController.doctor.instant_approval_list
);

// doctor approved list
adminRouter.get(
  "/doctor/list",
  adminMiddleware,
  adminController.doctor.doctor_list
);

// doctor pending list
adminRouter.get(
  "/doctor/pending/list",
  adminMiddleware,
  adminController.doctor.doctor_pending_list
);

// doctor rejected list
adminRouter.get(
  "/doctor/rejected/list",
  adminMiddleware,
  adminController.doctor.doctor_rejected_list
);

// doctors count
adminRouter.get(
  "/doctor/count",
  adminMiddleware,
  adminController.doctor.doctor_count
);

// update doctor status
adminRouter.post(
  "/doctor/update_status",
  adminMiddleware,
  adminController.doctor.update_status
);



// user count
adminRouter.get("/user/count", adminMiddleware, adminController.user.count);

// add district
adminRouter.post(
  "/district/add",
  adminMiddleware,
  adminController.district.add
);

// list district
adminRouter.get(
  "/district/list",
  adminMiddleware,
  adminController.district.list
);

// delete district
adminRouter.post(
  "/district/delete",
  adminMiddleware,
  adminController.district.delete
);

// add news
adminRouter.post(
  "/news/add",
  adminMiddleware,
  newsfeedPhotoMiddleware,
  adminController.news.add
);

// list news
adminRouter.get("/news/list", adminMiddleware, adminController.news.list);

// delete news
adminRouter.post("/news/delete", adminMiddleware, adminController.news.delete);

// update news
adminRouter.post(
  "/news/edit",
  adminMiddleware,
  newsfeedPhotoMiddleware,
  adminController.news.update
);

// resource
// resource count
adminRouter.get(
  "/resource/count",
  adminMiddleware,
  adminController.resource.count
);
// resource list
adminRouter.post(
  "/resource/list",
  adminMiddleware,
  adminController.resource.status
);
// update resource status
adminRouter.post(
  "/resource/update",
  adminMiddleware,
  adminController.resource.update_status
);




// animals module
// add animal
adminRouter.post("/animal/add", adminMiddleware, adminController.animal.add);

// add breed
adminRouter.post(
  "/breed/add",
  adminMiddleware,
  adminController.animal.breedAdd
);

// view animal
adminRouter.get("/animal/view", adminMiddleware, adminController.animal.view);

// view breed list
adminRouter.post(
  "/animal/breed/list",
  adminMiddleware,
  adminController.animal.breedList
);

// delete animal
adminRouter.post(
  "/animal/delete",
  adminMiddleware,
  adminController.animal.delete
);

// delete breed
adminRouter.post(
  "/animal/delete/breed",
  adminMiddleware,
  adminController.animal.deleteBreed
);

// whatsapp group
// add group link
adminRouter.post(
  "/whatsapp/add",
  adminMiddleware,
  adminController.whatsapp.add
);

// whatsapp group list
adminRouter.get("/whatsapp", adminMiddleware, adminController.whatsapp.list);

// update whatsapp group link
adminRouter.post(
  "/whatsapp/status",
  adminMiddleware,
  adminController.whatsapp.update
);

// calculator

// feed formulation
// add feed formulation data

// add poultry type
adminRouter.post(
  '/feedformulation/poultry/add',
  adminMiddleware,
  adminController.feedformulation.poultryAdd
)

// delete poultry type
adminRouter.post(
  '/feedformulation/poultry/delete',
  adminMiddleware,
  adminController.feedformulation.poultryDelete
)

// list poultry type
adminRouter.get(
  '/feedformulation/poultry',
  adminMiddleware,
  adminController.feedformulation.poultryList
)


adminRouter.post(
  "/feedformulation/add",
  adminMiddleware,
  adminController.feedformulation.add
);
// feed formulation data list
adminRouter.get(
  "/feedformulation/",
  adminMiddleware,
  adminController.feedformulation.list
);
// delete feed formulation data
adminRouter.post(
  "/feedformulation/delete",
  adminMiddleware,
  adminController.feedformulation.delete
);

// add dose
adminRouter.post("/dose/add", adminMiddleware, adminController.dose.add);
// list dose
adminRouter.post("/dose", adminMiddleware, adminController.dose.list);
// remove dose
adminRouter.post("/dose/remove", adminMiddleware, adminController.dose.remove);

// add availability
adminRouter.post(
  "/availability/add",
  adminMiddleware,
  adminController.availability.add
);
// list availability
adminRouter.post(
  "/availability",
  adminMiddleware,
  adminController.availability.list
);
// remove availability
adminRouter.post(
  "/availability/remove",
  adminMiddleware,
  adminController.availability.remove
);

// add drug index
adminRouter.post(
  "/drugindex/add",
  adminMiddleware,
  adminController.drugindex.add
);

// list drug index
adminRouter.get("/drugindex", adminMiddleware, adminController.drugindex.list);

// remove drug index
adminRouter.post(
  "/drugindex/remove",
  adminMiddleware,
  adminController.drugindex.remove
);

// edit profile requests
adminRouter.get('/profile_req', adminMiddleware, adminController.doctor.edit_profile_req);

// add ruminant data
adminRouter.post(
  "/ruminant/add",
  adminMiddleware,
  adminController.ruminant.add
);

// list ruminant data
adminRouter.get("/ruminant", adminMiddleware, adminController.ruminant.list);

// delete ruminant data
adminRouter.post('/ruminant/delete', adminMiddleware, adminController.ruminant.delete);


export { adminRouter };
