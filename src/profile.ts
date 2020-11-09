import { User } from "./classes/user.class";

let containerProfile: HTMLDivElement;
let id: number;
document.addEventListener('DOMContentLoaded', e => {
    containerProfile = document.getElementById('profile') as HTMLDivElement;
    id = parseInt(location.search.split("=")[1]);
    if (id) {
        User.getProfile(id).then(x => {
            let user: User = new User(x.user);

            containerProfile.appendChild(user.toHTML());
        });
    } else {

        User.getmyProfile().then(x=>{
            let user: User = new User(x.user);

            containerProfile.appendChild(user.toHTML());
        })
    }




})