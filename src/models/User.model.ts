import {Schema, model} from 'mongoose';

import {EGenders} from "../enums";
import {EUserStatus} from "../enums/user-status.enum";


const userSchema = new Schema({
    name: {
        type: String,
    },
    age: {
        type: Number,
        min: [1, 'Minimum value for age is 1'],
        max: [99, 'Maximum value for age is 99'],
    },
    gender: {
        type: String,
        enum: EGenders,
    },
    status: {
        type: String,
        default: EUserStatus.Inactive,
        enum: EUserStatus,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    avatar: {
        type: String,
        required: false,
    },
    phone: {
        type: String,
        trim: true,
        required: true,
    }

},{
    versionKey: false,
    timestamps: true
});

export const User = model('User', userSchema)