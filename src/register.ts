import { Auth } from "./classes/auth.class";
import { Geolocation } from "./classes/geolocation.class";
import { ResponseAuth } from "./classes/responseauth.class";
import { User } from "./classes/user.class";

let user: User;
let img:HTMLImageElement;

let form: HTMLFormElement;


document.addEventListener('DOMContentLoaded', e => {
    form = document.getElementById('form-register') as HTMLFormElement;
    img = document.getElementById('imgPreview') as HTMLImageElement;
    user = new User();
    geolocation();
    (form.avatar as HTMLInputElement).addEventListener('change', ()=>convertToBase64((form.avatar as HTMLInputElement).files[0]));
    form.addEventListener('submit',addUser);

});

function geolocation(): void {
    Geolocation.getLocation().then(x=>{
        (form.lat as HTMLInputElement).value = x.latitude.toString();
        (form.lng as HTMLInputElement).value = x.longitude.toString();

    })
}

function convertToBase64(file:File) {
    let reader = new FileReader();

    if (file) {
        reader.readAsDataURL(file);
    }

    reader.addEventListener('load', () => {
        img.src = reader.result.toString();
        user.photo =  reader.result.toString();
    })
}

function addUser(event: Event): void {
    event.preventDefault();
    let auth:Auth;
    if(validateEmail){
        user.email = (form.email as HTMLInputElement).value;
        user.password = (form.password as HTMLInputElement).value;
        user.name = (form.nameUser as HTMLInputElement).value;
        user.lat = parseFloat((form.lat as HTMLInputElement).value);
        user.lng = parseFloat((form.lng as HTMLInputElement).value);
        Auth.postRegister(user).then(x=>{auth = new Auth(user); return auth}).then(x=>{
            return x.postLogin();
        }).then(x=>{
            
            localStorage.setItem("token",(x as ResponseAuth).accessToken)
        });
       

    }else{
        alert("Error: The emails doesn't match");
    }

    
    
    

}

function validateEmail():boolean{
    if((form.email as HTMLInputElement).value === (form.email2 as HTMLInputElement).value){
        return true;
    }
    return false;
}

