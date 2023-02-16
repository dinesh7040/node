import { Router } from "express";
import { resourceController } from "../controller/resourceController.js";
import { resourceMiddleware } from "../middleware/resourceMiddleware.js";
import { resourcePhotoUpload } from "../middleware/resourcePhotoUploadMiddleware.js";
import { doctorController } from "../controller/doctorController.js";

const resourceRoutes = Router();

// add resource
resourceRoutes.post(
  "/add",
  resourceMiddleware,
  resourcePhotoUpload,
  resourceController.resource.add
);

// delete resource
resourceRoutes.post(
  '/delete',
  resourceMiddleware,
  resourceController.resource.delete
)

// rate resource
resourceRoutes.post('/rate', resourceMiddleware, resourceController.resource.rate)


// animal module
// match find

// add pet for match find
resourceRoutes.post(
  "/matchfind/add",
  resourceMiddleware,
  resourcePhotoUpload,
  doctorController.matchfind.add
);

// pet detail
resourceRoutes.post(
  "/matchfind/detail",
  doctorController.matchfind.detail
);

// match find list
resourceRoutes.post(
  "/matchfind",
  doctorController.matchfind.list
);

// matchfind phone number verify
resourceRoutes.post(
  '/matchfind/verify',
  resourceMiddleware,
  doctorController.matchfind.verify
)

// matchfind payment verification 
resourceRoutes.post(
  '/matchfind/payment',
  resourceMiddleware,
  doctorController.matchfind.payment_verify
)

// buy and sell
// sell pets
resourceRoutes.post(
  "/buysell/sell",
  resourceMiddleware,
  resourcePhotoUpload,
  doctorController.buysell.sell
);

// selling post verification
resourceRoutes.post('/buysell/verify', resourceMiddleware, doctorController.buysell.verify)

// selling pet detail
resourceRoutes.post(
  "/buysell/sell/detail",
  doctorController.buysell.detail
);

// selling list
resourceRoutes.post(
  "/buysell",
  doctorController.buysell.list
);

// selling payment verification 
resourceRoutes.post(
  '/buysell/payment',
  resourceMiddleware,
  doctorController.buysell.payment_verify
)

// adoption
// add to adoption
resourceRoutes.post(
  "/adoption/add",
  resourceMiddleware,
  resourcePhotoUpload,
  doctorController.adoption.add
);

// adoption list
resourceRoutes.post(
  "/adoption",
  doctorController.adoption.list
);

// adopt pet detail
resourceRoutes.post(
  "/adoption/detail",
  doctorController.adoption.detail
);

// adopt pet sms verification
resourceRoutes.post(
  "/adoption/verify",
  resourceMiddleware,
  doctorController.adoption.verify
);

resourceRoutes.post('/mypost', resourceMiddleware, resourceController.resource.post)


export { resourceRoutes };
