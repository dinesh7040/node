import { doctorControl } from "../../core/inc/controls/doctorControl.js";
import { errors } from "../../core/lib/string.js";
import { Utilities } from "../../core/utils/function.js";
import { logger } from "../../core/utils/logger.js";

export class doctorController { }

doctorController.auth = {

  signup: async (req, res) => {
    doctorControl.auth
      .signup(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);
        res.status(resp.statusCode).json({
          status: resp.status,
          data: data,
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
  sendOtp: async (req, res) => {
    doctorControl.auth
      .sendOtp(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);
        res.status(resp.statusCode).json({
          status: resp.status,
          data: data,
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
  login: async (req, res) => {
    doctorControl.auth
      .login(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);
        res.json({
          status: resp.status,
          message: resp.status ? "successful" : data,
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
        Utilities.internalError(res);
      });
  },
  instant_approval: async (req, res) => {
    doctorControl.auth
      .instant_approval(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);
        res.status(resp.statusCode).json({
          status: resp.status,
          data: data,
        });
      })
      .catch((e) => {
        console.log(e);
        logger.error(JSON.stringify(e))
        res.status(404).json({
          status: false,
          message: e.errors.map((v) => v.message),
        });
      })
      .catch((e) => {
        Utilities.internalError(res);
      });
  },
  check_phone: async (req, res) => {
    doctorControl.auth.check_phone(req).then(data => {
      var resp = Utilities.validateResponse(data)

      res.json({
        status: resp.status,
        data: data
      })

    })
      .catch(e => {
        res.status(400).json({
          status: false,
          error: e.errors.map((v) => {
            return { message: v.message }
          })
        })
      })
      .catch(e => {
        Utilities.internalError(res);
      })
  }
};

doctorController.animal = {
  list: (req, res) => {
    doctorControl.animal
      .list(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);

        res.json({
          status: resp.status,
          message: resp.status ? "success" : [data],
          data: resp.status ? data : [],
        });

      })
      .catch((e) => {
        logger.error(JSON.stringify(e))
        console.log(e);
        res.status(400).json({
          status: false,
          message: e.errors.map((v) => {
            return { error: v.message }
          }),
          data: [],
        });
      })
      .catch((e) => {
        Utilities.internalError(res);
      });
  },
  matchfind_list: (req, res) => {
    doctorControl.animal
      .matchfind_list(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);

        res.json({
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
          data: [],
        });
      })
      .catch((e) => {
        Utilities.internalError(res);
      });
  }
};

doctorController.district = {
  list: async (req, res) => {
    doctorControl.district
      .list(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);

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
          status: false, error: e.errors.map(v => {
            return { error: v.message }
          })
        });
      })
      .catch((e) => {
        Utilities.internalError(res)
      });
  },
  district: async (req, res) => {
    doctorControl.district
      .district(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);
        res.json({
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
          message: e.errors.map(v => {
            return { error: v.message };
          })
        });
      })
      .catch((e) => {
        Utilities.internalError(res);
      });

  }
};

doctorController.news = {
  list: async (req, res) => {
    doctorControl.news
      .list(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);
        res.json({
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
          message: e.errors.map(v => {
            return { error: v.message }
          })
        });
      })
      .catch((e) => {
        Utilities.internalError(res)
      });
  },
  desc: async (req, res) => {
    doctorControl.news
      .desc(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);
        res.json({
          status: resp.status,
          message: resp.status ? "success" : [data],
          data: resp.status ? data : {},
        });
      })
      .catch((e) => {
        console.log(e);
        logger.error(JSON.stringify(e))
        res.status(400).json({
          status: false, error: e.errors.map((v) => {
            return { error: v.message }
          })
        });
      })
      .catch((e) => {
        Utilities.internalError(res)
      });
  },
  search: async (req, res) => {
    doctorControl.news
      .search(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);
        res.json({
          status: resp.status,
          message: resp.status ? "success" : [data],
          data: resp.status ? data : [],
        });
      })
      .catch((e) => {
        logger.error(JSON.stringify(e))
        console.log(e);
        res.status(400).json({
          status: false,
          error: e.errors.map(v => {
            return { error: v.message }
          })
        });
      })
      .catch((e) => {
        Utilities.internalError(res)
      });
  },
};

doctorController.find_nearby = {
  doctors: async (req, res) => {
    doctorControl.find_nearby
      .doctors(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);
        res.json({
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
          message: e.errors.map(v => {
            return { error: v.message }
          })
        });
      })
      .catch((e) => {
        console.log(e);
        Utilities.internalError(res)
      });
  },
  doctor_details: async (req, res) => {
    doctorControl.find_nearby
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
  }
};

doctorController.matchfind = {
  add: async (req, res) => {
    doctorControl.matchfind
      .add(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);
        res.json({
          status: resp.status,
          message: resp.status ? "success" : [data],
          data: resp.status ? data : {},
        });
      })
      .catch((e) => {
        console.log(e);
        logger.error(JSON.stringify(e))
        res.status(400).json({
          status: false,
          message: e.errors.map((v) => {
            return { errror: v.message }
          })
        });
      })
      .catch((e) => {
        console.log(e);
        Utilities.internalError(res)
      });
  },
  list: async (req, res) => {
    doctorControl.matchfind
      .list(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);
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
          message: e.errors.map(v => {
            return { error: v.message }
          })
        });
      })
      .catch((e) => {
        Utilities.internalError(res)
      });
  },
  detail: async (req, res) => {
    doctorControl.matchfind
      .detail(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);
        res.status(resp.statusCode).json({
          status: resp.status,
          data: data,
        });
      })
      .catch((e) => {
        console.log(e);
        logger.error(JSON.stringify(e))
        res.status(400).json({
          status: false,
          message: e.errors.map(v => {
            return { error: v.message }
          })
        });
      })
      .catch((e) => {
        Utilities.internalError(res)
      });
  },
  verify: async (req, res) => {
    doctorControl.matchfind
      .verify(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);
        res.json({
          status: resp.status,
          message: resp.status ? "success" : [data],
          data: resp.status ? data : {},
        });
      })
      .catch((e) => {
        console.log(e);
        logger.error(JSON.stringify(e))
        res.status(400).json({
          status: false,
          message: e.errors.map(v => {
            return { error: v.message }
          })
        });
      }).catch((e) => Utilities.internalError(res));

  },
  payment_verify: async (req, res) => {
    doctorControl.matchfind
      .payment_verify(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);
        res.json({
          status: resp.status,
          message: resp.status ? "success" : [data],
          data: resp.status ? data : {},
        });
      })
      .catch((e) => {
        console.log(e);
        logger.error(JSON.stringify(e))
        res.status(400).json({
          status: false,
          message: e.errors.map(v => {
            return { error: v.message }
          })
        });
      }).catch((e) => Utilities.internalError(res));

  }
};

doctorController.buysell = {
  sell: async (req, res) => {
    doctorControl.buysell
      .sell(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);
        res.json({
          status: resp.status,
          message: resp.status ? "success" : [data],
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
          })
        });
      })
      .catch((e) => {
        console.log(e);
        Utilities.internalError(res)
      });
  },
  list: async (req, res) => {
    doctorControl.buysell
      .list(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);
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
          message: e.errors.map(v => {
            return { error: v.message }
          })
        });
      })
      .catch((e) => {
        console.log(e);
        Utilities.internalError(res)
      });
  },
  detail: async (req, res) => {
    doctorControl.buysell
      .detail(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);
        res.json({
          status: resp.status,
          message: resp.status ? "success" : [data],
          data: resp.status ? data : {},
        });
      })
      .catch((e) => {
        console.log(e);
        logger.error(JSON.stringify(e))
        res.status(400).json({
          status: false,
          message: e.errors.map(v => {
            return { error: v.message }
          }),
        });
      })
      .catch((e) => {
        console.log(e);
        Utilities.internalError(res)
      });
  },
  verify: async (req, res) => {
    doctorControl.buysell.verify(req).then((data) => {
      var resp = Utilities.validateResponse(data);
      res.json({
        status: resp.status,
        message: resp.status ? "success" : [data],
        data: resp.status ? data : {},
      });

    })
      .catch(e => {
        logger.error(JSON.stringify(e))
        console.log(e);
        res.status(400).json({
          status: false,
          message: e.errors.map(v => {
            return { error: v.message }
          })
        })
      })
      .catch(e => Utilities.internalError(res))
  },
  payment_verify: async (req, res) => {
    doctorControl.buysell.payment_verify(req).then((data) => {
      var resp = Utilities.validateResponse(data);
      res.json({
        status: resp.status,
        message: resp.status ? "success" : [data],
        data: resp.status ? data : {},
      });

    })
      .catch(e => {
        console.log(e);
        logger.error(JSON.stringify(e))
        res.status(400).json({
          status: false,
          message: e.errors.map(v => {
            return { error: v.message }
          })
        })
      })
      .catch(e => Utilities.internalError(res))
  }
};

doctorController.adoption = {
  add: async (req, res) => {
    doctorControl.adoption
      .add(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);
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
            status: false,
            message: e.errors.map((v) => {
              return { error: v.message }
            })
          });
      })
      .catch((e) => Utilities.internalError(res));
  },
  list: async (req, res) => {
    doctorControl.adoption
      .list(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);
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
          message: e.errors.map(v => {
            return { error: v.message }
          })
        });
      })
      .catch((e) => Utilities.internalError(res));
  },
  detail: async (req, res) => {
    doctorControl.adoption
      .detail(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);
        res.json({
          status: resp.status,
          message: resp.status ? "success" : [data],
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
          })
        });
      })
      .catch((e) => Utilities.internalError(res));
  },
  verify: async (req, res) => {
    doctorControl.adoption.verify(req).then((data) => {
      var resp = Utilities.validateResponse(data);
      res.json({
        status: resp.status,
        message: resp.status ? "success" : data,
        data: resp.status ? data : {},
      });

    }).catch(e => {
      console.log(e);
      logger.error(JSON.stringify(e))
      res.status(400).json({
        status: false,
        message: e.errors.map(v => {
          return { error: v.message }
        })
      })
    }).catch(e => Utilities.internalError(res))
  }
};

doctorController.profile = {
  profile: async (req, res) => {
    console.log(req.headers.token);
    doctorControl.profile
      .profile(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);
        res.json({
          status: resp.status,
          message: resp.status ? "success" : [data],
          data: resp.status ? data : {},
        });
      })
      .catch((e) => {
        console.log(e);
        logger.error(JSON.stringify(e));
        req.status(400).json({
          status: false,
          message: e.errors.map((v) => {
            return { error: v.message }
          }),
        });
      })
      .catch((e) => Utilities.internalError(res));
  },
  rise_query: async (req, res) => {
    doctorControl.profile
      .rise_query(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);
        res.json({
          status: resp.status,
          message: resp.status ? "success" : [data],
          data: resp.status ? data : {},
        });
      })
      .catch((e) => {
        console.log(e);
        logger.error(JSON.stringify(e));
        req.status(400).json({
          status: false,
          message: e.errors.map((v) => {
            return { error: v.message }
          }),
        });
      }).catch((e) => Utilities.internalError(res))
  }
};

doctorController.uploads = {
  upload: async (req, res) => {
    doctorControl.upload
      .upload(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data);
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
          data: []
        });
      })
      .catch((e) => Utilities.internalError(res));
  },
};

doctorController.designation = {
  list: (req, res) => {
    doctorControl.designation
      .list(req)
      .then((data) => {
        let resp = Utilities.validateResponse(data);

        res.json({
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
      .catch((e) => Utilities.internalError(res));
  },
};

doctorController.rating = {
  addRating: (req, res) => {
    doctorControl.rating
      .addRating(req)
      .then((data) => {
        var resp = Utilities.validateResponse(data)
        res.json({
          status: resp.status,
          message: resp.status ? "success" : [data],
          data: resp.status ? data : {}
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
      .catch(e => {
        Utilities.internalError(res)
      })
  }
}

doctorController.forum = {
  list: (req, res) => {
    doctorControl.forum
      .list(req)
      .then((data) => {
        let resp = Utilities.validateResponse(data);

        res.json({
          status: resp.status,
          message: resp.status ? "success" : data,
          data: resp.status ? data : [],
        });
      })
      .catch((e) => {
        res.status(400).json({
          status: false,
          message: e.errors.map((v) => {
            return { error: v.message }
          }),
          data: []
        });
      })
      .catch((e) => Utilities.internalError(res));
  },
  askQuestion: (req, res) => {
    doctorControl.forum
      .askQuestion(req)
      .then((data) => {
        let resp = Utilities.validateResponse(data);

        res.json({
          status: resp.status,
          message: resp.status ? "success" : [data],
          data: resp.status ? data : [],
        });
      })
      .catch((e) => {
        res.status(400).json({
          status: false,
          message: e.errors.map((v) => {
            return { error: v.message }
          }),
        });
      })
      .catch((e) => Utilities.internalError(res));
  },
  replyToQuestion: (req, res) => {
    doctorControl.forum.reply(req).then(data => {
      var resp = Utilities.validateResponse(data);

      res.json({
        status: resp.status,
        message: resp.status ? "success" : [data],
        data: resp.status ? data : [],
      });

    })
      .catch(e => {

        if (e == errors.INVALID_CHAT_ID) {
          res.status(400).json({
            status: false,
            message: [{ error: e }]
          })
        }
        else {
          res.status(400).json({
            status: false,
            message: e.errors.map((v) => {
              return { error: v.message }
            })
          })
        }


      })
      .catch(e => Utilities.internalError(res))
  },
  chat: (req, res) => {
    doctorControl.forum.chat(req).then(data => {
      var resp = Utilities.validateResponse(data);

      res.json({
        status: resp.status,
        message: resp.status ? "success" : [data],
        data: resp.status ? data : [],
      });

    })
      .catch(e => {
        console.log(e);
        res.status(400).json({
          status: false,
          message: e.errors.map((v) => {
            return { error: v.message }
          })
        })
      })
      .catch(e => Utilities.internalError(res))
  }
}

doctorController.whatsapp = {
  group: (req, res) => {
    doctorControl.whatsapp.group(req).then(data => {

      var validate = Utilities.validateResponse(data)

      res.json({
        status: validate.status,
        message: validate.status ? "success" : data,
        link: validate.status ? data : "",
      })

    }).catch(e => {
      console.log(e);
      logger.error(JSON.stringify(e));
      res.status(400).json({
        status: false,
        message: e.errors.map((v) => {
          return { error: v.message }
        })
      })
    }).catch(e => Utilities.internalError(res))
  }
}

doctorController.poultry = {
  list: (req, res) => {
    doctorControl.poultry.list(req).then(data => {

      var validate = Utilities.validateResponse(data)

      res.json({
        status: validate.status,
        message: validate.status ? "success" : [data],
        data: validate.status ? data : [],
      })

    }).catch(e => {
      console.log(e);
      logger.error(JSON.stringify(e))
      res.status(400).json({
        status: false,
        message: e.errors.map((v) => {
          return { error: v.message }
        })
      })
    }).catch(e => Utilities.internalError(res))
  },
  feed_formulation: (req, res) => {
    doctorControl.poultry.feed_formulation(req).then(data => {

      var validate = Utilities.validateResponse(data)

      res.json({
        status: validate.status,
        message: validate.status ? "success" : [data],
        data: validate.status ? data : [],
      })

    }).catch(e => {
      logger.error(JSON.stringify(e))
      console.log(e);
      res.status(400).json({
        status: false,
        message: e.errors.map((v) => {
          return { error: v.message }
        })
      })
    }).catch(e => Utilities.internalError(res))
  }
}

doctorController.ruminant = {
  energy: (req, res) => {
    doctorControl.ruminant.energy_list(req).then(data => {

      var validate = Utilities.validateResponse(data)

      res.json({
        status: validate.status,
        message: validate.status ? "success" : data,
        data: validate.status ? data : [],
      })

    }).catch(e => {
      logger.error(JSON.stringify(e))
      console.log(e);
      res.status(400).json({
        status: false,
        message: e.errors.map((v) => {
          return { error: v.message }
        })
      })
    }).catch(e => Utilities.internalError(res))
  },
  protein: (req, res) => {
    doctorControl.ruminant.protein_list(req).then(data => {

      var validate = Utilities.validateResponse(data)

      res.json({
        status: validate.status,
        message: validate.status ? "success" : [data],
        data: validate.status ? data : [],
      })

    }).catch(e => {
      logger.error(JSON.stringify(e))
      console.log(e);
      res.status(400).json({
        status: false,
        message: e.errors.map((v) => {
          return { error: v.message }
        })
      })
    }).catch(e => Utilities.internalError(res))
  },
  product: (req, res) => {
    doctorControl.ruminant.product_list(req).then(data => {

      var validate = Utilities.validateResponse(data)

      res.json({
        status: validate.status,
        message: validate.status ? "success" : [data],
        data: validate.status ? data : [],
      })

    }).catch(e => {
      logger.error(JSON.stringify(e))
      console.log(e);
      res.status(400).json({
        status: false,
        message: e.errors.map((v) => {
          return { error: v.message }
        })
      })
    }).catch(e => Utilities.internalError(res))
  }
}

doctorController.drugindex = {
  drug: (req, res) => {
    doctorControl.drugindex.drug(req).then(data => {
      var resp = Utilities.validateResponse(data)

      res.json({
        status: false,
        message: resp.status ? "success" : data,
        data: resp.status ? data : []
      })

    })
      .catch(e => {
        res.status(400).json({
          status: false,
          message: e.errors.map((v) => {
            return { error: v.message }
          }),
          data: []
        })
      })
      .catch(e => Utilities.internalError(res))
  }
}