
import { SERVER } from './constants';
import { Product } from './classes/product.class';
import * as moment from 'moment';
import { IProduct } from './interfaces/iproduct';
import { Http } from './classes/http.class';
import { ICategories } from './interfaces/icategory';
import { Auth } from './classes/auth.class';
import Swal from 'sweetalert2';
import { Utils } from './classes/utils.class';

let newProductForm: HTMLFormElement;
let errorMsg: HTMLDivElement;
let productNew: IProduct;
let logout:HTMLElement; 

document.addEventListener("DOMContentLoaded", e => {
    newProductForm = document.getElementById("newProduct") as HTMLFormElement;
    errorMsg = document.getElementById("errorMsg") as HTMLDivElement;
    logout = document.getElementById('logout');
    logout.addEventListener('click',Auth.logout);
    loadCategories();

    (newProductForm.image as HTMLInputElement).addEventListener('change', e=>{
        Utils.loadImage(e,(document.getElementById('imgPreview') as HTMLImageElement))
    });

    newProductForm.addEventListener('submit', validateForm);
});

async function validateForm(event: Event): Promise<void> {
    event.preventDefault();
    let title = (newProductForm.titleProduct as HTMLInputElement).value.trim();
    let description = (newProductForm.description as HTMLInputElement).value.trim();
    let mainPhoto = (newProductForm.image as HTMLInputElement).value ? (document.getElementById("imgPreview") as HTMLImageElement).src : '';
    let price = parseFloat((newProductForm.price as HTMLInputElement).value);
    let datePublished = moment().format("YYYYMMDD");
    let category = parseInt((newProductForm.category as HTMLSelectElement).value);

    if (!title || !description || !mainPhoto || !price || !category) {
        errorMsg.classList.remove("hidden");
        setTimeout(() => errorMsg.classList.add("hidden"), 3000)
    } else {
        try {
            productNew = { id:0,title: title, description: description, mainPhoto: mainPhoto, price: price, datePublished: datePublished, mine: null, owner: null, numVisits: null, distance: null, category:category }
            let prod = new Product(productNew);
            await prod.post();
            location.assign("index.html");
        } catch (e) {
            Swal.fire({
                icon:'error',
                title:'Login Error',
                text:e
            });
        }
    }
}


async function loadCategories(): Promise<void> {
    let catResp: ICategories = await Http.get(`${SERVER}/categories`);

    catResp.categories.forEach(c => {
        let option: HTMLOptionElement = document.createElement("option");
        option.value = c.id.toString();
        option.innerText = c.name;
        newProductForm.category.appendChild(option);
    });

}


