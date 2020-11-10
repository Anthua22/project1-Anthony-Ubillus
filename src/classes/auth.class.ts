import { SERVER } from "../constants";
import { TokenResponse } from "../interfaces/responses";
import { Http } from "./http.class";
import { User } from "./user.class";

export class Auth {

    password: string;
    email: string;
    lat?: number;
    lng?: number;
    constructor(user: User) {
        this.email = user.email,
            this.password = user.password;
        this.lat = user.lat;
        this.lng = user.lng;
    }

  

    static async checkToken(): Promise<void>{
        let token = localStorage.getItem('token');
        if(token){
            try{
                await Http.get(`${SERVER}/auth/validate`);
            }catch(e){
                if(e.status && e.status===401){
                    localStorage.removeItem('token');
                }
                throw new Error();
            }
        }else{
            throw new Error();
        }
    }

    postLogin(): Promise<TokenResponse> {
        let peticion: Promise<TokenResponse> = Http.post(SERVER + "/auth/login", this);
        return peticion;
    }

    static logout(): void {
        localStorage.removeItem('token');
        location.assign("login.html");
    }

}
