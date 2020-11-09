import { Product } from "./classes/product.class";

let id:number;
let container:HTMLDivElement;
let map:HTMLDivElement;

document.addEventListener('DOMContentLoaded', e => {
    id = parseInt(location.search.split("=")[1]);
    if(!id){
        location.assign("index.html");
    }
    container = document.getElementById('productContainer')as HTMLDivElement;
    map = document.getElementById('map') as HTMLDivElement;
    rescueProduct();
    

})

function rescueProduct():void{
    Product.get(id).then(x=>{
        let prod : Product = new Product(x.product)
        container.appendChild(prod.toHTML())}
        );

}