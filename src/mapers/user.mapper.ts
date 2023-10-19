import {IUser} from "../types";
import {configs} from "../configs";

class UserMapper {

    public toResponse(user: IUser) {
        return {
            _id: user.id,
            name: user.name,
            age: user.age,
            email: user.email,
            gender: user.gender,
            avatar: user.avatar ? `${configs.AWS_S3_URL}/${user.avatar}` : null,
        }
    }
};

export const userMapper = new UserMapper();