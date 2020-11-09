import Swal from "sweetalert2";
import { Auth } from "./classes/auth.class";
import * as ErrorMesagge from "./classes/responseError.class";
import { User } from "./classes/user.class";
import { IUser } from "./interfaces/iuser";

let form: HTMLFormElement;
let user: User;
let auth: Auth;


document.addEventListener('DOMContentLoaded', e => {
    form = document.getElementById('form-login') as HTMLFormElement;
    form.addEventListener('submit',login)


})

function login(event : Event): void {
    event.preventDefault();
    let us:IUser = {email:(form.email as HTMLInputElement).value,password:(form.password as HTMLInputElement).value};
  
    user = new User(us);
    auth = new Auth(user);
    auth.postLogin().then(x => {
        localStorage.setItem("token", x.accessToken);
        location.assign('index.html');
    }).catch(x => {

        let promise:Promise<ErrorMesagge.ResponseErrorLogin>= (x.json() as Promise<ErrorMesagge.ResponseErrorLogin>);
        promise.then(y=>{
            Swal.fire({
                icon:'error',
                title:'Login Error',
                text:y.error
            });
        });
       
    
    })

}