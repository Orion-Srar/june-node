import { model, Schema, Types } from "mongoose";

import { EActionTokenTypes } from "../enums";
import { User } from "./User.model";

const actionsSchema = new Schema({
    actionToken: {
        type: String,
        required: true,
    },
    tokenType: {
        type: String,
        required: true,
        enum: EActionTokenTypes,
    },
    _userId: {
        type: Types.ObjectId,
        required: true,
        ref: User,
    }
});

export const Action = model('actions', actionsSchema);