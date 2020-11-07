import { SERVER } from "../constants";
import { IUser } from "../interfaces/iuser";
import { Http } from "./http.class";

export class User implements IUser {
    name?: string;
    email: string;
    id?: number;
    password?: string;
    photo?: string;
    me?: boolean;
    lat?: number;
    lng?: number;

  
   
}