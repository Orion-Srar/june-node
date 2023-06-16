import {EEmailActions} from "../enums";
import {emailService} from "./email.service";
import {ApiError} from "../errors";
import {Token, User} from "../models";
import {tokenService} from "./token.service";
import {ICredentials, ITokenPair, ITokenPayload, IUser} from "../types";
import {passwordService} from "./password.service";

class AuthService {
    public async register(data: IUser): Promise<void> {
        try {
            const hashedPassword = await passwordService.hash(data.password);

            await User.create({...data, password: hashedPassword});
            await emailService.sendMail(data.email, EEmailActions.WELCOME, {name: data.name});

        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    }

    public async login(credentials: ICredentials, user: IUser): Promise<ITokenPair> {
        try {
            const isMatched = await passwordService.compare(credentials.password, user.password);

            if (!isMatched) {
                throw new ApiError('Invalid email or password', 401);
            }

            const tokensPair = await tokenService.generateTokenPair({_id: user._id, name: user.name})

            await Token.create({
                ...tokensPair,
                _userId: user._id,
            })

            return tokensPair;

        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    }

    public async refresh(oldTokenPair: ITokenPair, tokenPayload: ITokenPayload): Promise<ITokenPair> {
        try {
            const tokenPair = await tokenService.generateTokenPair(tokenPayload);
            await Promise.all([
                Token.create({_userId: tokenPayload._id, ...tokenPair}),
                Token.deleteOne({refreshToken: oldTokenPair.refreshToken}),
            ])
            return tokenPair;
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    }
}

export const authService = new AuthService();