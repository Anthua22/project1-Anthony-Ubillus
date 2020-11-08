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
        this.email=user.email,
        this.password=user.password;
        this.lat = user.lat;
        this.lng = user.lng;
    }

    static validateToken(): boolean {
        if (localStorage.token != null) {
            return true;
        }
        return false;
    }

    postLogin():Promise<TokenResponse> {
        let peticion:Promise<TokenResponse>= Http.post(SERVER + "/auth/login", this);
        return peticion;
    }

    
}
