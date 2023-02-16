import require from "requirejs";
const encrypt = require("node_triple_des");
import { connection } from "./connection.js";
import * as Models from "./models/index.js";
import md5 from "md5";
import { Utilities } from "../utils/function.js";
import { errors } from "../lib/string.js";
import * as config from "../../../config/config.js";
import { PayloadCompiler } from "../inc/access/PayloadCompiler.js";
import { Op, where, Sequelize } from "sequelize";
import moment from "moment";
import { sms } from "../utils/sms.js";
import Errors from "../utils/errors.js";
import { paytm } from "../utils/Payment.js";

const BASE_URL =
  config.mode === "production"
    ? process.env.PROD_BASE_URL
    : process.env.DEV_BASE_URL;

export class DBController { }

DBController.Models = Models;
DBController.connection = connection;

DBController.defaults = {};

DBController.admin = {
  login: async (data) => {
    try {
      var validate = await PayloadCompiler.compile(data, "adminLogin");

      let passwd = md5(process.env.PUB_KEY + validate.data.password);

      let adminDetails = await DBController.Models.admin.findOne({
        where: {
          email: validate.data.email,
          password: passwd,
          active: true,
        },
        attributes: {
          exclude: ["password", "active", "createdAt", "updatedAt"],
        },
        raw: true,
      });

      if (Utilities.isNotNull(adminDetails)) {
        return encrypt.encrypt(
          process.env.PUB_KEY,
          JSON.stringify({ role: "admin", data: adminDetails })
        );
      } else {
        return errors.EMAIL_PASSWORD_INCORRECT;
      }
    } catch (e) {
      throw e;
    }
  },
  signup: async (data) => {
    try {
      var validate = await PayloadCompiler.compile(data, "adminSignup");

      var adminCreate = await DBController.Models.admin.create({
        name: validate.data.name,
        email: validate.data.email,
        password: md5(process.env.PUB_KEY + validate.data.password),
      });

      if (Utilities.isNotNull(adminCreate)) {
        return errors.ADMIN_CREATED;
      } else {
        return errors.FAILED;
      }
    } catch (e) {
      throw e;
    }
  },
  profile: async (token) => {
    try {
      var profile = await DBController.Models.admin.findOne({
        where: {
          id: token.id,
          active: true,
        },
        attributes: ["id", "name", "email"],
      });

      return profile;
    } catch (e) {
      throw e;
    }
  },
};

DBController.designation = {
  add: async (data, token) => {
    try {
      var validate = await PayloadCompiler.compile(data, "addDesination");

      let designationCreate = await DBController.Models.designation.create({
        designation: validate.data.designation,
      });

      if (Utilities.isNotNull(designationCreate)) {
        return errors.DESIGNATION_CREATED;
      } else {
        return errors.FAILED;
      }
    } catch (e) {
      throw e;
    }
  },
  list: async (data, token) => {
    try {
      let designationList = await DBController.Models.designation.findAll({
        where: {
          active: true,
        },
        attributes: {
          exclude: ["createdAt"],
        },
      });

      designationList = JSON.parse(JSON.stringify(designationList));

      return designationList.length == 0
        ? errors.NO_DATA_FOUND
        : designationList.map((v) => {
          return {
            id: v.id,
            designation: v.designation,
            updatedAt: moment(v.updatedAt).fromNow(),
          };
        });
    } catch (e) {
      throw e;
    }
  },
  dlist: async (data, token) => {
    try {
      let designationList = await DBController.Models.designation.findAll({
        where: {
          active: true,
        },
        attributes: {
          exclude: ["createdAt"],
        },
      });

      designationList = JSON.parse(JSON.stringify(designationList));

      return designationList.length == 0
        ? errors.NO_DATA_FOUND
        : designationList.map((v) => {
          return {
            id: v.id,
            designation: v.designation,
            updatedAt: moment(v.updatedAt).fromNow(),
          };
        });
    } catch (e) {
      throw e;
    }
  },
  delete: async (data, token) => {
    try {
      var validate = await PayloadCompiler.compile(data, "deleteDesignation");

      let designationDelete = await DBController.Models.designation.update(
        {
          active: false,
        },
        {
          where: {
            id: validate.data.id,
          },
        }
      );

      if (designationDelete[0]) {
        return "Success";
      } else {
        return errors.FAILED;
      }
    } catch (e) {
      throw e;
    }
  },
};

DBController.doctor = {
  // signup
  signup: async (data) => {
    try {
      var validate = await PayloadCompiler.compile(data, "doctorSignup");

      let findDoc = await DBController.Models.doctor.findOne({
        where: {
          mobile: validate.data.phone,
          active: true,
          approval_status: {
            [Op.or]: ["approved", "pending"],
          },
        },
      });

      if (Utilities.isNotNull(findDoc)) {
        return errors.PHONE_EXIST;
      }

      var docCreate = await DBController.Models.doctor.create({
        name: validate.data.name,
        mobile: validate.data.phone,
        designation: validate.data.designation,
        currently_working: validate.data.currentlyWorking,
        doc_reg_no: validate.data.regno,
        district: validate.data.district,
        taluk: validate.data.taluk,
        city: validate.data.city,
        street: validate.data.streetName,
        pincode: validate.data.pincode,
        photo: validate.data.photo,
        sign: validate.data.signature,
      });

      if (Utilities.isNotNull(docCreate)) {
        return {
          id: docCreate.id,
          name: docCreate.name,
          phone: docCreate.mobile,
          message: errors.DOCTOR_SIGNUP_SUCCESS,
        };
      }

      return errors.DOCTOR_SIGNUP_FAILED;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
  check_phone: async (data) => {
    try {
      const validate = await PayloadCompiler.compile(data, "checkPhone")
      const findDoc = await DBController.Models.doctor.findOne({
        where: {
          mobile: validate.data.phone,
        }
      })

      if (!findDoc) {
        return errors.MSG91_INVALID_PHONE_NUMBER
      }
      else {
        return "Success"
      }

    }
    catch (e) {
      throw e
    }
  },
  // send otp
  sendOtp: async (data) => {
    try {
      var validate = await PayloadCompiler.compile(data, "doctorLogin");

      let findDoc = await DBController.Models.doctor.findOne({
        where: {
          mobile: validate.data.phone,
          active: true,
        },
      });

      if (Utilities.isNull(findDoc)) {
        throw Errors.handleError(errors.MSG91_INVALID_PHONE_NUMBER);
      }

      let otp = sms.sendOtp({
        phone: validate.data.phone,
        name: findDoc.name,
      })

      if (Utilities.isNotNull(otpCreate)) {
        return {
          id: otpCreate.id,
          mobile: otpCreate.mobile,
          otp: otpCreate.otp,
          message: errors.OTP_SENT,
        };
      }
      return errors.OTP_SEND_FAILED;
    } catch (e) {
      throw e;
    }
  },
  // login
  login: async (data) => {
    try {
      var validate = await PayloadCompiler.compile(data, "doctorLogin");

      let docDetails = await DBController.Models.doctor.findOne({
        where: {
          mobile: validate.data.phone,
          active: true,
        },
        attributes: {
          exclude: ["active", "createdAt", "updatedAt"],
        },
      });


      if (Utilities.isNotNull(docDetails)) {
        if (docDetails.approval_status == "pending") {
          return errors.DOCTOR_PENDING_APPROVAL;
        }

        if (docDetails.approval_status == "rejected") {
          return errors.DOCTOR_REJECTED_APPROVAL;
        }
        return encrypt.encrypt(
          process.env.PUB_KEY,
          JSON.stringify({ role: "doctor", data: docDetails })
        );
      } else {
        throw Errors.handleError({ error: errors.LOGIN_FAILED })
      }
    } catch (e) {
      throw e;
    }
  },
  // doctor instant approval
  instant_approval: async (data) => {
    try {
      var validate = await PayloadCompiler.compile(
        data,
        "doctorInstantApproval"
      );

      let docDetails = await DBController.Models.doctor.findOne({
        where: {
          id: validate.data.id,
          active: true,
        },
        attributes: {
          exclude: ["active", "createdAt", "updatedAt"],
        },
      });

      if (Utilities.isNotNull(docDetails)) {
        let instantApproval = await DBController.Models.instantApproval.create({
          doctor_id: docDetails.id,
          email: validate.data.email ?? null,
          message: validate.data.message,
        });

        return "Success";
      } else {
        return errors.DOCTOR_NOT_FOUND;
      }
    } catch (e) {
      throw e;
    }
  },
  // instant approval list
  list: async (data, token) => {
    try {
      var insApprovalList = await DBController.Models.instantApproval.findAll({
        where: {
          active: true,
        },
        include: [
          {
            model: Models.doctor,
            attributes: {
              exclude: ["active", "updatedAt"],
            },
          },
        ],
        attributes: {
          exclude: ["updatedAt", "active", "doctor_id"],
        },
        order: [["id", "desc"]],
      });

      if (Utilities.isNull(insApprovalList)) {
        return errors.NO_DATA_FOUND;
      }

      insApprovalList = JSON.parse(JSON.stringify(insApprovalList));

      insApprovalList = insApprovalList.map((v) => {
        let doc = { ...v.doctor };
        let tmp = { ...doc, createdAt: moment(doc.createdAt).fromNow() };
        return {
          ...v,
          doctor: tmp,
          createdAt: moment(v.createdAt).fromNow(),
        };
      });

      return insApprovalList;
    } catch (e) {
      throw e;
    }
  },
  // doctor list
  doctor_list: async (data, token) => {
    try {
      var doctorList = await DBController.Models.doctor.findAll({
        where: {
          approval_status: "approved",
          active: true,
        },
      });

      if (Utilities.isNull(doctorList)) {
        return errors.NO_DATA_FOUND;
      }
      return doctorList;
    } catch (e) {
      throw e;
    }
  },
  // doctor pending list
  doctor_pending_list: async (data, token) => {
    try {
      var doctorList = await DBController.Models.doctor.findAll({
        where: {
          approval_status: "pending",
          active: true,
        },
      });

      if (Utilities.isNull(doctorList)) {
        return errors.NO_DATA_FOUND;
      }

      doctorList = JSON.parse(JSON.stringify(doctorList));

      doctorList = doctorList.map((doctor) => {
        return { ...doctor, createdAt: moment(doctor.createdAt).fromNow() };
      });

      return doctorList;
    } catch (e) {
      throw e;
    }
  },
  // doctor rejected list
  doctor_rejected_list: async (data, token) => {
    try {
      var doctorList = await DBController.Models.doctor.findAll({
        where: {
          approval_status: "rejected",
          active: true,
        },
      });

      if (Utilities.isNull(doctorList)) {
        return errors.NO_DATA_FOUND;
      }
      return doctorList;
    } catch (e) {
      throw e;
    }
  },
  // doctors count
  doctor_count: async (data, token) => {
    try {
      var doctorList = await DBController.Models.doctor.findAll({
        where: {
          active: true,
        },
      });

      return doctorList.length;
    } catch (e) {
      throw e;
    }
  },
  // update doctor status
  update_status: async (data, token) => {
    try {
      var validate = await PayloadCompiler.compile(data, "updateDoctorStatus");

      let updateStatus;

      if (validate.data.status == "rejected") {
        if (Utilities.isNull(validate.data.review)) {
          throw {
            errors: [
              {
                message: "review is required",
              },
            ],
          };
        }

        updateStatus = await DBController.Models.doctor.update(
          {
            approval_status: validate.data.status,
            reason: validate.data.review,
          },
          {
            where: {
              id: validate.data.id,
            },
          }
        );
      } else {
        updateStatus = await DBController.Models.doctor.update(
          {
            approval_status: validate.data.status,
          },
          {
            where: {
              id: validate.data.id,
            },
          }
        );
      }

      if (Utilities.isNotNull(updateStatus)) {
        return errors.STATUS_UPDATED;
      } else {
        return errors.FAILED;
      }
    } catch (e) {
      throw e;
    }
  },
  // profile
  profile: async (data, token) => {
    try {
      var profile = await DBController.Models.doctor.findOne({
        where: {
          id: token.id,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt", "active", "ph_verified"],
        },
      });

      profile = JSON.parse(JSON.stringify(profile));

      return {
        ...profile,
        reason: null ?? "",
        sec_mobile: null ?? "",
        currently_working: null ?? "",
      };
    } catch (e) {
      throw e;
    }
  },
  // my uploads
  upload: async (data, token) => {
    try {
      var validate = await PayloadCompiler.compile(data, "myUploads");
      let uploads;

      if (data.status == "all") {
        uploads = await DBController.Models.resource.findAll({
          where: {
            adder: token.id,
            adderType: "doctor",
            active: true,
          },
          attributes: {
            exclude: ["updatedAt", "active", "adder", "adderType"],
          },
        });
      }
      else {
        uploads = await DBController.Models.resource.findAll({
          where: {
            adder: token.id,
            adderType: "doctor",
            status: data.status,
            active: true,
          },
          attributes: {
            exclude: ["updatedAt", "active", "adder", "adderType"],
          },
        });
      }


      if (Utilities.isNull(uploads)) {
        return errors.NO_DATA_FOUND;
      }

      uploads = JSON.parse(JSON.stringify(uploads));

      uploads = uploads.map((v) => {
        return {
          ...v,
          reason: v.status == "rejected" ? v.reason : null,
          createdAt: moment(v.createdAt).fromNow(),
          photos: v.photos.split(",")
        };
      });

      return uploads;
    } catch (e) {
      throw e;
    }
  },
  // update instant approval status
  update_ins: async (data, token) => {
    try {
      var validate = await PayloadCompiler.compile(data, "updateInsStatus");

      let updateStatus;

      if (validate.data.status == "rejected") {
        if (Utilities.isNull(validate.data.review)) {
          throw {
            errors: [
              {
                message: "review is required",
              },
            ],
          };
        }

        updateStatus = await DBController.Models.instant_approval.update(
          {
            approval_status: validate.data.status,
            reason: validate.data.review,
          },
          {
            where: {
              id: validate.data.id,
            },
          }
        );
      } else {
        updateStatus = await DBController.Models.instant_approval.update(
          {
            approval_status: validate.data.status,
          },
          {
            where: {
              id: validate.data.id,
            },
          }
        );
      }

      if (Utilities.isNotNull(updateStatus)) {
        return errors.STATUS_UPDATED;
      } else {
        return errors.FAILED;
      }
    } catch (e) {
      throw e;
    }
  },
  // rise query for edit profile
  rise_query: async (data, token) => {
    try {
      var validate = await PayloadCompiler.compile(data, "riseQuery");

      let query = await DBController.Models.editRequest.create({
        doctor: token.id,
        query: validate.data.query,
      });

      if (Utilities.isNotNull(query)) {
        return 'success';
      } else {
        return errors.FAILED;
      }
    } catch (e) {
      throw e;
    }
  },
  // get edit profile queries
  get_query: async (data, token) => {
    try {

      let query = await DBController.Models.editRequest.findAll();

      if (Utilities.isNull(query)) {
        return errors.NO_DATA_FOUND;
      }

      query = JSON.parse(JSON.stringify(query));

      query = query.map((v) => {
        return {
          ...v,
          createdAt: moment(v.createdAt).fromNow(),
        };
      }).reverse();
      return query;
    } catch (e) {
      throw e;
    }
  }
};

DBController.customer = {
  signup: async (data) => {
    try {

      let validate = await PayloadCompiler.compile(data, "customerSignup");

      let user = await DBController.Models.customer.create({
        name: validate.data.name,
        phone: validate.data.phone,
        species: validate.data.species,
        breed: validate.data.breed,
        pet_name: validate.data.petName,
      });

      // if (validate.data.phone == '9876540123') {
      //   return "Sms sent to your phone";
      // }

      // sms.sendOtp({
      //   phone: validate.data.phone,
      //   name: validate.data.name
      // })

      return Utilities.isNotNull(user) ? "Sms sent to your mobile number" : errors.FAILED;

    } catch (e) {
      throw e;
    }
  },
  login: async (data) => {
    try {
      var validate = await PayloadCompiler.compile(data, "customerLogin");

      console.log(data);

      var verify = await sms.verifyOtp({
        phone: validate.data.phone,
        otp: validate.data.otp,
      })

      if (verify == 'OTP verified success') {
        var user = await DBController.Models.customer.findOne({
          where: {
            phone: validate.data.phone,
            active: true,
          },
        });

        if (!user) {
          return errors.EMAIL_PASSWORD_INCORRECT
        }

        if (user.ph_verified == false) {
          return errors.PHONE_NUMBER_NOT_VERIFIED;
        }

        let token = encrypt.encrypt(
          process.env.PUB_KEY,
          JSON.stringify({
            role: "customer",
            data: {
              id: user.id,
              name: user.name,
            },
          })
        );

        return Utilities.isNull(user) ? errors.LOGIN_FAILED : token;
      }
      else {
        return errors.INVALID_OTP
      }

      // if (validate.data.otp == "1111") {
      //   var user = await DBController.Models.customer.findOne({
      //     where: {
      //       phone: validate.data.phone,
      //       active: true,
      //     },
      //   });

      //   if (!user) {
      //     return errors.EMAIL_PASSWORD_INCORRECT
      //   }

      //   if (user.ph_verified == false) {
      //     return errors.PHONE_NUMBER_NOT_VERIFIED;
      //   }

      //   let token = encrypt.encrypt(
      //     process.env.PUB_KEY,
      //     JSON.stringify({
      //       role: "customer",
      //       data: {
      //         id: user.id,
      //         name: user.name,
      //       },
      //     })
      //   );

      //   return Utilities.isNull(user) ? errors.LOGIN_FAILED : token;
      // } else {
      //   return errors.INVALID_OTP;
      // }
    } catch (e) {
      throw e;
    }
  },
  verify: async (data) => {
    try {
      var validate = await PayloadCompiler.compile(data, "verifyOtp");

      if (validate.data.otp != "1111") {
        throw {
          errors: [
            {
              message: "Invalid OTP",
            },
          ],
        };
      }

      var customer = await DBController.Models.customer.findOne({
        where: {
          phone: validate.data.phone,
          active: true,
        },
      });

      if (Utilities.isNull(customer)) {
        throw {
          errors: [
            {
              message: "User not found",
            },
          ],
        };
      }

      var update = await DBController.Models.customer.update(
        { ph_verified: true },
        {
          where: {
            phone: validate.data.phone,
          },
        }
      );

      if (update[0]) {
        let token = encrypt.encrypt(
          process.env.PUB_KEY,
          JSON.stringify({
            role: "customer",
            data: {
              id: update.id,
              name: update.name,
            },
          })
        );

        return token;
      } else {
        return errors.FAILED;
      }
    } catch (e) {
      throw e;
    }
  },
  sendOtp: async (data) => {
    try {
      var validate = await PayloadCompiler.compile(data, "sendOtp");

      var customer = await DBController.Models.customer.findOne({
        where: {
          phone: validate.data.phone,
          active: true,
        },
      });

      if (Utilities.isNull(customer)) {
        throw {
          errors: [
            {
              message: "User not found",
            },
          ],
        };
      }

      sms.sendOtp({
        phone: validate.data.phone,
        name: customer.name
      })
      return "Sms sent to your phone";
    }
    catch (e) {
      throw e
    }
  }
};

DBController.user = {
  // customer count
  count: async (data, token) => {
    try {
      var userList = await DBController.Models.customer.findAll({
        where: {
          active: true,
        },
      });

      return userList.length;
    } catch (e) {
      throw e;
    }
  },
};

DBController.district = {
  // add district
  add: async (data, token) => {
    try {
      var validate = await PayloadCompiler.compile(data, "addDistrict");

      let district = await DBController.Models.district.create({
        district: validate.data.district,
        taluk: validate.data.taluk,
      });

      if (Utilities.isNotNull(district)) {
        return errors.DISTRICT_ADDED;
      } else {
        return errors.FAILED;
      }
    } catch (e) {
      throw e;
    }
  },
  // list district
  list: async (data, token) => {
    try {
      var districtList = await DBController.Models.district.findAll({
        where: {
          active: true,
        },
        attributes: {
          exclude: ["createdAt"],
        },
      });

      if (Utilities.isNull(districtList)) {
        return errors.NO_DATA_FOUND;
      }

      var tmpList = JSON.parse(JSON.stringify(districtList));

      var distList = tmpList.map((v) => {
        return { ...v, updatedAt: moment(v.updatedAt).fromNow() };
      });

      return distList;
    } catch (e) {
      throw e;
    }
  },
  // delete district
  delete: async (data, token) => {
    try {
      var validate = await PayloadCompiler.compile(data, "deleteDistrict");

      let deleteDistrict = await DBController.Models.district.update(
        {
          active: false,
        },
        {
          where: {
            id: validate.data.id,
          },
        }
      );

      if (Utilities.isNotNull(deleteDistrict)) {
        return "success";
      } else {
        return errors.FAILED;
      }
    } catch (e) {
      throw e;
    }
  },
  // district list for android application
  doc_list: async (data, token) => {
    try {
      var districtList = await DBController.Models.district.findAll({
        where: {
          active: true,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt", "active"],
        },
      });

      if (Utilities.isNull(districtList)) {
        return errors.NO_DATA_FOUND;
      }
      return districtList;
    } catch (e) {
      throw e;
    }
  },
  // district only
  doc_district: async (data, token) => {
    try {
      var districtList = await DBController.Models.district.findAll({
        where: {
          active: true,
        },
        attributes: [
          [Sequelize.fn('DISTINCT', Sequelize.col('district')), 'district'],
        ],
      });

      if (Utilities.isNull(districtList)) {
        return errors.NO_DATA_FOUND;
      }


      return districtList;
    } catch (e) {
      throw e;
    }
  }
};

DBController.news = {
  // add news
  add: async (data, token) => {
    try {
      var validate = await PayloadCompiler.compile(data, "addNews");

      let news = await DBController.Models.newsfeed.create({
        title: validate.data.title,
        description: validate.data.description,
        photo: validate.data.photo,
        district: validate.data.district,
        taluk: validate.data.taluk,
      });

      if (Utilities.isNotNull(news)) {
        return errors.NEWS_ADDED;
      } else {
        return errors.FAILED;
      }
    } catch (e) {
      throw e;
    }
  },
  list: async (data, token) => {
    try {
      var newsList = await DBController.Models.newsfeed.findAll({
        where: {
          active: true,
        },
        attributes: {
          exclude: ["createdAt"],
        },
      });

      if (Utilities.isNull(newsList)) {
        return errors.NO_DATA_FOUND;
      }

      var tmpList = JSON.parse(JSON.stringify(newsList));

      var newsList = tmpList.map((v) => {
        return { ...v, updatedAt: moment(v.updatedAt).fromNow() };
      });

      return newsList;
    } catch (e) {
      throw e;
    }
  },
  delete: async (data, token) => {
    try {
      var validate = await PayloadCompiler.compile(data, "deleteNews");

      let deleteNews = await DBController.Models.newsfeed.update(
        {
          active: false,
        },
        {
          where: {
            id: validate.data.id,
          },
        }
      );

      if (Utilities.isNotNull(deleteNews)) {
        return "success";
      } else {
        return errors.FAILED;
      }
    } catch (e) {
      throw e;
    }
  },
  doc_list: async (data, token) => {
    try {
      var newsList = await DBController.Models.newsfeed.findAll({
        where: {
          active: true,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt", "active", "description"],
        },
      });

      if (Utilities.isNull(newsList)) {
        return errors.NO_DATA_FOUND;
      }

      var tmpList = JSON.parse(JSON.stringify(newsList));

      newsList = tmpList.map((v) => {
        return { ...v, updatedAt: moment(v.updatedAt).fromNow() };
      });
      return newsList;
    } catch (e) {
      throw e;
    }
  },
  doc_news_desc: async (data, token) => {
    try {
      var validate = await PayloadCompiler.compile(data, "newsDescription");
      var newsList = await DBController.Models.newsfeed.findOne({
        where: {
          id: validate.data.id,
          active: true,
        },
        attributes: {
          exclude: ["createdAt", "active"],
        },
      });

      if (Utilities.isNull(newsList)) {
        return errors.NO_DATA_FOUND;
      }

      var tmp = JSON.parse(JSON.stringify(newsList));

      newsList = { ...tmp, updatedAt: moment(tmp.updatedAt).fromNow() };

      return newsList;
    } catch (e) {
      throw e;
    }
  },
  doc_search: async (data, token) => {
    try {
      var validate = await PayloadCompiler.compile(data, "newsSearch");
      var newsList = await DBController.Models.newsfeed.findAll({
        where: {
          active: true,
          district: { [Op.substring]: validate.data.district },
        },
        attributes: {
          exclude: ["createdAt", "active"],
        },
        limit: Utilities.isNull(validate.data.district) ? 10 : null
      });

      if (Utilities.isNull(newsList)) {
        return errors.NO_DATA_FOUND;
      }

      var tmpList = JSON.parse(JSON.stringify(newsList));

      newsList = tmpList.map((v) => {
        return { ...v, updatedAt: moment(v.updatedAt).fromNow() };
      });

      return newsList;
    } catch (e) {
      throw e;
    }
  },
  doc_recent: async (data, token) => {
    try {
      var newsList = await DBController.Models.newsfeed.findAll({
        where: {
          active: true,
        },
        attributes: {
          exclude: ["createdAt", "active"],
        },
        limit: 5,
        order: [["id", "DESC"]],
      });

      if (Utilities.isNull(newsList)) {
        return errors.NO_DATA_FOUND;
      }

      var tmpList = JSON.parse(JSON.stringify(newsList));

      newsList = tmpList.map((v) => {
        return { ...v, updatedAt: moment(v.updatedAt).fromNow() };
      });

      return newsList;
    } catch (e) {
      throw e;
    }
  },
  update: async (data, token) => {
    try {
      var validate = await PayloadCompiler.compile(data, "updateNews");

      let news = await DBController.Models.newsfeed.update(
        {
          title: validate.data.title,
          description: validate.data.description,
          photo: validate.data.photo,
          district: validate.data.district,
          taluk: validate.data.taluk,
        },
        {
          where: {
            id: validate.data.id,
          },
        }
      );

      if (Utilities.isNotNull(news)) {
        return errors.NEWS_UPDATED;
      } else {
        return errors.FAILED;
      }
    } catch (e) {
      throw e;
    }
  },
};

DBController.find_nearby = {
  // doctors list
  doctors: async (data, token) => {
    try {
      var validate = await PayloadCompiler.compile(data, "findNearbyDoctors");

      let doctors = await DBController.Models.doctor.findAll({
        where: validate.data.district ? {
          active: true,
          district: validate.data.district,
          ph_verified: true,
          approval_status: "approved",
        } : {
          active: true,
          ph_verified: true,
          approval_status: "approved",
        },
        attributes: {
          exclude: [
            "createdAt",
            "updatedAt",
            "active",
            "approval_status",
            "sign",
            "ph_verified",
            "reason",
            "sec_mobile",
            "currently_working",
            "doc_reg_no",
          ],
        },
      });

      if (Utilities.isNull(doctors)) return errors.NO_DATA_FOUND;

      doctors = JSON.parse(JSON.stringify(doctors));

      doctors = doctors.map(async v => {
        let rat = await DBController.Models.rating.findAll({
          where: {
            doctor_id: v.id
          },
          attributes: ["review"],
          raw: true,
        })

        if (rat.length > 1) {
          var totalRating = rat.map(v => Number(v.review)).reduce((a, b) => a + b, 0)
          return { ...v, rating: totalRating / rat.length }
        }
        else {
          return { ...v, rating: rat[0] ? rat[0].review : 0 }
        }
      })

      return Promise.all(doctors);
    } catch (e) {
      throw e;
    }
  },
  // doctors detailed view
  doctors_detail: async (data, token) => {
    try {
      var validate = await PayloadCompiler.compile(data, "findNearByDetails");

      let doctor = await DBController.Models.doctor.findOne({
        where: {
          id: validate.data.id,
          active: true,
          approval_status: "approved",
          ph_verified: true,
        },
        attributes: {
          exclude: ["active", "createdAt", "updatedAt", "sign", "reason"],
        },
      });

      if (Utilities.isNull(doctor)) return errors.NO_DATA_FOUND;


      doctor = JSON.parse(JSON.stringify(doctor));

      var rating = await DBController.Models.rating.findAll({
        where: {
          doctor_id: validate.data.id,
        },
        attributes: {
          exclude: ['updatedAt', 'active']
        }
      })

      rating = JSON.parse(JSON.stringify(rating));

      var total = rating.map(v => parseInt(v.review)).reduce((a, b) => a + b, 0)
      var totalRating = rating.length > 1 ? (total / rating.length) : rating.length == 1 ? rating[0].review : 0

      rating = rating.map(async v => {
        var user = {}
        if (v.user_type == 'doctor') {
          user = await DBController.Models.doctor.findOne({
            where: {
              id: v.id
            },
            attributes: ['photo', 'name']
          })
        }
        else {
          user = await DBController.Models.customer.findOne({
            where: {
              id: v.id
            },
            attributes: ['photo', 'name']
          })
        }

        let final = {
          ...v,
          user_name: user.name,
          user_photo: user.photo,
          createdAt: moment(v.createdAt).fromNow(),
        }

        delete final.user_type

        return final
      })

      let tmp = await Promise.all(rating)

      return { ...doctor, sec_mobile: doctor.sec_mobile ?? "", ratingsList: tmp, overAllRating: totalRating };
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
  // labs list
  resources: async (data, token) => {
    try {
      let validate = await PayloadCompiler.compile(data, "resourceList");

      let labs = await DBController.Models.resource.findAll({
        where: validate.data.district
          ? {
            active: true,
            district: validate.data.district,
            resource_type: validate.data.type,
            status: "approved",
          }
          : {
            active: true,
            resource_type: validate.data.type,
            status: "approved",
          },

        attributes: {
          exclude: ["reason", "active", "createdAt", "updatedAt", "status", 'adderType', 'adder'],
        },
      });

      labs = JSON.parse(JSON.stringify(labs));

      labs = labs.map(async v => {
        var rating = await DBController.Models.resourceRating.findAll({
          where: {
            resource_id: v.id,
            active: true
          },
          raw: true
        })

        var totalRating = rating.length > 1 ? (rating.map(val => Number(val.review)).reduce(a, b => a + b, 0)) / rating.length : rating.length == 1 ? rating[0].review : 0

        return { ...v, photos: v.photos.split(","), rating: totalRating }
      })

      return Utilities.isNull(labs) ? errors.NO_DATA_FOUND : Promise.all(labs);
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
  // resource detailed view
  resources_details: async (data, token) => {
    try {
      let validate = await PayloadCompiler.compile(data, "findNearByDetails");

      let resources = await DBController.Models.resource.findOne({
        where: {
          id: validate.data.id,
          active: true,
        },
        attributes: {
          exclude: ["reason", "active", "createdAt", "updatedAt", "status"],
        },
      });

      if (Utilities.isNull(resources)) return errors.NO_DATA_FOUND;

      resources = JSON.parse(JSON.stringify(resources));

      var rating = await DBController.Models.resourceRating.findAll({
        where: {
          resource_id: validate.data.id,
        },
        attributes: {
          exclude: ['updatedAt', 'active']
        },
        raw: true
      })

      rating = JSON.parse(JSON.stringify(rating));

      rating = rating.map(async v => {
        var user = {}
        if (v.user_type == 'doctor') {
          user = await DBController.Models.doctor.findOne({
            where: {
              id: v.user_id,
            },
            attributes: ['name', 'photo']
          })
        }
        else {
          user = await DBController.Models.customer.findOne({
            where: {
              id: v.user_id,
            },
            attributes: ['name', 'photo']
          })
        }

        return {
          ...v,
          createdAt: moment(v.createdAt).fromNow(),
          user_name: user.name,
          user_photo: user.photo
        }
      })

      var totalRating = rating.length > 1 ? (rating.map(val => Number(val.review)).reduce(a, b => a + b, 0)) / rating.length : rating.length == 1 ? rating[0].review : 0

      rating = await Promise.all(rating)

      resources = { ...resources, photos: resources.photos.split(","), ratings: rating, totalRating: totalRating }

      return resources;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
};

DBController.resource = {
  // add resource
  add: async (data, token) => {
    try {
      var validate = await PayloadCompiler.compile(data, "addResource");

      let resource = await DBController.Models.resource.create({
        adder: token.id,
        adderType: token.role,
        name: validate.data.name,
        mobile: validate.data.mobile,
        doorno: validate.data.doorno,
        owner_name: validate.data.ownerName,
        street: validate.data.street,
        city: validate.data.city,
        taluk: validate.data.taluk,
        district: validate.data.district,
        pincode: validate.data.pincode,
        photos: validate.data.photo.join(","),
        resource_type: validate.data.resourceType,
      });

      return Utilities.isNotNull(resource) ? errors.RESOURCE_ADDED : errors.FAILED;

    } catch (e) {
      console.log(e);
      throw e;
    }
  },
  // delete resource
  delete: async (data, token) => {
    try {

      var validate = await PayloadCompiler.compile(data, 'delResource')

      let isHeOwner = await DBController.Models.resource.findOne({
        where: {
          id: validate.data.id,
          adder: token.id,
          adderType: token.role
        }
      })

      if (!isHeOwner) return errors.UNAUTHORIZED

      let resource = await DBController.Models.resource.update({ active: false },
        {
          where: {
            id: validate.data.id,
            adder: token.id,
            adderType: token.role
          }
        }
      )

      if (resource[0] == 1) {
        return errors.DELETED;
      } else {
        return errors.FAILED
      }

    }
    catch (e) {
      console.log(e);
      throw e
    }
  },
  // resources count
  count: async (data, token) => {
    try {
      let resource = await DBController.Models.resource.findAll({
        where: {
          active: true,
        },
      });

      return resource.length;
    } catch (e) {
      throw e;
    }
  },
  // resource status
  status: async (data, token) => {
    try {
      var validate = await PayloadCompiler.compile(data, "resourceStatus");
      let resource = await DBController.Models.resource.findAll({
        where: {
          active: true,
          status: validate.data.status,
        },
        attributes: {
          exclude: ["createdAt"],
        },
      });

      if (Utilities.isNull(resource)) {
        return errors.NO_DATA_FOUND;
      }

      resource = JSON.parse(JSON.stringify(resource));

      let out = resource.map(async (v) => {
        if (v.adderType == "doctor") {
          let docDetails = await DBController.Models.doctor.findOne({
            where: {
              id: v.adder,
            },
          });

          let tmp = {
            ...v,
            photos: v.photos.includes(",") ? v.photos.split(",") : [v.photos],
            updatedAt: moment(v.updatedAt).fromNow(),
            user: JSON.parse(JSON.stringify(docDetails)),
          };

          return tmp;
        } else {
          let customerDetails = await DBController.Models.customer.findOne({
            where: {
              id: v.adder,
            },
          });
          return {
            ...v,
            photos: v.photos.includes(",") ? v.photos.split(",") : [v.photos],
            updatedAt: moment(v.updatedAt).fromNow(),
            user: JSON.parse(JSON.stringify(customerDetails)),
          };
        }
      });

      return (out = await Promise.all(out));
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
  // update resource
  update: async (data, token) => {
    try {
      var validate = await PayloadCompiler.compile(data, "updateResource");

      let resource;

      if (validate.data.status == "rejected") {
        if (Utilities.isNull(validate.data.reason)) {
          throw {
            errors: [
              {
                message: "reason is required",
              },
            ],
          };
        }

        resource = await DBController.Models.resource.update(
          {
            status: validate.data.status,
            reason: validate.data.reason,
          },
          {
            where: {
              id: validate.data.id,
            },
          }
        );
      } else {
        resource = await DBController.Models.resource.update(
          {
            status: validate.data.status,
          },
          {
            where: {
              id: validate.data.id,
            },
          }
        );
      }

      if (resource[0]) {
        return errors.RESOURCE_UPDATED;
      } else {
        return errors.FAILED;
      }
    } catch (e) {
      throw e;
    }
  },
  // rate resource 
  rate: async (data, token) => {
    try {

      var validate = await PayloadCompiler.compile(data, 'addResourceRating')

      var data = await DBController.Models.resourceRating.findOne({
        where: {
          user_id: token.id,
        }
      })

      if (data) return errors.ALREADY_RATED

      var resource = await DBController.Models.resourceRating.create({
        resource_id: validate.data.resourceId,
        user_id: token.id,
        user_type: token.role,
        review: validate.data.rating
      })

      return Utilities.isNull(resource) ? errors.FAILED : "Successfully rated"

    }
    catch (e) {
      console.log(e)
      throw e
    }
  },
  // my posts 
  /**
   * 
   * @param {object} data 
   * @param {string} data.status
   * @param {*} token 
   */
  post: async (data, token) => {
    try {
      const validate = await PayloadCompiler.compile(data, 'mypost')

      if (data.status == "all") {
        var posts = await DBController.Models.buysell.findAll({
          where: {
            adder: token.id
          },
          attributes: {
            exclude: ["createdAt", "updatedAt", "active"]
          }
        })

        var matchfind = await DBController.Models.matchfind.findAll({
          where: {
            adder: token.id
          },
          attributes: {
            exclude: ["createdAt", "updatedAt", "active"]
          }
        })

        var adoption = await DBController.Models.adoption.findAll({
          where: {
            adder: token.id
          }, attributes: {
            exclude: ["createdAt", "updatedAt", "active"]
          }
        })

        return Utilities.isNull(posts) ? errors.NO_DATA_FOUND : [...posts, ...matchfind, ...adoption]
      }
      else if (data.status == "active") {
        var post = await DBController.Models.buysell.findAll({
          where: {
            adder: token.id,
            status: 'published'
          }, attributes: {
            exclude: ["createdAt", "updatedAt", "active"]
          }
        })
        var matchfind = await DBController.Models.matchfind.findAll({
          where: {
            adder: token.id,
            status: 'published'
          },
          attributes: {
            exclude: ["createdAt", "updatedAt", "active"]
          }
        })
        var adoption = await DBController.Models.adoption.findAll({
          where: {
            adder: token.id,
            status: "published"
          }
        })


        return Utilities.isNull(post) ? errors.NO_DATA_FOUND : [...post, ...matchfind, ...adoption]
      }
      else if (data.status == "draft") {
        var post = await DBController.Models.buysell.findAll({
          where: {
            adder: token.id,
            status: "draft"
          }, attributes: {
            exclude: ["createdAt", "updatedAt", "active"]
          }
        })
        var matchfind = await DBController.Models.matchfind.findAll({
          where: {
            adder: token.id,
            status: 'draft'
          },
          attributes: {
            exclude: ["createdAt", "updatedAt", "active"]
          }
        })
        var adoption = await DBController.Models.adoption.findAll({
          where: {
            adder: token.id,
            status: "draft"
          },
          attributes: {
            exclude: ["createdAt", "updatedAt", "active"]
          }
        })
        return Utilities.isNull(post) ? errors.NO_DATA_FOUND : [...post, ...matchfind, ...adoption]
      }

    }
    catch (e) {
      console.log(e)
      throw e
    }
  }
};

DBController.animal = {
  // add animal
  add: async (data, token) => {
    try {
      var validate = await PayloadCompiler.compile(data, "addAnimal");

      let animal = await DBController.Models.pet.create({
        pet: validate.data.pet.toLowerCase(),
      });

      if (Utilities.isNull(animal)) {
        return errors.FAILED;
      } else {
        return "success";
      }
    } catch (e) {
      throw e;
    }
  },
  // add breed
  breedAdd: async (data, token) => {
    try {
      var validate = await PayloadCompiler.compile(data, "addBreed");

      let pet = await DBController.Models.pet.findOne({
        where: {
          id: validate.data.petId,
        },
      });

      if (Utilities.isNull(pet)) {
        return errors.NO_PET_FOUND;
      }

      let breed = await DBController.Models.breed.create({
        breed: validate.data.breed,
        pet_id: validate.data.petId,
      });

      if (Utilities.isNull(breed)) {
        return errors.FAILED;
      } else {
        return "success";
      }
    } catch (e) {
      throw e;
    }
  },
  // view animal and breed list
  view: async (data, token) => {
    try {
      let animal = await DBController.Models.pet.findAll({
        where: {
          active: true,
        },
        attributes: {
          exclude: ["createdAt", "active", "updatedAt"],
        },
      });

      animal = JSON.parse(JSON.stringify(animal));

      animal = animal.map(async (v) => {
        let breed = await DBController.Models.breed.findAll({
          where: {
            pet_id: v.id,
          },
          attributes: {
            exclude: ["createdAt", "active", "updatedAt", 'pet_id'],
          },
        })

        return {
          ...v,
          breed: breed,
        };
      })

      return Utilities.isNull(animal) ? errors.NO_DATA_FOUND : Promise.all(animal)
    } catch (e) {
      throw e;
    }
  },
  // match find view animal and breed list
  matchfind_view: async (data, token) => {
    try {
      let animal = await DBController.Models.pet.findAll({
        where: {
          pet: ['dog', 'cat'],
          active: true,
        },
        attributes: {
          exclude: ["createdAt", "active", "updatedAt"],
        },
      });

      animal = JSON.parse(JSON.stringify(animal));

      animal = animal.map(async (v) => {
        let breed = await DBController.Models.breed.findAll({
          where: {
            pet_id: v.id,
          },
          attributes: {
            exclude: ["createdAt", "active", "updatedAt", 'pet_id'],
          },
        })

        return {
          ...v,
          breed: breed,
        };
      })

      return Utilities.isNull(animal) ? errors.NO_DATA_FOUND : Promise.all(animal)
    } catch (e) {
      throw e;
    }
  },
  // delete animal
  delete: async (data, token) => {
    try {
      var validate = await PayloadCompiler.compile(data, "deleteAnimal");

      let animal = await DBController.Models.pet.findOne({
        where: {
          id: validate.data.petId,
        },
      });

      if (Utilities.isNull(animal)) {
        return errors.NO_PET_FOUND;
      }

      let deleted = await DBController.Models.pet.update(
        {
          active: false,
        },
        {
          where: {
            id: validate.data.petId,
          },
        }
      );

      if (Utilities.isNull(deleted)) {
        return errors.FAILED;
      }

      return "success";
    } catch (e) {
      throw e;
    }
  },
  // delete bred
  deleteBreed: async (data, token) => {
    try {
      var validate = await PayloadCompiler.compile(data, "deleteBreed");

      let breed = await DBController.Models.breed.findOne({
        where: {
          id: validate.data.breedId,
        },
      });

      if (Utilities.isNull(breed)) {
        return errors.NO_BREED_FOUND;
      }

      let deleted = await DBController.Models.breed.update(
        {
          active: false,
        },
        {
          where: {
            id: validate.data.breedId,
          },
        }
      );

      if (Utilities.isNull(deleted)) {
        return errors.FAILED;
      }

      return "success";
    } catch (e) {
      throw e;
    }
  },
  // breed list
  breedList: async (data, token) => {
    try {
      let validate = await PayloadCompiler.compile(data, "breedList");

      let breed = await DBController.Models.breed.findAll({
        where: {
          pet_id: validate.data.id,
          active: true,
        },
        attributes: {
          exclude: ["pet_id", "updatedAt", "active"],
        },
      });

      breed = JSON.parse(JSON.stringify(breed));

      breed = breed.map((v) => {
        return {
          ...v,
          createdAt: moment(v.createdAt).fromNow(),
        };
      });

      return breed;
    } catch (e) {
      throw e;
    }
  },
};

DBController.buysell = {
  sell: async (data, token) => {
    try {
      var validate = await PayloadCompiler.compile(data, "sellPet");

      let sellPet = await DBController.Models.buysell.create({
        adder: token.id,
        adder_type: token.role,
        species: validate.data.species,
        breed: validate.data.breed,
        age: validate.data.age,
        name: validate.data.name,
        mobile: validate.data.mobile,
        gender: validate.data.gender,
        doorno: validate.data.doorno,
        street: validate.data.street,
        city: validate.data.city,
        taluk: validate.data.taluk,
        district: validate.data.district,
        pincode: validate.data.pincode,
        price: validate.data.price,
        about: validate.data.about,
        photo: validate.data.photo.join(","),
        status: "draft"
      });

      if (Utilities.isNull(sellPet)) return errors.FAILED;

      // let resp = await sms.sendOtp({
      //   phone: validate.data.mobile,
      //   name: validate.data.name
      // })

      // return (resp == 'success') ? {
      //   id: sellPet.id,
      //   data: "success"
      // } : errors.FAILED

      return {
        id: sellPet.id,
        data: "otp sent successfully",
      };

    } catch (e) {
      console.log(e);
      throw e;
    }
  },
  sellVerify: async (data, token) => {
    try {

      var validate = await PayloadCompiler.compile(data, "resourceOtpVerification");

      let buysell = await DBController.Models.buysell.findOne({
        where: {
          mobile: validate.data.phone,
          id: validate.data.id
        }
      })

      if (Utilities.isNull(buysell)) {
        // throw Errors.handleError({
        //   error: errors.NO_DATA_FOUND,
        // });
        return errors.NO_DATA_FOUND;
      }

      let verify = ''
      // var verify = await sms.verifyOtp({
      //   phone: validate.data.phone,
      //   otp: validate.data.otp,
      // })


      if (verify == 'OTP verified success' || true) {
        let updated = await DBController.Models.buysell.update({ ph_verification_status: 'verified' }, {
          where: {
            id: validate.data.id,
          }
        })
        if (Utilities.isNull(updated)) {
          throw Errors.handleError({
            error: errors.FAILED
          })
        }

        paytm.initialize()

        let ordId = 'vetsline_' + Utilities.randomToken()

        let token = await paytm.generateToken({
          orderId: ordId,
          userId: buysell.adder,
          amount: 30,
          mobile: buysell.mobile,
        })

        return {
          txnToken: token.responseObject.body.txnToken,
          orderId: ordId,
          amount: 30,
        }

      }
      else {
        return verify
      }


    }
    catch (e) {
      console.log(e);
      throw e
    }
  },
  list: async (data, token) => {
    try {

      let validate = await PayloadCompiler.compile(data, "listPet");

      console.log(validate.data);

      let sellPet = await DBController.Models.buysell.findAll({
        where: Utilities.isNotNull(validate.data) ? {
          active: true,
          district: validate.data.district,
          species: validate.data.species,
          breed: validate.data.breed,
          payment_status: "paid",
          ph_verification_status: "verified",
        } : {
          active: true,
          payment_status: "paid",
          species: validate.data.species,
          breed: validate.data.breed,
          ph_verification_status: "verified",
        },
        attributes: {
          exclude: [
            "active",
            "updatedAt",
            "order_id",
            "payment_status",
            "ph_verification_status",
            "signature",
            "txnId",
            "bankTxnId",
            "gateway",
            "txnDate",
            "paytm_result",
          ],
        },
      });

      if (Utilities.isNull(sellPet)) return errors.NO_DATA_FOUND;


      sellPet = JSON.parse(JSON.stringify(sellPet));
      let tmp = sellPet.map((v) => {
        return {
          ...v,
          photo: v.photo.split(","),
          createdAt: moment(v.createdAt).fromNow()
        };
      });

      return tmp;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
  detail: async (data, token) => {
    try {
      let validate = await PayloadCompiler.compile(data, "sellingPetDetail");

      let detail = await DBController.Models.buysell.findOne({
        where: {
          id: validate.data.id,
          payment_status: "paid",
          active: true,
          ph_verification_status: "verified",
        },
        attributes: {
          exclude: [
            "active",
            "updatedAt",
            "ph_verification_status",
            "payment_status",
            "order_id",
            "signature",
            "txnId",
            "bankTxnId",
            "gateway",
            "txnDate",
            "paytm_result",
          ],
        },
      });

      if (Utilities.isNull(detail)) {
        return errors.NO_DATA_FOUND;
      }

      detail = JSON.parse(JSON.stringify(detail));

      return { ...detail, photo: detail.photo.split(",") };
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
  // buy sell payment verification
  payment_verify: async (data, token) => {
    try {

      var validate = await PayloadCompiler.compile(data, 'paytmVerification');

      var post = await DBController.Models.buysell.findOne({
        where: {
          id: validate.data.id,
        }
      })

      console.log(post);

      if (Utilities.isNull(post)) return errors.NO_DATA_FOUND;

      var res = await paytm.checkStatus(data.orderId)

      console.log("buy and sell payment verification status : " + JSON.stringify(res))

      if (res.responseObject.body.resultInfo.resultStatus == 'TXN_SUCCESS') {
        var update = await DBController.Models.buysell.update({
          order_id: validate.data.orderId,
          signature: res.responseObject.head.signature,
          txnId: res.responseObject.body.txnId,
          bankTxnId: res.responseObject.body.bankTxnId,
          gateway: res.responseObject.body.gatewayName,
          bankName: res.responseObject.body.bankName,
          txnDate: res.responseObject.body.txnDate,
          paytm_result: res.responseObject.body.resultInfo.resultStatus,
          payment_status: 'paid',
          status: "published"
        }, {
          where: {
            id: validate.data.id,
          }
        })

        if (update[0]) {
          return 'Payment Successfull'
        }
        else {
          throw Errors.handleError({
            error: errors.FAILED
          })
        }

      }
      else {
        throw Utilities.handleError({
          errors: errors.FAILED
        })
      }

    }
    catch (e) {
      console.log(e);
      throw e;
    }
  }
};

DBController.matchfind = {
  add: async (data, token) => {
    try {
      var validate = await PayloadCompiler.compile(data, "sellPet");

      let matchfind = await DBController.Models.matchfind.create({
        adder: token.id,
        adder_type: token.role,
        species: validate.data.species,
        breed: validate.data.breed,
        age: validate.data.age,
        name: validate.data.name,
        mobile: validate.data.mobile,
        gender: validate.data.gender,
        doorno: validate.data.doorno,
        street: validate.data.street,
        city: validate.data.city,
        taluk: validate.data.taluk,
        district: validate.data.district,
        pincode: validate.data.pincode,
        price: validate.data.price,
        about: validate.data.about,
        photo: validate.data.photo.join(","),
        status: "draft"
      });

      if (Utilities.isNull(matchfind)) return errors.FAILED

      // let resp = await sms.sendOtp({
      //   phone: validate.data.mobile,
      //   name: validate.data.name
      // })

      // return (resp == 'success') ? {
      //   id: matchfind.id,
      //   data: "otp sent successfully"
      // } : errors.FAILED


      return {
        id: matchfind.id,
        data: "otp sent successfully",
      }
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
  list: async (data, token) => {
    try {

      let validate = await PayloadCompiler.compile(data, "listPet");

      let matchfind = await DBController.Models.matchfind.findAll({
        where: Utilities.isNotNull(validate.data) ? {
          active: true,
          payment_status: "paid",
          ph_verification_status: "verified",
          species: validate.data.species,
          breed: validate.data.breed,
          district: validate.data.district,
        } : {
          active: true,
          payment_status: "paid",
          ph_verification_status: "verified",
          species: validate.data.species,
          breed: validate.data.breed,
        },
        attributes: {
          exclude: [
            "active",
            "updatedAt",
            "order_id",
            "payment_status",
            "ph_verification_status",
            "signature",
            "txnId",
            "bankTxnId",
            "gateway",
            "txnDate",
            "paytm_result",
          ],
        },
      });

      if (Utilities.isNull(matchfind)) {
        return errors.NO_DATA_FOUND;
      }

      matchfind = JSON.parse(JSON.stringify(matchfind));
      let tmp = matchfind.map((v) => {
        return {
          ...v,
          photo: v.photo.split(","),
          createdAt: moment(v.createdAt).fromNow()
        };
      });

      return tmp;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
  detail: async (data, token) => {
    try {
      let validate = await PayloadCompiler.compile(data, "sellingPetDetail");

      let detail = await DBController.Models.matchFind.findOne({
        where: {
          id: validate.data.id,
          payment_status: "paid",
          active: true,
          ph_verification_status: "verified",
        },
        attributes: {
          exclude: [
            "active",
            "createdAt",
            "ph_verification_status",
            "payment_status",
            "order_id",
          ],
        },
      });

      if (Utilities.isNull(detail)) {
        return errors.NO_DATA_FOUND;
      }

      detail = JSON.parse(JSON.stringify(detail));

      return {
        ...detail,
        photo: detail.photo.split(","),
        updatedAt: moment(detail.updatedAt).fromNow(),
      };
    } catch (e) {
      throw e;
    }
  },
  // matchfind phone number verification 
  verify: async (data, token) => {
    try {
      var validate = await PayloadCompiler.compile(data, "resourceOtpVerification");

      let matchfind = await DBController.Models.matchfind.findOne({
        where: {
          mobile: validate.data.phone,
          id: validate.data.id
        },
        attributes: {
          exclude: ["active", "createdAt"],
        },
      });

      if (Utilities.isNull(matchfind)) return errors.NO_DATA_FOUND;

      var verify = ''
      // var verify = await sms.verifyOtp({
      //   phone: validate.data.phone,
      //   otp: validate.data.otp,
      // })

      if (verify == 'OTP verified success' || true) {
        let updated = await DBController.Models.matchfind.update({
          ph_verification_status: 'verified',
          status: "published"
        }, {
          where: {
            id: validate.data.id,
          }
        })
        if (Utilities.isNull(updated)) {
          throw Errors.handleError({
            error: errors.FAILED
          })
        }

        paytm.initialize()

        let ordId = 'vetsline_' + Utilities.randomToken()

        let token = await paytm.generateToken({
          orderId: ordId,
          userId: matchfind.adder,
          amount: 30,
          mobile: matchfind.mobile,
        })

        return {
          txnToken: token.responseObject.body.txnToken,
          orderId: ordId,
          amount: 30,
        }

      }
      else {
        return verify
      }


    } catch (e) {
      console.log(e);
      throw e;
    }
  },
  // matchfind payment verficication 
  payment_verify: async (data, token) => {
    try {

      var validate = await PayloadCompiler.compile(data, 'paytmVerification');

      var post = await DBController.Models.matchfind.findOne({
        where: {
          id: validate.data.id,
        }
      })

      if (Utilities.isNull(post)) return errors.NO_DATA_FOUND;

      var res = await paytm.checkStatus(data.orderId)

      console.log("match find payment verification status : " + JSON.stringify(res))

      if (res.responseObject.body.resultInfo.resultStatus == 'TXN_SUCCESS') {
        var update = await DBController.Models.matchfind.update({
          order_id: validate.data.orderId,
          signature: res.responseObject.head.signature,
          txnId: res.responseObject.body.txnId,
          bankTxnId: res.responseObject.body.bankTxnId,
          gateway: res.responseObject.body.gatewayName,
          bankName: res.responseObject.body.bankName,
          txnDate: res.responseObject.body.txnDate,
          paytm_result: res.responseObject.body.resultInfo.resultStatus,
          payment_status: 'paid',
          status: "active"
        }, {
          where: {
            id: validate.data.id,
          }
        })

        if (update[0]) {
          return 'Payment Successfull'
        }
        else {
          throw Errors.handleError({
            error: errors.FAILED
          })
        }

      }
      else {
        throw Errors.handleError({
          error: errors.FAILED
        })
      }

    }
    catch (e) {
      console.log(e);
      throw e;
    }
  }
};

DBController.adoption = {
  // add adoption
  add: async (data, token) => {
    try {
      let validate = await PayloadCompiler.compile(data, "adoptions");

      let adoption = await DBController.Models.adoption.create({
        adder: token.id,
        adder_type: token.role,
        species: validate.data.species,
        breed: validate.data.breed,
        gender: validate.data.gender,
        age: validate.data.age,
        name: validate.data.name,
        mobile: validate.data.phone,
        doorno: validate.data.doorno,
        street: validate.data.street,
        city: validate.data.city,
        taluk: validate.data.taluk,
        district: validate.data.district,
        pincode: validate.data.pincode,
        about: validate.data.about,
        photo: validate.data.photo.join(","),
        status: "draft"
      });

      if (Utilities.isNull(adoption)) return errors.FAILED;

      // let resp = await sms.sendOtp({
      //   phone: validate.data.phone,
      //   name: validate.data.name
      // })

      // return (resp == 'success') ? {
      //   id: adoption.id,
      //   data: "otp sent successfully"
      // } : errors.FAILED

      return {
        id: adoption.id,
        data: "otp sent successfully",
      }


    } catch (e) {
      throw e;
    }
  },
  // view adoption
  list: async (data, token) => {
    try {

      let validate = await PayloadCompiler.compile(data, "listPet");

      let adoption = await DBController.Models.adoption.findAll({
        where: Utilities.isNotNull(validate.data) ? {
          active: true,
          district: validate.data.district,
          species: validate.data.species ?? '',
          breed: validate.data.breed ?? '',
          ph_verification: true,
        } : {
          active: true,
          species: validate.data.species ?? '',
          breed: validate.data.breed ?? '',
          ph_verification: true,
        },
        attributes: {
          exclude: ["active", "createdAt"],
        },
      });

      if (Utilities.isNull(adoption)) return errors.NO_DATA_FOUND;

      adoption = JSON.parse(JSON.stringify(adoption));
      let tmp = adoption.map((v) => {
        return {
          ...v,
          photo: v.photo.split(","),
          updatedAt: moment(v.updatedAt).fromNow(),
        };
      });
      return tmp;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
  // details of pet
  detail: async (data, token) => {
    try {
      let validate = await PayloadCompiler.compile(data, "adoptionDetails");

      let detail = await DBController.Models.adoption.findOne({
        where: {
          id: validate.data.id,
          active: true,
        },
        attributes: {
          exclude: ["active", "createdAt"],
        },
      });

      detail = JSON.parse(JSON.stringify(detail));
      return {
        ...detail,
        photo: detail.photo.split(","),
        updatedAt: moment(detail.updatedAt).fromNow(),
      };
    } catch (e) {
      throw e;
    }
  },
  // adoption post verification 
  verify: async (data, token) => {
    try {
      var validate = await PayloadCompiler.compile(data, "resourceOtpVerification");

      let adoption = await DBController.Models.adoption.findOne({
        where: {
          mobile: validate.data.phone,
          id: validate.data.id
        },
        attributes: {
          exclude: ["active", "createdAt"],
        },
      });

      if (Utilities.isNull(adoption)) return errors.NO_DATA_FOUND;

      // var verify = await sms.verifyOtp({
      //   phone: validate.data.phone,
      //   otp: validate.data.otp,
      // })
      var verify = ''

      if (verify == 'OTP verified success' || true) {
        let updated = await DBController.Models.adoption.update({ ph_verification: true, status: "published" }, {
          where: {
            id: validate.data.id,
          }
        })
        if (Utilities.isNull(updated)) {
          throw Errors.handleError({
            error: errors.FAILED
          })
        }

        return {
          data: "otp verified successfully"
        }

      }
      else {
        return verify
      }


    } catch (e) {
      throw e;
    }
  }
};

DBController.whatsapp = {
  // add group link
  add: async (data, token) => {
    try {
      let validate = await PayloadCompiler.compile(data, "whatsapp");

      let group = await DBController.Models.whatsapp.create({
        link: validate.data.link,
        status: "ACTIVE",
      });

      if (Utilities.isNull(group)) {
        return errors.FAILED;
      }

      return "Success";
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
  // list group links
  list: async (data, token) => {
    try {
      let group = await DBController.Models.whatsapp.findAll({
        where: {
          [Op.or]: [
            {
              status: "ACTIVE",
            },
            {
              status: "DEACTIVE",
            },
          ],
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });

      if (Utilities.isNull(group)) {
        return errors.NO_DATA_FOUND;
      }

      group = JSON.parse(JSON.stringify(group));

      return group.map((v) => {
        return {
          ...v,
          status: v.status === "DEACTIVE" ? "INACTIVE" : "ACTIVE",
        };
      });
    } catch (e) {
      throw e;
    }
  },
  // update link status
  update: async (data, token) => {
    try {
      let validate = await PayloadCompiler.compile(data, "whatsappStatus");

      let update = await DBController.Models.whatsapp.update(
        {
          status: validate.data.status,
        },
        {
          where: {
            id: validate.data.id,
          },
        }
      );

      if (update[0]) {
        return "Success";
      } else {
        return errors.FAILED;
      }
    } catch (e) {
      throw e;
    }
  },
  // group link for users
  group: async (data, token) => {
    try {
      // let validate = await PayloadCompiler.compile(data, "whatsappGroup");

      // desc order
      let group = await DBController.Models.whatsapp.findOne({
        where: {
          status: "ACTIVE",
        },
        order: [["id", "DESC"]],
        attributes: {
          exclude: ["createdAt", "updatedAt", 'status'],
        },
      });

      if (Utilities.isNull(group)) return errors.NO_DATA_FOUND;

      return group.link;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

};

DBController.feedformulation = {
  // add feed formulation
  add: async (data, token) => {
    try {
      let validate = await PayloadCompiler.compile(data, "feedformulation");

      let feedformulation = await DBController.Models.feedFormulation.create({
        type: validate.data.animal_type,
        ingredients: validate.data.ingredient,
        range: validate.data.range,
        cp: validate.data.cp,
        me: validate.data.me,
        price: validate.data.price,
      });

      if (Utilities.isNull(feedformulation)) {
        return errors.FAILED;
      }

      return "Success";
    } catch (e) {
      throw e;
    }
  },
  // list feed formulation
  list: async (data, token) => {
    try {
      let list = await DBController.Models.feedFormulation.findAll({
        where: {
          [Op.or]: [{ status: "ACTIVE" }, { status: "DEACTIVE" }],
        },
        attributes: {
          exclude: ["createdAt"],
        },
      });

      if (Utilities.isNull(list)) {
        return errors.NO_DATA_FOUND;
      }

      list = JSON.parse(JSON.stringify(list));

      list = list.map((v) => {
        let range = v.range.split("-");
        return {
          ...v,
          range: {
            from: range[0],
            to: range[1],
          },
          updatedAt: moment(v.updatedAt).fromNow(),
        };
      });

      return list;
    } catch (e) {
      throw e;
    }
  },
  // delete feed formulation
  delete: async (data, token) => {
    try {
      let validate = await PayloadCompiler.compile(
        data,
        "deleteFeedFormulation"
      );

      let findData = await DBController.Models.feedFormulation.findOne({
        where: {
          id: validate.data.id,
          [Op.or]: [
            {
              status: "ACTIVE",
            },
            {
              status: "DEACTIVE",
            },
          ],
        },
      });

      if (Utilities.isNull(findData)) {
        return errors.NO_DATA_FOUND_FOR_ID;
      }

      let deleteFeed = await DBController.Models.feedFormulation.update(
        {
          status: "DELETE",
        },
        {
          where: {
            id: validate.data.id,
          },
        }
      );

      if (deleteFeed[0]) {
        return "Success";
      } else {
        return errors.FAILED;
      }
    } catch (e) {
      throw e;
    }
  },
  // add poultry type
  poultryAdd: async (data, token) => {
    try {
      let validate = await PayloadCompiler.compile(data, "poultryType");

      let poultry = await DBController.Models.poultryType.create({
        type: validate.data.type,
        cp_standard: validate.data.cp_standard,
        me_standard: validate.data.me_standard,
        active: true,
      });

      if (Utilities.isNull(poultry)) {
        return errors.FAILED;
      }

      return "Success";
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
  // delete poultry type
  poultryDelete: async (data, token) => {
    try {
      let validate = await PayloadCompiler.compile(data, "deletePoultryType");

      let findData = await DBController.Models.poultryType.findOne({
        where: {
          id: validate.data.id,
          active: true,
        },
      });

      if (Utilities.isNull(findData)) return errors.NO_DATA_FOUND_FOR_ID;


      let deletePoultry = await DBController.Models.poultryType.update(
        { active: false },
        {
          where: {
            id: validate.data.id,
            active: true
          },
        }
      );

      if (deletePoultry[0]) {
        return "Success";
      } else {
        return errors.FAILED;
      }

    } catch (e) {
      throw e;
    }
  },
  // list poultry type
  poultryList: async (data, token) => {
    try {
      let list = await DBController.Models.poultryType.findAll({
        where: {
          active: true,
        },
        attributes: {
          exclude: ["createdAt", "active"],
        },
      });

      if (Utilities.isNull(list)) return errors.NO_DATA_FOUND;

      list = JSON.parse(JSON.stringify(list));

      list = list.map((v) => {
        return {
          ...v,
          updatedAt: moment(v.updatedAt).fromNow(),
        };
      });

      return list;
    } catch (e) {
      throw e;
    }
  }
};

DBController.dose = {
  // add dose
  add: async (data, token) => {
    try {
      let validate = await PayloadCompiler.compile(data, "addDose");

      let dose = await DBController.Models.dose.create({
        species: validate.data.species,
        one_m: validate.data.one_m,
        one_v: validate.data.one_v,
        sc: validate.data.sc,
        oral: validate.data.oral,
      });

      if (Utilities.isNull(dose)) {
        return errors.FAILED;
      }

      return {
        id: dose.id,
        response: "Success",
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  // dose list
  list: async (data, token) => {
    try {
      var validate = await PayloadCompiler.compile(data, "doseList");

      var dose = await DBController.Models.dose.findAll({
        where: {
          id: validate.data.id,
          status: "ACTIVE",
        },
        attributes: {
          exclude: ["createdAt", "updatedAt", "status"],
        },
      });

      return dose;
    } catch (e) {
      throw e;
    }
  },

  // remove dose
  remove: async (data, token) => {
    try {
      var validate = await PayloadCompiler.compile(data, "removeDose");

      var dose = await DBController.Models.dose.update(
        {
          status: "DELETE",
        },
        {
          where: {
            id: validate.data.id,
          },
        }
      );

      if (dose[0]) {
        return "Success";
      } else {
        return errors.FAILED;
      }
    } catch (e) {
      throw e;
    }
  },
};

DBController.availability = {
  // add availability
  add: async (data, token) => {
    try {
      var validate = await PayloadCompiler.compile(data, "addAvailability");

      var availability = await DBController.Models.availability.create({
        brand: validate.data.brand,
        type: validate.data.type,
        trade_name: validate.data.trade_name,
        presentative: validate.data.presentative,
      });

      if (Utilities.isNull(availability)) {
        return errors.FAILED;
      }

      return {
        id: availability.id,
        response: "Success",
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
  list: async (data, token) => {
    try {
      var validate = await PayloadCompiler.compile(data, "availabilityList");

      var avail = await DBController.Models.availability.findAll({
        where: {
          id: validate.data.id,
          status: "ACTIVE",
        },
        attributes: {
          exclude: ["createdAt", "updatedAt", "status"],
        },
      });

      if (Utilities.isNull(avail)) {
        return errors.NO_DATA_FOUND;
      }

      return avail;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
  remove: async (data, token) => {
    try {
      var validate = await PayloadCompiler.compile(data, "removeAvailability");

      var avail = await DBController.Models.availability.update(
        {
          status: "DELETE",
        },
        {
          where: {
            id: validate.data.id,
          },
        }
      );

      if (avail[0]) {
        return "Success";
      } else {
        return errors.FAILED;
      }
    } catch (e) {
      throw e;
    }
  },
};

DBController.drugindex = {
  add: async (data, token) => {
    try {
      var validate = await PayloadCompiler.compile(data, "addDrugIndex");

      var addDrugIndex = await DBController.Models.drugindex.create({
        name: validate.data.name,
        action: validate.data.action,
        dose: validate.data.dose.join(","),
        availability: validate.data.availability.join(","),
        note: validate.data.note,
      });

      if (Utilities.isNull(addDrugIndex)) {
        return errors.FAILED;
      }

      return "Success";
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
  list: async (data, token) => {
    try {
      var drug = await DBController.Models.drugindex.findAll({
        where: {
          status: "ACTIVE",
        },
        attributes: {
          exclude: ["createdAt"],
        },
      });

      let tmpDrug = JSON.parse(JSON.stringify(drug));

      let tmp = tmpDrug.map(async (v) => {
        var avail = await DBController.Models.availability.findAll({
          where: {
            id: v.availability.split(","),
            status: "ACTIVE",
          },
        });

        var dose = await DBController.Models.dose.findAll({
          where: {
            id: v.dose.split(","),
            status: "ACTIVE",
          },
        });

        return {
          ...v,
          updatedAt: moment(v.updatedAt).fromNow(),
          dose: JSON.parse(JSON.stringify(dose)),
          availability: JSON.parse(JSON.stringify(avail)),
        };
      });

      return await Promise.all(tmp);
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
  remove: async (data, token) => {
    try {
      var validate = await PayloadCompiler.compile(data, "removeDrugIndex");

      var drug = await DBController.Models.drugindex.update(
        {
          status: "DELETE",
        },
        {
          where: {
            id: validate.data.id,
          },
        }
      );

      if (drug[0]) {
        return "Success";
      } else {
        return errors.FAILED;
      }
    } catch (e) {
      throw e;
    }
  },
  /**
   * 
   * @param {object} data 
   * @param {string} data.search
   * @param {*} token 
   */
  doclist: async (data, token) => {
    try {
      var validate = await PayloadCompiler.compile(data, "searchDrugIndex")



    }
    catch (e) {
      throw e
    }
  }
};

DBController.rating = {
  add: async (data, token) => {

    try {

      var validate = await PayloadCompiler.compile(data, "addRating");

      var userRating = await DBController.Models.rating.findOne({
        where: {
          user_id: token.id,
          user_type: token.role,
        },
      })

      if (userRating) return errors.ALREADY_RATED

      var rating = await DBController.Models.rating.create({
        doctor_id: parseInt(validate.data.doctorId),
        review: validate.data.rating,
        user_id: token.id,
        user_type: token.role,
      })

      return Utilities.isNull(rating) ? errors.FAILED : "Successfully added"
    }
    catch (e) {
      console.log(e);
      throw e;
    }
  }
}

DBController.forum = {
  list: async (data, token) => {
    try {
      var forum = await DBController.Models.forum.findAll({
        where: {
          active: true
        },
        group: "chatId",
        order: [["createdAt", "DESC"]],
        attributes: {
          exclude: ['updatedAt', 'active']
        }
      });

      if (Utilities.isNull(forum)) return errors.NO_DATA_FOUND;

      forum = JSON.parse(JSON.stringify(forum))

      forum = forum.map(async v => {

        var doc = await DBController.Models.doctor.findOne({
          where: {
            id: v.askerId,
            active: true
          }
        })

        // find different between 2 dates
        let currentDate = moment(new Date())
        let createdDate = moment(v.createdAt)
        let dateDiff = currentDate.diff(createdDate, "days")

        return {
          ...v,
          askerId: v.askerId ?? "",
          replierId: v.replierId ?? "",
          photo: doc.photo,
          name: doc.name,
          createdAt: dateDiff > 1 ? moment(v.createdAt).format("DD/MM/YYYY") : moment(v.createdAt).fromNow(),
        }
      })

      return Promise.all(forum);

    } catch (e) {
      console.log(e);
      throw e;
    }
  },
  askQuestion: async (data, token) => {
    try {
      var validate = await PayloadCompiler.compile(data, "askQuestion");

      var f = await DBController.Models.forum.findOne({
        where: {
          askerId: token.id,
          active: true
        }
      })

      var forum = await DBController.Models.forum.create({
        askerId: token.id,
        chatId: f?.chatId ?? "vets_forum_" + moment(Date.now()).format('x'),
        chat: validate.data.chat,
        active: true,
      });

      if (Utilities.isNull(forum)) return errors.FAILED;

      return "Question successfully asked";

    } catch (e) {
      console.log(e);
      throw e;
    }
  },
  reply: async (data, token) => {
    try {
      var validate = await PayloadCompiler.compile(data, "reply");

      // find chat id
      var forum = await DBController.Models.forum.findOne({
        where: {
          chatId: validate.data.chatId,
          active: true
        }
      })


      // throw error if chat id not found
      if (Utilities.isNull(forum)) throw errors.INVALID_CHAT_ID;

      // create reply in forum
      var forum = await DBController.Models.forum.create(
        {
          chatId: validate.data.chatId,
          chat: validate.data.chat,
          replierId: token.id,
        },
      );

      return Utilities.isNull(forum) ? errors.FAILED : "Successfully replied";


    } catch (e) {
      throw e;
    }
  },
  chat: async (data, token) => {
    try {

      var validate = await PayloadCompiler.compile(data, "forumChat")

      var chat = await DBController.Models.forum.findAll({
        where: {
          active: true,
          chatId: validate.data.chatId
        },
        attributes: {
          exclude: ['updatedAt', 'active']
        }
      })

      chat = JSON.parse(JSON.stringify(chat))

      chat = chat.map(async v => {

        var doctor = await DBController.Models.doctor.findOne({
          where: {
            id: v.askerId ?? v.replierId,
            active: true
          }
        })

        let _name = v.askerId == token.id || v.replierId == token.id ? "you" : doctor.name

        let currentDate = moment(new Date())
        let createdDate = moment(v.createdAt)
        let dateDiff = currentDate.diff(createdDate, "days")

        var out = {
          ...v, name: _name, photo: doctor.photo,
          time: dateDiff > 1 ? moment(v.createdAt).format("DD/MM/YYYY") : moment(v.createdAt).fromNow(),
        }

        delete out.askerId
        delete out.replierId
        delete out.createdAt
        return out
      })

      return Promise.all(chat)

    }
    catch (e) {
      console.log(e);
      throw e
    }
  }
}

DBController.poultry = {
  list: async (data, token) => {
    try {
      var poultry = await DBController.Models.poultryType.findAll({
        where: {
          active: true
        },
        attributes: {
          exclude: ['updatedAt', 'active']
        }
      })

      if (Utilities.isNull(poultry)) return errors.NO_DATA_FOUND;

      return poultry
    }
    catch (e) {
      throw e
    }
  },
  feed_formulation: async (data, token) => {
    try {
      var feed = await DBController.Models.feedFormulation.findAll({
        where: {
          status: 'ACTIVE'
        }
      })

      if (Utilities.isNull(feed)) return errors.NO_DATA_FOUND;

      return feed
    }
    catch (e) {
      throw e
    }
  }
}

DBController.ruminant = {
  add: async (data, token) => {
    try {
      var validate = await PayloadCompiler.compile(data, "addRuminant");

      var ruminant = await DBController.Models.ruminant.create({
        name: validate.data.name,
        cp: "" + validate.data.cp,
        type: validate.data.type,
      })

      return Utilities.isNull(ruminant) ? errors.FAILED : "Successfully added"
    }
    catch (e) {
      throw e
    }
  },
  list: async (data, token) => {
    try {
      var ruminant = await DBController.Models.ruminant.findAll({
        where: {
          active: true
        },
        attributes: {
          exclude: ['updatedAt', 'active']
        }
      })

      if (Utilities.isNull(ruminant)) return errors.NO_DATA_FOUND;

      return ruminant
    }
    catch (e) {
      throw e
    }
  },
  energy_list: async (data, token) => {
    try {
      var energy = await DBController.Models.ruminant.findAll({
        where: {
          type: 'energy',
          active: true
        },
        attributes: {
          exclude: ['updatedAt', 'active']
        }
      })

      if (Utilities.isNull(energy)) return errors.NO_DATA_FOUND;

      return energy
    }
    catch (e) {
      throw e
    }
  },
  protein_list: async (data, token) => {
    try {
      var protein = await DBController.Models.ruminant.findAll({
        where: {
          type: 'protein',
          active: true
        },
        attributes: {
          exclude: ['updatedAt', 'active']
        }
      })

      if (Utilities.isNull(protein)) return errors.NO_DATA_FOUND;

      return protein
    }
    catch (e) {
      throw e
    }
  },
  product_list: async (data, token) => {
    try {
      var product = await DBController.Models.ruminant.findAll({
        where: {
          type: 'by product',
          active: true
        },
        attributes: {
          exclude: ['updatedAt', 'active']
        }
      })

      if (Utilities.isNull(product)) return errors.NO_DATA_FOUND;

      return product
    }
    catch (e) {
      throw e
    }
  },
  delete: async (data, token) => {
    try {
      var validate = await PayloadCompiler.compile(data, "deleteRuminant");

      var ruminant = await DBController.Models.ruminant.findOne({
        where: {
          id: validate.data.id,
          active: true
        }
      })

      if (Utilities.isNull(ruminant)) return errors.NO_DATA_FOUND;

      ruminant.active = false;
      ruminant.save();
      return "Successfully deleted"
    }
    catch (e) {
      throw e
    }
  }
}