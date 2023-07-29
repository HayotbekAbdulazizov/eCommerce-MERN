// backend/main-api/src/models/User.ts
import mongoose, { Document } from 'mongoose';
import { IUser } from '../../../shared/common/types';

export interface IUserModel extends IUser, Document {}

const UserSchema = new mongoose.Schema<IUserModel>({
    email: { 
        type: String,
        required: true, 
        unique: true 
    },

    password: { 
        type: String, 
        required: true 
    },

});

export const UserModel = mongoose.model<IUserModel>('User', UserSchema);

