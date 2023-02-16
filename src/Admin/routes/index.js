import { Router } from "express";
import { Adminroutes } from "./adminRoutes.js";

const routes = Router();

routes.use("/admin", Adminroutes);

// export {
//     routes
// }
