import {Document} from 'mongoose';

export interface IUser extends Document{
    name?: string;
    age?: number;
    email: string;
    password: string;
    gender?: string;
}

