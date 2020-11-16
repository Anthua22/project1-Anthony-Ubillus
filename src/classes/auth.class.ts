import { SERVER } from "../constants";
import { IUser } from "../interfaces/iuser";
import { TokenResponse } from "../interfaces/responses";
import { Http } from "./http.class";
import { User } from "./user.class";

export class Auth {

  

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

    static login(user:IUser): Promise<TokenResponse> {
        let peticion: Promise<TokenResponse> = Http.post(SERVER + "/auth/login", user);
        return peticion;
    }

    static logout(): void {
        localStorage.removeItem('token');
        location.assign("login.html");
    }

}
