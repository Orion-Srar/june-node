import * as jwt from 'jsonwebtoken';

import {ITokenPair, ITokenPayload} from "../types";
import {configs} from "../configs";
import {ApiError} from "../errors";
import {ETokenType} from "../enums";

class TokenService {
    public generateTokenPair(payload: ITokenPayload): ITokenPair {
        const accessToken = jwt.sign(payload, configs.JWT_ACCESS_SECRET, {expiresIn: '50s'})
        const refreshToken = jwt.sign(payload, configs.JWT_REFRESH_SECRET, {expiresIn: '30d'})

        return {
            accessToken,
            refreshToken
        }
    };

    public checkToken(token: string, type: ETokenType): ITokenPayload {
        try {
            let secret: string;

            switch (type) {
                case ETokenType.Access:
                    secret = configs.JWT_ACCESS_SECRET;
                    break;
                case ETokenType.Refresh:
                    secret = configs.JWT_REFRESH_SECRET;
                    break;
            }

            return jwt.verify(token, secret) as ITokenPayload;
        } catch (e) {
            throw new ApiError('Token not valid', 401);
        }
    }
}

export const tokenService = new TokenService();
