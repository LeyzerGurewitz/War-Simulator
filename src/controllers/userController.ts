import { NextFunction, Request, Response } from "express";
import {createToken} from "../utils/jwtUtils";
import { createUserService, findUserService } from "../service/userService";

export const registerUser = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> =>{
    try {
        const {userName, password, organization  } = req.body;
        console.log(userName, password,  organization )
        if(!userName ||  !password || ! organization ){
            throw new Error ("Missing name or  organization  or password")
        }

        const user = await createUserService(userName, password,  organization );
        res.status(201).json(user);
        } 
        
     catch (error) {
        next(error)
     }
}


export const loginUser =  async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> =>{
    try {
        const {userName, password} = req.body;
        if(!userName ||  !password){
            throw new Error ("Missing name or password")
        }
        const user = await findUserService(userName, password);
        if(user){
            const token = createToken(
                { _id: user._id, status: user.organization},
                '1d'
            );
            res.status(201).json({ message: "Login successful", user: { id: user._id,  role: user.organization ,token: token  } });
        }
        else {
            res.status(401).json({ message: "Authentication failed" });
          }

    } catch (error) {
        next(error)        
    }
}

