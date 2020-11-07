import { ICategory } from "../interfaces/icategory";
import { IPhoto } from "../interfaces/iphoto";
import { IProduct } from "../interfaces/iproduct";
import { IUser } from "../interfaces/iuser";

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
   
}
