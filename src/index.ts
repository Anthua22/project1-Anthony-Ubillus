import { Auth } from "./classes/auth.class";
import { Product } from "./classes/product.class";
import { IProduct } from "./interfaces/iproduct";

let productscontainer: HTMLDivElement;
let logout:HTMLElement;


document.addEventListener('DOMContentLoaded', e => {

    if (!Auth.validateToken()) {
        location.assign("login.html");
    }

    logout = document.getElementById('logout');
    logout.addEventListener('click',logoutFunction);

    productscontainer = document.getElementById("productsContainer") as HTMLDivElement;
    Product.getAll().then(x => x.forEach(y => {
        productscontainer.appendChild(y.toHTML());
    })).catch(y => console.log(y));

})

function logoutFunction():void{
    localStorage.removeItem('token');
    location.assign("login.html");
}

