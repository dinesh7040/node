import require from 'requirejs';
const Paytm = require('paytm-pg-node-sdk')
const axios = require('axios');
const https = require('https');
import PaytmChecksum from 'paytmchecksum';
import { ResponseHeader } from 'paytm-pg-node-sdk';


export class paytm { }

paytm.initialize = () => {
    // for staging
    const environment = Paytm.LibraryConstants.STAGING_ENVIRONMENT;

    // for production
    // const environment = paytm.LibraryConstants.PRODUCTION_ENVIRONMENT;

    // Find your mid, key, website in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
    var mid = process.env.MID;
    var key = process.env.MERCHANT_KEY;
    var website = "WEBSTAGING";



    Paytm.MerchantProperties.initialize(environment, mid, key, website);

}

paytm.generateToken = async ({
    orderId,
    userId,
    amount,
    mobile,
}) => {

    // paytm staging
    const callbackUrl = `https://securegw-stage.paytm.in/theia/paytmCallback?ORDER_ID=${orderId}`;

    // paytm production
    //const callbackUrl = `https://securegw.paytm.in/theia/paytmCallback?ORDER_ID=${orderId}`;

    Paytm.MerchantProperties.setCallbackUrl(callbackUrl);

    var channelId = Paytm.EChannelId.WAP;
    var txnAmount = Paytm.Money.constructWithCurrencyAndValue(Paytm.EnumCurrency.INR, `${amount}`);
    var userInfo = new Paytm.UserInfo(`${userId}`);
    userInfo.setMobile(mobile);

    var paymentDetailBuilder = new Paytm.PaymentDetailBuilder(channelId, orderId, txnAmount, userInfo);
    var paymentDetail = paymentDetailBuilder.build();
    var response = await Paytm.Payment.createTxnToken(paymentDetail);

    return response;
}


paytm.checkStatus = async (orderId) => {

    var orderId = orderId;
    var readTimeout = 80000;
    var paymentStatusDetailBuilder = new Paytm.PaymentStatusDetailBuilder(orderId);
    var paymentStatusDetail = paymentStatusDetailBuilder.setReadTimeout(readTimeout).build();
    var response = await Paytm.Payment.getPaymentStatus(paymentStatusDetail);
    return response;
}


paytm.orderStatus = async (orderId) => {

    var paytmParams = {};

    paytmParams.body = {
        "mid": process.env.MID,
        "orderId": orderId,
    };

    var resp;

    await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), process.env.MERCHANT_KEY).then(function (checksum) {
        /* head parameters */
        paytmParams.head = {
            "signature": checksum
        };

        let res = {}
        // for staging 
        res = axios.post('https://securegw-stage.paytm.in/v3/order/status', paytmParams)

        resp = res

        // for production
        // axios.post('https://securegw.paytm.in/v3/order/status', paytmParams).then(function (response) {
        //     console.log(response.data);
        // }).catch(function (error) {
        //     console.log(error);
        // })

    });

    return resp;
}