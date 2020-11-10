import { User } from "./classes/user.class";

let me:User;
let formProfile:HTMLFormElement;
let formPhoto:HTMLFormElement;
let formPassword:HTMLFormElement;

document.addEventListener('DOMContentLoaded', e => {
    formProfile= document.getElementById('form-profile') as HTMLFormElement;
    formPhoto = document.getElementById('form-photo')as HTMLFormElement;
    formPassword = document.getElementById('form-password') as HTMLFormElement;


    User.getProfile().then(x=>{
        me = new User(x.user);
        completeForm();
    });

})

function completeForm(){
    (formProfile.email as HTMLInputElement).value = me.email;
    (formProfile.nameUser as HTMLInputElement).value = me.name;
    (formPhoto.photo as HTMLImageElement).src = me.photo;
   
}
