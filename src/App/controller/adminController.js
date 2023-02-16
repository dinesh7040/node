
import { AdminControl } from "../../core/inc/controls/AdminControl.js";
import { errors } from "../../core/lib/string.js";
import { Utilities } from "../../core/utils/function.js";
import { logger } from "../../core/utils/logger.js";

class adminController { }

adminController.auth = {
  login: async (req, res) => {
    AdminControl.auth
      .login(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);

        let d = {
          status: resp.status,
          data: data,
        };
        res.status(resp.statusCode).json(d);
      })
      .catch((e) => {
        var err = e.errors.map((v) => {
          return { keyword: v.keyword, message: v.message };
        });
        res.status(404).json({ status: false, error: err });
      });
  },
  signup: async (req, res) => {
    AdminControl.auth
      .signup(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);
        let d = {
          status: resp.status,
          data: data,
        };

        res.status(resp.statusCode).json(d);
      })
      .catch((e) => {
        var err = e.errors.map((v) => {
          return { keyword: v.keyword, message: v.message };
        });
        res.status(404).json({ status: false, error: err });
      });
  },
  profile: async (req, res) => {
    AdminControl.auth
      .profile(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);
        let d = {
          status: resp.status,
          data: data,
        };

        res.status(resp.statusCode).json(d);
      })
      .catch((e) => {
        var err = e.errors.map((v) => {
          return { keyword: v.keyword, message: v.message };
        });
        res.status(404).json({ status: false, error: err });
      });
  },
};

adminController.designation = {
  add: async (req, res) => {
    AdminControl.designation
      .add(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);
        let d = {
          status: resp.status,
          data: data,
        };

        res.status(resp.statusCode).json(d);
      })
      .catch((e) => {
        var err = e.errors.map((v) => {
          return { keyword: v.keyword, message: v.message };
        });
        res.status(404).json({ status: false, error: err });
      });
  },
  list: async (req, res) => {
    AdminControl.designation
      .list(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);
        let d = {
          status: resp.status,
          data: data,
        };

        res.status(resp.statusCode).json(d);
      })
      .catch((e) => {
        res
          .status(404)
          .json({ status: false, error: e.errors.map((v) => v.message) });
      })
      .catch((e) => {
        res.status(500).json({
          status: false,
          error: errors.SERVER_ERROR,
        });
      });
  },
  delete: async (req, res) => {
    AdminControl.designation
      .delete(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);
        let d = {
          status: resp.status,
          data: data,
        };

        res.status(resp.statusCode).json(d);
      })
      .catch((e) => {
        res
          .status(404)
          .json({ status: false, error: e.errors.map((v) => v.message) });
      })
      .catch((e) => {
        res.status(500).json({
          status: false,
          error: errors.SERVER_ERROR,
        });
      });
  },
};

adminController.doctor = {
  instant_approval_list: async (req, res) => {
    AdminControl.doctor
      .list(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);
        let d = {
          status: resp.status,
          data: data,
        };
        res.status(resp.statusCode).json(d);
      })
      .catch((e) => {
        console.log(e);
        res.status(404).json({ status: false, error: e });
      })
      .catch((e) => {
        res.status(500).json({ status: false, error: errors.SERVER_ERROR });
      });
  },
  doctor_list: async (req, res) => {
    AdminControl.doctor
      .doctor_list(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);
        let d = {
          status: resp.status,
          data: data,
        };
        res.status(resp.statusCode).json(d);
      })
      .catch((e) => {
        res.status(404).json({ status: false, error: e });
      })
      .catch((e) => {
        res.status(500).json({ status: false, error: errors.SERVER_ERROR });
      });
  },
  doctor_pending_list: async (req, res) => {
    AdminControl.doctor
      .doctor_pending_list(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);
        let d = {
          status: resp.status,
          data: data,
        };
        res.status(resp.statusCode).json(d);
      })
      .catch((e) => {
        res.status(404).json({ status: false, error: e });
      })
      .catch((e) => {
        res.status(500).json({ status: false, error: errors.SERVER_ERROR });
      });
  },
  doctor_rejected_list: async (req, res) => {
    AdminControl.doctor
      .doctor_rejected_list(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);
        let d = {
          status: resp.status,
          data: data,
        };
        res.status(resp.statusCode).json(d);
      })
      .catch((e) => {
        res.status(404).json({ status: false, error: e });
      })
      .catch((e) => {
        res.status(500).json({ status: false, error: errors.SERVER_ERROR });
      });
  },
  doctor_count: async (req, res) => {
    AdminControl.doctor
      .doctor_count(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);
        let d = {
          status: resp.status,
          data: data,
        };
        res.status(resp.statusCode).json(d);
      })
      .catch((e) => {
        res.status(404).json({ status: false, error: e });
      })
      .catch((e) => {
        res.status(500).json({ status: false, error: errors.SERVER_ERROR });
      });
  },
  update_status: async (req, res) => {
    AdminControl.doctor
      .update_status(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);
        let d = {
          status: resp.status,
          data: data,
        };
        res.status(resp.statusCode).json(d);
      })
      .catch((e) => {
        res
          .status(404)
          .json({ status: false, error: e.errors.map((v) => v.message) });
      })
      .catch((e) => {
        res.status(500).json({ status: false, error: errors.SERVER_ERROR });
      });
  },
  update_ins: async (req, res) => {
    AdminControl.doctor
      .update_ins(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);

        res.json({
          status: resp.status,
          message: resp.status ? "Success" : data,
          data: resp.status ? data : {},
        });
      })
      .catch((e) => {
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
        res.status(500).json({ status: false, error: errors.SERVER_ERROR });
      });
  },
  edit_profile_req: async (req, res) => {
    AdminControl.doctor
      .edit_profile_query(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);
        let d = {
          status: resp.status,
          message: resp.status ? "Success" : data,
          data: resp.status ? data : {},
        };
        res.json(d);
      })
      .catch((e) => {
        console.log(e);
        logger.error(JSON.stringify(e))
        res
          .status(400)
          .json({
            status: false, error: e.errors.map((v) => {
              return { error: v.message }
            })
          });
      })
      .catch((e) => {
        Utilities.internalError(res)
      });
  }

};

adminController.user = {
  count: async (req, res) => {
    AdminControl.user
      .count(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);
        let d = {
          status: resp.status,
          data: data,
        };
        res.status(resp.statusCode).json(d);
      })
      .catch((e) => {
        res.status(404).json({ status: false, error: e.errors });
      })
      .catch((e) => {
        res.status(500).json({ status: false, error: errors.SERVER_ERROR });
      });
  },
};

adminController.district = {
  add: async (req, res) => {
    AdminControl.district
      .add(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);
        let d = {
          status: resp.status,
          data: data,
        };

        res.status(resp.statusCode).json(d);
      })
      .catch((e) => {
        res.status(404).json({
          status: false,
          error: e.errors.map((v) => v.message),
        });
      })
      .catch((e) => {
        res.status(500).json({ status: false, error: errors.SERVER_ERROR });
      });
  },
  list: async (req, res) => {
    AdminControl.district
      .list(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);
        let d = {
          status: resp.status,
          message: resp.status ? "Success" : [data],
          data: resp.status ? data : [],
        };
        res.json(d);
      })
      .catch((e) => {
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
    AdminControl.district
      .delete(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);
        let d = {
          status: resp.status,
          data: data,
        };
        res.status(resp.statusCode).json(d);
      })
      .catch((e) => {
        res
          .status(404)
          .json({ status: false, error: e.errors.map((v) => v.message) });
      })
      .catch((e) => {
        res.status(500).json({ status: false, error: errors.SERVER_ERROR });
      });
  },
};

adminController.news = {
  add: async (req, res) => {
    AdminControl.news
      .add(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);
        let d = {
          status: resp.status,
          data: data,
        };
        res.status(resp.statusCode).json(d);
      })
      .catch((e) => {
        res.status(404).json({
          status: false,
          error: e.errors.map((v) => v.message),
        });
      })
      .catch((e) => {
        res.status(500).json({ status: false, error: errors.SERVER_ERROR });
      });
  },
  list: async (req, res) => {
    AdminControl.news
      .list(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);
        let d = {
          status: resp.status,
          data: data,
        };
        res.status(resp.statusCode).json(d);
      })
      .catch((e) => {
        res.status(404).json({ status: false, error: e });
      })
      .catch((e) => {
        res.status(500).json({ status: false, error: errors.SERVER_ERROR });
      });
  },
  delete: async (req, res) => {
    AdminControl.news
      .delete(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);
        let d = {
          status: resp.status,
          data: data,
        };
        res.status(resp.statusCode).json(d);
      })
      .catch((e) => {
        res
          .status(404)
          .json({ status: false, error: e.errors.map((v) => v.message) });
      })
      .catch((e) => {
        res.status(500).json({ status: false, error: errors.SERVER_ERROR });
      });
  },
  update: async (req, res) => {
    AdminControl.news
      .update(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);
        let d = {
          status: resp.status,
          data: data,
        };
        res.status(resp.statusCode).json(d);
      })
      .catch((e) => {
        res
          .status(404)
          .json({ status: false, error: e.errors.map((v) => v.message) });
      })
      .catch((e) => {
        res.status(500).json({ status: false, error: errors.SERVER_ERROR });
      });
  },
};

adminController.resource = {
  count: async (req, res) => {
    AdminControl.resource
      .count(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);
        let d = {
          status: resp.status,
          data: data,
        };
        res.status(resp.statusCode).json(d);
      })
      .catch((e) => {
        res.status(404).json({ status: false, error: e });
      })
      .catch((e) => {
        res.status(500).json({ status: false, error: errors.SERVER_ERROR });
      });
  },
  status: async (req, res) => {
    AdminControl.resource
      .status(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);
        let d = {
          status: resp.status,
          data: data,
        };
        res.status(resp.statusCode).json(d);
      })
      .catch((e) => {
        res
          .status(404)
          .json({ status: false, error: e.errors.map((v) => v.message) });
      })
      .catch((e) => {
        res.status(500).json({ status: false, error: errors.SERVER_ERROR });
      });
  },
  update_status: async (req, res) => {
    AdminControl.resource
      .update_status(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);
        let d = {
          status: resp.status,
          data: data,
        };
        res.status(resp.statusCode).json(d);
      })
      .catch((e) => {
        console.log(e);
        res
          .status(404)
          .json({ status: false, error: e.errors.map((v) => v.message) });
      })
      .catch((e) => {
        console.log(e);
        res.status(500).json({ status: false, error: errors.SERVER_ERROR });
      });
  },
};

adminController.animal = {
  add: async (req, res) => {
    AdminControl.animal
      .add(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);
        let d = {
          status: resp.status,
          data: data,
        };
        res.status(resp.statusCode).json(d);
      })
      .catch((e) => {
        res.status(404).json({
          status: false,
          error: e.errors.map((v) => v.message),
        });
      })
      .catch((e) => {
        res.status(500).json({ status: false, error: errors.SERVER_ERROR });
      });
  },
  breedAdd: async (req, res) => {
    AdminControl.animal
      .breedAdd(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);
        let d = {
          status: resp.status,
          data: data,
        };
        res.status(resp.statusCode).json(d);
      })
      .catch((e) => {
        console.log(e);
        res.status(404).json({
          status: false,
          error: e.errors.map((v) => v.message),
        });
      })
      .catch((e) => {
        console.log(e);
        res.status(500).json({ status: false, error: errors.SERVER_ERROR });
      });
  },
  view: async (req, res) => {
    AdminControl.animal
      .view(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);
        let d = {
          status: resp.status,
          data: data,
        };
        res.status(resp.statusCode).json(d);
      })
      .catch((e) => {
        console.log(e);
        res.status(404).json({
          status: false,
          error: e.errors.map((v) => v.message),
        });
      })
      .catch((e) => {
        console.log(e);
        res.status(500).json({ status: false, error: errors.SERVER_ERROR });
      });
  },
  delete: async (req, res) => {
    AdminControl.animal
      .delete(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);
        let d = {
          status: resp.status,
          data: data,
        };
        res.status(resp.statusCode).json(d);
      })
      .catch((e) => {
        res
          .status(404)
          .json({ status: false, error: e.errors.map((v) => v.message) });
      })
      .catch((e) => {
        res.status(500).json({ status: false, error: errors.SERVER_ERROR });
      });
  },
  deleteBreed: async (req, res) => {
    AdminControl.animal
      .deleteBreed(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);
        let d = {
          status: resp.status,
          data: data,
        };
        res.status(resp.statusCode).json(d);
      })
      .catch((e) => {
        res
          .status(404)
          .json({ status: false, error: e.errors.map((v) => v.message) });
      })
      .catch((e) => {
        res.status(500).json({ status: false, error: errors.SERVER_ERROR });
      });
  },
  breedList: async (req, res) => {
    AdminControl.animal
      .breedList(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);
        let d = {
          status: resp.status,
          data: data,
        };
        res.status(resp.statusCode).json(d);
      })
      .catch((e) => {
        console.log(e);
        res
          .status(404)
          .json({ status: false, error: e.errors.map((v) => v.message) });
      })
      .catch((e) => {
        res.status(500).json({ status: false, error: errors.SERVER_ERROR });
      });
  },
};

adminController.whatsapp = {
  add: async (req, res) => {
    AdminControl.whatsapp
      .add(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);
        let d = {
          status: resp.status,
          message: resp.status ? 'success' : data,
          data: resp.status ? data : {},
        };
        res.json(d);
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
        Utilities.internalError(e)
      });
  },
  list: async (req, res) => {
    AdminControl.whatsapp
      .list(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);
        let d = {
          status: resp.status,
          message: resp.status ? 'success' : data,
          data: resp.status ? data : [],
        };
        res.json(d);
      })
      .catch((e) => {
        console.log(e)
        logger.error(JSON.stringify(e))
        res.status(400).json({
          status: false,
          message: e.errors.map((v) => {
            return { error: v.message }
          }),
        });
      })
      .catch((e) => {
        Utilities.internalError(e)
      });
  },
  update: async (req, res) => {
    AdminControl.whatsapp
      .update(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);
        let d = {
          status: resp.status,
          message: resp.status ? 'success' : data,
          data: resp.status ? data : {},
        };
        res.json(d);
      })
      .catch((e) => {
        console.log(e)
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
};

adminController.feedformulation = {
  add: async (req, res) => {
    AdminControl.feedformulation
      .add(req)
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
        logger.error(JSON.stringify(e));
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
  list: async (req, res) => {
    AdminControl.feedformulation
      .list(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);
        let d = {
          status: resp.status,
          message: resp.status ? "Success" : [data],
          data: resp.status ? data : [],
        };
        res.json(d);
      })
      .catch((e) => {
        logger.error(JSON.stringify(e))
        console.log(e);
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
  delete: async (req, res) => {
    AdminControl.feedformulation
      .delete(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);
        let d = {
          status: resp.status,
          message: resp.status ? 'success' : data,
          data: resp.status ? data : {},
        };
        res.json(d);
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
  poultryAdd: async (req, res) => {
    AdminControl.feedformulation
      .poultryAdd(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);

        res.json({
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
  poultryDelete: async (req, res) => {
    AdminControl.feedformulation
      .poultryDelete(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);

        res.json({
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
  poultryList: async (req, res) => {
    AdminControl.feedformulation
      .poultryList(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);

        res.json({
          status: resp.status,
          message: resp.status ? 'success' : data,
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
        Utilities.internalError(res)
      });
  }
};

adminController.dose = {
  add: async (req, res) => {
    AdminControl.dose
      .add(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);
        let d = {
          status: resp.status,
          message: resp.status ? "Success" : data,
          data: resp.status ? data : {},
        };
        res.json(d);
      })
      .catch((e) => {
        console.log(e)
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
  list: async (req, res) => {
    AdminControl.dose
      .list(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);

        var d = {
          status: resp.status,
          message: resp.status ? "Success" : data,
          data: resp.status ? data : [],
        };

        res.json(d);
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
  remove: async (req, res) => {
    AdminControl.dose
      .remove(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);
        let d = {
          status: resp.status,
          message: resp.status ? "Success" : data,
          data: resp.status ? data : {},
        };
        res.json(d);
      })
      .catch((e) => {
        console.log(e)
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
};

adminController.availability = {
  add: async (req, res) => {
    AdminControl.availability
      .add(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);
        let d = {
          status: resp.status,
          message: resp.status ? 'success' : data,
          data: resp.status ? data : {},
        };
        res.json(d);
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
  list: async (req, res) => {
    AdminControl.availability
      .list(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);

        var d = {
          status: resp.status,
          message: resp.status ? 'success' : data,
          data: resp.status ? data : [],
        };

        res.json(d);
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
  remove: async (req, res) => {
    AdminControl.availability
      .remove(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);
        let d = {
          status: resp.status,
          message: resp.status ? 'success' : data,
          data: resp.status ? data : {},
        };
        res.json(d);
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
};

adminController.drugindex = {
  add: async (req, res) => {
    AdminControl.drugindex
      .add(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);
        var d = {
          status: resp.status,
          message: resp.status ? 'success' : data,
          data: resp.status ? data : {},
        };
        res.json(d);
      })
      .catch((e) => {
        console.log(e);
        logger.error(JSON.stringify(e))
        res.status(400).json({
          status: false,
          error: e.errors.map((v) => {
            return { error: v.message }
          }),
        });
      })
      .catch((e) => {
        Utilities.internalError(res)
      });
  },
  list: async (req, res) => {
    AdminControl.drugindex
      .list(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);

        res.json({
          status: resp.status,
          message: resp.status ? 'success' : data,
          data: resp.status ? data : [],
        });
      })
      .catch((e) => {
        console.log(e);
        logger.error(JSON.stringify(e))
        res.status(400).json({
          status: false,
          error: e.errors.map((v) => {
            return { error: v.message }
          }),
        });
      })
      .catch((e) => {
        Utilities.internalError(res)
      });
  },
  remove: async (req, res) => {
    AdminControl.drugindex
      .remove(req)
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
        logger.error(JSON.stringify(e));
        res.status(400).json({
          status: false,
          error: e.errors.map((v) => {
            return { error: v.message }
          }),
        });
      })
      .catch((e) => {
        Utilities.internalError(res)
      });
  },
};

adminController.ruminant = {
  add: async (req, res) => {
    AdminControl.ruminant
      .add(req)
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
  list: async (req, res) => {
    AdminControl.ruminant
      .list(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);

        res.json({
          status: resp.status,
          message: resp.status ? 'success' : data,
          data: resp.status ? data : [],
        });
      })
      .catch((e) => {
        console.log(e);
        logger.error(JSON.stringify(e))
        res.status(400).json({
          status: false,
          error: e.errors.map((v) => {
            return { error: v.message }
          }),
        });
      })
      .catch((e) => {
        Utilities.internalError(res)
      });
  },
  delete: async (req, res) => {
    AdminControl.ruminant
      .delete(req)
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
          status: false,
          message: e.errors.map((v) => {
            return { error: v.message }
          }),
        });
      })
      .catch((e) => {
        Utilities.internalError(res)
      });
  }
}

export { adminController };
