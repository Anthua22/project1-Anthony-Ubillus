import Swal from "sweetalert2";
import { Auth } from "./classes/auth.class";
import { Geolocation } from "./classes/geolocation.class";
import { User } from "./classes/user.class";
import { IUser } from "./interfaces/iuser";
import { ResponseErrorLogin } from "./interfaces/responses";

let form: HTMLFormElement;


document.addEventListener('DOMContentLoaded', e => {
    form = document.getElementById('form-login') as HTMLFormElement;
    form.addEventListener('submit', login)


})

async function login(event: Event): Promise<void> {
    try {

        event.preventDefault();
        let us: IUser = { email: (form.email as HTMLInputElement).value, password: (form.password as HTMLInputElement).value };

        let coor = await Geolocation.getLocation();
        us.lat = coor.latitude;
        us.lng = coor.longitude;
        Auth.login(us).then(x => {
            localStorage.setItem("token", x.accessToken);
            location.assign('index.html');
        }).catch(x => {

            let promise: Promise<ResponseErrorLogin> = (x.json() as Promise<ResponseErrorLogin>);
            promise.then(y => {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Error',
                    text: y.error
                });
            });


        })

    } catch (x) {
        Swal.fire({
            icon: 'error',
            title: 'Geolocalition Error ',
            text: x
        });
    };


}
