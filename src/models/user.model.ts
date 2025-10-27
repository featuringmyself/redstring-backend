import mongoose, { Schema, Document } from "mongoose"
import { IProfile } from "./profile.model.js";

export interface IUser extends Document {
    ip: string;
    credit: number;
    unlockedProfiles: Array<IProfile['_id']>;
}

export const UserSchema = new Schema<IUser>({
    ip: {
        type: String,
        required: true
    },
    credit: {
        type: Number,
        default: 200
    },
    unlockedProfiles: [{
        type: Schema.Types.ObjectId,
        ref: "Profile"
    }]
}, { timestamps: true });

export default mongoose.model<IUser>("User", UserSchema);
