import {User} from "../models";
import {IUser} from "../types";

class UserService {
    public async findAll(): Promise<IUser[]> {
        return await User.find().select("-password");
    }

    public async create(data: IUser): Promise<any> {
        return await User.create(data);
    }

    public async findById(id: string): Promise<IUser> {
        return await User.findById(id);
    }

    public async update(id: string, value: IUser): Promise<IUser> {
        return await User.findOneAndUpdate({_id: id}, {...value}, {returnDocument: "after"})
    }

    public async delete(id: string) {
        return await User.deleteOne({_id: id});
    }


}

export const userService = new UserService();