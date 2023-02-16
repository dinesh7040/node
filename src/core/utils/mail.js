import require from "requirejs";
import { log } from "../lib/log.js";
import ejs from "ejs";
import path from "path";
const __dirname = path.resolve();
const dir = path.join(__dirname, "./src/core/views/ui/");
var sendmail = require("sendmail")({
  devHost: "localhost",
  devPort: 587,
});

export const mailer = {
  send: async (mail) => {
    try {
      let today = new Date();
      let months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      let userData = {
        username: mail.username,
        link: mail.link,
        invoice_date: `${
          months[today.getMonth() + 1]
        } ${today.getDate()}, ${today.getFullYear()}`,
        gmail: mail.to,
        bookedid: mail.bookedid,
        total: mail.total,
        times: mail.times,
        prices: mail.prices,
      };

      ejs.renderFile(dir + mail.template, userData, async (err, page) => {
        if (err) {
          log.error(err);
          return err;
        }

        const mainOptions = {
          from: "noreply@sportswander.com",
          to: mail.to,
          subject: mail.subject,
          html: page,
          secure: false,
        };
        return sendmail(mainOptions);
      });
    } catch (e) {
      log.warn("MAIL SEND FAILED !");
      log.error(e);
    }
  },
};
