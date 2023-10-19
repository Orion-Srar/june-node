import {CronJob} from 'cron';
import dayjs from 'dayjs';
import {Token} from "../models";

const tokensRecover = async () => {
    const previousMonth = dayjs().subtract(1, "month");

    await Token.deleteMany({
        createdAt: { $lte: previousMonth},
    })
};

export const removeOldTokens = new CronJob('* * * * * *', tokensRecover);