import Swal from "sweetalert2";
import { Auth } from "./classes/auth.class";
import { Product } from "./classes/product.class";

let productscontainer: HTMLDivElement;
let logout: HTMLElement;
let serch: HTMLInputElement;
let products: Promise<Product[]>;


Auth.checkToken().catch(()=>location.assign('login.html'));

document.addEventListener('DOMContentLoaded', e => {

   
    logout = document.getElementById('logout');
    logout.addEventListener('click', Auth.logout);
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
