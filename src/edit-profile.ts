import Swal from "sweetalert2";
import { Auth } from "./classes/auth.class";
import { User } from "./classes/user.class";
import { Utils } from "./classes/utils.class";
import { ResponseError } from "./interfaces/responses";

import Cropper from 'cropperjs';



let me: User;
let formProfile: HTMLFormElement;
let formPhoto: HTMLFormElement;
let formPassword: HTMLFormElement;
let logout: HTMLElement;
let cropper:Cropper;
let imgPreview: HTMLImageElement;
let btnCrop:HTMLButtonElement;

//Auth.checkToken().catch(()=>location.assign('login.html'));
document.addEventListener('DOMContentLoaded', e => {
    formProfile = document.getElementById('form-profile') as HTMLFormElement;
    formPhoto = document.getElementById('form-photo') as HTMLFormElement;
    formPassword = document.getElementById('form-password') as HTMLFormElement;
    imgPreview = document.getElementById('imgPreview') as HTMLImageElement;
    btnCrop = document.getElementById('crop') as HTMLButtonElement;
    logout = document.getElementById('logout');
    logout.addEventListener('click', Auth.logout);

    User.getProfile().then(x => {
        me = new User(x.user);
        completeForm();
    });

    formProfile.addEventListener('submit', updateProfile);
    formPassword.addEventListener('submit', updatePassword);
   
    (formPhoto.image as HTMLInputElement).addEventListener('change', e => {
        imgPreview.classList.remove('d-none');
        cropper = new Cropper(imgPreview);
        cropper.destroy();
        Utils.loadImageCrop(e, imgPreview,cropper, btnCrop,(formPhoto.photo as HTMLImageElement));
        
    });

  
    formPhoto.addEventListener('submit', updateAvatar);

})

function completeForm(): void {
    (formProfile.email as HTMLInputElement).value = me.email;
    (formProfile.nameUser as HTMLInputElement).value = me.name;
    (formPhoto.photo as HTMLImageElement).src = me.photo;
}

function cropperMake():void{


}
function updateProfile(event:Event): void {
    event.preventDefault();
    User.saveProfile((formProfile.nameUser as HTMLInputElement).value.trim(),(formProfile.email as HTMLInputElement).value.trim()).then(()=>{
        Swal.fire({
            icon: 'success',
            title: 'Profile Update',
            text: 'Name or email change successfull'
        });
    }).catch(x => {
        let promise: Promise<ResponseError> = x.json() as Promise<ResponseError>;
        promise.then(x => {
            Swal.fire({
                icon: 'error',
                title: 'Update Profile Error',
                text: x.message.join('\n')
            });
        })


    })

}

function updatePassword(event: Event): void {
    event.preventDefault();
    if (matchPassword()) {
        User.savePassword((formPassword.password as HTMLInputElement).value).then(() => {
            formPassword.reset();
            Swal.fire({
                icon: 'success',
                title: 'Password Update',
                text: 'The password has changed update successfull'
            });
        })
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Password error',
            text: "The passwords doesn't match"
        });
    }
}

function updateAvatar(event: Event): void {
    event.preventDefault();
    User.saveAvatar(imgPreview.src).then(x => {
        imgPreview.classList.add('d-none');
        (formPhoto.photo as HTMLImageElement).src = x;
        Swal.fire({
            icon: 'success',
            title: 'Photo Update',
            text: "The photo's profile has changed update successfull"
        });
    })

}


function matchPassword(): boolean {
    if ((formPassword.password as HTMLInputElement).value === (formPassword.password2 as HTMLInputElement).value)
        return true;
    return false;
}

