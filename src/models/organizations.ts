import { model, Schema, Types } from 'mongoose'


export interface IOrganization {
    _id: Types.ObjectId;
    name: EOrganization;
    resources: {
        missile: Types.ObjectId;
        amount: number;
    }[];
    budget: number;
}

export enum EOrganization {
    IDF_North = "IDF - North",
    IDF_South = "IDF - South",
    IDF_Center = "IDF - Center",
    IDF_West_Bank = "IDF - West Bank",
    Hezbollah = "Hezbollah",
    Hamas = "Hamas",
    IRGC = "IRGC",
    Houthis = "Houthis"
};

const OrganizationSchema = new Schema<IOrganization>(
    {
        name: {
            type: String,
            required: true
        },
        resources: [
            {
                missile: {
                    type: Schema.Types.ObjectId,
                    ref: 'Missile', 
                    required: true
                },
                amount: {
                    type: Number,
                    required: true
                }
            }
        ],
        budget: {
            type: Number,
            required: true
        }
    }
);

export default model<IOrganization>('Organization', OrganizationSchema);
