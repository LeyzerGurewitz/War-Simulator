import { Schema, model, Types } from 'mongoose';
import { IOrganization } from './organizations'; 

export interface IUser {
    _id: Types.ObjectId;
    userName: string;
    password: string;
    organization: Types.ObjectId; 
    organizationName: string
    
}


const UserSchema = new Schema<IUser>(
    {
        userName: {
            type: String,
            required: [true, "Please provide a user name"],
            minlength: [3, "User name must be at least 3 characters"],
            maxlength: [30, "User name can have at most 30 characters"],
        },
        password: {
            type: String,
            required: [true, "Please provide a password"]
        },
        organization: {
            type: Schema.Types.ObjectId,
            ref: 'Organization', 
            required: [true, "Please specify an organization"]
        },
        organizationName:{
            type: String,
            required: [true, "Please provide a organizationName"]
        }

    }
);

export default model<IUser>('User', UserSchema);
