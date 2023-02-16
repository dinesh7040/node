import des from "node_triple_des";
import { DBController } from "../../core/database/DbController.js";
import { errors } from "../../core/lib/string.js";
import { Utilities } from "../../core/utils/function.js";

export const doctorMiddleware = async (req, res, next) => {

  // log
  Utilities.log(req)

  if (req.headers.token == null && req.headers.token == undefined) {
    res.status(403).json({
      status: false,
      data: errors.INVALID_TOKEN,
    });
  } else {
    try {
      let dec = des.decrypt(process.env.PUB_KEY, req.headers.token);

      let data = await dec;

      data = JSON.parse(data);

      if (data.role != "doctor") {
        return res.status(403).json({
          status: false,
          data: errors.INVALID_TOKEN,
        });
      }
      let isHeDoctor = await DBController.Models.doctor.findOne({
        where: {
          id: data.data.id,
          active: true,
        },
      });

      if (
        Utilities.isNotNull(isHeDoctor) &&
        isHeDoctor.approval_status == "approved"
      ) {
        req.token = data.data;
        next();
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
          res.status(403).json({
            status: false,
            data: errors.INVALID_TOKEN,
          });
        }
      }
    } catch (e) {
      res.status(403).json({
        status: false,
        data: errors.INVALID_TOKEN,
      });
    }
  }
};
