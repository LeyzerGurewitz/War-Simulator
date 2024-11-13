import User, {IUser} from '../models/userModel';



export const findUserName = async (userName: string): Promise<boolean> => {
    const isFindUser = await User.findOne({ userName });
    if (isFindUser) {
        throw new Error('User already exists');
    }
    return true;
}

export const createUser = async (user: IUser): Promise<IUser> => {
    const newUser = await User.create(user);
    if (!newUser) {
        throw new Error("Failed to create new teacher");
    }
    return newUser;
}

export const findUserInDB = async(userName: string): Promise<IUser > =>{
    const newUser = await User.findOne({ userName: userName });
    if(!newUser){
        throw new Error("No user found")
    }
    return newUser
}

