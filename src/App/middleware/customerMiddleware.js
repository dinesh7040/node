import des from "node_triple_des";
import { DBController } from "../../core/database/DbController.js";
import { errors } from "../../core/lib/string.js";
import { Utilities } from "../../core/utils/function.js";

const invalidToken = (res) =>
  res.status(403).json({
    status: false,
    data: errors.INVALID_TOKEN,
  });

export const customerMiddleware = async (req, res, next) => {

  // log
  Utilities.log(req)

  if (req.headers.token == null && req.headers.token == undefined) {
    invalidToken(res);
  } else {
    try {
      let dec = des.decrypt(process.env.PUB_KEY, req.headers.token);

      let data = await dec;

      data = JSON.parse(data);

      if (data.role != "customer") {
        invalidToken(res);
      }
      let isCustomer = await DBController.Models.customer.findOne({
        where: {
          id: data.data.id,
          active: true,
        },
      });
      if (Utilities.isNotNull(isCustomer) && isCustomer.ph_verified) {
        req.token = data.data;
        next();
      } else {
        if (!isCustomer.ph_verified) {
          res.status(401).json({
            status: false,
            data: errors.PHONE_NUMBER_NOT_VERIFIED,
          });
        } else {
          invalidToken(res);
        }
      }
    } catch (e) {
      invalidToken(res);
    }
  }
};
