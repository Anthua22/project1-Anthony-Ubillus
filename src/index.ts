import { User } from "./classes/user.class";
    

document.addEventListener('DOMContentLoaded', e => {

    if(!User.validateToken()){
        location.assign("register.html");
    }
})