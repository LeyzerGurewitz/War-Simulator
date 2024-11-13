import { createUser, findUserName, findUserInDB } from '../DAL/userDAL';
import {findOrganizationById} from '../DAL/organizationDAL'
import User, { IUser } from '../models/userModel'
import bcrypt from "bcrypt";


export const createUserService = async(userName :string, password: string, organization: string ): Promise<IUser> => {
    const isFindUserName = await findUserName(userName);
    const organizationById = await findOrganizationById(organization);
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user= new User({
        userName: userName,
        password: hashedPassword,
        organization:organizationById._id,
        organizationName:organizationById.name,
       
        
    })
    const newUser = await createUser(user);
    return newUser
}

export const findUserService= async (userName: string, password: string): Promise<IUser> => {
   
    const userFind = await findUserInDB(userName);
  
    if (!userFind) {
      throw new Error("Invalid username or password.");
    }
    
    const passwordMatch = bcrypt.compareSync(password, userFind.password);
  
    if (!passwordMatch) {
      throw new Error("Invalid username or password.");
    }
  
    return userFind; 
  };