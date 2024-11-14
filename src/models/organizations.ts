import { Schema, model, Types } from 'mongoose';


export interface IOrganization {
    _id: Types.ObjectId;
    name: EOrganization; 
    resources: IResource[]; 
    budget: number; 
}


export interface IResource {
    name: string; 
    amount: number; 
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
                name: {
                    type: String,
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

