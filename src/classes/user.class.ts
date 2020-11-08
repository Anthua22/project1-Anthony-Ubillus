
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

  

    static postRegister(user: User) :Promise<String>{
        let peticion:Promise<String> = Http.post(SERVER + "/auth/register", user);
        return peticion;
    }
    static async getProfile(id?: number): Promise<User>{
        return null;
    }
    static async saveProfile(name: string, email: string): Promise<void>{
        return null;
    }
    static async saveAvatar(avatar: string): Promise<string>{
        return null;
    }
    static async savePassword(password: string): Promise<void>{
        return null;
    }
    toHTML(): HTMLDivElement{
        return null;
    }
}