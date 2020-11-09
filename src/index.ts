import Swal from "sweetalert2";
import { Auth } from "./classes/auth.class";
import { Product } from "./classes/product.class";

let productscontainer: HTMLDivElement;
let logout: HTMLElement;
let serch: HTMLInputElement;
let products: Promise<Product[]>;


document.addEventListener('DOMContentLoaded', e => {

    if (!Auth.validateToken()) {
        location.assign("login.html");
    }

    logout = document.getElementById('logout');
    logout.addEventListener('click', logoutFunction);
    serch = document.getElementById('search') as HTMLInputElement;
    productscontainer = document.getElementById("productsContainer") as HTMLDivElement;
    products = Product.getAll();
    products.then(x => x.forEach(y => {
        productscontainer.appendChild(y.toHTML());
    })).catch(y => Swal.fire({
        icon: 'error',
        title: 'Error',
        text: y
    }));
    serch.addEventListener('keyup', filter)
})

function logoutFunction(): void {
    localStorage.removeItem('token');
    location.assign("login.html");
}


function filter(): void {

    let vacia: boolean = false;

    while (vacia == false) {
        if (productscontainer.firstChild != null) {
            productscontainer.removeChild(productscontainer.firstChild)
        } else {
            vacia = true;
        }

    }

    products.then(x => {
        let productsfilter = x.filter(x => x.title.toLocaleLowerCase().includes(serch.value.toLocaleLowerCase()) || x.description.toLocaleLowerCase().includes(serch.value.toLocaleLowerCase()))

        productsfilter.forEach(x => productscontainer.appendChild(x.toHTML()));
    }).catch(y => Swal.fire({
        icon: 'error',
        title: 'Error',
        text: y
    }));;
}
