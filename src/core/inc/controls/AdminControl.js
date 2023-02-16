import { DBController } from "../../database/DbController.js";

export class AdminControl { }

AdminControl.auth = {
  login: async ({ body }) => {
    return await DBController.admin.login(body);
  },
  signup: async ({ body }) => {
    return await DBController.admin.signup(body);
  },
  profile: async ({ body, token }) => {
    return await DBController.admin.profile(token);
  },
};

AdminControl.designation = {
  add: async ({ body, token }) => {
    return await DBController.designation.add(body, token);
  },
  list: async ({ body, token }) => {
    return await DBController.designation.list(body, token);
  },
  delete: async ({ body, token }) => {
    return await DBController.designation.delete(body, token);
  },
};

AdminControl.doctor = {
  // instant approval list
  list: async ({ body, token }) => {
    return await DBController.doctor.list(body, token);
  },
  // doctor list
  doctor_list: async ({ body, token }) => {
    return await DBController.doctor.doctor_list(body, token);
  },
  // doctor pending list
  doctor_pending_list: async ({ body, token }) => {
    return await DBController.doctor.doctor_pending_list(body, token);
  },
  // doctor rejected list
  doctor_rejected_list: async ({ body, token }) => {
    return await DBController.doctor.doctor_rejected_list(body, token);
  },
  // doctor count
  doctor_count: async ({ body, token }) => {
    return await DBController.doctor.doctor_count(body, token);
  },
  // update doctor status
  update_status: async ({ body, token }) => {
    return await DBController.doctor.update_status(body, token);
  },
  // update instant approval status
  update_ins: async ({ body, token }) => {
    return await DBController.doctor.update_ins(body, token);
  },
  // edit profile query
  edit_profile_query: async ({ body, token }) => {
    return await DBController.doctor.get_query(body, token);
  }
};

AdminControl.user = {
  count: async ({ body, token }) => {
    return await DBController.user.count(body, token);
  },
};

AdminControl.district = {
  add: async ({ body, token }) => {
    return await DBController.district.add(body, token);
  },
  list: async ({ body, token }) => {
    return await DBController.district.list(body, token);
  },
  delete: async ({ body, token }) => {
    return await DBController.district.delete(body, token);
  },
};

AdminControl.news = {
  add: async ({ body, file, token }) => {
    body.photo = file.path;
    return await DBController.news.add(body, token);
  },
  list: async ({ body, token }) => {
    return await DBController.news.list(body, token);
  },
  delete: async ({ body, token }) => {
    return await DBController.news.delete(body, token);
  },
  update: async ({ body, file, token }) => {
    body.photo = file.path;
    return await DBController.news.update(body, token);
  },
};

AdminControl.resource = {
  count: async ({ body, token }) => {
    return await DBController.resource.count(body, token);
  },
  status: async ({ body, token }) => {
    return await DBController.resource.status(body, token);
  },
  update_status: async ({ body, token }) => {
    return await DBController.resource.update(body, token);
  },
};

AdminControl.animal = {
  add: async ({ body, token }) => {
    return await DBController.animal.add(body, token);
  },
  breedAdd: async ({ body, token }) => {
    return await DBController.animal.breedAdd(body, token);
  },
  view: async ({ body, token }) => {
    return await DBController.animal.view(body, token);
  },
  delete: async ({ body, token }) => {
    return await DBController.animal.delete(body, token);
  },
  deleteBreed: async ({ body, token }) => {
    return await DBController.animal.deleteBreed(body, token);
  },
  breedList: async ({ body, token }) => {
    return await DBController.animal.breedList(body, token);
  },
};

AdminControl.whatsapp = {
  add: async ({ body, token }) => {
    return await DBController.whatsapp.add(body, token);
  },
  list: async ({ body, token }) => {
    return await DBController.whatsapp.list(body, token);
  },
  update: async ({ body, token }) => {
    return await DBController.whatsapp.update(body, token);
  },
};

AdminControl.feedformulation = {
  add: async ({ body, token }) => {
    return await DBController.feedformulation.add(body, token);
  },
  list: async ({ body, token }) => {
    return await DBController.feedformulation.list(body, token);
  },
  delete: async ({ body, token }) => {
    return await DBController.feedformulation.delete(body, token);
  },
  poultryAdd: async ({ body, token }) => {
    return await DBController.feedformulation.poultryAdd(body, token);
  },
  poultryDelete: async ({ body, token }) => {
    return await DBController.feedformulation.poultryDelete(body, token);
  },
  poultryList: async ({ body, token }) => {
    return await DBController.feedformulation.poultryList(body, token);
  }
};

AdminControl.dose = {
  add: async ({ body, token }) => {
    console.log(body);
    return await DBController.dose.add(body, token);
  },
  list: async ({ body, token }) => {
    return await DBController.dose.list(body, token);
  },
  remove: async ({ body, token }) => {
    return await DBController.dose.remove(body, token);
  },
};

AdminControl.availability = {
  add: async ({ body, token }) => {
    return await DBController.availability.add(body, token);
  },
  list: async ({ body, token }) => {
    return await DBController.availability.list(body, token);
  },
  remove: async ({ body, token }) => {
    return await DBController.availability.remove(body, token);
  },
};

AdminControl.drugindex = {
  add: async ({ body, token }) => {
    return await DBController.drugindex.add(body, token);
  },
  list: async ({ body, token }) => {
    return await DBController.drugindex.list(body, token);
  },
  remove: async ({ body, token }) => {
    return await DBController.drugindex.remove(body, token);
  },
};

AdminControl.ruminant = {
  add: async ({ body, token }) => {
    return await DBController.ruminant.add(body, token);
  },
  list: async ({ body, token }) => {
    return await DBController.ruminant.list(body, token);
  },
  delete: async ({ body, token }) => {
    return await DBController.ruminant.delete(body, token);
  }
}