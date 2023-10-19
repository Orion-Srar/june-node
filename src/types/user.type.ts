import {Document} from 'mongoose';

export interface IUser extends Document{
    name?: string;
    age?: number;
    email: string;
    avatar?:string;
    password: string;
    phone: string;
    gender?: string;
}

