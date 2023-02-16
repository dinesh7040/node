import { customerController } from "../../../App/controller/customerController.js";
import { DBController } from "../../database/DbController.js";
import { env } from "../../lib/env.js";
import { Utilities } from "../../utils/function.js";

export class customerControl { }

customerControl.auth = {
  signup: async ({ body }) => {
    return await DBController.customer.signup(body);
  },
  login: async ({ body }) => {
    return await DBController.customer.login(body);
  },
  verify: async ({ body }) => {
    return await DBController.customer.verify(body);
  },
  sendOtp: async ({ body }) => {
    return await DBController.customer.sendOtp(body)
  }
};

customerControl.news = {
  list: async ({ body }) => {
    return await DBController.news.doc_list();
  },
  search: async ({ body }) => {
    return await DBController.news.doc_search(body);
  },
  desc: async ({ body }) => {
    return await DBController.news.doc_news_desc(body);
  },
  recent: async ({ body }) => {
    return await DBController.news.doc_recent(body);
  }
};

customerControl.find_nearby = {
  doctor: async ({ body }) => {
    return await DBController.find_nearby.doctors(body);
  },
  doctor_details: async ({ body }) => {
    return await DBController.find_nearby.doctors_detail(body);
  },
  resources: async ({ body }) => {
    return await DBController.find_nearby.resources(body);
  },
  resources_details: async ({ body }) => {
    return await DBController.find_nearby.resources_details(body);
  },
};
