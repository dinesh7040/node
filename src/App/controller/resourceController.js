import { errors } from "../../core/lib/string.js";
import { Utilities } from "../../core/utils/function.js";
import moment from "moment";
import { resourceControl } from "../../core/inc/controls/resourceControl.js";
import { logger } from "../../core/utils/logger.js";

class resourceController { }

resourceController.resource = {
  add: async (req, res) => {
    resourceControl.resource
      .add(req)
      .then((data) => {
        let resp = Utilities.validateResponse(data);
        res.status(resp.statusCode).json({
          status: resp.status,
          message: resp.status ? 'success' : data,
          data: resp.status ? data : {},
        });
      })
      .catch((e) => {
        console.log(e);
        logger.error(JSON.stringify(e))
        res.status(400).json({
          status: false,
          message: e.errors.map((v) => {
            return { error: v.message }
          }),
        });
      })
      .catch((e) => {
        Utilities.internalError(res)
      });
  },
  delete: async (req, res) => {
    resourceControl.resource
      .delete(req)
      .then((data) => {
        let resp = Utilities.validateResponse(data);

        res.json({
          status: resp.status,
          message: !resp.status ? data : "success",
          data: !resp.status ? {} : data,
        });
      })
      .catch((e) => {
        console.log(e);
        logger.error(JSON.stringify(e))
        res.status(400).json({
          status: false,
          message: e.errors.map((v) => {
            return { error: v.message }
          }),
        });
      })
      .catch((e) => {
        Utilities.internalError(res);
      });
  },
  rate: async (req, res) => {
    resourceControl.resource
      .rate(req)
      .then((data) => {
        let resp = Utilities.validateResponse(data);

        res.json({
          status: resp.status,
          message: resp.status ? "sucess" : [data],
          data: resp.status ? data : {}
        })

      })
      .catch(e => {
        console.log(e);
        logger.error(JSON.stringify(e))
        res.status(400).json({
          status: false,
          message: e.errors.map((v) => {
            return { error: v.message }
          }),
          data: {}
        })
      })
      .catch(e => {
        Utilities.internalError(res)
      })
  },
  post: async (req, res) => {
    resourceControl.resource.post(req).then(data => {
      var resp = Utilities.validateResponse(data)

      res.json({
        status: resp.status,
        message: resp.status ? "success" : data,
        data: resp.status ? data : []
      })

    })
      .catch(e => {
        res.status(400).json({
          status: false,
          message: e.errors.map(v => {
            return { message: v.message }
          }),
          data: []
        })
      })
      .catch(e => {
        Utilities.internalError(res)
      })
  }
};

export { resourceController };
