import jwt from "jsonwebtoken";
import moment from "moment";
import { errors } from "../lib/string.js";
import { logger } from "./logger.js";
import require from "requirejs";
const useragent = require('useragent')
import { env } from "../lib/env.js";



/**
 * @name Utilities
 */

export class Utilities { }

/**
 * @name JwtToken
 */

Utilities.JwtToken = {
  /**
   * @name Generate
   * @param {*} payload
   * @param {*} secret
   */
  generate: async (payload, secret) => {
    try {
      return jwt.sign(payload, secret, {
        algorithm: "HS256",
      });
    } catch (error) {
      return null;
    }
  },
  /**
   * @name Verify
   * @param {*} token
   * @param {*} secret
   */
  verify: async (token, secret) => {
    try {
      return jwt.verify(token, secret);
    } catch (error) {
      return null;
    }
  },
};

/**
 * @name Email
 */

Utilities.Email = {
  /**
   * @name CheckTempMail
   * @param {*} email
   */
  isDisposable: async (email) => {
    return new Promise((resolve, reject) => {
      https.get(
        new URL(`https://disposable.debounce.io/?email=${email}`),
        (resp) => {
          let data = "";
          resp.on("data", (chunk) => {
            data += chunk;
          });
          resp.on("end", () => {
            if (data) {
              data = JSON.parse(data);
              if (data.disposable == "false") {
                resolve(false);
              } else resolve(true);
            } else resolve(true);
          });
          resp.on("error", (err) => {
            resolve(true);
          });
        }
      );
    });
  },
};

Utilities.isNull = (data) => {
  return (
    data == null ||
    data == undefined ||
    data.length == 0 ||
    Object.keys(data).length == 0
  );
};

Utilities.isNotNull = (data) => !Utilities.isNull(data);

Utilities.validateDate = (date) => {
  return date.includes("/");
};



Utilities.internalError = (res) => {
  res.status(500).json({
    status: false,
    message: errors.SERVER_ERROR,

  });
};



Utilities.randomToken = () => Math.random().toString(36).substring(2, 15) + moment().format('x')

Utilities.validateResponse = (data) => {
  let SUCCESS = 200;
  let ERROR = 400;
  let UNAUTHORIZED = 401;
  let FORBIDDEN = 403;
  let NOT_FOUND = 404;
  let CONFLICT = 409;
  let NO_CONTENT = 410;

  let status = true;
  let statusCode = SUCCESS;

  switch (data) {
    case null:
      status = false;
      statusCode = NOT_FOUND;
      break;
    case errors.NO_PET_FOUND:
      status = false;
      statusCode = NOT_FOUND;
      break;
    case errors.INVALID_DATA:
      status = false;
      statusCode = CONFLICT;
      break;
    case errors.LOGIN_FAILED:
      status = false;
      statusCode = UNAUTHORIZED;
      break;
    case errors.PHONE_EXIST:
      status = false;
      statusCode = CONFLICT;
      break;
    case errors.EMAIL_PASSWORD_INCORRECT:
      status = false;
      statusCode = UNAUTHORIZED;
      break;
    case errors.FAILED:
      status = false;
      statusCode = CONFLICT;
      break;
    case errors.INVALID_TOKEN:
      status = false;
      statusCode = UNAUTHORIZED;
      break;
    case errors.INVALID_OTP:
      status = false;
      statusCode = CONFLICT;
      break;
    case errors.PHONE_NUMBER_NOT_VERIFIED:
      status = false;
      statusCode = UNAUTHORIZED;
      break;
    case errors.NO_DATA_FOUND:
      status = false;
      statusCode = NOT_FOUND;
      break;
    case errors.UNAUTHORIZED:
      status = false;
      statusCode = UNAUTHORIZED;
      break;
    case errors.ALREADY_RATED:
      status = false;
      statusCode = ERROR;
      break;
    case errors.MSG91_INVALID_PHONE_NUMBER:
      status = false;
      statusCode = SUCCESS;
      break;
    case errors.MSG91_OTP_FAILED:
      status = false;
      statusCode = SUCCESS;
      break;
    default:
      break;
  }

  return { status: status, statusCode: statusCode };
};

Utilities.log = (req) => {
  var remote = req.connection.remoteAddress;
  var ipArr = remote.split(":")
  var ip = ipArr[ipArr.length - 1]
  logger.info(`[IP] ${ip} [USER_AGENT] '${useragent.parse(req.headers['user-agent']).toString()}' [REQUEST_METHOD] ${req.method} [REQUEST_URL] '${env.BASE_URL}${req.originalUrl}'`)
};