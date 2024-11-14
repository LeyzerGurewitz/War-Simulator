import Organizations, {IOrganization}from "../models/organizations";
import User from "../models/userModel";
import missiles from "../models/missiles";


export const findOrganizationById = async (organization: string): Promise<IOrganization> => {
    const isFindOrganizations = await Organizations.findOne({ name : organization });
    if (!isFindOrganizations) {
        throw new Error('User already exists');
    }
    return isFindOrganizations;
}


export const updateMissileCount = async (
    userId: string,
    missileName: string,
    change: number
  ) => {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
  
    const organization = await Organizations.findById(user.organization);
    if (!organization) {
      throw new Error("Organization not found");
    }
  
    const missile = organization.resources.find(
        (resource) => resource.name === missileName
      );
    
    if (!missile) {
      throw new Error(`Missile ${missileName} not found`);
    }
  
    if (missile.amount + change < 0) {
      throw new Error(`Not enough missile ${missileName}`);
    }
  
    missile.amount += change;
    await organization.save();
  };
  


  export const getMissileCount = async (
    userId: string,
    missileName: string
  ) => {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
  
    const organization = await Organizations.findById(user.organization);
    if (!organization) {
      throw new Error("Organization not found");
    }
  
    const missile = organization.resources.find(
      (resource) => resource.name === missileName
    );
  
    return missile ? missile.amount : 0;
  };
  