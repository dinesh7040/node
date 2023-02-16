import e from "express";
import { customerControl } from "../../core/inc/controls/customerControl.js";
import { errors } from "../../core/lib/string.js";
import { Utilities } from "../../core/utils/function.js";
import { logger } from "../../core/utils/logger.js";

export class customerController { }

customerController.auth = {
  signup: async (req, res) => {
    Utilities.log(req)
    customerControl.auth
      .signup(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);
        let d = {
          status: resp.status,
          message: resp.status ? "success" : data,
          data: resp.status ? data : {},
        };

        res.json(d);
      })
      .catch((e) => {
        console.log(e);
        logger.error(JSON.stringify(e))
        res.status(400).json({
          status: "false",
          message: e.errors.map((v) => {
            return { error: v.message }
          }),
        });
      })
      .catch((e) => {
        Utilities.internalError(res);
      });
  },
  login: async (req, res) => {
    Utilities.log(req)
    customerControl.auth
      .login(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);

        res.status(resp.statusCode).json({ status: resp.status, data: data });
      })
      .catch((e) => {
        logger.error(JSON.stringify(e))
        console.log(e);
        res.status(400).json({
          status: false,
          message: e.errors.map((v) => v.message),
        });
      })
      .catch((e) => {
        console.log(e);
        Utilities.internalError(res);
      });
  },
  verify: async (req, res) => {
    Utilities.log(req)
    customerControl.auth
      .verify(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);
        res.json({
          status: resp.status,
          message: resp.status ? "success" : data,
          token: resp.status ? data : {},
        });
      })
      .catch((e) => {
        console.log(e);
        logger.error(JSON.stringify(e))
        e.errors.length == 1
          ? res.status(400).json({
            status: false,
            message: e.errors[0].message,
          })
          : res.status(400).json({
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
  sendOtp: async (req, res) => {
    Utilities.log(req)
    customerControl.auth.sendOtp(req).then(data => {

      var resp = Utilities.validateResponse(data)

      res.json({
        status: resp.status,
        message: resp.status ? 'Success' : data,
        data: resp.status ? data : {}
      })

    })
      .catch(e => {
        console.log(e)
        logger.error(JSON.stringify(e))
        res.status(400).json({
          status: false,
          message: e.errors.map((v) => {
            return { error: v.message }
          })
        })
      })
      .catch(e => {
        Utilities.internalError(res)
      })
  }
};

customerController.news = {
  list: async (req, res) => {
    customerControl.news
      .list(req)
      .then((data) => {
        let resp = Utilities.validateResponse(data);

        res.json({
          status: resp.status,
          message: resp.status ? "success" : data,
          data: resp.status ? data : {},
        })


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
  search: async (req, res) => {
    customerControl.news
      .search(req)
      .then((data) => {
        let resp = Utilities.validateResponse(data);

        res.json({
          status: resp.status,
          message: resp.status ? "success" : data,
          data: resp.status ? data : {},
        })

      })
      .catch((e) => {
        console.log(e);
        logger.error(JSON.stringify(e))
        res.status(400).json({
          status: false,
          message: e.errors.map((v) => {
            return { error: v.message }
          }),
          data: [],
        });
      })
      .catch((e) => {
        console.log(e);
        Utilities.internalError(res);
      });
  },
  desc: async (req, res) => {
    customerControl.news
      .desc(req)
      .then((data) => {
        let resp = Utilities.validateResponse(data);

        res.json({
          status: resp.status,
          message: resp.status ? 'success' : data,
          data: resp.status ? 'success' : {},
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
  recent: async (req, res) => {
    customerControl.news
      .recent(req)
      .then((data) => {
        let resp = Utilities.validateResponse(data);

        res.status(resp.statusCode).json({
          status: resp.status,
          message: resp.status ? "success" : [data],
          data: resp.status ? data : [],
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
  }
};

customerController.find_nearby = {
  doctor: async (req, res) => {
    customerControl.find_nearby
      .doctor(req)
      .then((data) => {
        let resp = Utilities.validateResponse(data);

        res.json({
          status: resp.status,
          message: resp.status ? "success" : data,
          data: resp.status ? data : [],
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
        console.log(e);
        Utilities.internalError(res)
      });
  },
  doctor_details: async (req, res) => {
    customerControl.find_nearby
      .doctor_details(req)
      .then((data) => {
        let resp = Utilities.validateResponse(data);

        res.status(resp.statusCode).json({
          status: resp.status,
          message: resp.status ? "success" : data,
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
        console.log(e);
        Utilities.internalError(res);
      });
  },
  resources: async (req, res) => {
    customerControl.find_nearby
      .resources(req)
      .then((data) => {
        let resp = Utilities.validateResponse(data);

        res.json({
          status: resp.status,
          message: resp.status ? "success" : data,
          data: resp.status ? data : [],
        })

      })
      .catch((e) => {
        console.log(e);
        logger.error(JSON.stringify(e))
        res
          .status(400)
          .json({
            status: false,
            message: e.errors.map((v) => {
              return { error: v.message }
            })
          });
      })
      .catch((e) => {
        console.log(e);
        Utilities.internalError(res)
      });
  },
  resources_details: async (req, res) => {
    customerControl.find_nearby
      .resources_details(req)
      .then((data) => {
        let resp = Utilities.validateResponse(data);

        res.json({
          status: resp.status,
          message: resp.status ? "success" : data,
          data: resp.status ? data : {},
        });

      })
      .catch((e) => {
        console.log(e);
        logger.error(JSON.stringify(e))
        res
          .status(400)
          .json({
            status: false, message: e.errors.map((v) => {
              return { error: v.message }
            })
          });
      })
      .catch((e) => {
        Utilities.internalError(res)
      });
  },
};
