import { DBController } from "../../database/DbController.js";
import { env } from "../../lib/env.js";
import { Utilities } from "../../utils/function.js";

export class resourceControl { }

resourceControl.resource = {
  add: async ({ body, files, token }) => {
    body.photo = files == "" ? "" : files.map((v) => v.path);
    return await DBController.resource.add(body, token);
  },
  delete: async ({ body, files, token }) => {
    return await DBController.resource.delete(body, token);
  },
  rate: async ({ body, token }) => {
    return await DBController.resource.rate(body, token);
  },
  post: async ({ body, token }) => {

    return await DBController.resource.post(body, token);
  }
};
