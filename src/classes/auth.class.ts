import { SERVER } from "../constants";
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

    static postRegister(user: User) {
        let peticion = Http.post(SERVER + "/auth/register", user);
        return peticion;
    }

    postLogin() {
        let peticion = Http.post(SERVER + "/auth/login", this);
        return peticion;
    }
}
