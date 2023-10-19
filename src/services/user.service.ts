import {User} from "../models";
import {IUser} from "../types";
import {UploadedFile} from "express-fileupload";
import {ApiError} from "../errors";
import {s3Service} from "./s3.service";

export interface IQuery {
    page: string;
    limit: string;

    [key: string]: string;
}

class UserService {
    public async findAll(): Promise<IUser[]> {
        return await User.find().select("-password");
    };

    public async findAllWithPagination(query: IQuery): Promise<IUser[]> {
        try {
            const {page = 1, limit = 10, ...searchObject}  = query;

            const skip = +limit * (+page - 1);
            const users = await User.find(searchObject).limit(+limit).skip(skip);

            return users;
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    }

    public async create(data: IUser): Promise<any> {
        return await User.create(data);
    };

    public async findById(id: string): Promise<IUser> {
        return await User.findById(id);
    };

    public async update(id: string, value: IUser): Promise<IUser> {
        return await User.findOneAndUpdate({_id: id}, {...value}, {returnDocument: "after"})
    };

    public async delete(id: string) {
        return await User.deleteOne({_id: id});
    };

    public async uploadAvatar(userId: string, avatar: UploadedFile): Promise<IUser> {

        const user = await this.getOneByIdOrThrow(userId);

        if (user.avatar) {
            await s3Service.deleteFile(user.avatar)
        }

        const pathToFile = await s3Service.uploadFile(avatar, 'user', userId);

        return await User.findByIdAndUpdate(userId, {$set: {avatar: pathToFile}}, {new: true});
    };

    public async deleteAvatar(userId: string): Promise<IUser> {

        const user = await this.getOneByIdOrThrow(userId);

        if (!user.avatar) {
            return user;
        }

        await s3Service.deleteFile(user.avatar)

        return await User.findByIdAndUpdate(userId, {$unset: {avatar: true}}, {new: true});
    };

    private async getOneByIdOrThrow(userId: string): Promise<IUser> {
        const user = User.findById(userId);

        if (!user) {
            throw new ApiError('User not found', 422);
        }

        return user;
    };

}

export const userService = new UserService();