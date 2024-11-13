import { Schema, model, Types } from 'mongoose';

export interface IMissile {
    _id: Types.ObjectId;
    name: string;
    description: string;
    speed: number;
    intercepts: string[]; 
    price: number;
}

const MissileSchema = new Schema<IMissile>(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        speed: {
            type: Number,
            required: true
        },
        intercepts: {
            type: [String], 
            default: []
        },
        price: {
            type: Number,
            required: true
        }
    }
);

export default model<IMissile>('Missile', MissileSchema);
