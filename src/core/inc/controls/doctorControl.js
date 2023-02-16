import { doctorController } from "../../../App/controller/doctorController.js";
import { DBController } from "../../database/DbController.js";
import { env } from "../../lib/env.js";
import { Utilities } from "../../utils/function.js";

export class doctorControl { }

doctorControl.auth = {
  signup: async ({ body, files }) => {
    if (Utilities.isNotNull(files)) {
      if (
        Utilities.isNotNull(files.photo) &&
        Utilities.isNotNull(files.signature)
      ) {
        body.photo = env.BASE_URL + "/doctor/" + files.photo[0].filename;
        body.signature =
          env.BASE_URL + "/doctor/" + files.signature[0].filename;
      }
    }

    return await DBController.doctor.signup(body);
  },
  sendOtp: async ({ body }) => {
    return await DBController.doctor.sendOtp(body);
  },
  login: async ({ body }) => {
    return await DBController.doctor.login(body);
  },
  instant_approval: async ({ body, token }) => {
    return await DBController.doctor.instant_approval(body, token);
  },
  check_phone: async ({ body }) => {
    return await DBController.doctor.check_phone(body);
  }
};

doctorControl.district = {
  list: async ({ body, token }) => {
    return await DBController.district.doc_list(body, token);
  },
  district: async ({ body, token }) => {
    return await DBController.district.doc_district(body, token);
  }
};

doctorControl.news = {
  list: async ({ body, token }) => {
    return await DBController.news.doc_list(body, token);
  },
  desc: async ({ body, token }) => {
    return await DBController.news.doc_news_desc(body, token);
  },
  search: async ({ body, token }) => {
    return await DBController.news.doc_search(body, token);
  },
};

doctorControl.find_nearby = {
  doctors: async ({ body, token }) => {
    return await DBController.find_nearby.doctors(body, token);
  },
  doctor_details: async ({ body, token }) => {
    return await DBController.find_nearby.doctors_detail(body);
  }
};

doctorControl.buysell = {
  sell: async ({ body, files, token }) => {
    body.photo = Utilities.isNotNull(files) ? files.map((v) => v.path) : [];
    return await DBController.buysell.sell(body, token);
  },
  list: async ({ body, token }) => {
    return await DBController.buysell.list(body, token);
  },
  detail: async ({ body, token }) => {
    return await DBController.buysell.detail(body, token);
  },
  verify: async ({ body, token }) => {
    return await DBController.buysell.sellVerify(body, token);
  },
  payment_verify: async ({ body, token }) => {
    return await DBController.buysell.payment_verify(body, token);
  }
};

doctorControl.adoption = {
  add: async ({ body, files, token }) => {
    console.log("files : " + files);
    body.photo = files.map((v) => v.path);
    return await DBController.adoption.add(body, token);
  },
  list: async ({ body, token }) => {
    return await DBController.adoption.list(body, token);
  },
  detail: async ({ body, token }) => {
    return await DBController.adoption.detail(body, token);
  },
  verify: async ({ body, token }) => {
    return await DBController.adoption.verify(body, token);
  }
};

doctorControl.matchfind = {
  add: async ({ body, files, token }) => {
    body.photo = Utilities.isNotNull(files) ? files.map((v) => v.path) : [];
    return await DBController.matchfind.add(body, token);
  },
  list: async ({ body, token }) => {
    return await DBController.matchfind.list(body, token);
  },
  detail: async ({ body, token }) => {
    return await DBController.matchfind.detail(body, token);
  },
  verify: async ({ body, token }) => {
    return await DBController.matchfind.verify(body, token);
  },
  payment_verify: async ({ body, token }) => {
    return await DBController.matchfind.payment_verify(body, token);
  }
};

doctorControl.profile = {
  profile: async ({ body, token }) => {
    return await DBController.doctor.profile(body, token);
  },
  rise_query: async ({ body, token }) => {
    return await DBController.doctor.rise_query(body, token);
  }
};

doctorControl.upload = {
  upload: async ({ body, token }) => {
    return await DBController.doctor.upload(body, token);
  },
};

doctorControl.designation = {
  list: async ({ body, token }) => {
    return await DBController.designation.dlist(body, token);
  },
};

doctorControl.animal = {
  list: async ({ body, token }) => {
    return await DBController.animal.view(body, token);
  },
  matchfind_list: async ({ body, token }) => {
    return await DBController.animal.matchfind_view(body, token);
  }
};

doctorControl.rating = {
  addRating: async ({ body, token }) => {
    return await DBController.rating.add(body, token);
  }
}

doctorControl.forum = {
  list: async ({ body, token }) => {
    return await DBController.forum.list(body, token);
  },
  askQuestion: async ({ body, token }) => {
    return await DBController.forum.askQuestion(body, token);
  },
  reply: async ({ body, token }) => {
    return await DBController.forum.reply(body, token);
  },
  chat: async ({ body, token }) => {
    return await DBController.forum.chat(body, token);
  }


}

doctorControl.whatsapp = {
  group: async ({ body, token }) => {
    return await DBController.whatsapp.group(body, token);
  }
}

doctorControl.poultry = {
  list: async ({ body, token }) => {
    return await DBController.poultry.list(body, token);
  },
  feed_formulation: async ({ body, token }) => {
    return await DBController.poultry.feed_formulation(body, token);
  }
}

doctorControl.ruminant = {
  energy_list: async ({ body, token }) => {
    return await DBController.ruminant.energy_list(body, token);
  },
  protein_list: async ({ body, token }) => {
    return await DBController.ruminant.protein_list(body, token);
  },
  product_list: async ({ body, token }) => {
    return await DBController.ruminant.product_list(body, token);
  }
}

doctorControl.drugindex = {
  drug: async ({ body, token }) => {
    return await DBController.drugindex.doclist(body, token);
  }
}