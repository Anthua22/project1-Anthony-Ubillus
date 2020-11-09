
import { SERVER } from "../constants";
import { IUser } from "../interfaces/iuser";
import { UserResponse } from "../interfaces/responses";
import { Http } from "./http.class";
const profileTemplate: (product: IUser) => string = require("../../templates/profile.handlebars");

export class User implements IUser {
    name?: string;
    email: string;
    id?: number;
    password?: string;
    photo?: string;
    me?: boolean;
    lat?: number;
    lng?: number;

    constructor(user:IUser){
        this.email = user.email;
        this.id = user.id;
        this.password = user.password;
        this.photo = user.photo;
        this.lat = user.lat;
        this.lng = user.lng;
        this.me = user.me;
        this.name = user.name;
    }
  

    static postRegister(user: User) :Promise<String>{
        let peticion:Promise<String> = Http.post(SERVER + "/auth/register", user);
        return peticion;
    }
    static async getProfile(id?: number): Promise<UserResponse>{
        let peticion:Promise<UserResponse> = Http.get(SERVER + `/users/${id}`);
        return peticion;
    }

    static async getmyProfile(): Promise<UserResponse>{
        let peticion:Promise<UserResponse> = Http.get(SERVER + `/users/me`);
        return peticion;
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
        let div : HTMLDivElement = document.createElement('div');
        let userHtml = profileTemplate(this);
        div.innerHTML = userHtml;
        return div;
    }
}