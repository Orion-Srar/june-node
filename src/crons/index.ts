import {removeOldTokens} from "./remove-old-token.cron";
import {removerOldPassword} from "./remove-old-password";

export const cronRunner = () => {
    removeOldTokens.start();
    removerOldPassword.start();
};
