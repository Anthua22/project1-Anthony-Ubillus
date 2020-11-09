import { SERVER } from "../constants";
import { ICategory } from "../interfaces/icategory";
import { IPhoto } from "../interfaces/iphoto";
import { IProduct } from "../interfaces/iproduct";
import { IUser } from "../interfaces/iuser";
import { ProductsResponse } from "../interfaces/responses";
import { Http } from "./http.class";
import * as moment from 'moment';
import Swal from "sweetalert2";

const productsTemplate:(product:IProduct) => string = require("../../templates/product.handlebars");


export class Product implements IProduct {
    id?: number;
    title: string;
    description: string;
    price: number;
    mainPhoto: string;
    owner?: IUser;
    numVisits?: number;
    category: number | ICategory;
    mine?: boolean;
    photos?: IPhoto;
    datePublished?: string;
    distance?: number;

    constructor(prodJSON: IProduct) {
        this.id = prodJSON.id;
        this.title = prodJSON.title;
        this.description = prodJSON.description;
        this.price = prodJSON.price;
        this.mainPhoto = prodJSON.mainPhoto;
        this.category = prodJSON.category;
        this.owner = prodJSON.owner;
        this.mine = prodJSON.mine;
        this.photos = prodJSON.photos;
        this.datePublished = prodJSON.datePublished;
        this.distance = prodJSON.distance;
        this.numVisits = prodJSON.numVisits;

    }
    static async getAll(): Promise<Product[]> {

        let peticion: Promise<Product[]> = Http.get<ProductsResponse>(SERVER + "/products").then(x=>x.products.map(x=>new Product(x)));
        return peticion;

    }
    /*static async get(id: number): Promise<Product> {

    }*/


    async post(): Promise<Product> {
        let peticion = Http.post<Product>(SERVER+"/products",this);
        return peticion;
    }
    async delete(): Promise<void> {
        await Http.delete<void>(`${SERVER}/products/${this.id}`);
    }
    toHTML(): HTMLDivElement {
        
        let card:HTMLDivElement = document.createElement('div');
        card.classList.add("card","shadow")
        this.datePublished = moment(this.datePublished,"YYYYMMDD").startOf('hour').fromNow();
        let prodhtml = productsTemplate(this);
        card.innerHTML=prodhtml;
        if(this.mine){
            let btndelte:HTMLElement = card.querySelector('button.btn');
            btndelte.addEventListener('click',  e=>{
                this.delete().then(z=>card.remove()).catch(err=> 
                    Swal.fire({
                        icon:'error',
                        title:'Login Error',
                        text:err
                    }));
               
            })
        }

        return card;
        
    }

}
