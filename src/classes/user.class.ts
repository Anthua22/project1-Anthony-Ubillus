
import { IUser } from "../interfaces/iuser";

export class User implements IUser {
    name?: string;
    email: string;
    id?: number;
    password?: string;
    photo?: string;
    me?: boolean;
    lat?: number;
    lng?: number;

  
    static validateToken():boolean{
        if(localStorage.token!= null){
            return true;
        }
        return false;
    }
   
}