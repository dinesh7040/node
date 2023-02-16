import des from "node_triple_des";
import { DBController } from "../../core/database/DbController.js";
import { errors } from "../../core/lib/string.js";
import { Utilities } from "../../core/utils/function.js";

const invalidToken = (res, message) => {
  res.status(403).json({
    status: false,
    message: message ?? errors.INVALID_TOKEN,
  });
}

export const doctorForumMiddleware = async (req, res, next) => {

  // log
  Utilities.log(req)

  if (req.headers.token == null && req.headers.token == undefined) {
    invalidToken(res)
  } else {
    try {
      let dec = des.decrypt(process.env.PUB_KEY, req.headers.token);

      let data = await dec;

      data = JSON.parse(data);

      if (data.role != "doctor") {
        invalidToken(res)
      }
      let isHeDoctor = await DBController.Models.doctor.findOne({
        where: {
          id: data.data.id,
          active: true,
        },
      });

      if (Utilities.isNotNull(isHeDoctor) && isHeDoctor.approval_status == "approved") {
        let hasPermission = await DBController.Models.forumPermission.findOne({
          where: {
            userId: data.data.id,
            active: true
          }
        })
        if (Utilities.isNotNull(hasPermission)) {
          req.token = data.data;
          next();
        }
        else {
          invalidToken(res, "You don't have permission to access this forum")
        }

      } else {
        if (isHeDoctor.approval_status != "approved") {
          res.status(403).json({
            status: false,
            data:
              isHeDoctor.approval_status == "pending"
                ? errors.DOCTOR_PENDING_APPROVAL
                : {
                  reason: isHeDoctor.reason,
                  error: errors.DOCTOR_REJECTED_APPROVAL,
                },
          });
        } else {
          invalidToken(res)
        }
      }
    } catch (e) {
      invalidToken(res)
    }
  }
};
