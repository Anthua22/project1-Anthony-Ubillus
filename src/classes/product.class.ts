import { SERVER } from "../constants";
import { ICategory } from "../interfaces/icategory";
import { IPhoto } from "../interfaces/iphoto";
import { IProduct } from "../interfaces/iproduct";
import { IUser } from "../interfaces/iuser";
import { ProductsResponse } from "../interfaces/responses";
import { Http } from "./http.class";
import { User } from "./user.class";



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

    }
    async post(): Promise<Product> {

    }
    async delete(): Promise<void> {

    }
    toHTML(): HTMLDivElement {
        let card:HTMLDivElement = document.createElement('div');
        let prodhtml = productsR
    }
*/
}
