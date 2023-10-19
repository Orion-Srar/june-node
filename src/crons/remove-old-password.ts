import {CronJob} from "cron";
import dayjs from "dayjs";
import {OldPassword} from "../models";

const passwordRecover = async () => {

    const previousYear = dayjs().subtract(1, 'year');

    await OldPassword.deleteMany({
        createdAt: {$lte: previousYear},
    });

};

export const removerOldPassword = new CronJob('0 0 0 * * *', passwordRecover);