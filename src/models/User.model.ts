import {Schema, model} from 'mongoose';

import {EGenders} from "../enums";


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

},{
    versionKey: false,
    timestamps: true
});

export const User = model('User', userSchema)