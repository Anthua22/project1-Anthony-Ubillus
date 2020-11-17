
import { SERVER, TYPE } from './constants';
import { Product } from './classes/product.class';
import * as moment from 'moment';
import { IProduct } from './interfaces/iproduct';
import { Http } from './classes/http.class';
import { ICategories } from './interfaces/icategory';
import { Auth } from './classes/auth.class';
import Swal from 'sweetalert2';
import { Utils } from './classes/utils.class';
import Cropper from 'cropperjs';

let newProductForm: HTMLFormElement;
let errorMsg: HTMLDivElement;
let productNew: IProduct;
let logout: HTMLElement;
let cropper: Cropper;
let imgPreview: HTMLImageElement;

Auth.checkToken().catch(() => location.assign('login.html'));

document.addEventListener("DOMContentLoaded", e => {
    newProductForm = document.getElementById("newProduct") as HTMLFormElement;
    errorMsg = document.getElementById("errorMsg") as HTMLDivElement;
    logout = document.getElementById('logout');
    imgPreview = document.getElementById('imgPreview') as HTMLImageElement;
    logout.addEventListener('click', Auth.logout);
    loadCategories();

    (newProductForm.image as HTMLInputElement).addEventListener('change', e => {
        loadImage(e)
    });

    newProductForm.addEventListener('submit', validateForm);
});

function loadImage(event: Event): void {
    let file: File = (event.target as HTMLInputElement).files[0];
    let reader = new FileReader();
    if (file) reader.readAsDataURL(file);

    reader.addEventListener('load', e => {
        imgPreview.src = reader.result.toString();
        if(cropper){
            cropper.destroy();
            cropper.disable();
        }
        cropper = new Cropper(imgPreview, {
            aspectRatio: 16 / 9,
            center: true,
            dragMode: "move"
        });


    })
}
 function validateForm(event: Event): void {
    event.preventDefault();
    let title:string = (newProductForm.titleProduct as HTMLInputElement).value.trim();
    let description:string = (newProductForm.description as HTMLInputElement).value.trim();
    let mainPhoto:string = (newProductForm.image as HTMLInputElement).value ? (document.getElementById("imgPreview") as HTMLImageElement).src : '';
    let price:number = parseFloat((newProductForm.price as HTMLInputElement).value);
    let datePublished:string = moment().format("YYYYMMDD");
    let category:number = parseInt((newProductForm.category as HTMLSelectElement).value);

    if (!title || !description || !mainPhoto || !price || !category) {
        errorMsg.classList.remove("hidden");
        setTimeout(() => errorMsg.classList.add("hidden"), 3000)
    } else {
        try {
            productNew = { id: 0, title: title, description: description, mainPhoto: mainPhoto, price: price, datePublished: datePublished, mine: null, owner: null, numVisits: null, distance: null, category: category }
            let result: HTMLCanvasElement = cropper.getCroppedCanvas({
                width:1024
            });
            result.toBlob(e => {
                let reader: FileReader = new FileReader();
                reader.readAsDataURL(e);

                reader.addEventListener('load', async () => {
                    imgPreview.src = reader.result.toString();
                    productNew.mainPhoto = imgPreview.src;
                    let prod = new Product(productNew);
                    await prod.post();
                    location.assign("index.html");
                    cropper.destroy();
                    cropper.disable();
                })
            });



        } catch (e) {
            Utils.showError(e);
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


