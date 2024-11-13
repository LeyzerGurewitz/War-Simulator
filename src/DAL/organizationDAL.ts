import Organizations, {IOrganization}from "../models/organizations";

export const findOrganizationById = async (organization: string): Promise<IOrganization> => {
    const isFindOrganizations = await Organizations.findOne({ name : organization });
    if (!isFindOrganizations) {
        throw new Error('User already exists');
    }
    return isFindOrganizations;
}