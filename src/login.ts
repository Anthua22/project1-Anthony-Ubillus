import Swal from "sweetalert2";
import { Auth } from "./classes/auth.class";
import * as ErrorMesagge from "./classes/responseError.class";
import { User } from "./classes/user.class";

let form: HTMLFormElement;
let user: User;
let auth: Auth;


document.addEventListener('DOMContentLoaded', e => {
    form = document.getElementById('form-login') as HTMLFormElement;
    user = new User();
    
    form.addEventListener('submit',login)


})

function login(event : Event): void {
    event.preventDefault();
    user.email = (form.email as HTMLInputElement).value;
    user.password = (form.password as HTMLInputElement).value;
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