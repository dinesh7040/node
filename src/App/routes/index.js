import { Router } from "express";
import { Utilities } from "../../core/utils/function.js";
import { adminRouter } from "./adminRoutes.js";
import { customerRoutes } from "./customerRoutes.js";
import { doctorRoutes } from "./doctorRoutes.js";
import { resourceRoutes } from "./resourceRoutes.js";

const routes = Router();

routes.use("/v1/doctor", doctorRoutes);
routes.use("/v1/customer", customerRoutes);
routes.use("/v1/admin", adminRouter);
routes.use("/v1/resource", resourceRoutes);

routes.get("/version", async (req, res) => {
  let version = await Utilities.getAppVersion();
  let versionArr = version.split(".");

  res.json({
    version: version,
    versionCode: versionArr[2],
    versionName: `${versionArr[0]}.${versionArr[1]}`,
  });
});

export { routes };
