import axios from "axios";
import Errors from "./errors.js";
export class sms {

    /** 
        @param phone - Phone number of the user
        @param name - Name of the user
    */
    static async sendOtp({ phone, name }) {

        try {
            let url = `https://api.msg91.com/api/v5/otp?template_id=${process.env.MSG_ID}&mobile=+91${phone}&authkey=${process.env.MSG_KEY}`
            let sms = await axios.post(url, { NAME: name })
            return sms.data.type
        }
        catch (e) {
            console.log(e);
            throw Errors.handleError({ error: "Sms send failed" })
        }
    }

    static async verifyOtp({ phone, otp }) {
        try {
            let url = `https://api.msg91.com/api/v5/otp/verify?otp=${otp}&authkey=${process.env.MSG_KEY}&mobile=+91${phone}`

            const verify = await axios.get(url)

            return verify.data.message
        }
        catch (e) {
            console.log(e);
            throw Errors.handleError({ error: "Sms verification failed" })
        }
    }
}