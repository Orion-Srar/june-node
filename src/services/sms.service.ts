import {Twilio} from 'twilio';
import {configs} from "../configs";
import {ESmsActions} from "../enums/sms.enum";
import {smsTemplates} from "../constants/sms.constants";

class SmsService {
    constructor(private client = new Twilio(configs.TWILIO_ACCOUNT_SID, configs.TWILIO_TOKEN)) {}

    public async sentSms (phone: string, action: ESmsActions){
        try {
            const template = smsTemplates[action];
            await this.client.messages.create({
                body: template,
                messagingServiceSid: configs.TWILIO_SERVICE_SID,
                to: phone,
            })
        }catch (e) {
            console.error(e.message)
        }
    }
};

export const smsService = new SmsService();