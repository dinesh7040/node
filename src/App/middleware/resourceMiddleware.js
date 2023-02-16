import des from "node_triple_des";
import { DBController } from "../../core/database/DbController.js";
import { errors } from "../../core/lib/string.js";
import { Utilities } from "../../core/utils/function.js";

function invalidToken(res) {
  res.status(403).json({
    status: false,
    data: errors.INVALID_TOKEN,
  });
}

export const resourceMiddleware = async (req, res, next) => {

  // log
  Utilities.log(req)

  if (req.headers.token == null && req.headers.token == undefined) {
    invalidToken(res);
  } else {
    try {
      let dec = des.decrypt(process.env.PUB_KEY, req.headers.token);

      let data = await dec;

      data = JSON.parse(data);

      if (data.role != "doctor" && data.role != "customer") {
        invalidToken(res);
      }

      if (data.role == "doctor") {
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
          req.token = { ...data.data, role: data.role };
          next();
        } else {
          if (isHeDoctor.approval_status != "approved") {
            res.status(403).json({
              status: false,
              data:
                isHeDoctor.approval_status == "pending"
                  ? errors.DOCTOR_PENDING_APPROVAL
                  : errors.DOCTOR_REJECTED_APPROVAL,
            });
          } else {
            invalidToken(res);
          }
        }
      } else if (data.role == "customer") {
        let isHeCustomer = await DBController.Models.customer.findOne({
          where: {
            id: data.data.id,
            active: true,
          },
        });

        if (Utilities.isNotNull(isHeCustomer)) {
          req.token = { ...data.data, role: data.role };
          next();
        } else {
          invalidToken(res);
        }
      }
    } catch (e) {
      invalidToken(res);
    }
  }
};
