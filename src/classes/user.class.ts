
import { SERVER } from "../constants";
import { IUser } from "../interfaces/iuser";
import { PhotoResponse, UserResponse } from "../interfaces/responses";
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
  

   
    static async getProfile(id?: number): Promise<UserResponse>{
        let peticion:Promise<UserResponse> ;
        if(id){
            peticion = Http.get(SERVER + `/users/${id}`);
        }
        else{
            peticion = Http.get(SERVER + `/users/me`);
        }
        return peticion;
    }

   
    static async saveProfile(name: string, email: string): Promise<void>{
        let peticion:Promise<void>=Http.put(SERVER + `/users/me`,{name:name,email:email});
        return peticion;
    }
    static async saveAvatar(avatar: string): Promise<string>{
        let peticion:Promise<string>=Http.put<PhotoResponse>(SERVER + `/users/me/photo`,{photo:avatar}).then(x=>{return x.photo});
        return peticion;
    }
    static async savePassword(password: string): Promise<void>{
        let peticion:Promise<void>=Http.put(SERVER + `/users/me/password`,{password:password});
        return peticion;
    }

    toHTML(): HTMLDivElement{
        let div : HTMLDivElement = document.createElement('div');
        div.classList.add("row","mt-4");
        let userHtml = profileTemplate(this);
        div.innerHTML = userHtml;
        return div;
    }
}