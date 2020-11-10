import Swal from "sweetalert2";
import { Geolocation } from "./classes/geolocation.class";
import { User } from "./classes/user.class";
import { IUser } from "./interfaces/iuser";
import { ResponseError } from "./interfaces/responses";

let user: User;
let img: HTMLImageElement;

let form: HTMLFormElement;


document.addEventListener('DOMContentLoaded', e => {
    form = document.getElementById('form-register') as HTMLFormElement;
    img = document.getElementById('imgPreview') as HTMLImageElement;

    geolocation();
    (form.avatar as HTMLInputElement).addEventListener('change', () => convertToBase64((form.avatar as HTMLInputElement).files[0]));
    form.addEventListener('submit', addUser);

});

function geolocation(): void {
    Geolocation.getLocation().then(x => {
        (form.lat as HTMLInputElement).value = x.latitude.toString();
        (form.lng as HTMLInputElement).value = x.longitude.toString();

    }).catch(x => {
        Swal.fire({
            icon: 'error',
            title: 'Geolocalition Error ',
            text: x
        });
    })
}

function convertToBase64(file: File): void {
    let reader = new FileReader();

    if (file) {
        reader.readAsDataURL(file);
    }
    reader.addEventListener('load', () => {
        img.src = reader.result.toString();
        user.photo = reader.result.toString();
    })
}

function addUser(event: Event): void {
    event.preventDefault();
    if (validateEmail()) {
        let us: IUser = { email: (form.email as HTMLInputElement).value, password: (form.password as HTMLInputElement).value, name: (form.nameUser as HTMLInputElement).value, lat: parseFloat((form.lat as HTMLInputElement).value), lng: parseFloat((form.lng as HTMLInputElement).value) };

        user = new User(us);

        User.postRegister(user).then(x => {
            location.assign('login.html');
        }).catch(x => {
            let promise: Promise<ResponseError> = x.json() as Promise<ResponseError>;
            promise.then(y => {
                let errors: string = y.message.join('\n');
                
                Swal.fire({
                    icon: 'error',
                    title: 'Register Error',
                    text: errors
                });
            })

        })


    } else {
        Swal.fire({
            icon: 'error',
            title: 'Register Error',
            text: "Error: The emails doesn't match"
        });

    }



}

function validateEmail(): boolean {
    if ((form.email as HTMLInputElement).value === (form.email2 as HTMLInputElement).value) {
        return true;
    }
    return false;
}

