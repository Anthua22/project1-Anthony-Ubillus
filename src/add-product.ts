
import {SERVER} from './constants';
import { Product } from './classes/product.class';
import * as moment from 'moment';
import { IProduct } from './interfaces/iproduct';
import { Http } from './classes/http.class';
import { ICategories, ICategory } from './interfaces/icategory';

let newProductForm:HTMLFormElement;
let errorMsg:HTMLDivElement;
let productNew:IProduct;

document.addEventListener("DOMContentLoaded", e => {
    newProductForm = document.getElementById("newProduct") as HTMLFormElement;
    errorMsg = document.getElementById("errorMsg") as HTMLDivElement;

    loadCategories();

    newProductForm.image.addEventListener('change', loadImage);

    newProductForm.addEventListener('submit', validateForm);
});

 async function validateForm(event:Event):Promise<void> {
    event.preventDefault();
    productNew.title = (newProductForm.titleProduct as HTMLInputElement).value.trim();
    productNew.description = (newProductForm.description as HTMLInputElement).value.trim();
    productNew.mainPhoto = (newProductForm.image as HTMLInputElement).value ? (document.getElementById("imgPreview") as HTMLImageElement).src : '';
    productNew.price = +newProductForm.price.value;
    productNew.datePublished = moment().format("YYYYMMDD");
    productNew.category = parseInt((newProductForm.category as HTMLSelectElement).value);

    if(!productNew.title || !productNew.description || !productNew.mainPhoto || !productNew.price || !productNew.category) {
        errorMsg.classList.remove("hidden");
        setTimeout(() => errorMsg.classList.add("hidden"), 3000)
    } else {
        try{
            let prod = new Product(productNew);
            await prod.post();
            location.assign("index.html");
        } catch(e) {
            alert(e);
        }
    }
}

function loadImage(event:Event):void {
    let file:File = (event.target as HTMLInputElement).files[0];
    let reader = new FileReader();

    if (file) reader.readAsDataURL(file);

    reader.addEventListener('load', e => {
        (document.getElementById("imgPreview") as HTMLImageElement).src = reader.result.toString();
    });
}

async function loadCategories():Promise<void> {
    let catResp:ICategories = await Http.get(`${SERVER}/categories`);

    catResp.categories.forEach(c => {
        let option:HTMLOptionElement = document.createElement("option");
        option.value = c.id.toString();
        option.innerText = c.name;
        newProductForm.category.appendChild(option);
    });
    
}


